export const SHARED_INCIDENT_DATA = {
  incidentId: 'INC-2026-MUM-0816',
  title: 'Heavy monsoon rainfall and urban waterlogging',
  updatedAgo: 'Updated 2 min ago',
  demoScenarioTag: 'DEMO SCENARIO — Simulated emergency conditions',
  
  // Shared Core Metrics (Consistent across all components)
  rainfall: 135, // mm / 6 hours
  rainfallPeriod: '6 hours',
  waterloggingProbability: 88,
  waterloggingConfidence: 91,
  trafficCongestionPct: 76,
  hospitalsAtRisk: 3,
  hospitalRiskLevel: 'HIGH',
  hospitalRiskConfidence: 86,
  substationsAtRisk: 2,
  populationAffected: '3.4 million',
  ambulancesRerouted: 14,
  drainagePumpsActivated: 4,
  emergencyCrewsDeployed: 12,
  drainageIncidentsCount: 24,
  soilMoisturePct: 95,

  // Selected Jurisdiction
  jurisdiction: {
    id: 'mumbai-metropolitan',
    name: 'Mumbai Metropolitan Region',
    state: 'Maharashtra',
    center: [19.0760, 72.8777],
    zoom: 12,
    overallRisk: 'HIGH'
  },

  // Map Geographic Features & Markers
  mapLayers: {
    hospitals: [
      { id: 'h1', name: 'KEM Hospital & Trauma ICU', lat: 19.0028, lng: 72.8423, status: 'Access route restricted', bedsAvailable: 12, totalBeds: 250, critical: true },
      { id: 'h2', name: 'Sion Municipal Hospital', lat: 19.0360, lng: 72.8600, status: 'Approach waterlogged', bedsAvailable: 4, totalBeds: 180, critical: true },
      { id: 'h3', name: 'Lilavati Medical Center', lat: 19.0512, lng: 72.8285, status: 'Normal access', bedsAvailable: 45, totalBeds: 200, critical: false }
    ],
    roads: [
      { id: 'r1', name: 'Western Express Highway (Milan Subway)', lat: 19.0910, lng: 72.8480, status: 'Severe waterlogging (45 cm)', impact: '3 major arterial lanes impassable' },
      { id: 'r2', name: 'Hindmata Flyover Corridor', lat: 19.0115, lng: 72.8450, status: 'Waterlogged, slow traffic', impact: 'Alternative route diversion required' },
      { id: 'r3', name: 'Sion Circle Arterial Link', lat: 19.0370, lng: 72.8620, status: 'Heavy congestion', impact: 'Ambulance rerouting in progress' }
    ],
    substations: [
      { id: 'e1', name: 'Dharavi Substation #4', lat: 19.0400, lng: 72.8500, status: 'Inundation risk high', loadPct: 92 },
      { id: 'e2', name: 'Bandra Grid Station', lat: 19.0600, lng: 72.8350, status: 'Operational', loadPct: 68 }
    ],
    waterNodes: [
      { id: 'w1', name: 'Cleveland Bunder Dewatering Station', lat: 19.0080, lng: 72.8200, status: '4 auxiliary pumps active', capacityPct: 88 },
      { id: 'w2', name: 'Mithi River Outfall Sluice Gate #3', lat: 19.0650, lng: 72.8700, status: 'High water level', capacityPct: 94 }
    ],
    rescueTeams: [
      { id: 'm1', name: 'Municipal Disaster Squad #1', lat: 19.0200, lng: 72.8400, personnel: 18, status: 'Deployed to Zone A' },
      { id: 'm2', name: 'Drainage Jetting Unit #7', lat: 19.0800, lng: 72.8600, personnel: 12, status: 'Deployed to Milan Subway' }
    ],
    polygonZones: [
      {
        id: 'zone-a',
        name: 'Zone A — Milan Subway Inundation Belt',
        coordinates: [
          [19.0980, 72.8400],
          [19.0950, 72.8600],
          [19.0800, 72.8550],
          [19.0830, 72.8380]
        ],
        risk: 'HIGH'
      },
      {
        id: 'zone-b',
        name: 'Zone B — Sion & Hindmata Waterlogging Sector',
        coordinates: [
          [19.0450, 72.8480],
          [19.0420, 72.8680],
          [19.0250, 72.8620],
          [19.0280, 72.8420]
        ],
        risk: 'CRITICAL'
      }
    ]
  }
};

export const JURISDICTIONS = [
  { id: 'mumbai-metropolitan', name: 'Mumbai Metropolitan Region', state: 'Maharashtra', center: [19.0760, 72.8777], zoom: 12 },
  { id: 'delhi-ncr', name: 'Delhi NCR (Central)', state: 'Delhi', center: [28.6139, 77.2090], zoom: 12 },
  { id: 'bengaluru-urban', name: 'Bengaluru Metropolitan', state: 'Karnataka', center: [12.9716, 77.5946], zoom: 12 },
  { id: 'chennai-coastal', name: 'Chennai Coastal District', state: 'Tamil Nadu', center: [13.0827, 80.2707], zoom: 12 },
  { id: 'wayanad-kerala', name: 'Wayanad Hill Region', state: 'Kerala', center: [11.6854, 76.1320], zoom: 11 }
];
