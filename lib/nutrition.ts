/**
 * Nutrition Calculator - Single Source of Truth
 * 
 * All nutrition calculations use scientifically-backed formulas
 * and ensure mathematical consistency:
 * - Macros MUST match calories (protein*4 + carbs*4 + fat*9)
 * - Meal totals MUST sum to daily totals
 * - Per-meal macros MUST sum to daily macros
 */

export interface NutritionTargets {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  // Verification fields
  caloriesFromMacros: number; // Should match calories
  isBalanced: boolean; // True if within tolerance
}

export interface MealMacros {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface DailyMealPlan {
  breakfast: MealMacros;
  lunch: MealMacros;
  dinner: MealMacros;
  snack?: MealMacros;
  total: MealMacros;
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Goal = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'performance' | 'general_health';
export type Sex = 'male' | 'female';

const CALORIE_TOLERANCE = 5; // ±5 kcal acceptable difference

/**
 * Calculate daily nutrition targets based on user metrics
 * 
 * Uses Mifflin-St Jeor formula for BMR
 * Activity multipliers based on PAL (Physical Activity Level) research
 * Goal adjustments: cut(-15%), maintain(0%), bulk(+10%)
 */
export function calculateTargets(params: {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: Goal;
}): NutritionTargets {
  const { sex, age, heightCm, weightKg, activityLevel, goal } = params;

  // Step 1: Calculate BMR using Mifflin-St Jeor equation
  let bmr: number;
  if (sex === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Step 2: Apply activity multiplier to get TDEE
  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,      // Little/no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    very_active: 1.9,    // Very hard exercise, physical job
  };

  const tdee = bmr * activityMultipliers[activityLevel];

  // Step 3: Adjust calories based on goal
  let targetCalories: number;
  switch (goal) {
    case 'weight_loss':
      targetCalories = tdee * 0.85; // -15% deficit
      break;
    case 'muscle_gain':
      targetCalories = tdee * 1.10; // +10% surplus
      break;
    case 'performance':
      targetCalories = tdee * 1.10; // +10% surplus
      break;
    case 'maintenance':
    case 'general_health':
    default:
      targetCalories = tdee; // 0% (maintenance)
  }

  // Round to nearest 5 calories for cleaner numbers
  targetCalories = Math.round(targetCalories / 5) * 5;

  // Step 4: Calculate protein target
  // Cut/Maintain: 1.8 g/kg
  // Bulk: 2.0 g/kg
  const proteinMultiplier = (goal === 'muscle_gain' || goal === 'performance') ? 2.0 : 1.8;
  const proteinGrams = weightKg * proteinMultiplier;

  // Step 5: Calculate fat target
  // Minimum: 0.8 g/kg
  // Cap to 30-35% of calories (using 32.5% as middle ground)
  const minFatGrams = weightKg * 0.8;
  const maxFatCalories = targetCalories * 0.325; // 32.5% of calories
  const maxFatGrams = maxFatCalories / 9;
  const fatGrams = Math.max(minFatGrams, Math.min(maxFatGrams, minFatGrams * 1.2));

  // Step 6: Calculate carbs from remaining calories
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const remainingCalories = targetCalories - proteinCalories - fatCalories;
  const carbGrams = remainingCalories / 4;

  // Step 7: Round macros consistently
  const rounded = roundMacrosConsistently({
    targetCalories,
    protein_g: proteinGrams,
    carbs_g: carbGrams,
    fat_g: fatGrams,
  });

  return rounded;
}

/**
 * Round macros while preserving exact calorie match
 * 
 * Strategy:
 * 1. Round protein and fat to nearest whole gram
 * 2. Calculate carbs to force exact calorie match
 * 3. Iterate if needed to stay within tolerance
 */
export function roundMacrosConsistently(params: {
  targetCalories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}): NutritionTargets {
  const { targetCalories } = params;

  // Round protein and fat first (these are less flexible)
  let protein_g = Math.round(params.protein_g);
  let fat_g = Math.round(params.fat_g);

  // Calculate carbs to match target calories exactly
  const proteinCalories = protein_g * 4;
  const fatCalories = fat_g * 9;
  const remainingCalories = targetCalories - proteinCalories - fatCalories;
  let carbs_g = Math.round(remainingCalories / 4);

  // Verify and adjust if needed
  let calculatedCalories = (protein_g * 4) + (carbs_g * 4) + (fat_g * 9);
  let diff = targetCalories - calculatedCalories;
  let iterations = 0;
  const maxIterations = 10;

  // Adjust carbs by ±1-3g until we match within tolerance
  while (Math.abs(diff) > CALORIE_TOLERANCE && iterations < maxIterations) {
    const carbAdjustment = Math.round(diff / 4);
    carbs_g += carbAdjustment;
    calculatedCalories = (protein_g * 4) + (carbs_g * 4) + (fat_g * 9);
    diff = targetCalories - calculatedCalories;
    iterations++;
  }

  // Final calculation
  const finalCalories = (protein_g * 4) + (carbs_g * 4) + (fat_g * 9);
  const isBalanced = Math.abs(finalCalories - targetCalories) <= CALORIE_TOLERANCE;

  return {
    calories: targetCalories,
    protein_g,
    carbs_g,
    fat_g,
    caloriesFromMacros: finalCalories,
    isBalanced,
  };
}

/**
 * Split daily targets into meals with proper distribution
 * 
 * Default distribution for 3 meals:
 * - Breakfast: 30%
 * - Lunch: 35%
 * - Dinner: 35%
 * 
 * Default distribution for 4 meals (with snack):
 * - Breakfast: 25%
 * - Lunch: 30%
 * - Dinner: 30%
 * - Snack: 15%
 */
export function splitIntoMeals(
  targets: NutritionTargets,
  mealsCount: 3 | 4 = 3,
  distribution?: number[]
): DailyMealPlan {
  // Default distributions
  const defaultDistributions: Record<3 | 4, number[]> = {
    3: [0.30, 0.35, 0.35],        // B, L, D
    4: [0.25, 0.30, 0.30, 0.15],  // B, L, D, S
  };

  const dist = distribution || defaultDistributions[mealsCount];

  // Validate distribution sums to 1.0
  const sum = dist.reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1.0) > 0.01) {
    throw new Error(`Meal distribution must sum to 1.0, got ${sum}`);
  }

