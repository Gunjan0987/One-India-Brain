/**
 * One India Brain — Centralized Emergency Operations & Decision-Support Scenario Store
 * All pages, maps, KPI cards, predictions, and recommendations read from this single source of truth.
 */

export const JURISDICTION_DATA_MAP = {
  'delhi-ncr': {
    incident: {
      id: 'INC-2026-DEL-0816',
      title: 'Heavy rainfall and urban waterlogging',
      location: 'Delhi NCR',
      rainfall: 135,
      rainfallPeriod: '6 hours',
      riskLevel: 'HIGH',
      updatedAgo: 'Updated 2 min ago',
      activeIncidentsCount: 7,
      highRiskZonesCount: 12,
      hospitalsAtRiskCount: 3,
      hospitalRiskConfidence: 86,
      roadsAtRiskCount: 8,
      roadBlockageProbability: 81,
      emergencyTeamsDeployedCount: 12,
      estimatedPopulationExposed: '3.4M',
      waterloggingProbability: 88,
      waterloggingConfidence: 91,
      trafficCongestionPct: 76,
      ambulancesReroutedCount: 14,
      drainagePumpsActivatedCount: 4,
      substationsAtRiskCount: 2,
      estimatedAmbulanceDelayMin: 17,
      powerInfrastructureRiskPct: 23
    },
    transportHotspots: [
      { id: 'tr-1', road: 'Minto Bridge Underpass', status: 'Inundated (50 cm)', blockageProb: 92, delay: '+32 min', coords: [28.6320, 77.2220], hospitalImpact: '2 facilities' },
      { id: 'tr-2', road: 'Ring Road Dhaula Kuan', status: 'Heavy congestion', blockageProb: 81, delay: '+18 min', coords: [28.5910, 77.1610], hospitalImpact: '1 facility' },
      { id: 'tr-3', road: 'ITO Arterial Junction', status: 'Slow moving traffic', blockageProb: 75, delay: '+14 min', coords: [28.6280, 77.2400], hospitalImpact: '1 facility' },
      { id: 'tr-4', road: 'Mathura Road Corridor', status: 'Moderate waterlogging', blockageProb: 68, delay: '+10 min', coords: [28.5800, 77.2450], hospitalImpact: '1 facility' }
    ],
    hospitals: [
      { id: 'h-1', name: 'City Central Trauma Hospital', risk: 'HIGH', icuBeds: 8, totalBeds: 180, ambulances: 3, accessStatus: 'Restricted (Minto underpass waterlogged)', nearestRoad: 'Minto Bridge Underpass', delay: '+17 min', action: 'Pre-route emergency vehicles via Elevated Bypass', coords: [28.6360, 77.2410] },
      { id: 'h-2', name: 'National Medical Research Institute', risk: 'CRITICAL', icuBeds: 4, totalBeds: 350, ambulances: 6, accessStatus: 'Approach road waterlogged (25 cm)', nearestRoad: 'Outer Ring Corridor', delay: '+14 min', action: 'Stage 4 mobile ICU units at Elevated Gate B', coords: [28.5672, 77.2100] },
      { id: 'h-3', name: 'Metropolitan General Care', risk: 'HIGH', icuBeds: 12, totalBeds: 120, ambulances: 2, accessStatus: 'Slower response corridor', nearestRoad: 'ITO Junction', delay: '+10 min', action: 'Divert non-critical ambulances to North Facility', coords: [28.6200, 77.2150] }
    ],
    waterZones: [
      { id: 'wz-1', area: 'Zone 4 — Minto Bridge Basin', level: '45 cm runoff', risk: 'CRITICAL', pumpStatus: '2 Pumps active', action: 'Deploy auxiliary dewatering pump #3', coords: [28.6320, 77.2220] },
      { id: 'wz-2', area: 'Zone 7 — Yamuna Barrage Spillway', level: '88% capacity', risk: 'HIGH', pumpStatus: 'Monitored', action: 'Open sluice gate #2 during low tide', coords: [28.6100, 77.2500] },
      { id: 'wz-3', area: 'Zone 2 — ITO Drainage Underpass', level: '30 cm runoff', risk: 'HIGH', pumpStatus: '2 Pumps active', action: 'Clear debris silt trap at outlet', coords: [28.6280, 77.2400] }
    ],
    substations: [
      { id: 'el-1', name: 'Substation East-04', exposure: 'HIGH', failureProbPct: 23, facilities: 'City Central Trauma Hospital ICU', action: 'Inspect transformer yard and activate backup supply', coords: [28.6280, 77.2400] },
      { id: 'el-2', name: 'Central Hospital Transformer Yard', exposure: 'HIGH', failureProbPct: 18, facilities: 'National Medical Research Institute', action: 'Auto-isolate non-essential feeder line', coords: [28.5672, 77.2100] }
    ]
  },

  'mumbai-metropolitan': {
    incident: {
      id: 'INC-2026-BOM-0912',
      title: 'Monsoon high-tide and urban basin flooding',
      location: 'Mumbai Metropolitan Region',
      rainfall: 160,
      rainfallPeriod: '6 hours',
      riskLevel: 'CRITICAL',
      updatedAgo: 'Updated 1 min ago',
      activeIncidentsCount: 11,
      highRiskZonesCount: 18,
      hospitalsAtRiskCount: 5,
      hospitalRiskConfidence: 89,
      roadsAtRiskCount: 14,
      roadBlockageProbability: 89,
      emergencyTeamsDeployedCount: 24,
      estimatedPopulationExposed: '12.5M',
      waterloggingProbability: 94,
      waterloggingConfidence: 95,
      trafficCongestionPct: 88,
      ambulancesReroutedCount: 28,
      drainagePumpsActivatedCount: 9,
      substationsAtRiskCount: 4,
      estimatedAmbulanceDelayMin: 28,
      powerInfrastructureRiskPct: 38
    },
    transportHotspots: [
      { id: 'tr-m1', road: 'Milan Subway Underpass', status: 'Inundated (70 cm)', blockageProb: 95, delay: '+45 min', coords: [19.0910, 72.8410], hospitalImpact: '3 facilities' },
      { id: 'tr-m2', road: 'Hindmata Dadar Junction', status: 'Severe waterlogging', blockageProb: 90, delay: '+35 min', coords: [19.0180, 72.8420], hospitalImpact: '2 facilities' },
      { id: 'tr-m3', road: 'WEH Bandra Connector', status: 'Gridlock congestion', blockageProb: 84, delay: '+25 min', coords: [19.0600, 72.8350], hospitalImpact: '1 facility' }
    ],
    hospitals: [
      { id: 'h-m1', name: 'KEM Emergency Medical Center', risk: 'CRITICAL', icuBeds: 12, totalBeds: 450, ambulances: 8, accessStatus: 'Hindmata road inundated (40 cm)', nearestRoad: 'Hindmata Dadar Junction', delay: '+28 min', action: 'Pre-route ambulances via Tilak Bridge', coords: [19.0024, 72.8420] },
      { id: 'h-m2', name: 'Sion Municipal General Hospital', risk: 'CRITICAL', icuBeds: 6, totalBeds: 380, ambulances: 7, accessStatus: 'Low-lying courtyard waterlogged', nearestRoad: 'Sion Circle Flyover', delay: '+25 min', action: 'Deploy emergency dewatering pumps at South Gate', coords: [19.0360, 72.8600] }
    ],
    waterZones: [
      { id: 'wz-m1', area: 'Hindmata Basin Zone 1', level: '60 cm runoff', risk: 'CRITICAL', pumpStatus: '4 Pumps active', action: 'Activate high-capacity storm pumps at Britannia outflow', coords: [19.0180, 72.8420] },
      { id: 'wz-m2', area: 'Milan Subway Dewatering Basin', level: '70 cm runoff', risk: 'CRITICAL', pumpStatus: '3 Pumps active', action: 'Clear sluice channel gates', coords: [19.0910, 72.8410] }
    ],
    substations: [
      { id: 'el-m1', name: 'Dadar Switching Station', exposure: 'CRITICAL', failureProbPct: 38, facilities: 'KEM Emergency & ICU', action: 'Deploy mobile diesel generators and flood barrier dams', coords: [19.0180, 72.8420] }
    ]
  },

  'bengaluru-urban': {
    incident: {
      id: 'INC-2026-BLR-0418',
      title: 'Stormwater channel overflow & arterial congestion',
      location: 'Bengaluru',
      rainfall: 110,
      rainfallPeriod: '4 hours',
      riskLevel: 'HIGH',
      updatedAgo: 'Updated 4 min ago',
      activeIncidentsCount: 5,
      highRiskZonesCount: 9,
      hospitalsAtRiskCount: 2,
      hospitalRiskConfidence: 82,
      roadsAtRiskCount: 6,
      roadBlockageProbability: 74,
      emergencyTeamsDeployedCount: 10,
      estimatedPopulationExposed: '8.1M',
      waterloggingProbability: 82,
      waterloggingConfidence: 88,
      trafficCongestionPct: 71,
      ambulancesReroutedCount: 11,
      drainagePumpsActivatedCount: 3,
      substationsAtRiskCount: 1,
      estimatedAmbulanceDelayMin: 14,
      powerInfrastructureRiskPct: 18
    },
    transportHotspots: [
      { id: 'tr-b1', road: 'Silk Board Junction Flyover', status: 'Severe traffic bottleneck', blockageProb: 80, delay: '+22 min', coords: [12.9170, 77.6230], hospitalImpact: '1 facility' },
      { id: 'tr-b2', road: 'Outer Ring Road Bellandur', status: 'Stormwater overflow', blockageProb: 76, delay: '+16 min', coords: [12.9280, 77.6820], hospitalImpact: '1 facility' }
    ],
    hospitals: [
      { id: 'h-b1', name: 'St. John Trauma & Care Hospital', risk: 'HIGH', icuBeds: 15, totalBeds: 310, ambulances: 5, accessStatus: 'Silk board gridlock delay', nearestRoad: 'Silk Board Junction', delay: '+14 min', action: 'Pre-route ambulances via Hosur Road Elevated Expressway', coords: [12.9340, 77.6190] }
    ],
    waterZones: [
      { id: 'wz-b1', area: 'Bellandur Rajakaluve Channel', level: '90% capacity', risk: 'HIGH', pumpStatus: '2 Pumps active', action: 'Clear blockage at primary drainage outlet', coords: [12.9280, 77.6820] }
    ],
    substations: [
      { id: 'el-b1', name: 'Koramangala 66kV Substation', exposure: 'MODERATE', failureProbPct: 18, facilities: 'St. John Emergency Wing', action: 'Monitor runoff level and clear storm channels', coords: [12.9340, 77.6190] }
    ]
  },

  'lucknow-central': {
    incident: {
      id: 'INC-2026-LKO-0511',
      title: 'Gomti basin inundation & low-lying waterlogging',
      location: 'Lucknow',
      rainfall: 125,
      rainfallPeriod: '5 hours',
      riskLevel: 'HIGH',
      updatedAgo: 'Updated 3 min ago',
      activeIncidentsCount: 6,
      highRiskZonesCount: 10,
      hospitalsAtRiskCount: 3,
      hospitalRiskConfidence: 84,
      roadsAtRiskCount: 7,
      roadBlockageProbability: 78,
      emergencyTeamsDeployedCount: 11,
      estimatedPopulationExposed: '3.8M',
      waterloggingProbability: 85,
      waterloggingConfidence: 89,
      trafficCongestionPct: 69,
      ambulancesReroutedCount: 12,
      drainagePumpsActivatedCount: 4,
      substationsAtRiskCount: 2,
      estimatedAmbulanceDelayMin: 15,
      powerInfrastructureRiskPct: 21
    },
    transportHotspots: [
      { id: 'tr-l1', road: 'Hazratganj Main Corridor', status: 'Waterlogging & slow traffic', blockageProb: 82, delay: '+20 min', coords: [26.8500, 80.9490], hospitalImpact: '2 facilities' }
    ],
    hospitals: [
      { id: 'h-l1', name: 'KGMU Emergency Trauma Center', risk: 'HIGH', icuBeds: 10, totalBeds: 400, ambulances: 6, accessStatus: 'Chowk approach congested', nearestRoad: 'Hazratganj Corridor', delay: '+15 min', action: 'Reroute via Medical College Bypass', coords: [26.8680, 80.9150] }
    ],
    waterZones: [
      { id: 'wz-l1', area: 'Gomti Riverfront Basin', level: '40 cm runoff', risk: 'HIGH', pumpStatus: '3 Pumps active', action: 'Deploy portable dewatering trailers', coords: [26.8500, 80.9490] }
    ],
    substations: [
      { id: 'el-l1', name: 'Chowk Distribution Substation', exposure: 'HIGH', failureProbPct: 21, facilities: 'KGMU Trauma Center ICU', action: 'Secure transformer bunding', coords: [26.8680, 80.9150] }
    ]
  },

  'chennai-coastal': {
    incident: {
      id: 'INC-2026-MAA-1104',
      title: 'Coastal storm surge & drainage inundation',
      location: 'Chennai',
      rainfall: 185,
      rainfallPeriod: '8 hours',
      riskLevel: 'CRITICAL',
      updatedAgo: 'Updated 2 min ago',
      activeIncidentsCount: 14,
      highRiskZonesCount: 22,
      hospitalsAtRiskCount: 6,
      hospitalRiskConfidence: 91,
      roadsAtRiskCount: 16,
      roadBlockageProbability: 92,
      emergencyTeamsDeployedCount: 30,
      estimatedPopulationExposed: '7.2M',
      waterloggingProbability: 96,
      waterloggingConfidence: 94,
      trafficCongestionPct: 84,
      ambulancesReroutedCount: 32,
      drainagePumpsActivatedCount: 12,
      substationsAtRiskCount: 5,
      estimatedAmbulanceDelayMin: 34,
      powerInfrastructureRiskPct: 42
    },
    transportHotspots: [
      { id: 'tr-c1', road: 'GST Road Guindy Underpass', status: 'Inundated (80 cm)', blockageProb: 96, delay: '+50 min', coords: [13.0060, 80.2020], hospitalImpact: '3 facilities' }
    ],
    hospitals: [
      { id: 'h-c1', name: 'Rajiv Gandhi Government General Hospital', risk: 'CRITICAL', icuBeds: 18, totalBeds: 600, ambulances: 12, accessStatus: 'Central Station Road flooded', nearestRoad: 'GST Road Guindy', delay: '+34 min', action: 'Pre-route ambulances via Kathipara Flyover', coords: [13.0810, 80.2780] }
    ],
    waterZones: [
      { id: 'wz-c1', area: 'Adyar River Basin Zone', level: '85 cm runoff', risk: 'CRITICAL', pumpStatus: '6 Pumps active', action: 'Open surplus barrage gates', coords: [13.0060, 80.2020] }
    ],
    substations: [
      { id: 'el-c1', name: 'Guindy 110kV Substation', exposure: 'CRITICAL', failureProbPct: 42, facilities: 'General Hospital ICU', action: 'Deploy emergency barrier walls and auxiliary power lines', coords: [13.0060, 80.2020] }
    ]
  }
};

