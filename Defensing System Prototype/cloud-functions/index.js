const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.database();

/**
 * ELEGUARD AUTOMATED DEFENSE TRIGGER (v1 Compat)
 * Rules:
 * - 10 LOW alerts -> Trigger defense
 * - 5 HIGH/MED alerts -> Trigger defense
 * - ANY SAFE alert -> WIPE EVERYTHING
 */
exports.autoDefenseTrigger = functions.database.ref("/iot_signals/{sid}")
  .onUpdate(async (change, context) => {
    const sid = context.params.sid;
    const newValue = change.after.val();

    if (!newValue || newValue.falseAlarm) return null;

    const severity = (newValue.severity || "SAFE").toUpperCase();
    const isThreat = ["LOW", "MEDIUM", "HIGH", "CRITICAL"].includes(severity);
    const counterRef = db.ref(`/defending_system/alert_counters/${sid}`);

    // 1. ABSOLUTE RESET IF SAFE
    if (!isThreat || severity === "SAFE") {
      await counterRef.remove();
      
      const defenseRef = db.ref(`/defending_system/sensors/${sid}`);
      const snap = await defenseRef.get();
      if (snap.exists() && (snap.val().buzzer?.isActive || snap.val().impulseWave?.isActive)) {
        await defenseRef.update({ "buzzer/isActive": false, "impulseWave/isActive": false });
        await db.ref("/defending_system/logs").push().set({
          sensorId: sid, timestamp: new Date().toISOString(), type: "RESET",
          reason: "Zone clear: System auto-reset"
        });
      }
      return null;
    }

    // 2. STREAK INCREMENT (Transaction)
    let triggerDefense = false;
    let reason = "";
    let intensity = "LOW";

    await counterRef.transaction((c) => {
      let current = c || { lowSeverityCount: 0, highSeverityCount: 0 };
      if (severity === "LOW" || severity === "MEDIUM") {
        current.lowSeverityCount = (current.lowSeverityCount || 0) + 1;
        if (current.lowSeverityCount >= 10) triggerDefense = true;
      } else if (severity === "HIGH" || severity === "CRITICAL") {
        current.highSeverityCount = (current.highSeverityCount || 0) + 1;
        if (current.highSeverityCount >= 5) triggerDefense = true;
      }
      return current;
    });

    // 3. TRIGGER DEFENSE
    if (triggerDefense) {
      reason = `Persistent ${severity} detected (Threshold reached)`;
      intensity = (severity === "HIGH" || severity === "CRITICAL") ? "HIGH" : "LOW";
      const timestamp = new Date().toISOString();
      const defenseRef = db.ref(`/defending_system/sensors/${sid}`);
      
      await defenseRef.update({
        buzzer: { isActive: true, activatedAt: timestamp, intensity: intensity, triggerType: "AUTO" },
        impulseWave: { isActive: true, activatedAt: timestamp, intensity: intensity, triggerType: "AUTO" }
      });

      await db.ref("/defending_system/logs").push().set({
        sensorId: sid, timestamp: timestamp, type: "DEFENSE_ACTIVATED",
        triggerType: "AUTO", intensity: intensity, reason: reason
      });
    }

    return null;
  });
