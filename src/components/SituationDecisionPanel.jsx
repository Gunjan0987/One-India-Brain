import React from 'react';
import { ShieldAlert, Cpu, CheckCircle2, MapPin, ArrowUpRight } from 'lucide-react';
import { EXPLAINABLE_RECOMMENDATIONS } from '../data/departmentActions';

export default function SituationDecisionPanel({ incidentData, selectedJurisdiction, onFocusTarget }) {
  return (
    <div className="w-full space-y-4 font-sans">
      {/* SECTION 1: SITUATION BRIEFING */}
      <div className="eoc-card p-4">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#1f2d47]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Situation briefing
          </h3>
          <span className="eoc-badge-warning text-[10px] font-mono font-bold px-2 py-0.5 rounded">
            Risk: {selectedJurisdiction.overallRisk || incidentData.jurisdiction.overallRisk}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400">Region:</span>
            <span className="font-semibold text-white">{selectedJurisdiction.name}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400">Primary threat:</span>
            <span className="text-slate-200">{selectedJurisdiction.weatherCondition || 'Heavy rainfall'}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400">Forecast:</span>
            <span className="font-mono text-amber-300 font-semibold">{incidentData.rainfall} mm / {incidentData.rainfallPeriod}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400">Population affected:</span>
            <span className="font-mono text-emerald-400 font-semibold">{incidentData.populationAffected}</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: AI FINDING (WITH CONFIDENCE SCORES) */}
      <div className="eoc-card p-4 bg-[#141e33] border-blue-600/30">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1f2d47]">
          <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
            <Cpu className="w-4 h-4" />
            <span>AI finding</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-200 leading-relaxed">
          <p>
            Heavy rainfall is increasing waterlogging probability to <strong className="text-white">{incidentData.waterloggingProbability}%</strong>.{' '}
            <span className="text-[11px] font-mono text-blue-300 bg-blue-950 px-1.5 py-0.2 rounded border border-blue-800">
              Confidence: {incidentData.waterloggingConfidence}%
            </span>
          </p>
          <p>
            Three major roads are likely to experience severe congestion.
          </p>
          <p>
            Three hospitals may become difficult to access.{' '}
            <span className="text-[11px] font-mono text-blue-300 bg-blue-950 px-1.5 py-0.2 rounded border border-blue-800">
              Confidence: {incidentData.hospitalRiskConfidence}%
            </span>
          </p>
        </div>
      </div>

      {/* SECTION 3: RECOMMENDED ACTIONS (EXPLAINABLE SOPs) */}
      <div className="eoc-card p-4">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#1f2d47]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Recommended actions
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {EXPLAINABLE_RECOMMENDATIONS.length} directives
          </span>
        </div>

        <div className="space-y-3">
          {EXPLAINABLE_RECOMMENDATIONS.map((rec, idx) => (
            <div
              key={rec.id}
              className="p-3 rounded bg-[#0d1527] border border-[#1f2d47] hover:border-slate-600 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400 font-bold">{idx + 1}.</span>
                  <h4 className="text-xs font-bold text-white leading-snug">{rec.title}</h4>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                  rec.priority === 'CRITICAL' ? 'eoc-badge-critical' :
                  rec.priority === 'HIGH' ? 'eoc-badge-warning' : 'eoc-badge-normal'
                }`}>
                  {rec.priority}
                </span>
              </div>

              {/* Department & Status */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span>Dept: <strong className="text-slate-200">{rec.department}</strong></span>
                <span>Status: <strong className="text-blue-400">{rec.status}</strong></span>
              </div>

              {/* WHY THIS MATTERS (Explainable Rationale) */}
              <div className="mb-1.5 text-[11px] bg-[#141e33] p-2 rounded border border-slate-800 text-slate-300">
                <strong className="text-blue-300 block text-[10px] uppercase font-mono mb-0.5">Why:</strong>
                {rec.whyThisMatters}
              </div>

              {/* IMPACT */}
              <div className="mb-2 text-[11px] bg-[#162920] p-2 rounded border border-emerald-900/60 text-emerald-200">
                <strong className="text-emerald-400 block text-[10px] uppercase font-mono mb-0.5">Impact:</strong>
                {rec.operationalImpact}
              </div>

              {/* VIEW ON MAP BUTTON */}
              <button
                onClick={() => onFocusTarget({ lat: rec.targetCoords[0], lng: rec.targetCoords[1], name: rec.targetName })}
                className="w-full flex items-center justify-center gap-1.5 bg-[#17223b] hover:bg-blue-600 text-blue-300 hover:text-white p-1.5 rounded text-[11px] font-medium transition-colors border border-blue-500/30"
              >
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>View on map ({rec.targetName.split(' ')[0]})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
