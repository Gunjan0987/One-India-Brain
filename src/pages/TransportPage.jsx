import React, { useState } from 'react';
import SharedMap from '../components/shared/SharedMap';
import { getJurisdictionData } from '../data/centralStore';
import { MapPin } from 'lucide-react';

export default function TransportPage({ selectedJurisdiction }) {
  const [focusTarget, setFocusTarget] = useState(null);
  const jData = getJurisdictionData(selectedJurisdiction.id);
  const incident = jData.incident;

  const kpis = [
    { label: 'TRAFFIC CONGESTION', val: `${incident.trafficCongestionPct}%`, color: 'text-amber-600' },
    { label: 'ROADS AT RISK', val: incident.roadsAtRiskCount, color: 'text-red-600' },
    { label: 'BLOCKAGE PROBABILITY', val: `${incident.roadBlockageProbability}%`, color: 'text-amber-600' },
    { label: 'AMBULANCES REROUTED', val: incident.ambulancesReroutedCount, color: 'text-emerald-600' }
  ];

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* 4 Transport KPIs */}
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

      {/* Main Layout: GIS Map (Left) + Intelligence (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Left: GIS Map */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Transport GIS Operations Map — {selectedJurisdiction.name}
            </span>
            <span className="text-slate-500 text-[11px] font-mono">Layers: Affected Roads & Ambulances</span>
          </div>
          <SharedMap selectedJurisdiction={selectedJurisdiction} focusTarget={focusTarget} height="440px" activeLayersFilter={['roads', 'hospitals', 'rescue']} />
        </div>

        {/* Right: AI Routing & Dispatch Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-[#E2E8F0]">
              AI Emergency Routing Directive
            </h3>

            <div className="p-3 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900">Reroute Directive #TR-14</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">ACTIVE</span>
              </div>
              <p className="text-slate-700">
                Pre-routing <strong className="text-slate-900">{incident.ambulancesReroutedCount} emergency ambulances</strong> away from Minto Corridor towards Elevated Bypass.
              </p>
              <div className="pt-2 border-t border-emerald-200 text-[11px] text-slate-600 space-y-0.5 font-mono">
                <p>Primary Delay Reduction: <strong className="text-emerald-700">-17 min</strong></p>
                <p>Target Facility: <strong className="text-slate-900">City Central Trauma Center</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affected Roads Record Table (Section 18) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            AFFECTED ROAD CORRIDORS & BLOCKAGE RISK
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Operational Inventory</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans text-slate-800">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-3">Road Corridor</th>
                <th className="py-2.5 px-3">Inundation / Status</th>
                <th className="py-2.5 px-3">Blockage Prob.</th>
                <th className="py-2.5 px-3">Predicted Delay</th>
                <th className="py-2.5 px-3">Hospital Impact</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {jData.transportHotspots.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{r.road}</td>
                  <td className="py-2.5 px-3 text-slate-700">{r.status}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-700">{r.blockageProb}%</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-red-600">{r.delay}</td>
                  <td className="py-2.5 px-3 text-slate-700">{r.hospitalImpact}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setFocusTarget({ lat: r.coords[0], lng: r.coords[1] })}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-[#CBD5E1] px-2 py-1 rounded transition-colors font-semibold cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-blue-600" />
                      Focus map
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
