import React, { useState } from 'react';
import { INITIAL_DATA } from '../data/centralStore';
import { Bell, Filter } from 'lucide-react';

export default function AlertsPage({ selectedJurisdiction }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const alerts = INITIAL_DATA.alerts;

  const filteredAlerts = alerts.filter(alt => {
    if (filterSeverity === 'ALL') return true;
    return alt.severity === filterSeverity;
  });

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* Header Controls */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Bell className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
              Operational Emergency Alert Queue
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Active directives and multi-service emergency notifications for <strong className="text-slate-900">{selectedJurisdiction.name}</strong>
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-600">Severity:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-50 text-slate-900 border border-[#CBD5E1] px-2 py-1 rounded text-xs focus:outline-none cursor-pointer font-semibold"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="MEDIUM">Medium Only</option>
          </select>
        </div>
      </div>

      {/* Operational Alerts Table (Section 18) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            ACTIVE ALERTS & DISPATCH QUEUE
          </h3>
          <span className="text-[10px] text-slate-500 font-mono font-semibold">{filteredAlerts.length} Alerts Listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans text-slate-800">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Alert Title</th>
                <th className="py-2.5 px-3">Jurisdiction / Location</th>
                <th className="py-2.5 px-3">Affected Domains</th>
                <th className="py-2.5 px-3">Cause / Reason</th>
                <th className="py-2.5 px-3">Recommended Action</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredAlerts.map(alt => (
                <tr key={alt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${alt.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' : alt.severity === 'HIGH' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                      {alt.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{alt.title}</td>
                  <td className="py-2.5 px-3 text-slate-700">{alt.location}</td>
                  <td className="py-2.5 px-3 text-blue-700 font-mono text-[11px] font-semibold">{alt.affectedDomains}</td>
                  <td className="py-2.5 px-3 text-slate-700">{alt.cause}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-medium">{alt.recommended}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-700">{alt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
