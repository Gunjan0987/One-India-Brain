import React, { useState } from 'react';
import SharedMap from '../components/shared/SharedMap';
import { getJurisdictionData } from '../data/centralStore';
import { MapPin } from 'lucide-react';

export default function HealthcarePage({ selectedJurisdiction }) {
  const [focusTarget, setFocusTarget] = useState(null);
  const jData = getJurisdictionData(selectedJurisdiction.id);
  const incident = jData.incident;

  const kpis = [
    { label: 'HOSPITALS AT ACCESS RISK', val: incident.hospitalsAtRiskCount, color: 'text-rose-600' },
    { label: 'PREDICTION CONFIDENCE', val: `${incident.hospitalRiskConfidence}%`, color: 'text-emerald-600 font-mono' },
    { label: 'ESTIMATED AMBULANCE DELAY', val: `+${incident.estimatedAmbulanceDelayMin} min`, color: 'text-amber-600 font-mono' },
    { label: 'AMBULANCES REROUTED', val: incident.ambulancesReroutedCount, color: 'text-blue-600' }
  ];

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* 4 Healthcare KPIs */}
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

      {/* GIS Map View */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Healthcare Operations GIS Map — {selectedJurisdiction.name}
          </span>
          <span className="text-slate-500 text-[11px] font-mono">Layers: Hospitals & Access Routes</span>
        </div>
        <SharedMap selectedJurisdiction={selectedJurisdiction} focusTarget={focusTarget} height="380px" activeLayersFilter={['hospitals', 'roads']} />
      </div>

      {/* Hospital Access Risk Table (Section 19) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            HOSPITAL ACCESSIBILITY & EMERGENCY STATUS
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Facility Monitoring Inventory</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans text-slate-800">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-3">Hospital Facility</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Access Status</th>
                <th className="py-2.5 px-3">ICU / Total Beds</th>
                <th className="py-2.5 px-3">Recommended Action</th>
                <th className="py-2.5 px-3 text-right">Map View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {jData.hospitals.map(h => (
                <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{h.name}</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${h.risk === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                      {h.risk}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{h.accessStatus}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-800">{h.icuBeds} ICU / {h.totalBeds} Total</td>
                  <td className="py-2.5 px-3 text-blue-700 font-medium">{h.action}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setFocusTarget({ lat: h.coords[0], lng: h.coords[1] })}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-[#CBD5E1] px-2 py-1 rounded transition-colors font-semibold cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-blue-600" />
                      Focus
                    </button>
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
