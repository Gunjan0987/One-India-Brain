import React from 'react';
import { ArrowRight, GitCommit } from 'lucide-react';

export default function CascadeAnalysis({ incidentData }) {
  const steps = [
    { label: 'Heavy rainfall', sub: `${incidentData.rainfall} mm forecast`, domain: 'Disaster' },
    { label: 'Waterlogging risk 88%', sub: 'Milan & Hindmata nodes', domain: 'Water' },
    { label: '3 major roads affected', sub: 'Western Express Highway cut', domain: 'Transport' },
    { label: '3 hospitals harder to access', sub: 'KEM & Sion approach restricted', domain: 'Healthcare' },
    { label: 'Ambulance response time increases', sub: '+17 min delay without AI', domain: 'Transport' },
    { label: 'AI recommends route changes', sub: 'Reroute via Eastern Corridor', domain: 'Decision Support' }
  ];

  return (
    <div className="eoc-card p-4 font-sans">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1f2d47]">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Cascade analysis (Cross-domain impact chain)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          6 analytical steps
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {steps.map((st, idx) => (
          <div key={idx} className="relative group">
            <div className="p-3 rounded bg-[#0d1527] border border-[#1f2d47] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Step {idx + 1}</span>
                  <span className="text-blue-400 font-semibold">{st.domain}</span>
                </div>
                <p className="text-xs font-bold text-white leading-snug">{st.label}</p>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 pt-1.5 border-t border-[#1a263d]">
                {st.sub}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-500">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
