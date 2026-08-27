import React from 'react';
import { Clock } from 'lucide-react';
import { INCIDENT_TIMELINE_LOGS } from '../data/timelineData';

export default function IncidentTimeline() {
  return (
    <div className="eoc-card p-4 font-sans">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1f2d47]">
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            Incident timeline
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Chronological sequence
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {INCIDENT_TIMELINE_LOGS.map((item, idx) => (
          <div key={idx} className="p-2.5 rounded bg-[#0d1527] border border-[#1f2d47] flex items-start gap-2.5 text-xs">
            <span className="font-mono text-blue-400 font-bold bg-[#141e33] px-2 py-0.5 rounded border border-blue-900 shrink-0">
              {item.time}
            </span>
            <div className="space-y-0.5">
              <p className="text-slate-200 leading-tight">{item.text}</p>
              <span className="text-[10px] font-mono text-slate-400 block">Domain: {item.domain}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