  // Calculate raw meal macros
  const rawMeals = dist.map(percentage => ({
    calories: targets.calories * percentage,
    protein_g: targets.protein_g * percentage,
    carbs_g: targets.carbs_g * percentage,
    fat_g: targets.fat_g * percentage,
  }));

  // Round each meal individually
  const roundedMeals = rawMeals.map(meal => ({
    calories: Math.round(meal.calories),
    protein_g: Math.round(meal.protein_g),
    carbs_g: Math.round(meal.carbs_g),
    fat_g: Math.round(meal.fat_g),
  }));

  // Calculate totals from rounded meals
  const totalFromMeals = roundedMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein_g: acc.protein_g + meal.protein_g,
      carbs_g: acc.carbs_g + meal.carbs_g,
      fat_g: acc.fat_g + meal.fat_g,
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
  );

  // Reconcile differences by adjusting the last meal (dinner)
  const lastMealIndex = mealsCount - 1;
  const proteinDiff = targets.protein_g - totalFromMeals.protein_g;
  const carbsDiff = targets.carbs_g - totalFromMeals.carbs_g;
  const fatDiff = targets.fat_g - totalFromMeals.fat_g;

  roundedMeals[lastMealIndex].protein_g += proteinDiff;
  roundedMeals[lastMealIndex].carbs_g += carbsDiff;
  roundedMeals[lastMealIndex].fat_g += fatDiff;

  // Recalculate calories for last meal to ensure accuracy
  const lastMeal = roundedMeals[lastMealIndex];
  lastMeal.calories = (lastMeal.protein_g * 4) + (lastMeal.carbs_g * 4) + (lastMeal.fat_g * 9);

  // Build the meal plan
  const breakfast = roundedMeals[0];
  const lunch = roundedMeals[1];
  const dinner = roundedMeals[2];
  const snack = mealsCount === 4 ? roundedMeals[3] : undefined;

  // Calculate final total
  const meals = [breakfast, lunch, dinner, ...(snack ? [snack] : [])];
  const total = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein_g: acc.protein_g + meal.protein_g,
      carbs_g: acc.carbs_g + meal.carbs_g,
      fat_g: acc.fat_g + meal.fat_g,
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
  );

  return {
    breakfast,
    lunch,
    dinner,
    snack,
    total,
  };
}

