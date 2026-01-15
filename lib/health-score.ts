// Health Score Calculation - Integrated with Nutrition Tracking
// Simple, explainable algorithm that uses real meal data

export interface CheckinData {
  didWorkout: boolean;
  calories: number | null; // From logged meals or manual entry
  sleepHours: number | null;
}

export interface NutritionTarget {
  calories: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
}

export interface ConsumedNutrition {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface HealthScoreResult {
  totalScore: number;
  trainingScore: number;
  dietScore: number;
  sleepScore: number;
  macroAdherenceBonus?: number;
}

// Default calorie target (used if no nutrition plan exists)
const DEFAULT_CALORIE_TARGET = 2200;
const CALORIE_TOLERANCE = 300; // ±300 calories is good

/**
 * Calculate health score from daily check-in data
 * Total: 0-100 points
 * - Training: 0-30 points
 * - Diet: 0-40 points (with macro adherence bonus)
 * - Sleep: 0-30 points
 */
export function calculateHealthScore(
  data: CheckinData,
  target?: NutritionTarget,
  consumed?: ConsumedNutrition
): HealthScoreResult {
  // Training Score (0-30 points)
  const trainingScore = data.didWorkout ? 30 : 0;

  // Diet Score (0-40 points)
  let dietScore = 0;
  let macroAdherenceBonus = 0;

  const calories = data.calories !== null ? data.calories : (consumed?.calories || 0);
  const calorieTarget = target?.calories || DEFAULT_CALORIE_TARGET;

  if (calories > 0) {
    const diff = Math.abs(calories - calorieTarget);
    
    if (diff <= CALORIE_TOLERANCE) {
      // Perfect range: full points
      dietScore = 40;
    } else {
      // Deduct points based on how far off target
      // -1 point per 50 calories off (after tolerance)
      const pointsOff = Math.floor((diff - CALORIE_TOLERANCE) / 50);
      dietScore = Math.max(0, 40 - pointsOff);
    }

    // Macro Adherence Bonus (up to +10 points if within targets)
    if (target && consumed && target.protein_g && target.carbs_g && target.fat_g) {
      let macroScore = 0;

      // Protein adherence (±15%)
      const proteinDiff = Math.abs(consumed.protein_g - target.protein_g);
      if (proteinDiff <= target.protein_g * 0.15) {
        macroScore += 4; // Close to target
      } else if (proteinDiff <= target.protein_g * 0.25) {
        macroScore += 2; // Within 25%
      }

      // Carbs adherence (±15%)
      const carbsDiff = Math.abs(consumed.carbs_g - target.carbs_g);
      if (carbsDiff <= target.carbs_g * 0.15) {
        macroScore += 3;
      } else if (carbsDiff <= target.carbs_g * 0.25) {
        macroScore += 1;
      }

      // Fat adherence (±15%)
      const fatDiff = Math.abs(consumed.fat_g - target.fat_g);
      if (fatDiff <= target.fat_g * 0.15) {
        macroScore += 3;
      } else if (fatDiff <= target.fat_g * 0.25) {
        macroScore += 1;
      }

      macroAdherenceBonus = macroScore;
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

  const totalScore = Math.min(100, trainingScore + dietScore + sleepScore + macroAdherenceBonus);

  return {
    totalScore,
    trainingScore,
    dietScore,
    sleepScore,
    macroAdherenceBonus: macroAdherenceBonus > 0 ? macroAdherenceBonus : undefined,
  };
}

/**
 * Calculate diet score with macro adherence
 * Useful for nutrition tracking page
 */
export function calculateDietScore(
  consumed: ConsumedNutrition,
  target?: NutritionTarget
): { score: number; macroBonus: number; feedback: string } {
  const calorieTarget = target?.calories || DEFAULT_CALORIE_TARGET;
  const diff = Math.abs(consumed.calories - calorieTarget);
  
  let score = 0;
  if (diff <= CALORIE_TOLERANCE) {
    score = 40;
  } else {
    const pointsOff = Math.floor((diff - CALORIE_TOLERANCE) / 50);
    score = Math.max(0, 40 - pointsOff);
  }

  let macroBonus = 0;
  let feedback = '';

  if (target && target.protein_g && target.carbs_g && target.fat_g) {
    const proteinDiff = Math.abs(consumed.protein_g - target.protein_g);
    const carbsDiff = Math.abs(consumed.carbs_g - target.carbs_g);
    const fatDiff = Math.abs(consumed.fat_g - target.fat_g);

    const proteinOnTarget = proteinDiff <= target.protein_g * 0.15;
    const carbsOnTarget = carbsDiff <= target.carbs_g * 0.15;
    const fatOnTarget = fatDiff <= target.fat_g * 0.15;

    if (proteinOnTarget) macroBonus += 4;
    else if (proteinDiff <= target.protein_g * 0.25) macroBonus += 2;

    if (carbsOnTarget) macroBonus += 3;
    else if (carbsDiff <= target.carbs_g * 0.25) macroBonus += 1;

    if (fatOnTarget) macroBonus += 3;
    else if (fatDiff <= target.fat_g * 0.25) macroBonus += 1;

    if (proteinOnTarget && carbsOnTarget && fatOnTarget) {
      feedback = 'Excellent macro balance!';
    } else if (macroBonus >= 7) {
      feedback = 'Good macro adherence';
    } else {
      feedback = 'Try to hit your macro targets more closely';
    }
  } else {
    if (diff <= CALORIE_TOLERANCE) {
      feedback = 'Great calorie control!';
    } else {
      feedback = consumed.calories > calorieTarget ? 'Slightly over target' : 'Slightly under target';
    }
  }

  return { score, macroBonus, feedback };
}
