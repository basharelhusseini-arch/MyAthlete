/**
 * Reward Points System
 * Converts daily TOTAL Score (Health × Confidence) to reward points
 * 
 * Business Rules:
 * - Total Score = Health Score (0-110) × Confidence Multiplier (1.0-1.25)
 * - totalScore < 50 → 0 reward points
 * - totalScore = 50 → 1 reward point
 * - totalScore = 110 → 25 reward points
 * - Linear increase between 50 and 110
 * 
 * Example:
 * - Health: 85, Confidence: 30 (baseline) → 85 × 1.0 = 85 → 15 points
 * - Health: 85, Confidence: 65 (medium) → 85 × 1.125 = 96 → 19.4 points
 * - Health: 85, Confidence: 100 (max) → 85 × 1.25 = 106 → 23.4 points
 */

/**
 * Calculate reward points from total score (health × confidence)
 * Formula: 0 if < 50, else 1 + (totalScore - 50) * 0.4
 */
export function healthToRewardPoints(totalScore: number): number {
  if (totalScore < 50) return 0;
  
  // Linear formula: slope = (25 - 1) / (110 - 50) = 0.4
  const raw = 1 + (totalScore - 50) * 0.4;
  
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
 * Examples of reward points calculation (using TOTAL score)
 * 
 * totalScore = 40  → 0 points (below threshold)
 * totalScore = 50  → 1 point
 * totalScore = 60  → 5 points
 * totalScore = 70  → 9 points
 * totalScore = 80  → 13 points
 * totalScore = 90  → 17 points
 * totalScore = 100 → 21 points
 * totalScore = 110 → 25 points
 * totalScore = 120 → 29 points (with high confidence bonus)
 * totalScore = 137 → 35.8 points (max possible: 110 × 1.25)
 */
