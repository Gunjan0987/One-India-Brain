import React from 'react';
import { 
  Car, HeartPulse, ShieldAlert, Waves, 
  Zap, Building2, Sprout 
} from 'lucide-react';

export default function DomainStatusGrid({ incidentData }) {
  const domainCards = [
    {
      id: 'transport',
      domain: 'Transport',
      icon: Car,
      currentMetric: `${incidentData.trafficCongestionPct}%`,
      metricLabel: 'Traffic congestion',
      riskState: 'HIGH',
      badgeClass: 'eoc-badge-warning',
      actionText: `${incidentData.ambulancesRerouted} ambulances rerouted`
    },
    {
      id: 'healthcare',
      domain: 'Healthcare',
      icon: HeartPulse,
      currentMetric: `${incidentData.hospitalsAtRisk} hospitals`,
      metricLabel: 'At risk',
      riskState: 'CRITICAL',
      badgeClass: 'eoc-badge-critical',
      actionText: 'Emergency access protected'
    },
    {
      id: 'disaster',
      domain: 'Disaster Management',
      icon: ShieldAlert,
      currentMetric: `${incidentData.rainfall} mm / ${incidentData.rainfallPeriod}`,
      metricLabel: 'Rainfall forecast',
      riskState: 'CRITICAL',
      badgeClass: 'eoc-badge-critical',
      actionText: 'Emergency response activated'
    },
    {
      id: 'water',
      domain: 'Water Management',
      icon: Waves,
      currentMetric: `${incidentData.waterloggingProbability}%`,
      metricLabel: 'Waterlogging probability',
      riskState: 'CRITICAL',
      badgeClass: 'eoc-badge-critical',
      actionText: `${incidentData.drainagePumpsActivated} pumps activated`
    },
    {
      id: 'electricity',
      domain: 'Electricity',
      icon: Zap,
      currentMetric: `${incidentData.substationsAtRisk} substations`,
      metricLabel: 'At risk',
      riskState: 'HIGH',
      badgeClass: 'eoc-badge-warning',
      actionText: 'Critical hospital power protected'
    },
    {
      id: 'municipal',
      domain: 'Municipal Services',
      icon: Building2,
      currentMetric: `${incidentData.drainageIncidentsCount} issues`,
      metricLabel: 'Drainage incidents',
      riskState: 'HIGH',
      badgeClass: 'eoc-badge-warning',
      actionText: `${incidentData.emergencyCrewsDeployed} emergency crews deployed`
    },
    {
      id: 'agriculture',
      domain: 'Agriculture',
      icon: Sprout,
      currentMetric: `${incidentData.soilMoisturePct}%`,
      metricLabel: 'Soil moisture',
      riskState: 'MONITORED',
      badgeClass: 'eoc-badge-normal',
      actionText: 'Crop/flood stress monitored'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
          Cross-domain status (7 Connected Services)
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {domainCards.map(card => {
          const IconComp = card.icon;

          return (
            <div
              key={card.id}
              className="eoc-card p-3 flex flex-col justify-between hover:border-slate-600 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <IconComp className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-medium truncate">{card.domain}</span>
                  </div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${card.badgeClass}`}>
                    {card.riskState}
                  </span>
                </div>

                {/* Metric */}
                <div className="my-1">
                  <p className="text-base font-bold text-white tracking-tight font-heading">
                    {card.currentMetric}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {card.metricLabel}
                  </p>
                </div>
              </div>

              {/* Consequence / Operational Action */}
              <div className="mt-2 pt-2 border-t border-[#1f2d47] text-[10px] font-medium text-slate-300 flex items-center justify-between">
                <span className="truncate">{card.actionText}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
