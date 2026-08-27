import React from 'react';
import { 
  Car, HeartPulse, ShieldAlert, Sprout, 
  Zap, Waves, Building2, TrendingUp, AlertCircle
} from 'lucide-react';

export function DomainMetricsGrid({ metrics, selectedDistrict }) {
  const domains = [
    {
      id: 'transport',
      title: 'Transport',
      icon: Car,
      iconColor: 'text-cyan-400',
      bgGlow: 'from-cyan-950/40 via-cyan-900/10 to-slate-900',
      borderColor: 'border-cyan-500/30',
      statLabel: 'Traffic Congestion',
      statValue: `${metrics.trafficCongestion}%`,
      subStat: `${metrics.ambulancesDelayed} Ambulances Rerouted`,
      riskLevel: metrics.trafficCongestion > 75 ? 'HIGH' : 'MODERATE'
    },
    {
      id: 'health',
      title: 'Healthcare',
      icon: HeartPulse,
      iconColor: 'text-rose-400',
      bgGlow: 'from-rose-950/40 via-rose-900/10 to-slate-900',
      borderColor: 'border-rose-500/30',
      statLabel: 'Hospitals at Risk',
      statValue: `${metrics.hospitalsAtRisk} Facilities`,
      subStat: 'ICU Beds Preserved',
      riskLevel: metrics.hospitalsAtRisk > 2 ? 'CRITICAL' : 'WARNING'
    },
    {
      id: 'disaster',
      title: 'Disaster Mgmt',
      icon: ShieldAlert,
      iconColor: 'text-orange-400',
      bgGlow: 'from-orange-950/40 via-orange-900/10 to-slate-900',
      borderColor: 'border-orange-500/30',
      statLabel: 'Rainfall Intensity',
      statValue: `${metrics.rainfall} mm/6h`,
      subStat: `${selectedDistrict.populationAtRisk} Pop. Monitored`,
      riskLevel: metrics.rainfall > 100 ? 'CRITICAL' : 'ELEVATED'
    },
    {
      id: 'water',
      title: 'Water Mgmt',
      icon: Waves,
      iconColor: 'text-blue-400',
      bgGlow: 'from-blue-950/40 via-blue-900/10 to-slate-900',
      borderColor: 'border-blue-500/30',
      statLabel: 'Waterlogging Risk',
      statValue: `${metrics.waterloggingRisk}%`,
      subStat: '4 Pumps Activated',
      riskLevel: metrics.waterloggingRisk > 80 ? 'CRITICAL' : 'HIGH'
    },
    {
      id: 'electricity',
      title: 'Electricity',
      icon: Zap,
      iconColor: 'text-yellow-400',
      bgGlow: 'from-yellow-950/40 via-yellow-900/10 to-slate-900',
      borderColor: 'border-yellow-500/30',
      statLabel: 'Substation Risk',
      statValue: `${metrics.electricitySubstationsAtRisk} Substation`,
      subStat: 'ICU Feed Protected',
      riskLevel: metrics.electricitySubstationsAtRisk > 1 ? 'HIGH' : 'STABLE'
    },
    {
      id: 'municipal',
      title: 'Municipal',
      icon: Building2,
      iconColor: 'text-purple-400',
      bgGlow: 'from-purple-950/40 via-purple-900/10 to-slate-900',
      borderColor: 'border-purple-500/30',
      statLabel: 'Drainage Issues',
      statValue: `${metrics.drainageComplaints} Active`,
      subStat: '12 Emergency Crews',
      riskLevel: 'ACTIVE'
    },
    {
      id: 'agriculture',
      title: 'Agriculture',
      icon: Sprout,
      iconColor: 'text-emerald-400',
      bgGlow: 'from-emerald-950/40 via-emerald-900/10 to-slate-900',
      borderColor: 'border-emerald-500/30',
      statLabel: 'Soil Inundation',
      statValue: `${Math.round(metrics.rainfall * 0.7)}% Saturation`,
      subStat: 'Canal Shutoff Ready',
      riskLevel: 'MONITORED'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-mono">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          Cross-Domain Data Streams (7 Public Services)
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          Synchronized to <strong className="text-slate-200">{selectedDistrict.name}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {domains.map((dom) => {
          const IconComp = dom.icon;
          const isCritical = dom.riskLevel === 'CRITICAL';
          const isHigh = dom.riskLevel === 'HIGH';

          return (
            <div
              key={dom.id}
              className={`p-3 rounded-xl bg-gradient-to-b ${dom.bgGlow} border ${dom.borderColor} glass-panel hover:border-cyan-400/50 transition-all hover:-translate-y-0.5 group`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <IconComp className={`w-4 h-4 ${dom.iconColor} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium text-slate-200 truncate">{dom.title}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' :
                  isHigh ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {dom.riskLevel}
                </span>
              </div>

              <div className="space-y-0.5">
                <p className="text-lg font-bold text-white font-heading">{dom.statValue}</p>
                <p className="text-[10px] text-slate-400 truncate">{dom.statLabel}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-cyan-300/80 flex items-center justify-between">
                <span className="truncate">{dom.subStat}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
