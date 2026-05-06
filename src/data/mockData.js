export const ZONES = [
  { id: 'Z-01', name: 'Anuradhapura North', lat: 8.3114, lng: 80.4037, riskPercentage: 85, status: 'Critical' },
  { id: 'Z-02', name: 'Polonnaruwa Border', lat: 7.9403, lng: 81.0188, riskPercentage: 62, status: 'High' },
  { id: 'Z-03', name: 'Minneriya Reserve', lat: 8.0408, lng: 80.8286, riskPercentage: 45, status: 'Medium' },
  { id: 'Z-04', name: 'Yala Buffer Zone', lat: 6.3683, lng: 81.5173, riskPercentage: 90, status: 'Critical' },
  { id: 'Z-05', name: 'Udawalawe Edge', lat: 6.4673, lng: 80.8906, riskPercentage: 20, status: 'Safe' },
  { id: 'Z-06', name: 'Wasgamuwa Sector', lat: 7.7126, lng: 80.9329, riskPercentage: 10, status: 'Safe' },
  { id: 'Z-07', name: 'Ampara Farmlands', lat: 7.2955, lng: 81.6747, riskPercentage: 75, status: 'High' },
];

export const LIVE_ELEPHANTS = [
  { id: 'E-101', name: 'Tusker Raja', lat: 8.3150, lng: 80.4050, speed: '4.2 km/h', direction: 'North-East', zoneId: 'Z-01', lastDetected: '2 mins ago', status: 'Active' },
  { id: 'E-102', name: 'Herd Alpha', lat: 8.3120, lng: 80.4010, speed: '2.1 km/h', direction: 'East', zoneId: 'Z-01', lastDetected: 'Just now', status: 'Active' }, // Multiple in same zone
  { id: 'E-205', name: 'Lone Bull', lat: 7.9450, lng: 81.0150, speed: '5.5 km/h', direction: 'South', zoneId: 'Z-02', lastDetected: '5 mins ago', status: 'Active' },
  { id: 'E-301', name: 'Female & Calf', lat: 6.3690, lng: 81.5180, speed: '1.2 km/h', direction: 'West', zoneId: 'Z-04', lastDetected: '1 min ago', status: 'Active' },
  { id: 'E-404', name: 'Unknown', lat: 8.0450, lng: 80.8300, speed: '0.0 km/h', direction: 'Stationary', zoneId: 'Z-03', lastDetected: '1 hour ago', status: 'Missing Data' }, // Missing Data case
];

export const SENSORS = [
  { id: 'S-1001', type: 'Geophone', zoneId: 'Z-01', status: 'Online', battery: '85%' },
  { id: 'S-1002', type: 'Geophone', zoneId: 'Z-01', status: 'Online', battery: '92%' },
  { id: 'S-2001', type: 'Camera', zoneId: 'Z-02', status: 'Offline', battery: '0%' }, // Offline case
  { id: 'S-3001', type: 'Geophone', zoneId: 'Z-03', status: 'Error', battery: '45%' }, // Missing data/Error case
  { id: 'S-4001', type: 'Geophone', zoneId: 'Z-04', status: 'Online', battery: '78%' },
];

export const RECENT_ALERTS = [
  { id: 'A-901', zone: 'Anuradhapura North', severity: 'Critical', time: '10:42 AM', date: 'Today', description: 'Large herd approaching paddy fields.', type: 'True Positive' },
  { id: 'A-902', zone: 'Yala Buffer Zone', severity: 'Critical', time: '09:15 AM', date: 'Today', description: 'Tusker detected near electric fence.', type: 'True Positive' },
  { id: 'A-903', zone: 'Polonnaruwa Border', severity: 'High', time: '08:30 AM', date: 'Today', description: 'Seismic activity detected, possible elephant movement.', type: 'True Positive' },
  { id: 'A-904', zone: 'Minneriya Reserve', severity: 'Medium', time: '07:05 AM', date: 'Today', description: 'Distant movement detected.', type: 'True Positive' },
  { id: 'A-905', zone: 'Udawalawe Edge', severity: 'Safe', time: '06:00 AM', date: 'Today', description: 'Routine check. No activity.', type: 'True Negative' },
  { id: 'A-906', zone: 'Ampara Farmlands', severity: 'High', time: 'Yesterday', date: 'Yesterday', description: 'Sensor triggered by heavy vehicle.', type: 'False Alarm' }, // False alarm case
];

export const MONTHLY_TRENDS = [
  { month: 'Jan', intrusions: 45, falseAlarms: 12 },
  { month: 'Feb', intrusions: 52, falseAlarms: 15 },
  { month: 'Mar', intrusions: 38, falseAlarms: 8 },
  { month: 'Apr', intrusions: 65, falseAlarms: 10 },
  { month: 'May', intrusions: 85, falseAlarms: 18 },
  { month: 'Jun', intrusions: 70, falseAlarms: 14 },
];

export const HISTORY_RECORDS = [
  { id: 'H-001', date: '2026-05-01', time: '22:15', zone: 'Anuradhapura North', severity: 'Critical', duration: '45 mins', outcome: 'Deterred with lights', type: 'True Positive' },
  { id: 'H-002', date: '2026-05-01', time: '19:30', zone: 'Yala Buffer Zone', severity: 'High', duration: '20 mins', outcome: 'Turned back', type: 'True Positive' },
  { id: 'H-003', date: '2026-04-30', time: '03:45', zone: 'Polonnaruwa Border', severity: 'Critical', duration: '1.5 hours', outcome: 'Fence Damaged', type: 'True Positive' },
  { id: 'H-004', date: '2026-04-30', time: '14:20', zone: 'Minneriya Reserve', severity: 'Medium', duration: '10 mins', outcome: 'False Alarm (Tractor)', type: 'False Alarm' },
  { id: 'H-005', date: '2026-04-29', time: '23:00', zone: 'Udawalawe Edge', severity: 'Safe', duration: '-', outcome: 'Routine Log', type: 'System' },
  { id: 'H-006', date: '2026-04-28', time: '01:10', zone: 'Ampara Farmlands', severity: 'High', duration: '30 mins', outcome: 'Deterred by farmers', type: 'True Positive' },
  { id: 'H-007', date: '2026-04-27', time: '04:00', zone: 'Anuradhapura North', severity: 'Critical', duration: '2 hours', outcome: 'Crop Damage', type: 'True Positive' },
  { id: 'H-008', date: '2026-04-26', time: '11:30', zone: 'Wasgamuwa Sector', severity: 'Medium', duration: '15 mins', outcome: 'Sensor Offline (Battery)', type: 'Data Missing' },
];
