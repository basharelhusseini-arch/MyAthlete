/**
 * TRUST & VERIFICATION SCORING SYSTEM
 * 
 * CORE PHILOSOPHY:
 * - Additive only - verification adds confidence, never reduces scores
 * - No punishment - users never excluded or penalized
 * - Two independent scores:
 *   1. Health Score (0-100) - measures behavior outcomes ONLY
 *   2. Confidence Score (0-100) - measures data trustworthiness
 * 
 * Health Score is NEVER reduced by confidence level.
 * Confidence Score is purely informational and additive.
 */

import { ConfidenceLevel, ConfidenceScore, VerificationEvent, VerificationMethod } from '@/types';

// ============================================================
// SCORING CONSTANTS (POSITIVE-ONLY)
// ============================================================

/**
 * Health Score Component Weights
 * Total must equal 100
 */
export const HEALTH_SCORE_WEIGHTS = {
  SLEEP: 30,        // Sleep quality and duration
  TRAINING: 30,     // Workout completion and intensity
  NUTRITION: 25,    // Meal logging and macro adherence
  HABITS: 15,       // Habit consistency
} as const;

/**
 * Confidence Score Components
 * Baseline: 30
 * Max: 100
 */
export const CONFIDENCE_SCORE_COMPONENTS = {
  BASELINE: 30,              // Everyone starts here
  WEARABLE_BONUS: 25,        // Has connected wearable
  CONSISTENCY_BONUS: 10,     // Passes consistency checks
  SURVEY_BONUS: 10,          // Completes verification surveys
  LONG_TERM_BONUS_MAX: 25,   // Long-term consistency (5 per 30 days)
  LONG_TERM_BONUS_PER_30D: 5,
} as const;

/**
 * Verification Multipliers (POSITIVE-ONLY)
 * Applied to individual data points, not overall scores
 * Range: 1.0 to 1.25 (max 25% boost)
 */
export const VERIFICATION_MULTIPLIERS: Record<string, number> = {
  MANUAL: 1.0,           // Baseline (no boost)
  SURVEY: 1.05,          // +5% for survey verification
  CONSISTENCY: 1.05,     // +5% for passing consistency checks
  WEARABLE: 1.15,        // +15% for wearable-verified data
  COMBINED_MAX: 1.25,    // Maximum possible boost (wearable + survey)
};

/**
 * Confidence Level Thresholds
 */
export const CONFIDENCE_THRESHOLDS = {
  LOW: 0,      // 0-49
  MEDIUM: 50,  // 50-74
  HIGH: 75,    // 75-100
} as const;

/**
 * Consistency Check Parameters
 * Silent background validation
 */
export const CONSISTENCY_CHECK_PARAMS = {
  // Sleep validation
  SLEEP_MIN_HOURS: 3,
  SLEEP_MAX_HOURS: 14,
  SLEEP_REASONABLE_MIN: 5,
  SLEEP_REASONABLE_MAX: 10,
  
  // Training validation
  WORKOUT_MIN_DURATION: 5,  // minutes
  WORKOUT_MAX_DURATION: 300, // 5 hours
  WORKOUT_MAX_PER_DAY: 4,
  
  // Nutrition validation (calories)
  MIN_CALORIES_PER_KG: 15,  // Very low (1050 for 70kg)
  MAX_CALORIES_PER_KG: 60,  // Very high (4200 for 70kg)
  
  // Sudden changes (flag if metrics jump unrealistically)
  MAX_WEIGHT_CHANGE_PER_WEEK: 2, // kg
  MAX_SLEEP_CHANGE: 4, // hours difference from baseline
  
  // Survey frequency
  MIN_DAYS_BETWEEN_SURVEYS: 7,
  MAX_SURVEYS_PER_MONTH: 2,
} as const;

// ============================================================
// SCORING FUNCTIONS
// ============================================================

/**
 * Calculate Health Score (0-100)
 * 
 * CRITICAL: This score is NEVER reduced by confidence level.
 * It purely measures behavioral outcomes.
 * 
 * @param components - Individual component scores (0-100 each)
 * @returns Health score 0-100
 */
export function calculateHealthScore(components: {
  sleep: number;
  training: number;
  nutrition: number;
  habits: number;
}): number {
  const score = 
    (components.sleep * HEALTH_SCORE_WEIGHTS.SLEEP / 100) +
    (components.training * HEALTH_SCORE_WEIGHTS.TRAINING / 100) +
    (components.nutrition * HEALTH_SCORE_WEIGHTS.NUTRITION / 100) +
    (components.habits * HEALTH_SCORE_WEIGHTS.HABITS / 100);
  
  return Math.round(Math.max(0, Math.min(100, score)));
}

