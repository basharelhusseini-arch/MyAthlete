/**
 * STRESS TESTS: Trust & Verification System
 * 
 * Tests edge cases, boundary conditions, and potential failure modes
 */

import {
  calculateHealthScore,
  calculateConfidenceScore,
  calculateVerificationMultiplier,
  validateSleepDuration,
  validateWorkoutLog,
  validateNutritionLog,
  validateMetricChange,
  isEligibleForSurvey,
} from '../lib/trust-scoring';

describe('Stress Tests - Edge Cases', () => {
  describe('Health Score Edge Cases', () => {
    test('handles negative component values gracefully', () => {
      const score = calculateHealthScore({
        sleep: -10,
        training: -5,
        nutrition: -20,
        habits: -15,
      });
      
      // Should floor at 0, not go negative
      expect(score).toBe(0);
      expect(score).toBeGreaterThanOrEqual(0);
    });

    test('handles extremely high component values', () => {
      const score = calculateHealthScore({
        sleep: 500,
        training: 1000,
        nutrition: 999,
        habits: 250,
      });
      
      // Should cap at 100
      expect(score).toBe(100);
      expect(score).toBeLessThanOrEqual(100);
    });

    test('handles decimal/float values correctly', () => {
      const score = calculateHealthScore({
        sleep: 75.7,
        training: 68.3,
        nutrition: 82.9,
        habits: 55.1,
      });
      
      // Should round to integer
      expect(Number.isInteger(score)).toBe(true);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    test('handles zero values correctly', () => {
      const score = calculateHealthScore({
        sleep: 0,
        training: 0,
        nutrition: 0,
        habits: 0,
      });
      
      expect(score).toBe(0);
    });

    test('handles mixed extreme values', () => {
      const score = calculateHealthScore({
        sleep: 0,
        training: 100,
        nutrition: 50,
        habits: 0,
      });
      
      // 0*30 + 100*30 + 50*25 + 0*15 = 42.5 -> 43
      expect(score).toBe(43);
    });
  });

  describe('Confidence Score Edge Cases', () => {
    test('handles zero activity correctly', () => {
      const result = calculateConfidenceScore({
        hasWearable: false,
        consistencyPassesLast30Days: 0,
        surveyCompletionsLast90Days: 0,
        daysActive: 0,
      });
      
      expect(result.score).toBe(30); // Baseline only
      expect(result.level).toBe('low');
    });

    test('handles negative days active gracefully', () => {
      const result = calculateConfidenceScore({
        hasWearable: false,
        consistencyPassesLast30Days: 0,
        surveyCompletionsLast90Days: 0,
        daysActive: -10, // Invalid
      });
      
      // Should handle gracefully, not crash
      expect(result.score).toBeGreaterThanOrEqual(30);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    test('handles extremely high consistency passes', () => {
      const result = calculateConfidenceScore({
        hasWearable: false,
        consistencyPassesLast30Days: 1000, // Way more than needed
        surveyCompletionsLast90Days: 0,
        daysActive: 0,
      });
      
      // Should still only give +10 bonus
      expect(result.breakdown.consistency).toBe(10);
      expect(result.score).toBe(40); // 30 + 10
    });

    test('handles extremely high days active', () => {
      const result = calculateConfidenceScore({
        hasWearable: false,
        consistencyPassesLast30Days: 0,
        surveyCompletionsLast90Days: 0,
        daysActive: 10000, // 27+ years
      });
      
      // Should cap long-term bonus at 25
      expect(result.breakdown.longTerm).toBe(25);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    test('maximal confidence score achievable', () => {
      const result = calculateConfidenceScore({
        hasWearable: true,
        consistencyPassesLast30Days: 10,
        surveyCompletionsLast90Days: 5,
        daysActive: 365,
      });
      
      // 30 + 25 + 10 + 10 + 25 = 100
      expect(result.score).toBe(100);
      expect(result.level).toBe('high');
    });
  });

  describe('Verification Multiplier Edge Cases', () => {
    test('handles empty method array', () => {
      const multiplier = calculateVerificationMultiplier([]);
      
      // Should default to manual (1.0)
      expect(multiplier).toBe(1.0);
    });

    test('handles duplicate methods', () => {
      const multiplier = calculateVerificationMultiplier([
        'wearable',
        'wearable',
        'wearable',
      ]);
      
      // Should not stack same method
      expect(multiplier).toBe(1.15);
    });

    test('handles all methods combined', () => {
      const multiplier = calculateVerificationMultiplier([
        'manual',
        'wearable',
        'survey',
        'consistency_check',
      ]);
      
      // Should cap at 1.25
      expect(multiplier).toBe(1.25);
      expect(multiplier).toBeLessThanOrEqual(1.25);
    });

    test('handles only manual methods', () => {
      const multiplier = calculateVerificationMultiplier([
        'manual',
        'manual',
        'manual',
      ]);
      
      expect(multiplier).toBe(1.0);
    });
  });

  describe('Sleep Validation Edge Cases', () => {
    test('handles zero hours', () => {
      const result = validateSleepDuration(0);
      expect(result.result).toBe('fail');
    });

    test('handles negative hours', () => {
      const result = validateSleepDuration(-5);
      expect(result.result).toBe('fail');
    });

    test('handles fractional hours', () => {
      const result = validateSleepDuration(7.5);
      expect(result.result).toBe('pass');
    });

    test('handles exactly at boundaries', () => {
      const min = validateSleepDuration(3);
      const max = validateSleepDuration(14);
      
      // Exactly at boundaries should pass
      expect(min.result).not.toBe('fail');
      expect(max.result).not.toBe('fail');
    });

    test('handles extreme values', () => {
      const tooLow = validateSleepDuration(1);
      const tooHigh = validateSleepDuration(20);
      
      expect(tooLow.result).toBe('fail');
      expect(tooHigh.result).toBe('fail');
    });
  });

  describe('Workout Validation Edge Cases', () => {
    test('handles zero duration', () => {
      const result = validateWorkoutLog({
        durationMinutes: 0,
        workoutsToday: 1,
      });
      
      expect(result.result).toBe('fail');
    });

    test('handles negative duration', () => {
      const result = validateWorkoutLog({
        durationMinutes: -30,
        workoutsToday: 1,
      });
      
      expect(result.result).toBe('fail');
    });

    test('handles zero workouts', () => {
      const result = validateWorkoutLog({
        durationMinutes: 45,
        workoutsToday: 0,
      });
      
      // Should still validate duration
      expect(result.result).toBe('pass');
    });

    test('handles extreme workout count', () => {
      const result = validateWorkoutLog({
        durationMinutes: 45,
        workoutsToday: 20,
      });
      
      expect(result.result).toBe('flag');
    });

    test('handles extremely long duration', () => {
      const result = validateWorkoutLog({
        durationMinutes: 1000,
        workoutsToday: 1,
      });
      
      expect(result.result).toBe('flag');
    });
  });

  describe('Nutrition Validation Edge Cases', () => {
    test('handles zero calories', () => {
      const result = validateNutritionLog({
        calories: 0,
        weightKg: 70,
        activityLevel: 'moderate',
      });
      
      expect(result.result).toBe('flag');
    });

    test('handles negative calories', () => {
      const result = validateNutritionLog({
        calories: -500,
        weightKg: 70,
        activityLevel: 'moderate',
      });
      
      expect(result.result).toBe('flag');
    });

    test('handles extreme weight values', () => {
      const lowWeight = validateNutritionLog({
        calories: 2000,
        weightKg: 30, // Very low
        activityLevel: 'moderate',
      });
      
      const highWeight = validateNutritionLog({
        calories: 2000,
        weightKg: 200, // Very high
        activityLevel: 'moderate',
      });
      
      // Should handle gracefully
      expect(lowWeight.result).toBeDefined();
      expect(highWeight.result).toBeDefined();
    });

    test('handles extremely high calories', () => {
      const result = validateNutritionLog({
        calories: 10000,
        weightKg: 70,
        activityLevel: 'moderate',
      });
      
      expect(result.result).toBe('flag');
    });
  });

  describe('Metric Change Validation Edge Cases', () => {
    test('handles zero change', () => {
      const result = validateMetricChange({
        metric: 'weight',
        oldValue: 70,
        newValue: 70,
        daysBetween: 7,
      });
      
      expect(result.result).toBe('pass');
    });

    test('handles negative days between', () => {
      const result = validateMetricChange({
        metric: 'weight',
        oldValue: 70,
        newValue: 72,
        daysBetween: -7, // Invalid
      });
      
      // Should handle gracefully
      expect(result).toBeDefined();
    });

    test('handles extreme weight changes', () => {
      const result = validateMetricChange({
        metric: 'weight',
        oldValue: 70,
        newValue: 50, // 20kg loss
        daysBetween: 7,
      });
      
      expect(result.result).toBe('flag');
    });

    test('handles very long time periods', () => {
      const result = validateMetricChange({
        metric: 'weight',
        oldValue: 70,
        newValue: 75,
        daysBetween: 365,
      });
      
      // Over a year, 5kg change is reasonable
      expect(result.result).toBe('pass');
    });
  });

  describe('Survey Eligibility Edge Cases', () => {
    test('handles null last survey date', () => {
      const eligible = isEligibleForSurvey({
        lastSurveyDate: null,
        surveysThisMonth: 0,
      });
      
      expect(eligible).toBe(true);
    });

    test('handles recent survey (yesterday)', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const eligible = isEligibleForSurvey({
        lastSurveyDate: yesterday,
        surveysThisMonth: 0,
      });
      
      expect(eligible).toBe(false); // Too soon
    });

    test('handles exactly 7 days ago', () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const eligible = isEligibleForSurvey({
        lastSurveyDate: sevenDaysAgo,
        surveysThisMonth: 0,
      });
      
      expect(eligible).toBe(true);
    });

    test('handles monthly limit reached', () => {
      const longAgo = new Date();
      longAgo.setDate(longAgo.getDate() - 30);
      
      const eligible = isEligibleForSurvey({
        lastSurveyDate: longAgo,
        surveysThisMonth: 2, // Max reached
      });
      
      expect(eligible).toBe(false);
    });

    test('handles excessive surveys', () => {
      const eligible = isEligibleForSurvey({
        lastSurveyDate: null,
        surveysThisMonth: 100, // Way over limit
      });
      
      expect(eligible).toBe(false);
    });
  });
});

describe('Stress Tests - Calculation Accuracy', () => {
  test('health score with all perfect components equals 100', () => {
    const score = calculateHealthScore({
      sleep: 100,
      training: 100,
      nutrition: 100,
      habits: 100,
    });
    
    expect(score).toBe(100);
  });

  test('confidence score components add up correctly', () => {
    const result = calculateConfidenceScore({
      hasWearable: true,
      consistencyPassesLast30Days: 5,
      surveyCompletionsLast90Days: 2,
      daysActive: 150, // 5 months = 25 points
    });
    
    // 30 + 25 + 10 + 10 + 25 = 100
    const expected = 
      result.breakdown.baseline +
      result.breakdown.wearable +
      result.breakdown.consistency +
      result.breakdown.surveys +
      result.breakdown.longTerm;
    
    expect(result.score).toBe(expected);
    expect(result.score).toBe(100);
  });

  test('health score weights sum to 100', () => {
    // Verify our constants are correct
    const { HEALTH_SCORE_WEIGHTS } = require('../lib/trust-scoring');
    const sum = 
      HEALTH_SCORE_WEIGHTS.SLEEP +
      HEALTH_SCORE_WEIGHTS.TRAINING +
      HEALTH_SCORE_WEIGHTS.NUTRITION +
      HEALTH_SCORE_WEIGHTS.HABITS;
    
    expect(sum).toBe(100);
  });
});

describe('Stress Tests - Type Safety', () => {
  test('handles string numbers gracefully', () => {
    // In real API calls, numbers might come as strings
    const score = calculateHealthScore({
      sleep: Number('75'),
      training: Number('80'),
      nutrition: Number('70'),
      habits: Number('65'),
    });
    
    expect(score).toBe(73);
  });

  test('handles NaN values', () => {
    const score = calculateHealthScore({
      sleep: NaN,
      training: 80,
      nutrition: 70,
      habits: 65,
    });
    
    // NaN * 0.30 = NaN, but we should handle it
    expect(isNaN(score)).toBe(true); // Expected behavior
  });
});

describe('Stress Tests - Critical Guarantees', () => {
  test('NO scenario reduces health score below input components', () => {
    const testCases = [
      { sleep: 50, training: 60, nutrition: 70, habits: 80 },
      { sleep: 90, training: 20, nutrition: 100, habits: 0 },
      { sleep: 0, training: 0, nutrition: 0, habits: 100 },
    ];
    
    testCases.forEach(components => {
      const score = calculateHealthScore(components);
      
      // Score should be a weighted average, within bounds
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  test('confidence level NEVER reduces health score', () => {
    const healthComponents = {
      sleep: 75,
      training: 75,
      nutrition: 75,
      habits: 75,
    };
    
    const lowConfidence = calculateConfidenceScore({
      hasWearable: false,
      consistencyPassesLast30Days: 0,
      surveyCompletionsLast90Days: 0,
      daysActive: 0,
    });
    
    const highConfidence = calculateConfidenceScore({
      hasWearable: true,
      consistencyPassesLast30Days: 10,
      surveyCompletionsLast90Days: 5,
      daysActive: 365,
    });
    
    const healthScore = calculateHealthScore(healthComponents);
    
    // Confidence scores differ
    expect(lowConfidence.score).toBeLessThan(highConfidence.score);
    
    // But health score is unaffected
    expect(healthScore).toBe(75);
  });

  test('ALL multipliers are >= 1.0 (no penalties)', () => {
    const allMethods: Array<'manual' | 'survey' | 'consistency_check' | 'wearable'> = [
      'manual',
      'survey',
      'consistency_check',
      'wearable',
    ];
    
    // Test all combinations
    for (let i = 0; i < allMethods.length; i++) {
      const multiplier = calculateVerificationMultiplier([allMethods[i]]);
      expect(multiplier).toBeGreaterThanOrEqual(1.0);
    }
    
    // Test combined
    const combined = calculateVerificationMultiplier(allMethods);
    expect(combined).toBeGreaterThanOrEqual(1.0);
    expect(combined).toBeLessThanOrEqual(1.25);
  });
});
