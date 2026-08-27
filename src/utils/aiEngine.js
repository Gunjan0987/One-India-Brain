/**
 * One India Brain - AI Cross-Domain Reasoning & Impact Analysis Engine
 */

export function calculateCrossDomainImpact(rainfall, gridLoad, trafficDensity, hospitalOccupancy) {
  // 1. Waterlogging Risk Score (0 - 100)
  const waterlogRisk = Math.min(100, Math.round(rainfall * 0.65 + (trafficDensity * 0.15)));
  
  // 2. Road Blockade Probability
  const roadBlockadeProb = Math.min(98, Math.round(waterlogRisk * 0.85 + 10));
  
  // 3. Hospital Accessibility Impact
  const hospitalRiskScore = Math.min(99, Math.round((roadBlockadeProb * 0.6) + (hospitalOccupancy * 0.4)));
  
  // 4. Power Grid Vulnerability
  const gridVulnerability = Math.min(99, Math.round((gridLoad * 0.7) + (waterlogRisk * 0.25)));
  
  // 5. Without AI vs With AI Metrics
  const ambulanceDelayWithoutAI = Math.round(10 + (roadBlockadeProb * 0.35));
  const ambulanceDelayWithAI = Math.round(5 + (roadBlockadeProb * 0.08));

  const hospitalAccessTimeWithoutAI = Math.round(15 + (hospitalRiskScore * 0.4));
  const hospitalAccessTimeWithAI = Math.round(8 + (hospitalRiskScore * 0.12));

  const overallRiskLevel = 
    hospitalRiskScore > 75 || waterlogRisk > 80 ? 'CRITICAL' :
    hospitalRiskScore > 50 || waterlogRisk > 50 ? 'WARNING' : 'NORMAL';

  return {
    waterlogRisk,
    roadBlockadeProb,
    hospitalRiskScore,
    gridVulnerability,
    overallRiskLevel,
    withoutAI: {
      ambulanceDelay: ambulanceDelayWithoutAI,
      hospitalAccessTime: hospitalAccessTimeWithoutAI,
      gridFailurePct: Math.round(gridVulnerability * 0.9),
      trafficGridlock: Math.min(95, Math.round(trafficDensity * 1.15))
    },
    withAI: {
      ambulanceDelay: ambulanceDelayWithAI,
      hospitalAccessTime: hospitalAccessTimeWithAI,
      gridFailurePct: Math.max(5, Math.round(gridVulnerability * 0.15)),
      trafficGridlock: Math.round(trafficDensity * 0.45)
    }
  };
}

export function generateCascadeDAG(scenario) {
  if (!scenario || !scenario.dominoChain) return [];

  return scenario.dominoChain.map((item, idx) => ({
    ...item,
    id: `dag-node-${idx + 1}`,
    impactLevel: idx === 0 ? 'Primary Trigger' : `Cascading Effect #${idx}`
  }));
}
