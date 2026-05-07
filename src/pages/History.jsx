import { useState } from 'react';
import { HISTORY_RECORDS } from '../data/mockData';
import { Search, Filter, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');

  const filteredRecords = HISTORY_RECORDS.filter(record => {
    const matchesSearch = record.zone.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.outcome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'All' || record.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Safe': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Alert History</h1>
          <p className="text-theme-secondary text-sm">Review past incidents, system logs, and outcomes.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-theme-surface rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search zones or outcomes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Safe">Safe</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Zone</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{record.date}</div>
                      <div className="text-gray-500 text-xs">{record.time}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">{record.zone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getSeverityStyles(record.severity)}`}>
                        {record.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{record.type}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{record.duration}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{record.outcome}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Mock */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50 dark:bg-gray-800/20">
          <div>
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRecords.length}</span> of <span className="font-medium">{HISTORY_RECORDS.length}</span> results
          </div>
          <div className="flex gap-1">
            <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium px-3 text-theme-primary border-theme-primary">
              1
            </button>
            <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-3">
              2
            </button>
            <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}