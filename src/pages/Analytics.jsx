import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { MONTHLY_TRENDS, ZONES } from '../data/mockData';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function Analytics() {
  const COLORS = ['#2E7D32', '#66BB6A', '#E53935', '#FB8C00', '#FDD835', '#4CAF50', '#9E9E9E'];

  // Calculate data for gauge
  const avgRisk = Math.round(ZONES.reduce((acc, zone) => acc + zone.riskPercentage, 0) / ZONES.length);
  const gaugeData = [
    { name: 'Risk', value: avgRisk },
    { name: 'Safe', value: 100 - avgRisk }
  ];

  const sortedZones = [...ZONES].sort((a, b) => b.riskPercentage - a.riskPercentage).slice(0, 5);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold">Prediction & Analytics</h1>
        <p className="text-theme-secondary text-sm">AI-driven insights on elephant movement patterns.</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-theme-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 relative flex items-center justify-center">
            <PieChart width={64} height={64}>
              <Pie
                data={gaugeData}
                cx={28}
                cy={28}
                innerRadius={20}
                outerRadius={28}
                startAngle={180}
                endAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#E53935" />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold mt-2">
              {avgRisk}%
            </span>
          </div>
          <div>
            <p className="text-theme-secondary text-sm font-medium">Overall System Risk</p>
            <p className="text-2xl font-bold text-red-600">High</p>
          </div>
        </div>

        <div className="bg-theme-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-theme-secondary text-sm font-medium mb-1">Monthly Intrusions</p>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold">305</p>
            <p className="flex items-center text-sm font-medium text-red-500 mb-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +12%
            </p>
          </div>
        </div>
        
        <div className="bg-theme-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-theme-secondary text-sm font-medium mb-1">False Alarms</p>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold">67</p>
            <p className="flex items-center text-sm font-medium text-green-500 mb-1">
              <TrendingUp className="w-4 h-4 mr-1 rotate-180" /> -5%
            </p>
          </div>
        </div>

        <div className="bg-theme-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-theme-secondary text-sm font-medium mb-1">Active Sensors</p>
          <p className="text-3xl font-bold text-theme-primary">94%</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
            <div className="bg-theme-primary h-1.5 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Trend */}
        <div className="bg-theme-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold mb-6">Monthly Intrusion Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_TRENDS}>
                <defs>
                  <linearGradient id="colorIntrusions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="intrusions" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorIntrusions)" name="Intrusions" />
                <Area type="monotone" dataKey="falseAlarms" stroke="#9E9E9E" strokeWidth={2} fill="transparent" strokeDasharray="5 5" name="False Alarms" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Intrusion Frequency */}
        <div className="bg-theme-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold mb-6">Intrusion Frequency by Zone</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ZONES} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="riskPercentage" radius={[0, 4, 4, 0]} name="Risk %">
                  {ZONES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.riskPercentage > 75 ? '#E53935' : entry.riskPercentage > 40 ? '#FB8C00' : '#4CAF50'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Dangerous Areas Table */}
      <div className="bg-theme-surface rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-theme-alert" /> Top High-Risk Zones
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Zone Name</th>
                <th className="px-6 py-4 font-medium">Risk Level</th>
                <th className="px-6 py-4 font-medium">Predicted Activity</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {sortedZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{zone.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${zone.riskPercentage > 75 ? 'bg-red-500' : zone.riskPercentage > 40 ? 'bg-orange-500' : 'bg-green-500'}`} 
                          style={{ width: `${zone.riskPercentage}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{zone.riskPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {zone.riskPercentage > 75 ? 'High probability tonight' : 'Moderate chance'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      zone.status === 'Critical' ? 'bg-red-100 text-red-700' :
                      zone.status === 'High' ? 'bg-orange-100 text-orange-700' :
                      zone.status === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {zone.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}