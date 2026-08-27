import React from 'react';
import { Shield, MapPin, Sparkles } from 'lucide-react';
import { JURISDICTIONS } from '../data/incidentData';

export default function Header({ selectedJurisdiction, onSelectJurisdiction, onOpenPitchModal }) {
  return (
    <header className="bg-[#0f172a] border-b border-[#1e293b] px-4 py-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Identity & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold text-white tracking-tight font-heading">
                ONE INDIA BRAIN
              </h1>
              <span className="bg-slate-800 text-slate-300 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-700">
                7 services connected
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cross-domain emergency intelligence & decision-support platform
            </p>
          </div>
        </div>

        {/* Status Indicator & Jurisdiction Controls */}
        <div className="flex items-center gap-3 flex-wrap text-xs">
          {/* System Operational Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>System operational</span>
          </div>

          {/* Jurisdiction Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Jurisdiction:</span>
            <select
              value={selectedJurisdiction.id}
              onChange={(e) => {
                const found = JURISDICTIONS.find(j => j.id === e.target.value);
                if (found) onSelectJurisdiction(found);
              }}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer border-none py-0 font-sans"
            >
              {JURISDICTIONS.map(j => (
                <option key={j.id} value={j.id} className="bg-[#0f172a] text-white">
                  {j.name} ({j.state})
                </option>
              ))}
            </select>
          </div>

          {/* Vision Deck Modal Button */}
          <button
            onClick={onOpenPitchModal}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded font-medium transition-colors text-xs shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Pitch</span>
          </button>
        </div>
      </div>
    </header>
  );
}
