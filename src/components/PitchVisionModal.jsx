import React from 'react';
import { X, Shield, Cpu, Layers } from 'lucide-react';

export default function PitchVisionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto eoc-card p-6 md:p-8 border border-blue-600/40 shadow-2xl text-slate-100 font-sans">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1f2d47]">
          <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              System Architecture & Core Innovation
            </span>
            <h2 className="text-xl font-bold text-white font-heading">
              One India Brain — AI Coordination Layer for Cross-Domain Governance
            </h2>
          </div>
        </div>

        {/* Main Purpose Pitch */}
        <div className="p-4 rounded bg-[#0d1527] border border-blue-500/30 mb-5 text-xs text-slate-300 leading-relaxed">
          <p className="font-bold text-white mb-1 text-sm font-heading">
            Core Selling Point:
          </p>
          <p>
            Traditional government departments operate in isolated silos. When disaster strikes, Disaster sees rainfall, Transport sees traffic, Hospitals see ambulance delays, and Water sees drainage overflow. <strong>One India Brain connects disconnected public services and predicts cross-domain cascading impacts to recommend coordinated actions.</strong>
          </p>
        </div>

        {/* Operational Flow Paradigm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-xs">
          <div className="p-3.5 rounded bg-[#1c1417] border border-red-900/50">
            <h4 className="font-bold text-red-400 uppercase font-mono mb-1">
              Traditional Governance Model
            </h4>
            <p className="text-slate-300">
              Department Data → Isolated Dashboard → Slow Manual Reaction
            </p>
          </div>

          <div className="p-3.5 rounded bg-[#13221b] border border-emerald-900/60">
            <h4 className="font-bold text-emerald-400 uppercase font-mono mb-1">
              One India Brain Architecture
            </h4>
            <p className="text-slate-300">
              Unified Data Stream → Cross-Domain Cascade Engine → Synchronized SOP Execution
            </p>
          </div>
        </div>

        {/* 4 Modules */}
        <div className="mb-5 space-y-2 text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs">
            4 Core Intelligence Modules:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <div className="p-2.5 rounded bg-[#0d1527] border border-[#1f2d47]">
              <strong className="text-blue-400 block mb-0.5">1. Pattern Detection</strong>
              Identifies relationships across seemingly unrelated department events.
            </div>
            <div className="p-2.5 rounded bg-[#0d1527] border border-[#1f2d47]">
              <strong className="text-amber-400 block mb-0.5">2. Prediction Engine</strong>
              Forecasts upcoming failure probabilities with confidence scores.
            </div>
            <div className="p-2.5 rounded bg-[#0d1527] border border-[#1f2d47]">
              <strong className="text-red-400 block mb-0.5">3. Impact Analysis (DAG)</strong>
              Traces domino escalation across transport, health, grid, and water.
            </div>
            <div className="p-2.5 rounded bg-[#0d1527] border border-[#1f2d47]">
              <strong className="text-emerald-400 block mb-0.5">4. Recommendation Engine</strong>
              Generates explainable SOP directives with actionable rationale.
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#1f2d47]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase transition-colors shadow-sm"
          >
            Close briefing
          </button>
        </div>
      </div>
    </div>
  );
}
