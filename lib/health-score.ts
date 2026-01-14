// Health Score Calculation for MVP
// Simple, explainable algorithm

export interface CheckinData {
  didWorkout: boolean;
  calories: number | null;
  sleepHours: number | null;
}

export interface HealthScoreResult {
  totalScore: number;
  trainingScore: number;
  dietScore: number;
  sleepScore: number;
}

// Default calorie target (can be personalized per user later)
const DEFAULT_CALORIE_TARGET = 2200;
const CALORIE_TOLERANCE = 300; // ±300 calories is good

/**
 * Calculate health score from daily check-in data
 * Total: 0-100 points
 * - Training: 0-30 points
 * - Diet: 0-40 points
 * - Sleep: 0-30 points
 */
export function calculateHealthScore(data: CheckinData): HealthScoreResult {
  // Training Score (0-30 points)
  const trainingScore = data.didWorkout ? 30 : 0;

  // Diet Score (0-40 points)
  let dietScore = 0;
  if (data.calories !== null) {
    const diff = Math.abs(data.calories - DEFAULT_CALORIE_TARGET);
    
    if (diff <= CALORIE_TOLERANCE) {
      // Perfect range: full points
      dietScore = 40;
    } else {
      // Deduct points based on how far off target
      // -1 point per 50 calories off (after tolerance)
      const pointsOff = Math.floor((diff - CALORIE_TOLERANCE) / 50);
      dietScore = Math.max(0, 40 - pointsOff);
    }
  }

  // Sleep Score (0-30 points)
  let sleepScore = 0;
  if (data.sleepHours !== null) {
    if (data.sleepHours >= 7 && data.sleepHours <= 9) {
      // Optimal sleep: full points
      sleepScore = 30;
    } else if (data.sleepHours >= 6 && data.sleepHours < 7) {
      // Slightly under: 20 points
      sleepScore = 20;
    } else if (data.sleepHours > 9 && data.sleepHours <= 10) {
      // Slightly over: 20 points
      sleepScore = 20;
    } else if (data.sleepHours >= 5 && data.sleepHours < 6) {
      // Under: 10 points
      sleepScore = 10;
    } else if (data.sleepHours > 10 && data.sleepHours <= 11) {
      // Over: 10 points
      sleepScore = 10;
    } else {
      // Too little or too much: 5 points
      sleepScore = 5;
    }
  }

  const totalScore = Math.min(100, trainingScore + dietScore + sleepScore);

  return {
    totalScore,
    trainingScore,
    dietScore,
    sleepScore,
  };
}
