// Health Score Calculation - Integrated with Nutrition and Habit Tracking
// Simple, explainable algorithm that uses real meal data and wellness habits
// ONLY calculates scores for sections where data has been logged

export interface CheckinData {
  didWorkout: boolean;
  calories: number | null; // From logged meals or manual entry
  sleepHours: number | null;
  habits?: HabitData; // Wellness habits
  // Flags to track which sections have been logged
  hasLoggedMeals?: boolean; // True if user logged actual meals in nutrition tracker
  hasLoggedWorkout?: boolean; // True if user completed/logged a workout
  hasLoggedSleep?: boolean; // True if user entered sleep hours
  hasLoggedHabits?: boolean; // True if user checked any habits
}

export interface HabitData {
  sauna?: boolean;
  steamRoom?: boolean;
  iceBath?: boolean;
  coldShower?: boolean;
  meditation?: boolean;
  stretching?: boolean;
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
  habitScore: number;
  breakdown?: {
    calorieScore: number;
    macroScore: number;
    habitsCompleted: number;
    sectionsLogged: string[]; // Which sections were included in calculation
    sectionsAvailable: number; // How many sections were logged
    maxPossibleScore: number; // Max score based on logged sections
  };
}

// Default calorie target (used if no nutrition plan exists)
const DEFAULT_CALORIE_TARGET = 2200;
const CALORIE_TOLERANCE = 300; // ±300 calories is good

// Maximum points per section
const MAX_TRAINING_SCORE = 30;
const MAX_DIET_SCORE = 40;
const MAX_SLEEP_SCORE = 30;
const MAX_HABIT_SCORE = 10;
const MAX_TOTAL_SCORE = 110;

/**
 * Calculate health score from daily check-in data
 * 
 * NEW BEHAVIOR:
 * - Only sections with logged data are included in the calculation
 * - Total score is scaled proportionally based on which sections were logged
 * - Example: If only Nutrition (40pts) and Sleep (30pts) are logged:
 *   - Max possible = 70 points
 *   - If you get 35/40 nutrition + 25/30 sleep = 60/70 = 85.7%
 *   - Final score = 85.7% × 110 = 94 points
 * 
 * This ensures users aren't penalized for not logging all sections
 */
