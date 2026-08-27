export const EXPLAINABLE_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Reroute 14 emergency ambulances via Eastern Corridor flyovers',
    department: 'Transport Department',
    priority: 'HIGH',
    status: 'In progress',
    whyThisMatters: 'Western Express Highway and Milan Subway have an 81% predicted blockage probability due to 45 cm inundation.',
    operationalImpact: 'Estimated ambulance response delay reduced by 17 minutes.',
    targetCoords: [19.0910, 72.8480],
    targetName: 'Milan Subway & Eastern Corridor'
  },
  {
    id: 'rec-2',
    title: 'Deploy 4 auxiliary dewatering pumps to Cleveland Bunder',
    department: 'Water Management',
    priority: 'CRITICAL',
    status: 'Deployed',
    whyThisMatters: 'Mithi River drainage outfall capacity is saturated at 94%, threatening upstream road overflows.',
    operationalImpact: 'Prevents additional 20 cm water accumulation across Hindmata underpass.',
    targetCoords: [19.0080, 72.8200],
    targetName: 'Cleveland Dewatering Station'
  },
  {
    id: 'rec-3',
    title: 'Isolate & load-balance Dharavi Power Substation #4',
    department: 'Electricity Department',
    priority: 'HIGH',
    status: 'Active',
    whyThisMatters: 'Substation #4 is located in a high inundation risk zone; thermal load is currently at 92%.',
    operationalImpact: 'Protects uninterrupted feeder line to KEM Hospital Emergency Trauma ICU.',
    targetCoords: [19.0400, 72.8500],
    targetName: 'Dharavi Substation #4'
  },
  {
    id: 'rec-4',
    title: 'Dispatch 12 municipal emergency crews to clear drainage traps',
    department: 'Municipal Services',
    priority: 'HIGH',
    status: 'Dispatched',
    whyThisMatters: '24 reported drainage clogging complaints are causing localized backflow in Ward F/North.',
    operationalImpact: 'Clears storm drain bottlenecks and restores 80% drainage flow rate within 30 mins.',
    targetCoords: [19.0200, 72.8400],
    targetName: 'Ward F/North Storm Drain Nodes'
  },
  {
    id: 'rec-5',
    title: 'Issue localized public travel warning (SMS Broadcast)',
    department: 'Disaster Management',
    priority: 'MEDIUM',
    status: 'Broadcasted',
    whyThisMatters: '3.4M citizens are currently traveling towards inundated highway choke points.',
    operationalImpact: 'Reduces private vehicle influx into flooded corridors by an estimated 35%.',
    targetCoords: [19.0760, 72.8777],
    targetName: 'Mumbai District Corridor'
  }
];
