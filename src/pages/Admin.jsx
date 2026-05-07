import { Users, Map as MapIcon, Settings, Download, Shield } from 'lucide-react';

export default function Admin() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Admin Control Panel</h1>
        <p className="text-theme-secondary text-sm">Manage system configurations, users, and zones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management */}
        <div className="bg-theme-surface rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="font-bold text-lg">User Management</h2>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-theme-secondary">Manage access levels for wildlife officers and farmers.</p>
            <div className="flex flex-col gap-2">
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">Add New User</button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">Review Access Logs</button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium flex justify-between">
                Manage Roles <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs">12 Active Roles</span>
              </button>
            </div>
          </div>
        </div>

        {/* Zone Management */}
        <div className="bg-theme-surface rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <MapIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-bold text-lg">Zone Configuration</h2>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-theme-secondary">Define tracking regions, danger thresholds, and sensor pairings.</p>
            <div className="flex flex-col gap-2">
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">Create New Zone</button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">Adjust Sensitivity Thresholds</button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">Sensor Network Status</button>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-theme-surface rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="font-bold text-lg">System Settings</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-sm">Automated SMS Alerts</p>
                <p className="text-xs text-theme-secondary">Send immediate texts to farmers on critical alert.</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle1" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" style={{borderColor: '#2E7D32', right: 0}}/>
                <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-5 rounded-full bg-theme-primary cursor-pointer"></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-sm">AI Prediction Engine</p>
                <p className="text-xs text-theme-secondary">Enable machine learning for movement forecasting.</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle2" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" style={{borderColor: '#2E7D32', right: 0}}/>
                <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-5 rounded-full bg-theme-primary cursor-pointer"></label>
              </div>
            </div>
            <button className="w-full mt-2 text-sm text-theme-primary font-medium hover:underline text-left px-2">Advanced Configurations...</button>
          </div>
        </div>

        {/* Data & Reports */}
        <div className="bg-theme-surface rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Download className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="font-bold text-lg">Export & Reports</h2>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-theme-secondary">Generate compliance reports and data dumps for research.</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <Download className="w-6 h-6 text-gray-400 group-hover:text-theme-primary transition-colors" />
                <span className="text-sm font-medium text-center">Monthly PDF Report</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <Shield className="w-6 h-6 text-gray-400 group-hover:text-theme-primary transition-colors" />
                <span className="text-sm font-medium text-center">Raw Sensor Data (CSV)</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}