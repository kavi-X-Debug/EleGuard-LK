// =============================================
//  EleGuard — Firebase Cloud Functions v2
//  Auto Defense Trigger Engine
// =============================================

const { onValueUpdated } = require("firebase-functions/v2/database");
const { initializeApp }  = require("firebase-admin/app");
const { getDatabase }    = require("firebase-admin/database");

initializeApp();

// ─── Thresholds ──────────────────────────────────
const LOW_THRESHOLD  = 10;  // 10 LOW alerts  → trigger
const HIGH_THRESHOLD = 5;   //  5 HIGH alerts → trigger

// ─── Helper: write defending device state ────────
async function activateDefending(db, sensorId, severity, triggeredBy, triggerType, reason) {
  const now       = new Date().toISOString();
  const intensity = severity === "HIGH" ? "HIGH"
                  : severity === "MEDIUM" ? "MEDIUM"
                  : "LOW";

  const devicePayload = {
    isActive:        true,
    intensity,
    triggeredBy,
    triggerType,
    activatedAt:     now,
    deactivatedAt:   null,
    durationSeconds: 0,
  };

  const updates = {};

  // Write per-sensor buzzer & impulseWave state
  updates[`/defending_system/sensors/${sensorId}/buzzer`]      = devicePayload;
  updates[`/defending_system/sensors/${sensorId}/impulseWave`] = devicePayload;

  // Write log entry
  const logRef = db.ref("/defending_system/logs").push();
  updates[`/defending_system/logs/${logRef.key}`] = {
    sensorId,
    deviceType:  "BUZZER+IMPULSE_WAVE",
    action:      "ACTIVATED",
    triggerType,
    severity,
    intensity,
    triggeredBy,
    timestamp:   now,
    reason,
  };

  await db.ref("/").update(updates);
  console.log(`[ACTIVATE] Sensor ${sensorId} | ${triggerType} | ${reason}`);
}

async function deactivateDefending(db, sensorId, reason) {
  const now = new Date().toISOString();
  const updates = {};

  const offPayload = {
    isActive:      false,
    deactivatedAt: now,
  };

  updates[`/defending_system/sensors/${sensorId}/buzzer/isActive`]      = false;
  updates[`/defending_system/sensors/${sensorId}/buzzer/deactivatedAt`] = now;
  updates[`/defending_system/sensors/${sensorId}/impulseWave/isActive`]      = false;
  updates[`/defending_system/sensors/${sensorId}/impulseWave/deactivatedAt`] = now;

  // Write log entry
  const logRef = db.ref("/defending_system/logs").push();
  updates[`/defending_system/logs/${logRef.key}`] = {
    sensorId,
    deviceType:  "BUZZER+IMPULSE_WAVE",
    action:      "DEACTIVATED",
    triggerType: "AUTO",
    severity:    "SAFE",
    intensity:   "NONE",
    triggeredBy: "auto",
    timestamp:   now,
    reason,
  };

  await db.ref("/").update(updates);
  console.log(`[DEACTIVATE] Sensor ${sensorId} | ${reason}`);
}

// ─── Main Trigger Function ───────────────────────
exports.autoDefenseTrigger = onValueUpdated(
  "/iot_signals/{sensorId}",
  async (event) => {
    const sensorId = event.params.sensorId;
    const signal   = event.data.after.val();

    if (!signal) {
      console.log(`[SKIP] No data for ${sensorId}`);
      return null;
    }

    const { severity, isActive, falseAlarm } = signal;
    const db = getDatabase();

    // ─── Read current counters ────────────────────
    const counterRef = db.ref(`/defending_system/alert_counters/${sensorId}`);
    const counterSnap = await counterRef.once("value");
    const counters = counterSnap.val() || {
      lowSeverityCount:  0,
      highSeverityCount: 0,
      lastResetAt:       new Date().toISOString(),
      autoTriggered:     false,
    };

    // ─── Rule 3: SAFE / inactive reset ───────────
    if (!isActive || severity === "SAFE") {
      if (counters.autoTriggered) {
        await deactivateDefending(db, sensorId, "SAFE signal — auto defense stopped");
        await counterRef.update({
          lowSeverityCount:  0,
          highSeverityCount: 0,
          autoTriggered:     false,
          lastResetAt:       new Date().toISOString(),
        });
      }
      return null;
    }

    // ─── Only proceed for real, non-false alerts ─
    if (falseAlarm) {
      console.log(`[SKIP] ${sensorId} is a false alarm`);
      return null;
    }

    // ─── Rule 1: LOW severity ────────────────────
    if (severity === "LOW" && isActive && !falseAlarm) {
      let newCount = (counters.lowSeverityCount || 0) + 1;
      if (newCount >= LOW_THRESHOLD) {
        await activateDefending(
          db, sensorId, "LOW", "auto", "AUTO",
          "10 LOW alerts triggered auto defense"
        );
        await counterRef.update({
          lowSeverityCount:  0,
          autoTriggered:     true,
          lastResetAt:       new Date().toISOString(),
        });
      } else {
        await counterRef.update({
          lowSeverityCount: newCount,
        });
        console.log(`[COUNTER] ${sensorId} LOW: ${newCount}/${LOW_THRESHOLD}`);
      }
      return null;
    }

    // ─── Rule 2: HIGH severity ───────────────────
    if (severity === "HIGH" && isActive && !falseAlarm) {
      let newCount = (counters.highSeverityCount || 0) + 1;
      if (newCount >= HIGH_THRESHOLD) {
        await activateDefending(
          db, sensorId, "HIGH", "auto", "AUTO",
          "5 HIGH alerts triggered auto defense"
        );
        await counterRef.update({
          highSeverityCount: 0,
          autoTriggered:     true,
          lastResetAt:       new Date().toISOString(),
        });
      } else {
        await counterRef.update({
          highSeverityCount: newCount,
        });
        console.log(`[COUNTER] ${sensorId} HIGH: ${newCount}/${HIGH_THRESHOLD}`);
      }
      return null;
    }

    // ─── MEDIUM: increment HIGH counter too ──────
    if (severity === "MEDIUM" && isActive && !falseAlarm) {
      let newCount = (counters.highSeverityCount || 0) + 1;
      if (newCount >= HIGH_THRESHOLD) {
        await activateDefending(
          db, sensorId, "MEDIUM", "auto", "AUTO",
          "5 MEDIUM/HIGH alerts triggered auto defense"
        );
        await counterRef.update({
          highSeverityCount: 0,
          autoTriggered:     true,
          lastResetAt:       new Date().toISOString(),
        });
      } else {
        await counterRef.update({ highSeverityCount: newCount });
      }
    }

    return null;
  }
);