/**
 * Verify that meal plan totals match daily targets
 */
export function verifyMealPlan(
  mealPlan: DailyMealPlan,
  targets: NutritionTargets
): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check protein match
  if (Math.abs(mealPlan.total.protein_g - targets.protein_g) > 1) {
    errors.push(`Protein mismatch: ${mealPlan.total.protein_g}g vs ${targets.protein_g}g`);
  }

  // Check carbs match
  if (Math.abs(mealPlan.total.carbs_g - targets.carbs_g) > 1) {
    errors.push(`Carbs mismatch: ${mealPlan.total.carbs_g}g vs ${targets.carbs_g}g`);
  }

  // Check fat match
  if (Math.abs(mealPlan.total.fat_g - targets.fat_g) > 1) {
    errors.push(`Fat mismatch: ${mealPlan.total.fat_g}g vs ${targets.fat_g}g`);
  }

  // Check calories match macros
  const caloriesFromMacros =
    (mealPlan.total.protein_g * 4) +
    (mealPlan.total.carbs_g * 4) +
    (mealPlan.total.fat_g * 9);

  if (Math.abs(mealPlan.total.calories - caloriesFromMacros) > CALORIE_TOLERANCE) {
    errors.push(
      `Calories don't match macros: ${mealPlan.total.calories} vs ${caloriesFromMacros} (from macros)`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate test cases to verify calculations
 */
export function runNutritionTests(): {
  passed: number;
  failed: number;
  results: Array<{ name: string; passed: boolean; error?: string }>;
} {
  const testCases = [
    {
      name: 'Male, 30yo, 180cm, 80kg, moderate, weight_loss',
      params: { sex: 'male' as Sex, age: 30, heightCm: 180, weightKg: 80, activityLevel: 'moderate' as ActivityLevel, goal: 'weight_loss' as Goal },
    },
    {
      name: 'Female, 25yo, 165cm, 60kg, light, muscle_gain',
      params: { sex: 'female' as Sex, age: 25, heightCm: 165, weightKg: 60, activityLevel: 'light' as ActivityLevel, goal: 'muscle_gain' as Goal },
    },
    {
      name: 'Male, 40yo, 175cm, 90kg, active, maintenance',
      params: { sex: 'male' as Sex, age: 40, heightCm: 175, weightKg: 90, activityLevel: 'active' as ActivityLevel, goal: 'maintenance' as Goal },
    },
    {
      name: 'Female, 35yo, 170cm, 70kg, moderate, performance',
      params: { sex: 'female' as Sex, age: 35, heightCm: 170, weightKg: 70, activityLevel: 'moderate' as ActivityLevel, goal: 'performance' as Goal },
    },
    {
      name: 'Male, 22yo, 185cm, 75kg, very_active, muscle_gain',
      params: { sex: 'male' as Sex, age: 22, heightCm: 185, weightKg: 75, activityLevel: 'very_active' as ActivityLevel, goal: 'muscle_gain' as Goal },
    },
  ];

  const results = testCases.map(({ name, params }) => {
    try {
      const targets = calculateTargets(params);
      
      // Verify macro calories match total
      if (!targets.isBalanced) {
        return {
          name,
          passed: false,
          error: `Calories mismatch: ${targets.calories} vs ${targets.caloriesFromMacros}`,
        };
      }

      // Verify meal split
      const mealPlan = splitIntoMeals(targets, 3);
      const verification = verifyMealPlan(mealPlan, targets);
      
      if (!verification.isValid) {
        return {
          name,
          passed: false,
          error: verification.errors.join('; '),
        };
      }

      return { name, passed: true };
    } catch (error: any) {
      return {
        name,
        passed: false,
        error: error.message || 'Unknown error',
      };
    }
  });

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  return { passed, failed, results };
}
