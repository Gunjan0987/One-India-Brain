import React, { useState } from 'react';
import { Sliders, RefreshCw, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/scenarios';
import { calculateCrossDomainImpact } from '../utils/aiEngine';

export default function WhatIfSimulator({ activeScenario, onSelectScenario }) {
  const [inputs, setInputs] = useState(activeScenario.inputs);

  const handleSliderChange = (field, val) => {
    const next = { ...inputs, [field]: Number(val) };
    setInputs(next);
  };

  const computedMetrics = calculateCrossDomainImpact(
    inputs.rainfall,
    inputs.powerGridLoad,
    inputs.trafficDensity,
    inputs.hospitalOccupancy
  );

  const { withoutAI, withAI } = computedMetrics;
  const delayDiff = withoutAI.ambulanceDelay - withAI.ambulanceDelay;

  return (
    <div className="eoc-card p-4 md:p-5 font-sans space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1f2d47]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Scenario simulator ("What Happens If?")
            </h3>
            <p className="text-xs text-slate-400">
              Predictive simulation comparing response outcomes with and without cross-domain AI intervention
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {PRESET_SCENARIOS.map(scen => (
            <button
              key={scen.id}
              onClick={() => {
                onSelectScenario(scen);
                setInputs(scen.inputs);
              }}
              className={`px-2.5 py-1 rounded font-medium transition-colors border ${
                activeScenario.id === scen.id
                  ? 'bg-blue-600 text-white border-blue-500 font-semibold'
                  : 'bg-[#0d1527] text-slate-300 border-[#1f2d47] hover:border-slate-600'
              }`}
            >
              {scen.title.split(' ')[0]} {scen.title.split(' ').slice(1, 3).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 rounded bg-[#0d1527] border border-[#1f2d47]">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Rainfall forecast:</span>
            <span className="font-mono text-blue-400 font-bold">{inputs.rainfall} mm/6h</span>
          </div>
          <input
            type="range"
            min="0"
            max="250"
            value={inputs.rainfall}
            onChange={(e) => handleSliderChange('rainfall', e.target.value)}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-[#1f2d47] rounded"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Power grid load:</span>
            <span className="font-mono text-yellow-400 font-bold">{inputs.powerGridLoad}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={inputs.powerGridLoad}
            onChange={(e) => handleSliderChange('powerGridLoad', e.target.value)}
            className="w-full accent-yellow-500 cursor-pointer h-1.5 bg-[#1f2d47] rounded"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Traffic density:</span>
            <span className="font-mono text-amber-400 font-bold">{inputs.trafficDensity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={inputs.trafficDensity}
            onChange={(e) => handleSliderChange('trafficDensity', e.target.value)}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-[#1f2d47] rounded"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Hospital ICU load:</span>
            <span className="font-mono text-red-400 font-bold">{inputs.hospitalOccupancy}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={inputs.hospitalOccupancy}
            onChange={(e) => handleSliderChange('hospitalOccupancy', e.target.value)}
            className="w-full accent-red-500 cursor-pointer h-1.5 bg-[#1f2d47] rounded"
          />
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WITHOUT AI INTERVENTION */}
        <div className="p-4 rounded bg-[#1e1518] border border-red-900/50 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-red-900/40">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase">
              <XCircle className="w-4 h-4" />
              <span>Without AI intervention</span>
            </div>
            <span className="text-[10px] font-mono text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
              Siloed departments
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-400">Estimated ambulance delay:</span>
              <span className="text-lg font-bold font-mono text-red-400">{withoutAI.ambulanceDelay} min</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-400">Traffic gridlock index:</span>
              <span className="font-mono font-semibold text-amber-400">{withoutAI.trafficGridlock}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-400">Substation risk status:</span>
              <span className="font-mono text-red-300 font-semibold">{activeScenario.withoutAI.substationStatus}</span>
            </div>
          </div>
        </div>

        {/* WITH ONE INDIA BRAIN AI */}
        <div className="p-4 rounded bg-[#13221b] border border-emerald-900/60 space-y-3 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-900/40">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>With One India Brain AI</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              Coordinated action
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-400">Estimated ambulance delay:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold font-mono text-emerald-400">{withAI.ambulanceDelay} min</span>
                <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800 font-semibold">
                  -{delayDiff} min delay saved
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-400">Traffic congestion mitigated:</span>
              <span className="font-mono font-semibold text-blue-400">{withAI.trafficGridlock}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-400">Substation risk status:</span>
              <span className="font-mono text-emerald-300 font-semibold">{activeScenario.withAI.substationStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
