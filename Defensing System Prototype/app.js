// =============================================
//  EleGuard Defending System Monitor — app.js
// =============================================

const firebaseConfig = {
  apiKey:        "AIzaSyCBIpBCmKxiu3E5-Nls6tfo5xwgsBO12-8",
  authDomain:    "studio-9916723566-5e1ef.firebaseapp.com",
  databaseURL:   "https://studio-9916723566-5e1ef-default-rtdb.firebaseio.com",
  projectId:     "studio-9916723566-5e1ef",
  storageBucket: "studio-9916723566-5e1ef.firebasestorage.app",
};

// ─── Constants ───────────────────────────────────
const SENSOR_IDS = ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12','S13','S14'];
const LOW_TRIGGER_THRESHOLD  = 10;
const HIGH_TRIGGER_THRESHOLD = 5;

// ─── Global State ────────────────────────────────
const state = {
  sensors:          {},   // /iot_signals
  defenseSystem:    {},   // /defense_system  (global)
  defendingSensors: {},   // /defending_system/sensors
  alertCounters:    {},   // /defending_system/alert_counters
  defenseLogs:      [],   // /defense_logs (existing)
  connected:        true,
  initialized:      false,
};

// ─── Firebase Init ───────────────────────────────
firebase.initializeApp(firebaseConfig);
const db   = firebase.database();
const auth = firebase.auth();

// ─── Auth State ──────────────────────────────────
auth.onAuthStateChanged(user => {
  const overlay = document.getElementById('authOverlay');
  if (user) {
    if (overlay) overlay.classList.add('hidden');
    if (!state.initialized) {
      setupListeners();
      startFooterClock();
      state.initialized = true;
    }
  } else {
    if (overlay) overlay.classList.remove('hidden');
  }
});

// ─── Login Logic ─────────────────────────────────
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value;
    const pass  = document.getElementById('passwordInput').value;
    const error = document.getElementById('authError');
    
    if (!email || !pass) return;
    
    loginBtn.classList.add('loading');
    if (error) error.textContent = '';
    
    try {
      await auth.signInWithEmailAndPassword(email, pass);
    } catch (e) {
      if (error) error.textContent = 'Authorization Failed: Check credentials';
      console.error(e);
    } finally {
      loginBtn.classList.remove('loading');
    }
  });
}

// ─── Search & Logout Logic ───────────────────────
let searchTerm = '';
const sensorSearch = document.getElementById('sensorSearch');
if (sensorSearch) {
  sensorSearch.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase();
    renderSensorGrid();
  });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    auth.signOut();
  });
}

// ─── Connection Monitor ──────────────────────────
db.ref('.info/connected').on('value', snap => {
  state.connected = !!snap.val();
  const dot = document.getElementById('liveDot');
  if (dot) {
    if (state.connected) {
      dot.style.background    = 'var(--green)';
      dot.style.boxShadow     = '0 0 10px var(--green)';
    } else {
      dot.style.background    = 'var(--red)';
      dot.style.boxShadow     = '0 0 10px var(--red)';
    }
  }
});

// ─── Listeners ───────────────────────────────────
function setupListeners() {
  // 1. IoT Signals
  db.ref('/iot_signals').on('value', snap => {
    state.sensors = snap.val() || {};
    renderSensorGrid();
    updateStatusBar();
    updateSeveritySummary();
    updateHealthStatus();
    touchUpdated();
  });

  // 2. Global defense_system
  db.ref('/defense_system').on('value', snap => {
    state.defenseSystem = snap.val() || {};
    updateStatusBar();
    updateConfigCard();
    touchUpdated();
  });

  // 3. Per-sensor defending state
  db.ref('/defending_system/sensors').on('value', snap => {
    state.defendingSensors = snap.val() || {};
    renderSensorGrid();
    updateStatusBar();
    touchUpdated();
  });

  // 4. Alert counters
  db.ref('/defending_system/alert_counters').on('value', snap => {
    state.alertCounters = snap.val() || {};
    renderSensorGrid();
    touchUpdated();
  });

  // 5. Defense logs
  db.ref('/defense_logs').limitToLast(25).on('value', snap => {
    const raw = snap.val() || {};
    state.defenseLogs = Object.entries(raw)
      .map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    renderLogs();
    touchUpdated();
  });

  // 6. New defending_system logs
  db.ref('/defending_system/logs').limitToLast(15).on('value', snap => {
    const raw = snap.val() || {};
    state.newLogs = Object.entries(raw)
      .map(([id, v]) => ({ id, ...v, _new: true }))
      .sort((a, b) => {
        const ta = new Date(b.timestamp || 0).getTime();
        const tb = new Date(a.timestamp || 0).getTime();
        return ta - tb;
      });
    renderLogs();
    touchUpdated();
  });
}

// ─── Touch update time ───────────────────────────
function touchUpdated() {
  state.lastUpdate = new Date();
  const elFooter = document.getElementById('footerTime');
  if (elFooter) elFooter.textContent = formatFullTime(state.lastUpdate);
}

