import React from 'react';
import { AlertTriangle, Clock, Info } from 'lucide-react';

export default function IncidentBanner({ incidentData, selectedJurisdiction }) {
  return (
    <div className="bg-[#1c1829] border border-amber-500/30 rounded p-3 text-xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-slate-200">
          <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/40 uppercase tracking-wider text-[10px] flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            ACTIVE INCIDENT
          </span>
          <span className="font-bold text-white">
            {incidentData.title}
          </span>
          <span className="text-slate-400 font-mono">
            — {selectedJurisdiction.name} ({incidentData.rainfall} mm / {incidentData.rainfallPeriod})
          </span>
          <span className="text-amber-400 font-bold font-mono">
            Risk: {incidentData.riskLevel}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3 h-3 text-slate-400" />
            {incidentData.updatedAgo}
          </span>
          <span className="bg-[#0f172a] px-2 py-0.5 rounded text-amber-300/90 border border-slate-700 text-[10px]">
            DEMO SCENARIO — Simulated emergency conditions
          </span>
        </div>
      </div>
    </div>
  );
}
