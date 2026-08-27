import React, { useState } from 'react';
import SharedMap from '../components/shared/SharedMap';
import { getJurisdictionData } from '../data/centralStore';
import { MapPin } from 'lucide-react';

export default function ElectricityPage({ selectedJurisdiction }) {
  const [focusTarget, setFocusTarget] = useState(null);
  const jData = getJurisdictionData(selectedJurisdiction.id);
  const incident = jData.incident;

  const kpis = [
    { label: 'SUBSTATIONS AT RISK', val: incident.substationsAtRiskCount, color: 'text-amber-600 font-mono' },
    { label: 'POWER INFRASTRUCTURE RISK', val: `${incident.powerInfrastructureRiskPct}%`, color: 'text-red-600 font-mono' },
    { label: 'PROTECTED ICU FEEDERS', val: '17 lines', color: 'text-emerald-600 font-mono' },
    { label: 'GRID DEMAND LOAD', val: '82%', color: 'text-blue-600 font-mono' }
  ];

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* 4 Electricity KPIs */}
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

      {/* Electricity Substation Map */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Electricity Grid GIS Map — {selectedJurisdiction.name}
          </span>
          <span className="text-slate-500 text-[11px] font-mono">Layers: Grid Substations & ICU Feeder Lines</span>
        </div>
        <SharedMap selectedJurisdiction={selectedJurisdiction} focusTarget={focusTarget} height="380px" activeLayersFilter={['substations', 'hospitals']} />
      </div>

      {/* Grid Substations Risk Table (Section 22) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            GRID SUBSTATIONS & CRITICAL HOSPITAL POWER FEEDERS
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Electrical Asset Inventory</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans text-slate-800">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-3">Substation Facility</th>
                <th className="py-2.5 px-3">Flood Exposure</th>
                <th className="py-2.5 px-3">Failure Prob.</th>
                <th className="py-2.5 px-3">Nearby Critical ICU Feeders</th>
                <th className="py-2.5 px-3">Protection Action</th>
                <th className="py-2.5 px-3 text-right">Map View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {jData.substations.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{s.name}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      {s.exposure}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-red-600">{s.failureProbPct}%</td>
                  <td className="py-2.5 px-3 text-slate-700">{s.facilities}</td>
                  <td className="py-2.5 px-3 text-blue-700 font-medium">{s.action}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setFocusTarget({ lat: s.coords[0], lng: s.coords[1] })}
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
