import React, { useState } from 'react';
import { 
  GitCommit, ArrowRight, AlertTriangle, ShieldCheck, 
  CloudRain, Waves, Navigation, HeartPulse, Zap, Truck, Sun, Wind
} from 'lucide-react';
import { generateCascadeDAG } from '../utils/aiEngine';

const domainIconMap = {
  Disaster: CloudRain,
  Water: Waves,
  Transport: Navigation,
  Health: HeartPulse,
  Electricity: Zap,
  Municipal: Truck,
  Sun: Sun,
  Wind: Wind
};

const domainColorMap = {
  Disaster: 'border-orange-500/50 bg-orange-950/40 text-orange-400',
  Water: 'border-blue-500/50 bg-blue-950/40 text-blue-400',
  Transport: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-400',
  Health: 'border-rose-500/50 bg-rose-950/40 text-rose-400',
  Electricity: 'border-yellow-500/50 bg-yellow-950/40 text-yellow-400',
  Municipal: 'border-purple-500/50 bg-purple-950/40 text-purple-400',
};

export default function CascadeImpactGraph({ activeScenario }) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const dagNodes = generateCascadeDAG(activeScenario);

  return (
    <div className="w-full glass-panel p-5 rounded-2xl border border-cyan-900/40 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-cyan-400 animate-spin" />
            <h3 className="text-base font-bold text-white font-heading">
              Cross-Domain Cascading Domino Intelligence (DAG Flow)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            How a single incident ripples across 7 government departments in real time
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Scenario: <strong className="text-cyan-400">{activeScenario.title}</strong>
          </span>
        </div>
      </div>

      {/* Domino Flow Horizontal / Grid Visualizer */}
      <div className="relative overflow-x-auto pb-4 pt-2">
        <div className="flex items-center gap-3 min-w-[850px] px-2">
          {dagNodes.map((node, idx) => {
            const IconComponent = domainIconMap[node.domain] || CloudRain;
            const styleClasses = domainColorMap[node.domain] || 'border-slate-700 bg-slate-900 text-slate-300';
            const isSelected = selectedNodeId === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                  className={`flex-1 p-3.5 rounded-xl border ${styleClasses} transition-all cursor-pointer hover:scale-105 hover:shadow-lg relative group ${
                    isSelected ? 'ring-2 ring-cyan-400 shadow-cyan-500/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 font-bold border border-slate-700">
                      STEP {node.step}
                    </span>
                    <IconComponent className="w-4 h-4 animate-pulse" />
                  </div>

                  <p className="text-xs font-bold text-white line-clamp-2 mb-1">
                    {node.domain} Domain
                  </p>

                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-3">
                    {node.text}
                  </p>

                  <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1.5 border-t border-slate-800">
                    <span>{node.impactLevel}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  </div>
                </div>

                {/* Connector Arrow */}
                {idx < dagNodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center shrink-0 text-cyan-400 px-1">
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                    <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">Triggers</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Dive */}
      {selectedNodeId && (
        <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>
              <strong>Deep Propagation Insight:</strong> Node <strong>{selectedNodeId}</strong> is linked to 3 downstream department directives. AI engine automatically recalculates priority queue.
            </span>
          </div>
          <button 
            onClick={() => setSelectedNodeId(null)}
            className="text-[10px] text-cyan-400 hover:underline font-mono"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
