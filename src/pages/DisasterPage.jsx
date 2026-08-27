import React, { useState } from 'react';
import SharedMap from '../components/shared/SharedMap';
import { getJurisdictionData, INITIAL_DATA } from '../data/centralStore';
import { MapPin } from 'lucide-react';

export default function DisasterPage({ selectedJurisdiction }) {
  const [focusTarget, setFocusTarget] = useState(null);
  const jData = getJurisdictionData(selectedJurisdiction.id);
  const incident = jData.incident;

  const kpis = [
    { label: 'RAINFALL FORECAST', val: `${incident.rainfall} mm / ${incident.rainfallPeriod}`, color: 'text-blue-600 font-mono' },
    { label: 'ACTIVE INCIDENTS', val: incident.activeIncidentsCount, color: 'text-amber-600' },
    { label: 'HIGH-RISK ZONES', val: incident.highRiskZonesCount, color: 'text-red-600' },
    { label: 'TEAMS DEPLOYED', val: incident.emergencyTeamsDeployedCount, color: 'text-emerald-600' }
  ];

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* 4 Disaster KPIs */}
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

      {/* GIS Emergency Operations Map */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Disaster Management GIS Operations Map — {selectedJurisdiction.name}
          </span>
          <span className="text-slate-500 text-[11px] font-mono">Layers: Hazard Zones & Response Squads</span>
        </div>
        <SharedMap selectedJurisdiction={selectedJurisdiction} focusTarget={focusTarget} height="380px" activeLayersFilter={['waterlogging', 'rescue', 'roads']} />
      </div>

      {/* Active Incidents Table (Section 20) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            ACTIVE EMERGENCY INCIDENTS
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Incident Dispatch Record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans text-slate-800">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-3">Incident Title</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Location Zone</th>
                <th className="py-2.5 px-3">Affected Exposure</th>
                <th className="py-2.5 px-3">Recommended Action</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {INITIAL_DATA.alerts.map(alt => (
                <tr key={alt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{alt.title}</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${alt.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                      {alt.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{alt.location}</td>
                  <td className="py-2.5 px-3 text-slate-800 font-mono text-[11px]">{alt.affectedPeople}</td>
                  <td className="py-2.5 px-3 text-blue-700 font-medium">{alt.recommended}</td>
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
