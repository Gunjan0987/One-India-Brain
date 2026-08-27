import React from 'react';
import { getJurisdictionData } from '../data/centralStore';
import { Cpu, ArrowRight, CheckCircle2, HelpCircle, Info } from 'lucide-react';

export default function AiInsightsPage({ selectedJurisdiction }) {
  const jData = getJurisdictionData(selectedJurisdiction.id);
  const incident = jData.incident;

  const insights = [
    {
      id: 'insight-1',
      title: 'Heavy Rainfall → Waterlogging → Road Disruption → Hospital Accessibility → Ambulance Delay',
      confidence: incident.waterloggingConfidence,
      impact: 'HIGH',
      domains: 'Disaster → Water → Transport → Healthcare → Emergency',
      whyPrediction: [
        `Rainfall intensity (${incident.rainfall} mm in 6 hours) exceeds historical drainage baseline capacity`,
        'Low-lying terrain elevation around primary arterial underpasses',
        'Runoff accumulation rate exceeds storm pump discharge capacity',
        'Historical waterlogging patterns during severe monsoon events'
      ],
      whatWillHappen: `${incident.roadsAtRiskCount} arterial roads predicted to experience heavy inundation (${incident.roadBlockageProbability}% blockage probability), causing +${incident.estimatedAmbulanceDelayMin} min ambulance delay for ${incident.hospitalsAtRiskCount} hospitals.`,
      whyAction: [
        `8 roads have high blockage probability (${incident.roadBlockageProbability}%)`,
        `${incident.hospitalsAtRiskCount} hospitals have direct accessibility risk`,
        `Ambulance response delay is estimated at +${incident.estimatedAmbulanceDelayMin} minutes without bypass routing`,
        'Elevated flyover bypass corridors remain clear of flood water'
      ],
      recommendedAction: `Activate ${incident.drainagePumpsActivatedCount} auxiliary dewatering pumps and pre-route ${incident.ambulancesReroutedCount} emergency ambulances via Elevated Bypass.`
    },
    {
      id: 'insight-2',
      title: 'Waterlogging → Substation Flood Ingress → Hospital ICU Power Risk',
      confidence: 86,
      impact: 'CRITICAL',
      domains: 'Water → Electricity → Healthcare',
      whyPrediction: [
        'Ground elevation of Substation East-04 is 15 cm lower than surrounding runoff accumulation level',
        'High water ingress probability in transformer yard under sustained heavy rainfall',
        'Feeder line connection directly serves Trauma Center ICU power grid'
      ],
      whatWillHappen: `${incident.substationsAtRiskCount} grid substations exposed to power infrastructure risk (${incident.powerInfrastructureRiskPct}%), threatening main power lines to ICU trauma beds.`,
      whyAction: [
        `Substation failure probability estimated at ${incident.powerInfrastructureRiskPct}%`,
        'City Trauma Center ICU depends on primary Substation East-04 feeder line',
        'Auxiliary microgrid auto-switch prevents catastrophic power failure'
      ],
      recommendedAction: 'Deploy mobile flood barrier dams around Substation East-04 and auto-isolate non-essential feeder lines.'
    }
  ];

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* WHY THIS MATTERS Banner (Section 17) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-blue-600" />
          <span>WHY THIS MATTERS</span>
        </div>
        <p className="text-slate-700 text-xs leading-relaxed">
          Traditional departmental dashboards identify problems independently. <strong>One India Brain</strong> connects these problems to identify cascading cross-domain effects and coordinate the multi-service emergency response.
        </p>
      </div>

      {/* Overview Banner */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Cpu className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
              Cross-Domain Predictive Intelligence Model
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Causal multi-domain decision-support engine for <strong className="text-slate-900">{selectedJurisdiction.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-bold">
            Model Confidence: {incident.waterloggingConfidence}%
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
            Explainable AI Active
          </span>
        </div>
      </div>

      {/* Analytical Causal Cascade Diagram */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-[#E2E8F0]">
          CROSS-DOMAIN CAUSAL PIPELINE
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-md bg-slate-100 border border-[#E2E8F0] text-slate-900 font-bold">Rainfall ({incident.rainfall}mm)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-bold">Waterlogging ({incident.waterloggingProbability}%)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-bold">Road Disruption ({incident.roadsAtRiskCount} roads)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 font-bold">Hospital Access ({incident.hospitalsAtRiskCount} hospitals)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 text-red-800 font-bold">Ambulance Delay (+{incident.estimatedAmbulanceDelayMin}m)</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">Coordinated Response</span>
        </div>
      </div>

      {/* Structured Explainable Insights List */}
      <div className="space-y-4">
        {insights.map(item => (
          <div key={item.id} className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-4 shadow-xs">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
              <div>
                <span className="text-[10px] font-mono text-blue-700 font-bold uppercase block mb-1">{item.domains}</span>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{item.title}</h4>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-bold">
                  Confidence: {item.confidence}%
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 font-bold">
                  {item.impact} IMPACT
                </span>
              </div>
            </div>

            {/* Impact Prediction */}
            <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] text-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">PREDICTED IMPACT</span>
              <p className="text-slate-800 leading-relaxed font-medium">{item.whatWillHappen}</p>
            </div>

            {/* AI Explainability Grid (WHY THIS PREDICTION? + WHY THIS ACTION?) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Evidence */}
              <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-1 text-blue-700 font-bold uppercase tracking-wider text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>WHY THIS PREDICTION? (EVIDENCE)</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed text-[11px]">
                  {item.whyPrediction.map((ev, idx) => (
                    <li key={idx}>{ev}</li>
                  ))}
                </ul>
              </div>

              {/* Rationale */}
              <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-1 text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WHY THIS ACTION? (RATIONALE)</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed text-[11px]">
                  {item.whyAction.map((rat, idx) => (
                    <li key={idx}>{rat}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Directive */}
            <div className="p-3 rounded-md bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
              <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">RECOMMENDED DIRECTIVE ACTION</span>
              <p className="text-slate-900 font-bold">{item.recommendedAction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
