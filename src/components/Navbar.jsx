import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldAlert, Cpu, MapPin, 
  RefreshCw, Sparkles, AlertTriangle, Radio
} from 'lucide-react';
import { DISTRICTS } from '../data/districts';

export default function Navbar({ selectedDistrict, onSelectDistrict, onOpenPitchModal, activeScenario }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-900/40 bg-[#070b14]/90">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-red-950/80 via-rose-900/40 to-slate-900 px-4 py-1 flex items-center justify-between text-xs border-b border-red-500/20">
        <div className="flex items-center gap-2 text-rose-300 font-mono overflow-hidden">
          <span className="flex items-center gap-1.5 bg-red-600/30 text-red-400 font-bold px-2 py-0.5 rounded border border-red-500/40 animate-pulse">
            <Radio className="w-3 h-3 text-red-400 animate-spin" /> LIVE AI CORRELATION FEED
          </span>
          <span className="truncate">
            {activeScenario 
              ? `[CRISIS SIMULATION ACTIVE] ${activeScenario.title} — Cross-Domain Cascade Engine Synchronized`
              : `[CROSS-DOMAIN MATRIX] Heavy rainfall in ${selectedDistrict.name} → Waterlogging predicted at Milan Subway → Ambulance pre-routing recommended.`}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            7 DOMAINS CONNECTED
          </span>
          <span>IST: <strong className="text-cyan-400">{timeStr || '17:45:00 PM'}</strong></span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0b1220] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 h-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent font-heading">
                ONE INDIA BRAIN
              </h1>
              <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                AI Coordination Layer
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Unified Cross-Domain Governance & Cascading Impact Intelligence
            </p>
          </div>
        </div>

        {/* District Switcher & Quick Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Jurisdiction:</span>
            <select
              value={selectedDistrict.id}
              onChange={(e) => {
                const found = DISTRICTS.find(d => d.id === e.target.value);
                if (found) onSelectDistrict(found);
              }}
              className="bg-slate-900 text-white font-medium focus:outline-none cursor-pointer rounded px-2 py-0.5 border border-slate-700 hover:border-cyan-500 transition-colors"
            >
              {DISTRICTS.map(d => (
                <option key={d.id} value={d.id}>
                  🇮🇳 {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Hackathon Pitch Modal Trigger */}
          <button
            onClick={onOpenPitchModal}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>Killer Pitch & Vision</span>
          </button>
        </div>
      </div>
    </header>
  );
}