/**
 * Calculate Confidence Score (0-100)
 * 
 * This is ADDITIVE ONLY - starts at baseline and increases based on:
 * - Wearable connection
 * - Consistency check passes
 * - Survey completions
 * - Long-term usage
 * 
 * @param params - Confidence factors
 * @returns Confidence score 0-100
 */
export function calculateConfidenceScore(params: {
  hasWearable: boolean;
  consistencyPassesLast30Days: number;
  surveyCompletionsLast90Days: number;
  daysActive: number; // Total days since first activity
}): ConfidenceScore {
  const breakdown = {
    baseline: CONFIDENCE_SCORE_COMPONENTS.BASELINE,
    wearable: params.hasWearable ? CONFIDENCE_SCORE_COMPONENTS.WEARABLE_BONUS : 0,
    consistency: 0,
    surveys: 0,
    longTerm: 0,
  };
  
  // Consistency bonus (needs 3+ passes in 30 days)
  if (params.consistencyPassesLast30Days >= 3) {
    breakdown.consistency = CONFIDENCE_SCORE_COMPONENTS.CONSISTENCY_BONUS;
  }
  
  // Survey bonus (needs 1+ completion in 90 days)
  if (params.surveyCompletionsLast90Days >= 1) {
    breakdown.surveys = CONFIDENCE_SCORE_COMPONENTS.SURVEY_BONUS;
  }
  
  // Long-term bonus (5 points per 30 days, max 25)
  const monthsActive = Math.floor(params.daysActive / 30);
  breakdown.longTerm = Math.min(
    monthsActive * CONFIDENCE_SCORE_COMPONENTS.LONG_TERM_BONUS_PER_30D,
    CONFIDENCE_SCORE_COMPONENTS.LONG_TERM_BONUS_MAX
  );
  
  const totalScore = Math.min(
    breakdown.baseline + 
    breakdown.wearable + 
    breakdown.consistency + 
    breakdown.surveys + 
    breakdown.longTerm,
    100
  );
  
  return {
    score: totalScore,
    breakdown,
    level: getConfidenceLevel(totalScore),
  };
}

/**
 * Get confidence level from score
 */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= CONFIDENCE_THRESHOLDS.HIGH) return 'high';
  if (score >= CONFIDENCE_THRESHOLDS.MEDIUM) return 'medium';
  return 'low';
}

/**
 * Calculate verification multiplier for a data point
 * 
 * Multipliers are ADDITIVE and capped at COMBINED_MAX (1.25)
 * 
 * @param methods - Array of verification methods applied
 * @returns Multiplier 1.0 to 1.25
 */
export function calculateVerificationMultiplier(methods: VerificationMethod[]): number {
  let multiplier = VERIFICATION_MULTIPLIERS.MANUAL; // Start at baseline
  
  // Apply bonuses (but don't stack same type)
  const uniqueMethods = [...new Set(methods)];
  
  for (const method of uniqueMethods) {
    switch (method) {
      case 'wearable':
        multiplier = Math.max(multiplier, VERIFICATION_MULTIPLIERS.WEARABLE);
        break;
      case 'survey':
        // Can stack with wearable
        if (methods.includes('wearable')) {
          multiplier = VERIFICATION_MULTIPLIERS.COMBINED_MAX;
        } else {
          multiplier = Math.max(multiplier, VERIFICATION_MULTIPLIERS.SURVEY);
        }
        break;
      case 'consistency_check':
        multiplier = Math.max(multiplier, VERIFICATION_MULTIPLIERS.CONSISTENCY);
        break;
      // 'manual' doesn't change multiplier
    }
  }
  
  // Enforce cap
  return Math.min(multiplier, VERIFICATION_MULTIPLIERS.COMBINED_MAX);
}

// ============================================================
// CONSISTENCY CHECK LOGIC (SILENT VALIDATION)
// ============================================================

/**
 * Check if sleep duration is plausible
 * 
 * Returns:
 * - 'pass' if within reasonable bounds
 * - 'flag' if suspicious but possible
 * - 'fail' if impossible
 * 
 * NOTE: We NEVER penalize users, just don't give confidence boost
 */
export function validateSleepDuration(hours: number): {
  result: 'pass' | 'flag' | 'fail';
  reason?: string;
} {
  if (hours < CONSISTENCY_CHECK_PARAMS.SLEEP_MIN_HOURS) {
    return { result: 'fail', reason: 'Below minimum plausible sleep' };
  }
  
  if (hours > CONSISTENCY_CHECK_PARAMS.SLEEP_MAX_HOURS) {
    return { result: 'fail', reason: 'Above maximum plausible sleep' };
  }
  
  if (
    hours < CONSISTENCY_CHECK_PARAMS.SLEEP_REASONABLE_MIN ||
    hours > CONSISTENCY_CHECK_PARAMS.SLEEP_REASONABLE_MAX
  ) {
    return { result: 'flag', reason: 'Outside typical range' };
  }
  
  return { result: 'pass' };
}

