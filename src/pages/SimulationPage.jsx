import React, { useState } from 'react';
import { Sliders, Play, ArrowRight } from 'lucide-react';

export default function SimulationPage({ selectedJurisdiction }) {
  const [rainfallMm, setRainfallMm] = useState(135);
  const [durationHours, setDurationHours] = useState(6);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResults, setSimResults] = useState(null);

  // Logical dynamic output calculation based on rainfall slider (Section 19)
  const calculateSimulation = (mm) => {
    const factor = mm / 135;
    const waterlogging = Math.min(98, Math.max(30, Math.round(88 * Math.sqrt(factor))));
    const roadBlockage = Math.min(95, Math.max(25, Math.round(81 * Math.sqrt(factor))));
    const hospitalsAtRisk = Math.min(8, Math.max(1, Math.round(3 * factor)));
    const ambulanceDelay = Math.min(45, Math.max(5, Math.round(17 * factor)));
    const powerRisk = Math.min(60, Math.max(8, Math.round(23 * factor)));
    const teamsDeployed = Math.min(30, Math.max(4, Math.round(12 * factor)));
    const pumpsNeeded = Math.min(12, Math.max(2, Math.round(4 * factor)));

    return {
      waterlogging,
      roadBlockage,
      hospitalsAtRisk,
      ambulanceDelay,
      powerRisk,
      teamsDeployed,
      pumpsNeeded
    };
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimResults(calculateSimulation(rainfallMm));
      setIsSimulating(false);
    }, 600);
  };

  const activeResults = simResults || calculateSimulation(135);

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* Simulation Controls Input Panel */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
              Scenario Simulation Engine
            </h2>
          </div>
          <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-semibold">
            Demo Environment &bull; {selectedJurisdiction.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Event */}
          <div className="space-y-1">
            <label className="text-slate-500 font-semibold block uppercase text-[10px]">Disruption Event</label>
            <input
              type="text"
              readOnly
              value="Heavy Rainfall & Urban Waterlogging"
              className="w-full bg-slate-50 text-slate-900 border border-[#CBD5E1] px-3 py-2 rounded font-semibold focus:outline-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-slate-500 font-semibold block uppercase text-[10px]">Target Location</label>
            <input
              type="text"
              readOnly
              value={`${selectedJurisdiction.name} (${selectedJurisdiction.state})`}
              className="w-full bg-slate-50 text-slate-900 border border-[#CBD5E1] px-3 py-2 rounded font-semibold focus:outline-none"
            />
          </div>

          {/* Rainfall Intensity Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <label className="text-slate-500 font-semibold uppercase">Rainfall Intensity</label>
              <span className="font-mono text-blue-700 font-bold">{rainfallMm} mm</span>
            </div>
            <input
              type="range"
              min="50"
              max="250"
              step="5"
              value={rainfallMm}
              onChange={(e) => setRainfallMm(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded border border-[#CBD5E1]"
            />
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="text-slate-500 font-semibold block uppercase text-[10px]">Event Duration</label>
            <select
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="w-full bg-slate-50 text-slate-900 border border-[#CBD5E1] px-3 py-2 rounded font-semibold focus:outline-none cursor-pointer"
            >
              <option value={3}>3 hours</option>
              <option value={6}>6 hours</option>
              <option value={12}>12 hours</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-xs font-bold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isSimulating ? 'SIMULATING CASCADE...' : 'RUN SIMULATION'}</span>
          </button>
        </div>
      </div>

      {/* Simulated Outcomes Metric Grid */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-[#E2E8F0]">
          PREDICTED MULTI-DOMAIN IMPACT (SIMULATION RESULTS)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-md bg-blue-50/80 border border-blue-200 space-y-1">
            <span className="text-[10px] text-slate-600 font-semibold uppercase block">WATERLOGGING</span>
            <span className="text-2xl font-extrabold font-mono text-blue-700">{activeResults.waterlogging}%</span>
          </div>

          <div className="p-3 rounded-md bg-amber-50/80 border border-amber-200 space-y-1">
            <span className="text-[10px] text-slate-600 font-semibold uppercase block">ROAD BLOCKAGE</span>
            <span className="text-2xl font-extrabold font-mono text-amber-700">{activeResults.roadBlockage}%</span>
          </div>

          <div className="p-3 rounded-md bg-rose-50/80 border border-rose-200 space-y-1">
            <span className="text-[10px] text-slate-600 font-semibold uppercase block">HOSPITALS AT ACCESS RISK</span>
            <span className="text-2xl font-extrabold font-mono text-rose-700">{activeResults.hospitalsAtRisk}</span>
          </div>

          <div className="p-3 rounded-md bg-red-50/80 border border-red-200 space-y-1">
            <span className="text-[10px] text-slate-600 font-semibold uppercase block">AMBULANCE DELAY</span>
            <span className="text-2xl font-extrabold font-mono text-red-700">+{activeResults.ambulanceDelay} min</span>
          </div>

          <div className="p-3 rounded-md bg-yellow-50/80 border border-yellow-200 space-y-1">
            <span className="text-[10px] text-slate-600 font-semibold uppercase block">POWER GRID RISK</span>
            <span className="text-2xl font-extrabold font-mono text-yellow-700">{activeResults.powerRisk}%</span>
          </div>
        </div>
      </div>

      {/* CROSS-DOMAIN CASCADE Diagram */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-[#E2E8F0]">
          CROSS-DOMAIN CASCADE
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-md bg-slate-100 border border-[#E2E8F0] text-slate-900 font-bold">Rainfall ({rainfallMm}mm)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-bold">Water ({activeResults.waterlogging}%)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-bold">Transport ({activeResults.roadBlockage}%)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 font-bold">Healthcare ({activeResults.hospitalsAtRisk} risk)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 font-bold">Electricity ({activeResults.powerRisk}%)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">Municipal Response</span>
        </div>
      </div>

      {/* COORDINATED RESPONSE */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-[#E2E8F0]">
          COORDINATED RESPONSE DIRECTIVES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-1">
            <span className="text-[10px] font-mono text-blue-700 font-bold">1. REROUTE AMBULANCES</span>
            <p className="text-slate-700 text-[11px]">Pre-route emergency vehicles away from inundated underpasses via Elevated Bypass.</p>
          </div>
          <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-1">
            <span className="text-[10px] font-mono text-emerald-700 font-bold">2. ACTIVATE DRAINAGE PUMPS</span>
            <p className="text-slate-700 text-[11px]">Deploy {activeResults.pumpsNeeded} high-capacity dewatering pumps to primary low-lying basin.</p>
          </div>
          <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-1">
            <span className="text-[10px] font-mono text-amber-700 font-bold">3. PROTECT HOSPITAL POWER</span>
            <p className="text-slate-700 text-[11px]">Isolate Substation East-04 transformer yard and auto-switch ICU feeder lines.</p>
          </div>
          <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-1">
            <span className="text-[10px] font-mono text-purple-700 font-bold">4. ISSUE PUBLIC WARNING</span>
            <p className="text-slate-700 text-[11px]">Dispatch localized public advisory to minimize non-essential travel in flooded corridors.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
