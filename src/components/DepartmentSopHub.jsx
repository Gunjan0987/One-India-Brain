import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Play, Send, ShieldCheck, 
  Car, HeartPulse, Waves, Zap, Building2, ShieldAlert, Sprout, Filter
} from 'lucide-react';
import { DEPARTMENT_SOPS } from '../data/departmentActions';

const iconMap = {
  Car, HeartPulse, Waves, Zap, Building2, ShieldAlert, Sprout
};

export default function DepartmentSopHub({ activeScenario }) {
  const [departmentSops, setDepartmentSops] = useState(DEPARTMENT_SOPS);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lastActionExecuted, setLastActionExecuted] = useState(null);

  const toggleActionStatus = (deptId, actionId) => {
    setDepartmentSops(prev => prev.map(dept => {
      if (dept.id !== deptId) return dept;
      return {
        ...dept,
        actions: dept.actions.map(act => {
          if (act.id !== actionId) return act;
          const nextStatus = act.status === 'EXECUTED' ? 'RECOMMENDED' : 'EXECUTED';
          if (nextStatus === 'EXECUTED') {
            setLastActionExecuted(act.title);
            setTimeout(() => setLastActionExecuted(null), 4000);
          }
          return { ...act, status: nextStatus };
        })
      };
    }));
  };

  const filteredSops = activeFilter === 'ALL'
    ? departmentSops
    : departmentSops.filter(d => d.id === activeFilter);

  return (
    <div className="w-full glass-panel p-5 rounded-2xl border border-cyan-900/40 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-heading">
              AI Decision Engine: Coordinated Department Action Directives (SOPs)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronized execution plans generated across 7 public service departments
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
              activeFilter === 'ALL' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            All Departments
          </button>
          {departmentSops.map(d => (
            <button
              key={d.id}
              onClick={() => setActiveFilter(d.id)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                activeFilter === d.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {d.domain.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Execution Toast Banner */}
      {lastActionExecuted && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span><strong>ACTION EXECUTED:</strong> Directives dispatched for "{lastActionExecuted}". Agency telemetry confirmed.</span>
          </div>
        </div>
      )}

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSops.map(dept => {
          const IconComp = iconMap[dept.icon] || ShieldCheck;

          return (
            <div
              key={dept.id}
              className={`p-4 rounded-xl border ${dept.color} glass-panel flex flex-col justify-between transition-all hover:border-slate-600`}
            >
              <div>
                {/* Dept Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <IconComp className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-white font-heading">{dept.domain}</h4>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${dept.badgeBg}`}>
                    {dept.code}
                  </span>
                </div>

                {/* Actions List */}
                <div className="space-y-2.5">
                  {dept.actions.map(act => {
                    const isExecuted = act.status === 'EXECUTED';

                    return (
                      <div
                        key={act.id}
                        className={`p-2.5 rounded-lg border transition-all ${
                          isExecuted
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                            : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h5 className="text-xs font-bold text-white leading-snug">{act.title}</h5>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                            act.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            act.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {act.priority}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
                          {act.description}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                          <span className="font-mono text-slate-400">
                            Status: <strong className={isExecuted ? 'text-emerald-400' : 'text-cyan-400'}>{act.status}</strong>
                          </span>

                          <button
                            onClick={() => toggleActionStatus(dept.id, act.id)}
                            className={`px-2 py-1 rounded font-mono font-bold transition-all flex items-center gap-1 ${
                              isExecuted
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
                            }`}
                          >
                            {isExecuted ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                Executed
                              </>
                            ) : (
                              <>
                                <Send className="w-3 h-3 text-white" />
                                Dispatch SOP
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
