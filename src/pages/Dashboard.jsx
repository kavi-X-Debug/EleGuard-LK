import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info, Clock, Activity, Signal, Battery, BatteryMedium, BatteryWarning } from 'lucide-react';
import { RECENT_ALERTS, SENSORS, ZONES } from '../data/mockData';

export default function Dashboard() {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate real-time alerts streaming in
    setActiveAlerts(RECENT_ALERTS.slice(0, 3));
    
    const timer = setTimeout(() => {
      setActiveAlerts(RECENT_ALERTS.slice(0, 5));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'Safe': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'Critical': return <AlertTriangle className="w-5 h-5" />;
      case 'High': return <AlertTriangle className="w-5 h-5" />;
      case 'Medium': return <Info className="w-5 h-5" />;
      case 'Safe': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getBatteryIcon = (batteryStr) => {
    const level = parseInt(batteryStr.replace('%', ''));
    if (level > 70) return <Battery className="w-4 h-4 text-green-500" />;
    if (level > 20) return <BatteryMedium className="w-4 h-4 text-yellow-500" />;
    return <BatteryWarning className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Live Alert Dashboard</h1>
          <p className="text-theme-secondary text-sm">Monitor real-time sensor activity and elephant intrusions.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium border border-green-200 dark:border-green-800/50">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          System Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Active Alerts Area */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-theme-primary" /> Active Incidents
          </h2>
          
          <div className="space-y-4">
            <AnimatePresence>
              {activeAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-5 rounded-2xl border bg-theme-surface shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  {/* Blinking indicator for Critical */}
                  {alert.severity === 'Critical' && (
                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                       <div className="absolute top-0 right-0 w-full h-full bg-red-500/10 dark:bg-red-500/20 rounded-bl-full animate-pulse"></div>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${getSeverityStyles(alert.severity)}`}>
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{alert.zone}</h3>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getSeverityStyles(alert.severity)}`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-theme-secondary text-sm mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {alert.time}</span>
                          <span className="flex items-center gap-1 text-theme-primary">ID: {alert.id}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-sm font-medium text-theme-primary hover:underline whitespace-nowrap">
                      View Map
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {mounted && activeAlerts.length === 0 && (
              <div className="p-8 text-center bg-theme-surface rounded-2xl border border-gray-100 dark:border-gray-800">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3 opacity-50" />
                <p className="font-medium text-gray-500">No active alerts at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar content */}
        <div className="space-y-6">
          {/* Sensor Health */}
          <div className="bg-theme-surface rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Signal className="w-5 h-5 text-gray-500" /> Sensor Status
            </h2>
            <div className="space-y-3">
              {SENSORS.map(sensor => (
                <div key={sensor.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-semibold">{sensor.id}</p>
                    <p className="text-xs text-theme-secondary">{ZONES.find(z => z.id === sensor.zoneId)?.name || 'Unknown'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      {getBatteryIcon(sensor.battery)} {sensor.battery}
                    </div>
                    {sensor.status === 'Online' ? (
                      <span className="flex w-2 h-2 rounded-full bg-green-500"></span>
                    ) : sensor.status === 'Offline' ? (
                      <span className="flex w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    ) : (
                      <span className="flex w-2 h-2 rounded-full bg-yellow-500"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-xs font-semibold text-theme-primary hover:underline text-center">
              View All Sensors
            </button>
          </div>

          {/* Zone Overview */}
          <div className="bg-theme-surface rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-500">Zone Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 text-center">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">2</p>
                <p className="text-xs font-medium text-red-600/70 dark:text-red-400/70 uppercase">Critical Zones</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30 text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">5</p>
                <p className="text-xs font-medium text-green-600/70 dark:text-green-400/70 uppercase">Safe Zones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}