// ─── Render Sensor Grid ──────────────────────────
function renderSensorGrid() {
  const grid = document.getElementById('sensorGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const filteredIds = SENSOR_IDS.filter(id => id.toLowerCase().includes(searchTerm));
  
  if (filteredIds.length === 0) {
    grid.innerHTML = `<div class="search-empty"><p>No sensors found matching "${searchTerm}"</p></div>`;
    return;
  }

  filteredIds.forEach((id, index) => {
    const card = buildSensorCard(id);
    card.style.animationDelay = `${index * 0.05}s`;
    card.style.animation = 'authSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both';
    grid.appendChild(card);
  });
}

function buildSensorCard(sensorId) {
  const sensor   = state.sensors[sensorId]          || {};
  const defense  = state.defendingSensors[sensorId] || {};
  const counters = state.alertCounters[sensorId]    || {};
  const buzzer   = defense.buzzer      || {};
  const impulse  = defense.impulseWave || {};

  const severity      = (sensor.severity || 'SAFE').toUpperCase();
  const isActive      = !!sensor.isActive;
  const falseAlarm    = !!sensor.falseAlarm;
  const crossedBound  = !!sensor.crossedBoundary;
  const amplitude     = sensor.amplitude  != null ? sensor.amplitude.toFixed(1)   : '--';
  const threatRadius  = sensor.threatRadius != null ? sensor.threatRadius.toFixed(1) : '--';
  const ts            = sensor.timestamp ? timeAgo(sensor.timestamp) : '--';

  const buzzerActive  = !!buzzer.isActive;
  const impulseActive = !!impulse.isActive;

  const lowCount  = counters.lowSeverityCount  || 0;
  const highCount = counters.highSeverityCount || 0;
  const lowPct    = Math.min(100, (lowCount  / LOW_TRIGGER_THRESHOLD)  * 100);
  const highPct   = Math.min(100, (highCount / HIGH_TRIGGER_THRESHOLD) * 100);

  const sevClass = { SAFE: 'sev-safe', LOW: 'sev-low', MEDIUM: 'sev-medium', HIGH: 'sev-high' }[severity] || 'sev-safe';

  const card = document.createElement('div');
  card.className = `sensor-card ${sevClass}`;
  card.innerHTML = `
    <div class="card-header">
      <div class="card-id-group">
        <div class="card-status-dot ${isActive ? 'active' : 'inactive'}"></div>
        <span class="card-id">${sensorId}</span>
      </div>
      <span class="badge ${severityBadgeClass(severity)}">${severity}</span>
    </div>
    <div class="card-metrics">
      <div class="metric"><span class="metric-label">Amplitude</span><span class="metric-value">${amplitude}</span></div>
      <div class="metric"><span class="metric-label">Threat Radius</span><span class="metric-value">${threatRadius}m</span></div>
    </div>
    <div class="card-defense">
      <div class="defense-row ${buzzerActive ? 'active-device' : ''}">
        <span class="defense-device-name">BUZZER</span>
        <span class="badge ${buzzerActive ? 'badge-high' : 'badge-off'}">${buzzerActive ? 'ON' : 'OFF'}</span>
      </div>
      <div class="defense-row ${impulseActive ? 'active-device' : ''}">
        <span class="defense-device-name">WAVE</span>
        <span class="badge ${impulseActive ? 'badge-high' : 'badge-off'}">${impulseActive ? 'ON' : 'OFF'}</span>
      </div>
    </div>
    <div class="card-footer">
      <span class="card-timestamp">${ts}</span>
    </div>
  `;
  return card;
}

function severityBadgeClass(sev) {
  return { SAFE: 'badge-safe', LOW: 'badge-low', MEDIUM: 'badge-medium', HIGH: 'badge-high' }[sev] || 'badge-safe';
}

// ─── Status Bar ──────────────────────────────────
function updateStatusBar() {
  let buzzers = 0, impulses = 0;
  SENSOR_IDS.forEach(id => {
    const d = state.defendingSensors[id] || {};
    if (d.buzzer?.isActive)      buzzers++;
    if (d.impulseWave?.isActive) impulses++;
  });
  const totalDefenses = Math.max(buzzers, impulses);

  setStat('statActiveDefenses', totalDefenses, 'statCardDefenses', totalDefenses > 0 ? 'danger' : 'safe');
  setStat('statBuzzers', buzzers, 'statCardBuzzers', buzzers > 0 ? 'danger' : 'safe');
  setStat('statImpulse', impulses, 'statCardImpulse', impulses > 0 ? 'warning' : 'safe');

  const autoOn = state.defenseSystem.autoDefense !== undefined ? !!state.defenseSystem.autoDefense : true;
  setStat('statAutoStatus', autoOn ? 'ENABLED' : 'DISABLED', 'statCardAuto', autoOn ? 'safe' : '');
}

function setStat(id, val, cardId, cls) {
  const el = document.getElementById(id);
  const card = document.getElementById(cardId);
  if (el) el.textContent = val;
  if (card && cls) card.className = `stat-card ${cls}`;
}

// ─── Config Card ─────────────────────────────────
function updateConfigCard() {
  const ds = state.defenseSystem;
  setVal('cfgStatus',     ds.status    || '--', ds.status === 'ACTIVE' ? 'active' : 'inactive');
  setVal('cfgAutoDefense',ds.autoDefense ? 'ON' : 'OFF', ds.autoDefense ? 'on' : 'off');
  setVal('cfgBuzzer',     ds.buzzerEnabled  ? 'Enabled' : 'Disabled', ds.buzzerEnabled  ? 'on' : 'off');
  setVal('cfgImpulse',    ds.impulseEnabled ? 'Enabled' : 'Disabled', ds.impulseEnabled ? 'on' : 'off');
  setVal('cfgIntensity',  ds.intensity || '--');
  setVal('cfgLastZone',   ds.lastActivated?.zone || '--');
  setVal('cfgLastTime',   ds.lastActivated?.time || '--');
}

function setVal(id, text, cls) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  if (cls) el.className = `cfg-val ${cls}`;
}

