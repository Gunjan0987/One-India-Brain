import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedMap from '../components/shared/SharedMap';
import { getJurisdictionData } from '../data/centralStore';
import { Cpu, MapPin, Database, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, Eye, Check } from 'lucide-react';

export default function DashboardPage({ selectedJurisdiction }) {
  const navigate = useNavigate();
  const [focusTarget, setFocusTarget] = useState(null);
  const [activeStepFilter, setActiveStepFilter] = useState(null);
  const [acceptedActions, setAcceptedActions] = useState({});

  const jData = getJurisdictionData(selectedJurisdiction.id);
  const data = jData.incident;

  // 6 KPI Cards (Clean light styling, Section 7)
  const kpis = [
    { label: 'ACTIVE INCIDENTS', val: data.activeIncidentsCount, color: 'text-amber-600' },
    { label: 'HIGH-RISK ZONES', val: data.highRiskZonesCount, color: 'text-red-600' },
    { label: 'HOSPITALS AT ACCESS RISK', val: data.hospitalsAtRiskCount, color: 'text-rose-600' },
    { label: 'ROADS AT RISK', val: data.roadsAtRiskCount, color: 'text-amber-600' },
    { label: 'EMERGENCY TEAMS DEPLOYED', val: data.emergencyTeamsDeployedCount, color: 'text-emerald-600' },
    { label: 'ESTIMATED POPULATION EXPOSED', val: data.estimatedPopulationExposed, color: 'text-blue-600 font-mono' }
  ];

  // Prioritized Recommended Directives (Section 13)
  const recommendations = [
    {
      id: 'rec-1',
      priority: 'HIGH',
      title: `Reroute ${data.ambulancesReroutedCount} emergency ambulances`,
      depts: 'Transport + Healthcare',
      reason: `${data.roadsAtRiskCount} roads have high blockage probability (${data.roadBlockageProbability}%).`,
      impact: 'Reduce emergency response delay (+17 min → +6 min).',
      coords: { lat: jData.hospitals[0]?.coords[0] || selectedJurisdiction.center[0], lng: jData.hospitals[0]?.coords[1] || selectedJurisdiction.center[1] },
      route: '/transport'
    },
    {
      id: 'rec-2',
      priority: 'HIGH',
      title: `Activate ${data.drainagePumpsActivatedCount} drainage pumps`,
      depts: 'Water + Municipal',
      reason: `Waterlogging probability reached ${data.waterloggingProbability}%.`,
      impact: 'Reduce water accumulation across primary hospital access corridors.',
      coords: { lat: jData.waterZones[0]?.coords[0] || selectedJurisdiction.center[0], lng: jData.waterZones[0]?.coords[1] || selectedJurisdiction.center[1] },
      route: '/water'
    },
    {
      id: 'rec-3',
      priority: 'HIGH',
      title: 'Protect critical hospital power',
      depts: 'Electricity + Healthcare',
      reason: `${data.substationsAtRiskCount} substations are exposed to risk.`,
      impact: 'Maintain continuity of critical healthcare services & ICU beds.',
      coords: { lat: jData.substations[0]?.coords[0] || selectedJurisdiction.center[0], lng: jData.substations[0]?.coords[1] || selectedJurisdiction.center[1] },
      route: '/electricity'
    },
    {
      id: 'rec-4',
      priority: 'MEDIUM',
      title: 'Issue localized public warning',
      depts: 'Municipal Services',
      reason: `${data.estimatedPopulationExposed} estimated population exposure in affected corridors.`,
      impact: 'Minimize non-essential commuter traffic entering inundated zones.',
      coords: { lat: selectedJurisdiction.center[0], lng: selectedJurisdiction.center[1] },
      route: '/municipal'
    }
  ];

  const handleAccept = (recId) => {
    setAcceptedActions(prev => ({ ...prev, [recId]: true }));
  };

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* 1. DEMO MODE INDICATOR (Section 5) */}
      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs flex items-center justify-between text-amber-900 font-mono shadow-xs">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-amber-700" />
          <span>DEMO MODE &bull; Simulated emergency scenario &bull; <strong>{selectedJurisdiction.name} ({selectedJurisdiction.state})</strong></span>
        </div>
        <span className="text-[10px] text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 font-medium">Simulated dataset</span>
      </div>

      {/* 2. ACTIVE INCIDENT BANNER (Section 6: Light UI) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-red-600 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded border border-red-200 font-bold tracking-wider">
              ACTIVE INCIDENT
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            {data.title}
          </h2>
          <p className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
            <span>Jurisdiction: <strong className="text-slate-900">{selectedJurisdiction.name}</strong></span>
            <span>&bull;</span>
            <span>Forecast: <strong className="text-amber-700 font-semibold">{data.rainfall} mm in {data.rainfallPeriod}</strong></span>
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block font-mono uppercase">Severity Risk</span>
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-red-100 text-red-800 border border-red-200">
              {data.riskLevel}
            </span>
          </div>
          <div className="text-right text-xs font-mono text-slate-500">
            <span>{data.updatedAgo}</span>
          </div>
        </div>
      </div>

      {/* 3. 6 EXECUTIVE KPI CARDS (Section 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {kpis.map((k, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-[#E2E8F0] p-3 flex flex-col justify-between space-y-1 shadow-xs">
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">{k.label}</span>
            <span className={`text-2xl font-extrabold tracking-tight font-heading ${k.color}`}>
              {k.val}
            </span>
          </div>
        ))}
      </div>

      {/* 4. GIS MAP (65%) + CROSS-DOMAIN IMPACT ASSESSMENT (35%) (Section 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (Approx 65% width) */}
        <div className="lg:col-span-8 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              GIS Emergency Operations Map — {selectedJurisdiction.name}
            </span>
            <span className="text-slate-500 text-[11px] font-mono">
              Click markers for impact details
            </span>
          </div>
          <SharedMap selectedJurisdiction={selectedJurisdiction} focusTarget={focusTarget} height="430px" activeLayersFilter={activeStepFilter} />
        </div>

        {/* Right Column (Approx 35% width) — Section 11 */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>CROSS-DOMAIN IMPACT ASSESSMENT</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-800">
            {/* Water Impact */}
            <div className="p-2.5 rounded-md bg-blue-50/70 border border-blue-200 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-blue-800 font-bold uppercase">WATER IMPACT</span>
                <span className="text-slate-600 font-semibold">Confidence: {data.waterloggingConfidence}%</span>
              </div>
              <p className="text-slate-900">
                Waterlogging probability: <strong className="text-blue-900 font-bold">{data.waterloggingProbability}%</strong>
              </p>
            </div>

            {/* Transport Impact */}
            <div className="p-2.5 rounded-md bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-amber-800 font-bold uppercase">TRANSPORT IMPACT</span>
                <span className="text-slate-600 font-semibold">Blockage: {data.roadBlockageProbability}%</span>
              </div>
              <p className="text-slate-900">
                <strong className="text-amber-900 font-bold">{data.roadsAtRiskCount} roads at risk</strong> &bull; Delay: +{data.estimatedAmbulanceDelayMin} min
              </p>
            </div>

            {/* Healthcare Impact */}
            <div className="p-2.5 rounded-md bg-rose-50/70 border border-rose-200 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-rose-800 font-bold uppercase">HEALTHCARE IMPACT</span>
                <span className="text-slate-600 font-semibold">Confidence: {data.hospitalRiskConfidence}%</span>
              </div>
              <p className="text-slate-900">
                <strong className="text-rose-900 font-bold">{data.hospitalsAtRiskCount} hospitals at access risk</strong>
              </p>
            </div>

            {/* Emergency Response */}
            <div className="p-2.5 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-emerald-800 font-bold uppercase">EMERGENCY RESPONSE</span>
                <span className="text-slate-600 font-semibold">Teams: {data.emergencyTeamsDeployedCount}</span>
              </div>
              <p className="text-slate-900">
                Ambulance delay: <strong className="text-emerald-900 font-bold">+{data.estimatedAmbulanceDelayMin} min</strong>
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px]">
            <span className="text-slate-500">AI Model Confidence:</span>
            <span className="font-mono font-bold text-emerald-700">{data.waterloggingConfidence}%</span>
          </div>
        </div>
      </div>

      {/* 5. CROSS-DOMAIN IMPACT CASCADE (Section 12: Domino Flow) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              CROSS-DOMAIN IMPACT CASCADE
            </h3>
            <p className="text-[11px] text-slate-500">Click any step to inspect domain view & map filters</p>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Causal Chain Diagram</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 text-xs font-sans">
          {/* Step 1: Heavy Rainfall */}
          <div
            onClick={() => { setActiveStepFilter(null); navigate('/disaster'); }}
            className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] hover:border-slate-400 transition-colors cursor-pointer flex flex-col justify-between space-y-1"
          >
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">DISASTER</span>
            <strong className="text-slate-900 text-xs font-bold">HEAVY RAINFALL</strong>
            <span className="text-[10px] text-slate-600 font-mono">{data.rainfall} mm / 6 hours</span>
          </div>

          {/* Step 2: Waterlogging */}
          <div
            onClick={() => { setActiveStepFilter(['waterlogging']); navigate('/water'); }}
            className="p-3 rounded-md bg-blue-50/80 border border-blue-200 hover:border-blue-500 transition-colors cursor-pointer flex flex-col justify-between space-y-1"
          >
            <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">WATER</span>
            <strong className="text-blue-900 text-xs font-bold">WATERLOGGING</strong>
            <span className="text-xs font-bold font-mono text-blue-700">{data.waterloggingProbability}% probability</span>
          </div>

          {/* Step 3: Transport */}
          <div
            onClick={() => { setActiveStepFilter(['roads']); navigate('/transport'); }}
            className="p-3 rounded-md bg-amber-50/80 border border-amber-200 hover:border-amber-500 transition-colors cursor-pointer flex flex-col justify-between space-y-1"
          >
            <span className="text-[10px] font-mono text-amber-800 font-bold uppercase">TRANSPORT</span>
            <strong className="text-amber-900 text-xs font-bold">ROADS AT RISK</strong>
            <span className="text-xs font-bold font-mono text-amber-700">{data.roadsAtRiskCount} roads (81% block)</span>
          </div>

          {/* Step 4: Healthcare */}
          <div
            onClick={() => { setActiveStepFilter(['hospitals']); navigate('/healthcare'); }}
            className="p-3 rounded-md bg-rose-50/80 border border-rose-200 hover:border-rose-500 transition-colors cursor-pointer flex flex-col justify-between space-y-1"
          >
            <span className="text-[10px] font-mono text-rose-800 font-bold uppercase">HEALTHCARE</span>
            <strong className="text-rose-900 text-xs font-bold">HOSPITALS AT RISK</strong>
            <span className="text-xs font-bold font-mono text-rose-700">{data.hospitalsAtRiskCount} facilities</span>
          </div>

          {/* Step 5: Emergency Response */}
          <div
            onClick={() => { setActiveStepFilter(['rescue']); navigate('/alerts'); }}
            className="p-3 rounded-md bg-red-50/80 border border-red-200 hover:border-red-500 transition-colors cursor-pointer flex flex-col justify-between space-y-1"
          >
            <span className="text-[10px] font-mono text-red-800 font-bold uppercase">EMERGENCY RESPONSE</span>
            <strong className="text-red-900 text-xs font-bold">AMBULANCE RESPONSE</strong>
            <span className="text-xs font-bold font-mono text-red-700">+{data.estimatedAmbulanceDelayMin} min delay</span>
          </div>

          {/* Step 6: Coordinated Action */}
          <div
            onClick={() => { setActiveStepFilter(null); navigate('/simulation'); }}
            className="p-3 rounded-md bg-emerald-50/80 border border-emerald-200 hover:border-emerald-500 transition-colors cursor-pointer flex flex-col justify-between space-y-1"
          >
            <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">COORDINATED ACTION</span>
            <strong className="text-emerald-900 text-xs font-bold">DISPATCH & PUMPS</strong>
            <span className="text-[10px] text-emerald-700 font-mono font-semibold">14 Ambulances & 4 Pumps</span>
          </div>
        </div>
      </div>

      {/* 6. AI EXPLAINABILITY SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WHY THIS PREDICTION? */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-2 text-xs shadow-xs">
          <div className="flex items-center gap-1.5 text-blue-700 font-bold uppercase tracking-wider pb-2 border-b border-[#E2E8F0]">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>WHY THIS PREDICTION?</span>
          </div>
          <div className="space-y-1 text-slate-700 leading-relaxed">
            <p><strong className="text-slate-900">Waterlogging probability:</strong> {data.waterloggingProbability}% (Confidence: {data.waterloggingConfidence}%)</p>
            <p className="text-slate-500 pt-1 font-semibold">Evidence:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11px]">
              <li>Rainfall forecast ({data.rainfall} mm in 6 hours) exceeds storm drain capacity</li>
              <li>Low-lying elevation corridors surrounding Minto Bridge underpass</li>
              <li>Drainage saturation rate in low-lying basin corridors</li>
              <li>Historical waterlogging patterns during severe monsoon events</li>
            </ul>
          </div>
        </div>

        {/* WHY THIS ACTION? */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-2 text-xs shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase tracking-wider pb-2 border-b border-[#E2E8F0]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>WHY THIS ACTION?</span>
          </div>
          <div className="space-y-1 text-slate-700 leading-relaxed">
            <p><strong className="text-slate-900">Reroute emergency ambulances because:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11px]">
              <li>{data.roadsAtRiskCount} roads have high blockage probability ({data.roadBlockageProbability}%)</li>
              <li>{data.hospitalsAtRiskCount} hospitals are near affected inundated corridors</li>
              <li>Estimated ambulance delay is +{data.estimatedAmbulanceDelayMin} minutes without pre-routing</li>
              <li>Elevated flyover bypass corridors remain clear of water accumulation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 7. RECOMMENDED RESPONSE (Section 13: With [Review], [Accept], [View on Map]) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            RECOMMENDED RESPONSE
          </h3>
          <span className="text-[10px] font-mono text-slate-500">Multi-Department Directives</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {recommendations.map((rec) => {
            const isAccepted = acceptedActions[rec.id];
            return (
              <div key={rec.id} className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${rec.priority === 'HIGH' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                      {rec.priority}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-medium ${isAccepted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-700'}`}>
                      {isAccepted ? 'Demo action approved' : 'Recommended'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">{rec.title}</h4>
                  <p className="text-[10px] text-slate-500 mb-2 font-mono">Departments: <span className="text-slate-800 font-semibold">{rec.depts}</span></p>
                  <div className="space-y-1 text-[11px] text-slate-700">
                    <p><strong className="text-slate-500">Reason:</strong> {rec.reason}</p>
                    <p><strong className="text-emerald-700">Expected impact:</strong> {rec.impact}</p>
                  </div>
                </div>

                {/* Interactive Action Buttons [Review] [Accept] [View on Map] */}
                <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => navigate(rec.route)}
                      className="flex items-center justify-center gap-1 bg-white hover:bg-slate-100 text-slate-700 border border-[#CBD5E1] px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-slate-500" />
                      <span>Review</span>
                    </button>
                    <button
                      onClick={() => handleAccept(rec.id)}
                      disabled={isAccepted}
                      className={`flex items-center justify-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                        isAccepted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isAccepted ? 'Approved' : 'Accept'}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setFocusTarget(rec.coords)}
                    className="w-full flex items-center justify-center gap-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-[#CBD5E1] px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span>View on Map</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. PROJECTED OUTCOME (Section 14: Simulated Projected Outcome) */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              PROJECTED OUTCOME
            </h3>
          </div>
          <span className="text-[10px] text-slate-600 font-mono bg-slate-50 px-2 py-0.5 rounded border border-[#CBD5E1] font-semibold">SIMULATED PROJECTED OUTCOME</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-mono block">AMBULANCE DELAY</span>
            <span className="font-bold font-mono text-emerald-800 text-sm">+17 min &rarr; +6 min</span>
          </div>

          <div className="p-2.5 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-mono block">WATERLOGGING RESPONSE</span>
            <span className="font-bold text-emerald-900 text-xs">4 pumps active</span>
          </div>

          <div className="p-2.5 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-mono block">HOSPITAL ACCESSIBILITY</span>
            <span className="font-bold text-slate-900 text-xs">Improved via bypass</span>
          </div>

          <div className="p-2.5 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-mono block">CRITICAL POWER</span>
            <span className="font-bold text-slate-900 text-xs">ICU feeder protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
