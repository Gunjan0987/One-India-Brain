export const DISTRICTS = [
  {
    id: 'mumbai-urban',
    name: 'Mumbai Metropolitan',
    state: 'Maharashtra',
    center: [19.0760, 72.8777],
    zoom: 12,
    riskLevel: 'CRITICAL',
    weatherCondition: 'Heavy Monsoon Downpour (135mm/6h)',
    populationAtRisk: '3.4M',
    metrics: {
      rainfall: 135,
      waterloggingRisk: 88,
      trafficCongestion: 76,
      hospitalsAtRisk: 3,
      electricitySubstationsAtRisk: 2,
      drainageComplaints: 24,
      ambulancesDelayed: 14,
      activeEmergencies: 8
    },
    nodes: {
      hospitals: [
        { id: 'h1', name: 'KEM Hospital & Emergency ICU', lat: 19.0028, lng: 72.8423, status: 'ACCESSIBILITY_RESTRICTED', bedsAvailable: 12, totalBeds: 250, icon: 'hospital' },
        { id: 'h2', name: 'Sion Municipal Hospital', lat: 19.0360, lng: 72.8600, status: 'CRITICAL_WATERLOGGING_APPROACH', bedsAvailable: 4, totalBeds: 180, icon: 'hospital' },
        { id: 'h3', name: 'Lilavati Emergency Center', lat: 19.0512, lng: 72.8285, status: 'NORMAL', bedsAvailable: 45, totalBeds: 200, icon: 'hospital' },
      ],
      roads: [
        { id: 'r1', name: 'Western Express Highway (Milan Subway)', lat: 19.0910, lng: 72.8480, status: 'FLOODED_INPASSABLE', waterDepthCm: 45 },
        { id: 'r2', name: 'Hindmata Flyover Underpass', lat: 19.0115, lng: 72.8450, status: 'WATERLOGGED_SLOW', waterDepthCm: 30 },
        { id: 'r3', name: 'Sion Circle Arterial Corridor', lat: 19.0370, lng: 72.8620, status: 'HEAVY_CONGESTION', waterDepthCm: 15 },
      ],
      substations: [
        { id: 'e1', name: 'Dharavi Central Substation #4', lat: 19.0400, lng: 72.8500, status: 'HIGH_FLOOD_RISK', loadPct: 92 },
        { id: 'e2', name: 'Bandra Grid Hub', lat: 19.0600, lng: 72.8350, status: 'STABLE', loadPct: 68 },
      ],
      waterNodes: [
        { id: 'w1', name: 'Mithi River Gauge Point 3', lat: 19.0650, lng: 72.8700, levelPct: 94, alert: 'OVERFLOW_IMMINENT' },
        { id: 'w2', name: 'Cleveland Bunder Pumping Stn', lat: 19.0080, lng: 72.8200, levelPct: 82, alert: 'AUX_PUMPS_STANDBY' },
      ],
      municipalTeams: [
        { id: 'm1', name: 'Disaster Relief Squad #1', lat: 19.0200, lng: 72.8400, status: 'DISPATCHED', size: 18 },
        { id: 'm2', name: 'Drainage Jetting Unit #7', lat: 19.0800, lng: 72.8600, status: 'STANDBY', size: 12 },
      ]
    }
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR (Central)',
    state: 'Delhi',
    center: [28.6139, 77.2090],
    zoom: 12,
    riskLevel: 'WARNING',
    weatherCondition: 'Moderate Storm & Drainage Backflow (75mm/6h)',
    populationAtRisk: '2.1M',
    metrics: {
      rainfall: 75,
      waterloggingRisk: 64,
      trafficCongestion: 82,
      hospitalsAtRisk: 2,
      electricitySubstationsAtRisk: 1,
      drainageComplaints: 19,
      ambulancesDelayed: 9,
      activeEmergencies: 5
    },
    nodes: {
      hospitals: [
        { id: 'h4', name: 'AIIMS Emergency Complex', lat: 28.5672, lng: 77.2100, status: 'NORMAL', bedsAvailable: 28, totalBeds: 400, icon: 'hospital' },
        { id: 'h5', name: 'LNJP Trauma Center', lat: 28.6360, lng: 77.2410, status: 'ACCESSIBILITY_RESTRICTED', bedsAvailable: 9, totalBeds: 220, icon: 'hospital' }
      ],
      roads: [
        { id: 'r4', name: 'Minto Bridge Underpass', lat: 28.6320, lng: 77.2220, status: 'FLOODED_INPASSABLE', waterDepthCm: 50 },
        { id: 'r5', name: 'Ring Road Dhaula Kuan', lat: 28.5910, lng: 77.1610, status: 'WATERLOGGED_SLOW', waterDepthCm: 20 }
      ],
      substations: [
        { id: 'e3', name: 'ITO Transformer Yard', lat: 28.6280, lng: 77.2400, status: 'MONITORED', loadPct: 85 }
      ],
      waterNodes: [
        { id: 'w3', name: 'Yamuna Barrage Hydrological Post', lat: 28.6100, lng: 77.2500, levelPct: 88, alert: 'WARNING_LEVEL' }
      ],
      municipalTeams: [
        { id: 'm3', name: 'NDMC De-watering Team #3', lat: 28.6250, lng: 77.2150, status: 'DEPLOYED', size: 15 }
      ]
    }
  },
  {
    id: 'bengaluru-urban',
    name: 'Bengaluru Metropolitan',
    state: 'Karnataka',
    center: [12.9716, 77.5946],
    zoom: 12,
    riskLevel: 'WARNING',
    weatherCondition: 'Urban Flash Flood & Lake Spillover (90mm/4h)',
    populationAtRisk: '1.8M',
    metrics: {
      rainfall: 90,
      waterloggingRisk: 72,
      trafficCongestion: 89,
      hospitalsAtRisk: 1,
      electricitySubstationsAtRisk: 2,
      drainageComplaints: 31,
      ambulancesDelayed: 11,
      activeEmergencies: 6
    },
    nodes: {
      hospitals: [
        { id: 'h6', name: 'Manipal Hospital Outer Ring Road', lat: 12.9580, lng: 77.6480, status: 'HEAVY_TRAFFIC_CORRIDOR', bedsAvailable: 19, totalBeds: 300, icon: 'hospital' }
      ],
      roads: [
        { id: 'r6', name: 'Silk Board Junction Bottleneck', lat: 12.9170, lng: 77.6230, status: 'FLOODED_INPASSABLE', waterDepthCm: 35 },
        { id: 'r7', name: 'Bellandur ORR Tech Corridor', lat: 12.9280, lng: 77.6820, status: 'WATERLOGGED_SLOW', waterDepthCm: 25 }
      ],
      substations: [
        { id: 'e4', name: 'BESCOM HSR Layout Grid', lat: 12.9100, lng: 77.6400, status: 'LOAD_SHEDDING_RISK', loadPct: 94 }
      ],
      waterNodes: [
        { id: 'w4', name: 'Bellandur Lake Outfall Sluice', lat: 12.9350, lng: 77.6700, levelPct: 96, alert: 'FOAMING_OVERFLOW' }
      ],
      municipalTeams: [
        { id: 'm4', name: 'BBMP Storm Drain Squad #5', lat: 12.9400, lng: 77.6100, status: 'ACTIVE', size: 22 }
      ]
    }
  },
  {
    id: 'chennai-coastal',
    name: 'Chennai Coastal District',
    state: 'Tamil Nadu',
    center: [13.0827, 80.2707],
    zoom: 12,
    riskLevel: 'CRITICAL',
    weatherCondition: 'Cyclone Depression & Tidal Surge (160mm/6h)',
    populationAtRisk: '2.9M',
    metrics: {
      rainfall: 160,
      waterloggingRisk: 92,
      trafficCongestion: 71,
      hospitalsAtRisk: 4,
      electricitySubstationsAtRisk: 3,
      drainageComplaints: 45,
      ambulancesDelayed: 18,
      activeEmergencies: 12
    },
    nodes: {
      hospitals: [
        { id: 'h7', name: 'Rajiv Gandhi General Hospital', lat: 13.0815, lng: 80.2770, status: 'CRITICAL_WATERLOGGING_APPROACH', bedsAvailable: 15, totalBeds: 500, icon: 'hospital' }
      ],
      roads: [
        { id: 'r8', name: 'Velachery Main Road Subway', lat: 12.9780, lng: 80.2200, status: 'FLOODED_INPASSABLE', waterDepthCm: 60 }
      ],
      substations: [
        { id: 'e5', name: 'TANGEDCO Koyambedu Station', lat: 13.0690, lng: 80.1920, status: 'HIGH_FLOOD_RISK', loadPct: 98 }
      ],
      waterNodes: [
        { id: 'w5', name: 'Chembarambakkam Spillway Canal', lat: 13.0100, lng: 80.0600, levelPct: 98, alert: 'DISCHARGE_MAX' }
      ],
      municipalTeams: [
        { id: 'm5', name: 'Greater Chennai Rescue Division #2', lat: 13.0500, lng: 80.2400, status: 'DISPATCHED', size: 30 }
      ]
    }
  },
  {
    id: 'wayanad-kerala',
    name: 'Wayanad Hill Region',
    state: 'Kerala',
    center: [11.6854, 76.1320],
    zoom: 11,
    riskLevel: 'CRITICAL',
    weatherCondition: 'Cloudburst & Landslide Threat (210mm/12h)',
    populationAtRisk: '450K',
    metrics: {
      rainfall: 210,
      waterloggingRisk: 95,
      trafficCongestion: 55,
      hospitalsAtRisk: 2,
      electricitySubstationsAtRisk: 2,
      drainageComplaints: 12,
      ambulancesDelayed: 22,
      activeEmergencies: 9
    },
    nodes: {
      hospitals: [
        { id: 'h8', name: 'Wayanad District Hospital Mananthavady', lat: 11.8020, lng: 76.0040, status: 'ISOLATED_BY_ROAD_SLIDE', bedsAvailable: 8, totalBeds: 150, icon: 'hospital' }
      ],
      roads: [
        { id: 'r9', name: 'Thamarassery Ghat Road Pass', lat: 11.5120, lng: 75.9800, status: 'LANDSLIDE_BLOCKED', waterDepthCm: 0 }
      ],
      substations: [
        { id: 'e6', name: 'KSEB Meppadi Hill Substation', lat: 11.5500, lng: 76.1200, status: 'OFFLINE_PRECAUTIONARY', loadPct: 0 }
      ],
      waterNodes: [
        { id: 'w6', name: 'Chaliyar River Flash Gauge', lat: 11.6000, lng: 76.1500, levelPct: 99, alert: 'FLASH_FLOOD_EVACUATE' }
      ],
      municipalTeams: [
        { id: 'm6', name: 'NDRF Battalion #4 High Altitude', lat: 11.6500, lng: 76.0800, status: 'DISPATCHED', size: 40 }
      ]
    }
  }
];
