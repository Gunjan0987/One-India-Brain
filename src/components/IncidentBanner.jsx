import React from 'react';
import { AlertTriangle, Clock, Info } from 'lucide-react';

export default function IncidentBanner({ incidentData, selectedJurisdiction }) {
  return (
    <div className="bg-[#1e1b2e] border-b border-amber-500/30 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Active Incident Details */}
        <div className="flex items-center gap-2 text-slate-200">
          <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/40 uppercase tracking-wider text-[10px] flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            ACTIVE INCIDENT
          </span>
          <span className="font-semibold text-white">
            {incidentData.title} — {selectedJurisdiction.name}
          </span>
          <span className="text-slate-400 font-mono">
            ({incidentData.rainfall} mm expected / {incidentData.rainfallPeriod})
          </span>
          <span className="text-amber-400 font-bold font-mono">
            Risk level: {selectedJurisdiction.overallRisk || incidentData.jurisdiction.overallRisk}
          </span>
        </div>

        {/* Status Meta */}
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3 h-3 text-slate-400" />
            {incidentData.updatedAgo}
          </span>

          <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded text-amber-300/80 border border-slate-800 text-[10px]">
            <Info className="w-3 h-3 text-amber-400" />
            {incidentData.demoScenarioTag}
          </span>
        </div>
      </div>
    </div>
  );
}
