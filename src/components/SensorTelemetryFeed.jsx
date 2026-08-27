import React, { useState, useEffect } from 'react';
import { Radio, Pause, Play, PlusCircle, Terminal, AlertTriangle } from 'lucide-react';

export default function SensorTelemetryFeed({ selectedDistrict, onInjectAnomaly }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [logs, setLogs] = useState([
    { id: 1, time: '17:44:12', domain: 'WATER', msg: 'Rain gauge station #4 reports 135mm cumulative rainfall', level: 'HIGH' },
    { id: 2, time: '17:44:18', domain: 'TRANSPORT', msg: 'Milan Subway underpass water level sensor triggered > 45cm', level: 'CRITICAL' },
    { id: 3, time: '17:44:25', domain: 'HEALTH', msg: 'KEM Hospital emergency route calculation requested by Ambulance #MH-01-442', level: 'HIGH' },
    { id: 4, time: '17:44:31', domain: 'ELECTRICITY', msg: 'Dharavi Substation transformer thermal telemetry stable at 92%', level: 'NORMAL' },
    { id: 5, time: '17:44:39', domain: 'MUNICIPAL', msg: 'Dewatering pump #2 at Cleveland Bunder auto-engaged by AI brain', level: 'NORMAL' }
  ]);

  useEffect(() => {
    if (!isPlaying) return;

    const domains = ['TRANSPORT', 'HEALTH', 'WATER', 'ELECTRICITY', 'MUNICIPAL', 'DISASTER', 'AGRICULTURE'];
    const templates = [
      'Radar rain cell intensifying over sector 4 (Rainfall rate: +12mm/hr)',
      'GPS speed telemetry on Western Express Highway drops to 14 km/h',
      'ICU Bed telemetry updated: 2 emergency trauma admissions registered',
      'Substation telemetry heartbeat received; voltage steady at 110kV',
      'Hydrological flood gauge #3 reports canal water depth +8cm',
      'Geofenced alert broadcast delivered to 42,000 subscriber cells in Zone A'
    ];

    const timer = setInterval(() => {
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      const randomMsg = templates[Math.floor(Math.random() * templates.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });

      setLogs(prev => [
        { id: Date.now(), time: timeStr, domain: randomDomain, msg: randomMsg, level: 'NORMAL' },
        ...prev.slice(0, 19)
      ]);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full glass-panel p-5 rounded-2xl border border-cyan-900/40 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h3 className="text-base font-bold text-white font-heading">
            Live Cross-Domain Telemetry & IoT Sensor Stream
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-700 flex items-center gap-1.5 hover:text-white"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Telemetry</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Stream</span>
              </>
            )}
          </button>

          <button
            onClick={onInjectAnomaly}
            className="px-3 py-1 rounded-lg bg-red-950/80 text-xs font-mono text-red-300 border border-red-500/40 flex items-center gap-1.5 hover:bg-red-900/80"
          >
            <PlusCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Inject Anomaly Spike</span>
          </button>
        </div>
      </div>

      {/* Terminal Log Console */}
      <div className="bg-[#050810] p-4 rounded-xl border border-slate-800 font-mono text-xs h-48 overflow-y-auto space-y-2 scanline-effect">
        {logs.map(log => (
          <div key={log.id} className="flex items-start gap-2 leading-relaxed">
            <span className="text-slate-500 font-mono shrink-0">[{log.time}]</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
              log.domain === 'HEALTH' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
              log.domain === 'WATER' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
              log.domain === 'TRANSPORT' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
              log.domain === 'ELECTRICITY' ? 'bg-yellow-950 text-yellow-300 border border-yellow-800' :
              'bg-slate-900 text-slate-300 border border-slate-800'
            }`}>
              {log.domain}
            </span>
            <span className="text-slate-300">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