export function calculateHealthScore(
  data: CheckinData,
  target?: NutritionTarget,
  consumed?: ConsumedNutrition
): HealthScoreResult {
  const sectionsLogged: string[] = [];
  let maxPossibleScore = 0;
  
  // Training Score (0-30 points)
  // Only count if user explicitly logged a workout
  let trainingScore = 0;
  const hasLoggedWorkout = data.hasLoggedWorkout ?? (data.didWorkout !== null && data.didWorkout !== undefined);
  
  if (hasLoggedWorkout) {
    trainingScore = data.didWorkout ? 30 : 0;
    maxPossibleScore += MAX_TRAINING_SCORE;
    sectionsLogged.push('Training');
  }

  // Diet Score (0-40 points) - Only count if user logged meals or calories
  let calorieScore = 0;
  let macroScore = 0;
  const calories = data.calories !== null ? data.calories : (consumed?.calories || 0);
  const hasLoggedNutrition = data.hasLoggedMeals ?? (calories > 0);
  
  if (hasLoggedNutrition) {
    const calorieTarget = target?.calories || DEFAULT_CALORIE_TARGET;
    
    if (calories > 0) {
      const diff = Math.abs(calories - calorieTarget);
      
      // Calorie Score (0-25 points)
      if (diff <= CALORIE_TOLERANCE) {
        // Perfect range: full points
        calorieScore = 25;
      } else {
        // Deduct points based on how far off target
        // -1 point per 50 calories off (after tolerance)
        const pointsOff = Math.floor((diff - CALORIE_TOLERANCE) / 50);
        calorieScore = Math.max(0, 25 - pointsOff);
      }

      // Macro Score (0-15 points) - Only if targets and consumed data available
      if (target && consumed && target.protein_g && target.carbs_g && target.fat_g) {
        // Protein adherence (0-6 points)
        const proteinDiff = Math.abs(consumed.protein_g - target.protein_g);
        if (proteinDiff <= target.protein_g * 0.10) {
          macroScore += 6; // Perfect
        } else if (proteinDiff <= target.protein_g * 0.15) {
          macroScore += 4; // Good
        } else if (proteinDiff <= target.protein_g * 0.25) {
          macroScore += 2; // Acceptable
        }

        // Carbs adherence (0-5 points)
        const carbsDiff = Math.abs(consumed.carbs_g - target.carbs_g);
        if (carbsDiff <= target.carbs_g * 0.10) {
          macroScore += 5; // Perfect
        } else if (carbsDiff <= target.carbs_g * 0.15) {
          macroScore += 3; // Good
        } else if (carbsDiff <= target.carbs_g * 0.25) {
          macroScore += 1; // Acceptable
        }

        // Fat adherence (0-4 points)
        const fatDiff = Math.abs(consumed.fat_g - target.fat_g);
        if (fatDiff <= target.fat_g * 0.10) {
          macroScore += 4; // Perfect
        } else if (fatDiff <= target.fat_g * 0.15) {
          macroScore += 3; // Good
        } else if (fatDiff <= target.fat_g * 0.25) {
          macroScore += 1; // Acceptable
        }
      }
    }
    
    maxPossibleScore += MAX_DIET_SCORE;
    sectionsLogged.push('Nutrition');
  }

  const dietScore = calorieScore + macroScore;

  // Sleep Score (0-30 points) - Only count if user logged sleep
  let sleepScore = 0;
  const hasLoggedSleep = data.hasLoggedSleep ?? (data.sleepHours !== null && data.sleepHours !== undefined && data.sleepHours > 0);
  
  if (hasLoggedSleep && data.sleepHours !== null) {
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
    
    maxPossibleScore += MAX_SLEEP_SCORE;
    sectionsLogged.push('Sleep');
  }

  // Habit Tracking Score (0-10 points) - Only count if user logged habits
  let habitScore = 0;
  let habitsCompleted = 0;
  const hasLoggedHabits = data.hasLoggedHabits ?? (data.habits && Object.values(data.habits).some(Boolean));

  if (hasLoggedHabits && data.habits) {
    // Count how many habits were completed
    const habitValues = Object.values(data.habits);
    habitsCompleted = habitValues.filter(Boolean).length;

    // Scoring: 2+ habits = 10 points, 1 habit = 5 points
    if (habitsCompleted >= 2) {
      habitScore = 10;
    } else if (habitsCompleted === 1) {
      habitScore = 5;
    }
    
    maxPossibleScore += MAX_HABIT_SCORE;
    sectionsLogged.push('Habits');
  }

  // Calculate raw score (sum of all logged sections)
  const rawScore = trainingScore + dietScore + sleepScore + habitScore;
  
  // Scale to 0-110 based on which sections were logged
  // If maxPossibleScore is 0 (nothing logged), return 0
  let totalScore = 0;
  if (maxPossibleScore > 0) {
    // Convert raw score to percentage, then scale to 110
    const percentage = rawScore / maxPossibleScore;
    totalScore = Math.round(percentage * MAX_TOTAL_SCORE);
  }

  return {
    totalScore: Math.min(MAX_TOTAL_SCORE, totalScore),
    trainingScore,
    dietScore,
    sleepScore,
    habitScore,
    breakdown: {
      calorieScore,
      macroScore,
      habitsCompleted,
      sectionsLogged,
      sectionsAvailable: sectionsLogged.length,
      maxPossibleScore,
    },
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

/**
 * Helper function to determine if user has logged meals
 * Can be called from nutrition tracking API
 */
export function hasMealsLogged(meals: any[]): boolean {
  return meals && meals.length > 0;
}

/**
 * Helper to get consumed nutrition from logged meals
 */
export function calculateConsumedFromMeals(meals: any[]): ConsumedNutrition {
  if (!meals || meals.length === 0) {
    return { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 };
  }
  
  return meals.reduce(
    (total, meal) => ({
      calories: total.calories + (meal.calories || 0),
      protein_g: total.protein_g + (meal.protein_g || 0),
      carbs_g: total.carbs_g + (meal.carbs_g || 0),
      fat_g: total.fat_g + (meal.fat_g || 0),
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
  );
}
