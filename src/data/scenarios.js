export const PRESET_SCENARIOS = [
  {
    id: 'heavy-monsoon',
    title: '🌧️ Heavy Monsoon Downpour (120mm/6h)',
    districtId: 'mumbai-urban',
    description: 'Torrential rains cause drainage overflow in low-lying zones, inundating major access routes to 2 regional hospitals and threatening Dharavi Substation #4.',
    inputs: {
      rainfall: 120,
      powerGridLoad: 88,
      trafficDensity: 82,
      hospitalOccupancy: 91
    },
    dominoChain: [
      { step: 1, domain: 'Disaster', icon: 'CloudRain', text: '120mm Torrential Rainfall detected across District X', severity: 'high' },
      { step: 2, domain: 'Water', icon: 'Waves', text: 'Drainage capacity exceeded at Milan & Hindmata nodes (Water depth > 45cm)', severity: 'high' },
      { step: 3, domain: 'Transport', icon: 'Navigation', text: '3 major arterial roads inundated; traffic congestion spikes to 86%', severity: 'high' },
      { step: 4, domain: 'Health', icon: 'HeartPulse', text: '2 major emergency hospitals difficult to access; standard route blocked', severity: 'critical' },
      { step: 5, domain: 'Electricity', icon: 'Zap', text: 'Low-lying substation #4 faces flood inundation risk', severity: 'warning' },
      { step: 6, domain: 'Municipal', icon: 'Truck', text: '14 uncoordinated drainage complaints clogged in queue', severity: 'warning' }
    ],
    withoutAI: {
      ambulanceDelayMin: 28,
      gridFailureRiskPct: 78,
      trafficGridlockPct: 84,
      hospitalAccessTimeMin: 42,
      citizenAlertDelayMin: 65,
      substationStatus: 'Flooded / Tripped',
      outcomeSummary: 'Severe emergency delays, 2 ambulances trapped in traffic, local power outage affecting 45,000 households.'
    },
    withAI: {
      ambulanceDelayMin: 11,
      gridFailureRiskPct: 8,
      trafficGridlockPct: 32,
      hospitalAccessTimeMin: 16,
      citizenAlertDelayMin: 2,
      substationStatus: 'Protected (Aux Pumps Activated & Power Rerouted)',
      outcomeSummary: 'Ambulances pre-routed via elevated flyovers, automated aux pumps started at Node 4, geofenced public alert sent in 2 min.'
    }
  },
  {
    id: 'heatwave-surge',
    title: '☀️ Severe Heatwave & Power Grid Surge (46°C)',
    districtId: 'delhi-ncr',
    description: 'Extreme heat causes peak air-conditioning transformer overload while hospital heatstroke admissions surge 300%.',
    inputs: {
      rainfall: 0,
      powerGridLoad: 98,
      trafficDensity: 60,
      hospitalOccupancy: 96
    },
    dominoChain: [
      { step: 1, domain: 'Disaster', icon: 'Sun', text: 'Extreme Heatwave alert (46°C ambient temp) for 48 consecutive hours', severity: 'high' },
      { step: 2, domain: 'Electricity', icon: 'Zap', text: 'Grid Transformer load reaches 98%; thermal overload imminent', severity: 'critical' },
      { step: 3, domain: 'Health', icon: 'HeartPulse', text: 'Heatstroke emergency arrivals surge by 310%; ICU bed capacity at 96%', severity: 'critical' },
      { step: 4, domain: 'Water', icon: 'Droplets', text: 'Peak municipal water supply pressure drops due to booster pump power trips', severity: 'high' },
      { step: 5, domain: 'Agriculture', icon: 'Sprout', text: 'Soil moisture depleted rapidly in peri-urban agricultural belts', severity: 'warning' }
    ],
    withoutAI: {
      ambulanceDelayMin: 24,
      gridFailureRiskPct: 92,
      trafficGridlockPct: 45,
      hospitalAccessTimeMin: 35,
      citizenAlertDelayMin: 120,
      substationStatus: 'Thermal Blackout in 3 Sectors',
      outcomeSummary: 'Grid transformer failure cuts power to ICU ward, emergency backup generators struggle, water supply disrupted.'
    },
    withAI: {
      ambulanceDelayMin: 8,
      gridFailureRiskPct: 12,
      trafficGridlockPct: 18,
      hospitalAccessTimeMin: 12,
      citizenAlertDelayMin: 3,
      substationStatus: 'Load-Shed Non-Essential Blocks / Priority Hospital Supply Enforced',
      outcomeSummary: 'Pre-emptive load balancing preserves hospital feeders, cooling centers activated, mobile water tankers dispatched.'
    }
  },
  {
    id: 'cyclone-storm',
    title: '🌀 Cyclonic Storm Surge & Coastal Flooding',
    districtId: 'chennai-coastal',
    description: 'Category 3 cyclone landfall brings 160mm rain and 2.5m storm surge, isolating coastal relief centers and hospital corridors.',
    inputs: {
      rainfall: 160,
      powerGridLoad: 75,
      trafficDensity: 90,
      hospitalOccupancy: 88
    },
    dominoChain: [
      { step: 1, domain: 'Disaster', icon: 'Wind', text: 'Severe Cyclonic Storm landfall with wind gusts > 110 km/h', severity: 'critical' },
      { step: 2, domain: 'Water', icon: 'Waves', text: 'Coastal storm surge causes tidal river backflow & spillway breach', severity: 'critical' },
      { step: 3, domain: 'Electricity', icon: 'Zap', text: 'Substation #3 and coastal transformer yards submerged', severity: 'critical' },
      { step: 4, domain: 'Transport', icon: 'Navigation', text: 'Velachery underpass & coastal highway rendered completely impassable', severity: 'high' },
      { step: 5, domain: 'Health', icon: 'HeartPulse', text: 'Rajiv Gandhi Hospital access road submerged under 60cm water', severity: 'critical' }
    ],
    withoutAI: {
      ambulanceDelayMin: 45,
      gridFailureRiskPct: 95,
      trafficGridlockPct: 92,
      hospitalAccessTimeMin: 60,
      citizenAlertDelayMin: 90,
      substationStatus: 'Complete Submergence & Substation Tripping',
      outcomeSummary: 'Catastrophic delay in relief operations, power cut to coastal hospital, high flood rescue backlog.'
    },
    withAI: {
      ambulanceDelayMin: 14,
      gridFailureRiskPct: 15,
      trafficGridlockPct: 35,
      hospitalAccessTimeMin: 18,
      citizenAlertDelayMin: 1,
      substationStatus: 'Isolated & Emergency Battery/Solar Microgrid Active',
      outcomeSummary: 'Early evacuation broadcast, boats pre-staged at Velachery, medical power auto-switched to microgrid.'
    }
  }
];
