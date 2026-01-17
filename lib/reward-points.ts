/**
 * Reward Points System
 * Converts daily Health Score to reward points
 * 
 * Business Rules:
 * - healthScore < 50 → 0 reward points
 * - healthScore = 50 → 1 reward point
 * - healthScore = 110 → 25 reward points
 * - Linear increase between 50 and 110
 */

/**
 * Calculate reward points from health score
 * Formula: 0 if < 50, else 1 + (healthScore - 50) * 0.4
 */
export function healthToRewardPoints(healthScore: number): number {
  if (healthScore < 50) return 0;
  
  // Linear formula: slope = (25 - 1) / (110 - 50) = 0.4
  const raw = 1 + (healthScore - 50) * 0.4;
  
  // Keep 2 decimals for precision
  return Math.floor(raw * 100) / 100;
}

/**
 * Get reward points tier information
 */
export function getRewardTier(points: number): {
  tier: string;
  nextTier: string | null;
  pointsToNext: number;
  color: string;
} {
  if (points < 250) {
    return {
      tier: 'Bronze',
      nextTier: 'Silver',
      pointsToNext: 250 - points,
      color: 'from-amber-700 to-orange-700',
    };
  }
  
  if (points < 500) {
    return {
      tier: 'Silver',
      nextTier: 'Gold',
      pointsToNext: 500 - points,
      color: 'from-gray-400 to-gray-600',
    };
  }
  
  if (points < 1000) {
    return {
      tier: 'Gold',
      nextTier: 'Platinum',
      pointsToNext: 1000 - points,
      color: 'from-yellow-500 to-orange-500',
    };
  }
  
  if (points < 1500) {
    return {
      tier: 'Platinum',
      nextTier: 'Diamond',
      pointsToNext: 1500 - points,
      color: 'from-cyan-400 to-blue-500',
    };
  }
  
  return {
    tier: 'Diamond',
    nextTier: null,
    pointsToNext: 0,
    color: 'from-purple-500 to-pink-500',
  };
}

/**
 * Examples of reward points calculation
 * 
 * healthScore = 40  → 0 points (below threshold)
 * healthScore = 50  → 1 point
 * healthScore = 60  → 5 points
 * healthScore = 70  → 9 points
 * healthScore = 80  → 13 points
 * healthScore = 90  → 17 points
 * healthScore = 100 → 21 points
 * healthScore = 110 → 25 points
 */
