import React from 'react';
import { getJurisdictionData } from '../data/centralStore';

export default function MunicipalPage({ selectedJurisdiction }) {
  const jData = getJurisdictionData(selectedJurisdiction.id);

  const kpis = [
    { label: 'OPEN MUNICIPAL TICKETS', val: '24', color: 'text-amber-600 font-mono' },
    { label: 'CRITICAL INUNDATION ISSUES', val: '7', color: 'text-red-600 font-mono' },
    { label: 'FIELD CREWS DEPLOYED', val: '12', color: 'text-emerald-600 font-mono' },
    { label: 'RESOLVED TODAY', val: '31', color: 'text-blue-600 font-mono' }
  ];

  const tickets = [
    { id: 'mun-1', issue: 'Blocked storm drain inlet at underpass approach', location: 'Minto Basin Corridor', priority: 'CRITICAL', dept: 'Municipal Drainage Dept', status: 'In progress', squad: 'Squad #3' },
    { id: 'mun-2', issue: 'Submerged streetlight junction box exposure', location: 'Ring Road Dhaula Kuan', priority: 'HIGH', dept: 'Electrical Maintenance', status: 'Dispatched', squad: 'Squad #7' },
    { id: 'mun-3', issue: 'Tree limb blocking emergency lane access', location: 'ITO Arterial Junction', priority: 'HIGH', dept: 'Road Maintenance', status: 'Dispatched', squad: 'Squad #2' },
    { id: 'mun-4', issue: 'Silt accumulation in outflow culvert', location: 'Yamuna Barrage Outlet', priority: 'MEDIUM', dept: 'Sanitation', status: 'Scheduled', squad: 'Squad #5' }
  ];

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* 4 Municipal KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map((k, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-[#E2E8F0] p-3 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider">{k.label}</span>
            <span className={`text-2xl font-extrabold tracking-tight font-heading mt-1 ${k.color}`}>
              {k.val}
            </span>
          </div>
        ))}
      </div>

      {/* Municipal Emergency Tickets Table (Section 24) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            MUNICIPAL DRAINAGE & INFRASTRUCTURE TICKETS
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Field Crew Operational Queue — {selectedJurisdiction.name}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans text-slate-800">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-3">Ticket ID</th>
                <th className="py-2.5 px-3">Issue Description</th>
                <th className="py-2.5 px-3">Location Zone</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Assigned Squad</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {tickets.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">{t.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{t.issue}</td>
                  <td className="py-2.5 px-3 text-slate-700">{t.location}</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${t.priority === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{t.dept}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">{t.squad}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-700">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