/**
 * Check if workout duration/frequency is plausible
 */
export function validateWorkoutLog(params: {
  durationMinutes: number;
  workoutsToday: number;
}): {
  result: 'pass' | 'flag' | 'fail';
  reason?: string;
} {
  if (params.durationMinutes < CONSISTENCY_CHECK_PARAMS.WORKOUT_MIN_DURATION) {
    return { result: 'fail', reason: 'Too short to be meaningful' };
  }
  
  if (params.durationMinutes > CONSISTENCY_CHECK_PARAMS.WORKOUT_MAX_DURATION) {
    return { result: 'flag', reason: 'Unusually long workout' };
  }
  
  if (params.workoutsToday > CONSISTENCY_CHECK_PARAMS.WORKOUT_MAX_PER_DAY) {
    return { result: 'flag', reason: 'High workout frequency for one day' };
  }
  
  return { result: 'pass' };
}

/**
 * Check if nutrition log is plausible given body weight and activity
 */
export function validateNutritionLog(params: {
  calories: number;
  weightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}): {
  result: 'pass' | 'flag' | 'fail';
  reason?: string;
} {
  const minCalories = params.weightKg * CONSISTENCY_CHECK_PARAMS.MIN_CALORIES_PER_KG;
  const maxCalories = params.weightKg * CONSISTENCY_CHECK_PARAMS.MAX_CALORIES_PER_KG;
  
  if (params.calories < minCalories) {
    return { result: 'flag', reason: 'Very low calorie intake' };
  }
  
  if (params.calories > maxCalories) {
    return { result: 'flag', reason: 'Very high calorie intake' };
  }
  
  return { result: 'pass' };
}

/**
 * Check if metric change is realistic
 */
export function validateMetricChange(params: {
  metric: 'weight' | 'sleep';
  oldValue: number;
  newValue: number;
  daysBetween: number;
}): {
  result: 'pass' | 'flag' | 'fail';
  reason?: string;
} {
  const change = Math.abs(params.newValue - params.oldValue);
  
  if (params.metric === 'weight') {
    const weeksElapsed = params.daysBetween / 7;
    const maxChange = weeksElapsed * CONSISTENCY_CHECK_PARAMS.MAX_WEIGHT_CHANGE_PER_WEEK;
    
    if (change > maxChange && weeksElapsed < 4) {
      return { result: 'flag', reason: 'Rapid weight change' };
    }
  }
  
  if (params.metric === 'sleep') {
    if (change > CONSISTENCY_CHECK_PARAMS.MAX_SLEEP_CHANGE) {
      return { result: 'flag', reason: 'Unusual sleep pattern shift' };
    }
  }
  
  return { result: 'pass' };
}

// ============================================================
// SURVEY ELIGIBILITY
// ============================================================

/**
 * Check if user is eligible for verification survey
 * 
 * Criteria:
 * - At least 7 days since last survey
 * - Max 2 surveys per month
 * - NOT based on leaderboard position (this is critical)
 * - Random selection weighted by activity
 */
export function isEligibleForSurvey(params: {
  lastSurveyDate: Date | null;
  surveysThisMonth: number;
}): boolean {
  // Check if enough time passed since last survey
  if (params.lastSurveyDate) {
    const daysSinceLastSurvey = 
      (Date.now() - params.lastSurveyDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastSurvey < CONSISTENCY_CHECK_PARAMS.MIN_DAYS_BETWEEN_SURVEYS) {
      return false;
    }
  }
  
  // Check monthly limit
  if (params.surveysThisMonth >= CONSISTENCY_CHECK_PARAMS.MAX_SURVEYS_PER_MONTH) {
    return false;
  }
  
  return true;
}

/**
 * Generate survey questions (simple, non-invasive)
 */
export function generateSurveyQuestions(entityType: string): Array<{
  question: string;
  type: 'scale' | 'yes_no' | 'text';
}> {
  const baseQuestions = [
    {
      question: 'How accurate do you feel your logged data is?',
      type: 'scale' as const, // 1-5
    },
  ];
  
  switch (entityType) {
    case 'sleep':
      return [
        ...baseQuestions,
        {
          question: 'Did you sleep through the night without major interruptions?',
          type: 'yes_no' as const,
        },
      ];
    case 'workout':
      return [
        ...baseQuestions,
        {
          question: 'Did you complete all planned sets/reps?',
          type: 'yes_no' as const,
        },
      ];
    default:
      return baseQuestions;
  }
}