// ─── Severity Summary ────────────────────────────
function updateSeveritySummary() {
  const counts = { SAFE: 0, LOW: 0, MEDIUM: 0, HIGH: 0 };
  SENSOR_IDS.forEach(id => {
    const sev = (state.sensors[id]?.severity || 'SAFE').toUpperCase();
    if (counts[sev] !== undefined) counts[sev]++;
    else counts['SAFE']++;
  });
  const total = SENSOR_IDS.length;
  const pct = v => ((v / total) * 100).toFixed(1);

  ['Safe', 'Low', 'Med', 'High'].forEach(s => {
    const elBar = document.getElementById(`bar${s}`);
    const elCount = document.getElementById(`count${s.toUpperCase() === 'MED' ? 'MED' : s.toUpperCase()}`);
    if (elBar) elBar.style.width = pct(counts[s.toUpperCase() === 'MED' ? 'MEDIUM' : s.toUpperCase()]) + '%';
    if (elCount) elCount.textContent = counts[s.toUpperCase() === 'MED' ? 'MEDIUM' : s.toUpperCase()];
  });
}

// ─── Health Monitor Logic ────────────────────────
function updateHealthStatus() {
  const sensors = Object.values(state.sensors);
  const activeThreats = sensors.filter(s => s.severity === 'HIGH' && s.isActive && !s.falseAlarm).length;
  const banner = document.getElementById('healthBanner');
  const msg = document.getElementById('healthMsg');
  const sub = document.getElementById('systemHealthText');
  const icon = banner ? banner.querySelector('.health-icon') : null;
  
  if (activeThreats > 0) {
    if (banner) banner.className = 'health-banner danger';
    if (icon) icon.textContent = 'THREAT';
    if (msg) msg.textContent = `Warning: ${activeThreats} sensor(s) reporting CRITICAL activity. Check defense systems.`;
    if (sub) { sub.textContent = 'System Status: THREAT DETECTED'; sub.style.color = 'var(--red)'; }
  } else {
    if (banner) banner.className = 'health-banner safe';
    if (icon) icon.textContent = 'SAFE';
    if (msg) msg.textContent = 'All systems operational. No active threats detected in your zones.';
    if (sub) { sub.textContent = 'System Status: HEALTHY'; sub.style.color = 'var(--green)'; }
  }
}

// ─── Logs ────────────────────────────────────────
function renderLogs() {
  const list = document.getElementById('logList');
  const badge = document.getElementById('logBadge');
  const combined = [...(state.defenseLogs || []), ...(state.newLogs || [])];
  
  combined.sort((a, b) => {
    const ta = a.timestamp ? (typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime()) : 0;
    const tb = b.timestamp ? (typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime()) : 0;
    return tb - ta;
  });

  if (badge) badge.textContent = combined.length;
  if (!list) return;

  if (combined.length === 0) {
    list.innerHTML = '<div class="log-empty">No defense activity logged yet.</div>';
    return;
  }

  list.innerHTML = combined.slice(0, 20).map(log => `
    <div class="log-entry">
      <div class="log-type-label">${log.type || log.deviceType || 'EVENT'}</div>
      <div class="log-meta">Zone: ${log.zone || log.sensorId || '--'} • ${timeAgo(log.timestamp)}</div>
    </div>
  `).join('');
}

// ─── Time Helpers ────────────────────────────────
function timeAgo(isoOrMs) {
  let d;
  if (typeof isoOrMs === 'number') d = new Date(isoOrMs);
  else if (typeof isoOrMs === 'string') d = new Date(isoOrMs);
  else return '--';
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return 'Just now';
  if (sec < 3600) return `${Math.floor(sec/60)}m ago`;
  return `${Math.floor(sec/3600)}h ago`;
}

function formatFullTime(d) {
  return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
}

function startFooterClock() {
  setInterval(() => {
    const el = document.getElementById('footerTime');
    if (el) el.textContent = formatFullTime(new Date());
  }, 1000);
}