export const INITIAL_DATA = {
  jurisdictions: [
    { id: 'delhi-ncr', name: 'Delhi NCR', state: 'Delhi', center: [28.6139, 77.2090], zoom: 12 },
    { id: 'mumbai-metropolitan', name: 'Mumbai Metropolitan Region', state: 'Maharashtra', center: [19.0760, 72.8777], zoom: 12 },
    { id: 'bengaluru-urban', name: 'Bengaluru', state: 'Karnataka', center: [12.9716, 77.5946], zoom: 12 },
    { id: 'lucknow-central', name: 'Lucknow', state: 'Uttar Pradesh', center: [26.8467, 80.9462], zoom: 12 },
    { id: 'chennai-coastal', name: 'Chennai', state: 'Tamil Nadu', center: [13.0827, 80.2707], zoom: 12 }
  ],

  incident: JURISDICTION_DATA_MAP['delhi-ncr'].incident,

  // ALERTS MANAGEMENT DATA
  alerts: [
    {
      id: 'alt-1',
      severity: 'HIGH',
      title: 'Hospital accessibility risk',
      location: 'Delhi NCR',
      affectedDomains: 'Transport + Healthcare',
      time: '2 min ago',
      affectedPeople: '3.4M citizens exposed',
      cause: 'Road blockage probability 81%',
      recommended: 'Pre-route emergency vehicles via Elevated Bypass',
      status: 'Action recommended'
    },
    {
      id: 'alt-2',
      severity: 'CRITICAL',
      title: 'Urban waterlogging hazard in primary basin',
      location: 'Delhi NCR (Minto Basin)',
      affectedDomains: 'Water + Municipal',
      time: '5 min ago',
      affectedPeople: '88% inundation risk',
      cause: 'Heavy rainfall 135 mm in 6 hours',
      recommended: 'Activate 4 auxiliary dewatering pumps',
      status: 'In progress'
    },
    {
      id: 'alt-3',
      severity: 'HIGH',
      title: 'Substation ground inundation risk',
      location: 'Substation East-04',
      affectedDomains: 'Electricity + Healthcare',
      time: '12 min ago',
      affectedPeople: 'City Trauma Center ICU Feeder',
      cause: 'Power infrastructure risk 23%',
      recommended: 'Protect critical hospital power & deploy flood barriers',
      status: 'Action recommended'
    },
    {
      id: 'alt-4',
      severity: 'MEDIUM',
      title: 'Localized public weather advisory',
      location: 'Delhi NCR Low-Lying Zones',
      affectedDomains: 'Municipal',
      time: '20 min ago',
      affectedPeople: 'High population exposure corridors',
      cause: 'Rainfall forecast 135 mm',
      recommended: 'Issue localized public emergency warning',
      status: 'Dispatched'
    }
  ]
};

export function getJurisdictionData(jurisdictionId) {
  return JURISDICTION_DATA_MAP[jurisdictionId] || JURISDICTION_DATA_MAP['delhi-ncr'];
}

export function getIncidentDataForJurisdiction(jurisdictionId) {
  return getJurisdictionData(jurisdictionId).incident;
}
