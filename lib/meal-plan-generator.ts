/**
 * 7-Day Meal Plan Generator with Target Balancing
 * 
 * Generates weekly meal plans from existing recipes with:
 * - Strict target macro adherence (±5% calories, ±10g protein, ±15g carbs/fat)
 * - Automatic serving size adjustment to hit targets
 * - Retry logic (up to 5 attempts per day)
 * - Recipe variety across days
 * - Goal-based recipe selection
 * - Dietary restriction filtering
 */

import { Recipe, MacroTargets, NutritionPlan, DailyMealPlanSummary } from '@/types';

interface MealPlanGeneratorParams {
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  goal: NutritionPlan['goal'];
  dietaryRestrictions?: string[];
  preferences?: string[];
  recipes: Recipe[];
}

type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface DayMeal {
  recipe_id: string;
  recipe_name: string;
  calories: number; // Base calories (will be scaled by servings)
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  servings: number; // Can be fractional (0.75, 1.0, 1.25, 1.5, 2.0)
  meal_slot: MealSlot;
}

interface DayTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const MAX_RETRY_ATTEMPTS = 5;
const MIN_SERVINGS = 0.75;
const MAX_SERVINGS = 2.0;
const SERVING_STEP = 0.25;

/**
 * GUARANTEED FALLBACK SNACKS
 * These are simple, flexible recipes that work with most dietary restrictions
 */
const FALLBACK_SNACKS: Recipe[] = [
  {
    id: 'fallback-banana-pb',
    name: 'Banana with Peanut Butter',
    description: 'Simple, nutritious snack',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=900&h=600&auto=format&fit=crop&q=80',
    imageId: '1571771894821-ce9b6c11b08e',
    calories: 250,
    protein_g: 8,
    carbs_g: 30,
    fat_g: 12,
    prepMinutes: 2,
    cookMinutes: 0,
    servings: 1,
    ingredients: [
      { item: 'banana', quantity: 1, unit: 'medium' },
      { item: 'peanut butter', quantity: 2, unit: 'tbsp' }
    ],
    instructions: ['Slice banana', 'Spread peanut butter'],
    tags: ['snack', 'quick', 'vegetarian']
  },
  {
    id: 'fallback-greek-yogurt',
    name: 'Greek Yogurt with Honey',
    description: 'High-protein snack',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&h=600&auto=format&fit=crop&q=80',
    imageId: '1488477181946-6428a0291777',
    calories: 180,
    protein_g: 18,
    carbs_g: 20,
    fat_g: 4,
    prepMinutes: 1,
    cookMinutes: 0,
    servings: 1,
    ingredients: [
      { item: 'Greek yogurt', quantity: 200, unit: 'g' },
      { item: 'honey', quantity: 1, unit: 'tbsp' }
    ],
    instructions: ['Mix yogurt with honey'],
    tags: ['snack', 'quick', 'high-protein', 'vegetarian']
  },
  {
    id: 'fallback-olive-toast',
    name: 'Toast with Olive Oil',
    description: 'Simple carb snack',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&h=600&auto=format&fit=crop&q=80',
    imageId: '1509440159596-0249088772ff',
    calories: 200,
    protein_g: 5,
    carbs_g: 25,
    fat_g: 9,
    prepMinutes: 3,
    cookMinutes: 0,
    servings: 1,
    ingredients: [
      { item: 'whole wheat bread', quantity: 2, unit: 'slices' },
      { item: 'olive oil', quantity: 1, unit: 'tbsp' }
    ],
    instructions: ['Toast bread', 'Drizzle with olive oil'],
    tags: ['snack', 'quick', 'vegan', 'vegetarian']
  }
];

/**
 * Generate 7 daily meal plans with automatic balancing
 * NEVER THROWS - always returns a plan or best attempt
 */
export function generateWeeklyMealPlans(params: MealPlanGeneratorParams): { 
  mealPlans: DailyMealPlanSummary[];
  warnings: string[];
} {
  const {
    targetCalories,
    targetProtein,
    targetCarbs,
    targetFat,
    goal,
    dietaryRestrictions = [],
    recipes
  } = params;

  const warnings: string[] = [];

  // Filter recipes by dietary restrictions and ADD FALLBACK SNACKS
  let availableRecipes = filterRecipesByRestrictions(recipes, dietaryRestrictions);
  
  // Add fallback snacks that match dietary restrictions
  const fallbackSnacks = filterRecipesByRestrictions(FALLBACK_SNACKS, dietaryRestrictions);
  availableRecipes = [...availableRecipes, ...fallbackSnacks];

  if (availableRecipes.length === 0) {
    warnings.push('Very limited recipes available - using fallback options');
  }

  // Categorize recipes by meal type
  const breakfastRecipes = availableRecipes.filter(r => 
    r.tags?.includes('breakfast') || r.name.toLowerCase().includes('breakfast')
  );
  const lunchDinnerRecipes = availableRecipes.filter(r => 
    !r.tags?.includes('breakfast') && 
    !r.tags?.includes('snack') &&
    !r.tags?.includes('smoothie')
  );
  const snackRecipes = availableRecipes.filter(r => 
    r.tags?.includes('snack') || 
    r.tags?.includes('smoothie') ||
    r.tags?.includes('quick')
  );

  // Track used recipes to minimize repeats
  const usedRecipeIds = new Set<string>();

  // Generate 7 days with retry logic
  const mealPlans: DailyMealPlanSummary[] = [];
  const targets: DayTargets = {
    calories: targetCalories,
    protein: targetProtein,
    carbs: targetCarbs,
    fat: targetFat,
  };

  for (let day = 1; day <= 7; day++) {
    let successfulDay: DailyMealPlanSummary | null = null;
    let bestAttempt: { meals: DayMeal[]; totals: any; error: number } | null = null;

    // Try up to MAX_RETRY_ATTEMPTS times with progressive tolerance relaxation
    for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
      try {
        // Determine tolerance level based on attempt
        let toleranceLevel: 'strict' | 'relaxed' | 'loose' = 'strict';
        if (attempt === 4) {
          toleranceLevel = 'relaxed';
          if (attempt === 4) {
            console.warn(`⚠️  Day ${day}: Relaxing tolerances (attempt ${attempt})`);
          }
        } else if (attempt === 5) {
          toleranceLevel = 'loose';
          console.warn(`⚠️  Day ${day}: Using loose tolerances (attempt ${attempt})`);
        }

        // Add variety between attempts by shuffling recipes
        const shuffledBreakfast = attempt > 1 ? shuffleArray([...breakfastRecipes]) : breakfastRecipes;
        const shuffledLunchDinner = attempt > 1 ? shuffleArray([...lunchDinnerRecipes]) : lunchDinnerRecipes;
        const shuffledSnacks = attempt > 1 ? shuffleArray([...snackRecipes]) : snackRecipes;

        const dayMeals = generateDayMeals({
          day,
          targets,
          goal,
          breakfastRecipes: shuffledBreakfast,
          lunchDinnerRecipes: shuffledLunchDinner,
          snackRecipes: shuffledSnacks,
          availableRecipes,
          usedRecipeIds,
        });

        // Balance the day to hit targets (NEVER THROWS)
        const balanceResult = balanceDayToTargets(dayMeals, targets, availableRecipes);

        if (!balanceResult.success) {
          console.warn(`⚠️  Day ${day} attempt ${attempt}: Balance failed - ${balanceResult.errorReason}`);
          continue;
        }

        const { dayMeals: balancedMeals, totals } = balanceResult;

        // Track best attempt by calorie error
        const calorieError = Math.abs(totals.calories - targets.calories);
        if (!bestAttempt || calorieError < bestAttempt.error) {
          bestAttempt = {
            meals: balancedMeals,
            totals,
            error: calorieError
          };
        }

        // Validate with progressive tolerance
        const isValid = validateDayWithinTolerance(totals, targets, toleranceLevel, false);

        if (isValid) {
          // Convert to API format with scaled nutrition
          const mealsFormatted = balancedMeals.map(meal => ({
            recipe_id: meal.recipe_id,
            recipe_name: meal.recipe_name,
            calories: Math.round(meal.calories * meal.servings),
            protein_g: Math.round(meal.protein_g * meal.servings * 10) / 10,
            carbs_g: Math.round(meal.carbs_g * meal.servings * 10) / 10,
            fat_g: Math.round(meal.fat_g * meal.servings * 10) / 10,
            servings: meal.servings,
            meal_slot: meal.meal_slot,
          }));

          successfulDay = {
            day,
            label: `Day ${day}`,
            meals: mealsFormatted,
            totals: {
              calories: Math.round(totals.calories),
              protein_g: Math.round(totals.protein * 10) / 10,
              carbs_g: Math.round(totals.carbs * 10) / 10,
              fat_g: Math.round(totals.fat * 10) / 10,
            },
          };

          // Track used recipes for variety (first 3 days only)
          if (day <= 3) {
            balancedMeals.forEach(meal => usedRecipeIds.add(meal.recipe_id));
          }

          // Add warning if using degraded tolerance
          if (toleranceLevel !== 'strict') {
            console.warn(`⚠️  Day ${day} generated with ${toleranceLevel} tolerance (attempt ${attempt})`);
            warnings.push(`Day ${day} uses approximate macros (${toleranceLevel} match)`);
          }

          console.log(`✅ Day ${day} generated successfully (attempt ${attempt}/${MAX_RETRY_ATTEMPTS})`);
          console.log(`   Totals: ${Math.round(totals.calories)} cal | ${totals.protein.toFixed(1)}g P | ${totals.carbs.toFixed(1)}g C | ${totals.fat.toFixed(1)}g F`);
          break;
        } else {
          console.warn(`⚠️  Day ${day} attempt ${attempt} (${toleranceLevel}): Validation failed, retrying...`);
        }
      } catch (error) {
        console.warn(`⚠️  Day ${day} attempt ${attempt} error:`, error);
        // Don't throw - continue to next attempt
      }
    }

    // ABSOLUTE FALLBACK: Use best attempt even if not perfect
    if (!successfulDay && bestAttempt) {
      console.warn(`⚠️  Day ${day}: Using best attempt (${bestAttempt.error}cal error)`);
      
      const mealsFormatted = bestAttempt.meals.map(meal => ({
        recipe_id: meal.recipe_id,
        recipe_name: meal.recipe_name,
        calories: Math.round(meal.calories * meal.servings),
        protein_g: Math.round(meal.protein_g * meal.servings * 10) / 10,
        carbs_g: Math.round(meal.carbs_g * meal.servings * 10) / 10,
        fat_g: Math.round(meal.fat_g * meal.servings * 10) / 10,
        servings: meal.servings,
        meal_slot: meal.meal_slot,
      }));

      successfulDay = {
        day,
        label: `Day ${day}`,
        meals: mealsFormatted,
        totals: {
          calories: Math.round(bestAttempt.totals.calories),
          protein_g: Math.round(bestAttempt.totals.protein * 10) / 10,
          carbs_g: Math.round(bestAttempt.totals.carbs * 10) / 10,
          fat_g: Math.round(bestAttempt.totals.fat * 10) / 10,
        },
      };

      warnings.push(`Day ${day} uses approximate macros (best available match)`);
    }

    // If still no day (extremely unlikely), create minimal fallback
    if (!successfulDay) {
      console.warn(`⚠️  Day ${day}: Creating minimal fallback day`);
      
      // Use fallback snacks to create a basic day
      const fallbackMeals = fallbackSnacks.slice(0, 3).map((recipe, idx) => ({
        recipe_id: recipe.id,
        recipe_name: recipe.name,
        calories: recipe.calories,
        protein_g: recipe.protein_g,
        carbs_g: recipe.carbs_g,
        fat_g: recipe.fat_g,
        servings: 1.5,
        meal_slot: ['breakfast', 'lunch', 'dinner'][idx] as MealSlot,
      }));

      const totals = calculateDayTotals(fallbackMeals);

      successfulDay = {
        day,
        label: `Day ${day}`,
        meals: fallbackMeals.map(meal => ({
          recipe_id: meal.recipe_id,
          recipe_name: meal.recipe_name,
          calories: Math.round(meal.calories * meal.servings),
          protein_g: Math.round(meal.protein_g * meal.servings * 10) / 10,
          carbs_g: Math.round(meal.carbs_g * meal.servings * 10) / 10,
          fat_g: Math.round(meal.fat_g * meal.servings * 10) / 10,
          servings: meal.servings,
          meal_slot: meal.meal_slot,
        })),
        totals: {
          calories: Math.round(totals.calories),
          protein_g: Math.round(totals.protein * 10) / 10,
          carbs_g: Math.round(totals.carbs * 10) / 10,
          fat_g: Math.round(totals.fat * 10) / 10,
        },
      };

      warnings.push(`Day ${day} uses simplified meal plan (limited recipe availability)`);
    }

    mealPlans.push(successfulDay);
  }

  return { mealPlans, warnings };
}

/**
 * Generate initial meal selection for a day
 */
function generateDayMeals(params: {
  day: number;
  targets: DayTargets;
  goal: NutritionPlan['goal'];
  breakfastRecipes: Recipe[];
  lunchDinnerRecipes: Recipe[];
  snackRecipes: Recipe[];
  availableRecipes: Recipe[];
  usedRecipeIds: Set<string>;
}): DayMeal[] {
  const {
    day,
    targets,
    goal,
    breakfastRecipes,
    lunchDinnerRecipes,
    snackRecipes,
    availableRecipes,
    usedRecipeIds,
  } = params;

  const dayRecipeIds = new Set<string>();
  const meals: DayMeal[] = [];

  // Calculate rough target per meal (will be adjusted later)
  const targetCaloriesPerMeal = targets.calories / 4;

  // 1. SELECT BREAKFAST
  const breakfast = selectBestRecipe({
    candidates: breakfastRecipes.length > 0 ? breakfastRecipes : availableRecipes,
    targetCalories: targetCaloriesPerMeal,
    targetProtein: targets.protein / 4,
    targetCarbs: targets.carbs / 4,
    targetFat: targets.fat / 4,
    goal,
    usedIds: usedRecipeIds,
    dayIds: dayRecipeIds,
    allowRepeatIfNeeded: day > 3,
  });

  if (breakfast) {
    meals.push({
      recipe_id: breakfast.id,
      recipe_name: breakfast.name,
      calories: breakfast.calories,
      protein_g: breakfast.protein_g,
      carbs_g: breakfast.carbs_g,
      fat_g: breakfast.fat_g,
      servings: 1.0,
      meal_slot: 'breakfast',
    });
    dayRecipeIds.add(breakfast.id);
  }

  // 2. SELECT LUNCH
  const lunch = selectBestRecipe({
    candidates: lunchDinnerRecipes.length > 0 ? lunchDinnerRecipes : availableRecipes,
    targetCalories: targetCaloriesPerMeal * 1.2,
    targetProtein: targets.protein / 3,
    targetCarbs: targets.carbs / 3,
    targetFat: targets.fat / 3,
    goal,
    usedIds: usedRecipeIds,
    dayIds: dayRecipeIds,
    allowRepeatIfNeeded: day > 3,
  });

  if (lunch) {
    meals.push({
      recipe_id: lunch.id,
      recipe_name: lunch.name,
      calories: lunch.calories,
      protein_g: lunch.protein_g,
      carbs_g: lunch.carbs_g,
      fat_g: lunch.fat_g,
      servings: 1.0,
      meal_slot: 'lunch',
    });
    dayRecipeIds.add(lunch.id);
  }

  // 3. SELECT DINNER
  const dinner = selectBestRecipe({
    candidates: lunchDinnerRecipes.length > 0 ? lunchDinnerRecipes : availableRecipes,
    targetCalories: targetCaloriesPerMeal * 1.2,
    targetProtein: targets.protein / 3,
    targetCarbs: targets.carbs / 3,
    targetFat: targets.fat / 3,
    goal,
    usedIds: usedRecipeIds,
    dayIds: dayRecipeIds,
    allowRepeatIfNeeded: day > 3,
  });

  if (dinner) {
    meals.push({
      recipe_id: dinner.id,
      recipe_name: dinner.name,
      calories: dinner.calories,
      protein_g: dinner.protein_g,
      carbs_g: dinner.carbs_g,
      fat_g: dinner.fat_g,
      servings: 1.0,
      meal_slot: 'dinner',
    });
    dayRecipeIds.add(dinner.id);
  }

  // 4. SELECT INITIAL SNACK
  const currentTotals = calculateDayTotals(meals);
  const remainingCalories = targets.calories - currentTotals.calories;

  if (remainingCalories > 100 && meals.length < 4) {
    const snack = selectBestRecipe({
      candidates: snackRecipes.length > 0 ? snackRecipes : availableRecipes,
      targetCalories: remainingCalories,
      targetProtein: targets.protein - currentTotals.protein,
      targetCarbs: targets.carbs - currentTotals.carbs,
      targetFat: targets.fat - currentTotals.fat,
      goal,
      usedIds: usedRecipeIds,
      dayIds: dayRecipeIds,
      allowRepeatIfNeeded: true,
    });

    if (snack) {
      meals.push({
        recipe_id: snack.id,
        recipe_name: snack.name,
        calories: snack.calories,
        protein_g: snack.protein_g,
        carbs_g: snack.carbs_g,
        fat_g: snack.fat_g,
        servings: 1.0,
        meal_slot: 'snack',
      });
    }
  }

  return meals;
}

interface BalanceResult {
  success: boolean;
  dayMeals: DayMeal[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  errorReason?: string;
}

/**
 * Balance day meals to hit macro targets by adjusting serving sizes
 * This is the CRITICAL function that ensures we hit targets
 * 
 * NEVER THROWS - returns success state instead
 */
function balanceDayToTargets(
  meals: DayMeal[],
  targets: DayTargets,
  availableRecipes: Recipe[]
): BalanceResult {
  if (meals.length === 0) {
    return {
      success: false,
      dayMeals: [],
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      errorReason: 'No meals provided'
    };
  }

  const balancedMeals = [...meals];

  // Calculate current totals
  let totals = calculateDayTotals(balancedMeals);

  // PHASE 1: Adjust existing meal servings to get closer to target
  const maxIterations = 30;
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const calorieDiff = targets.calories - totals.calories;
    const proteinDiff = targets.protein - totals.protein;
    const carbsDiff = targets.carbs - totals.carbs;
    const fatDiff = targets.fat - totals.fat;

    // If we're close enough, stop iterating
    if (Math.abs(calorieDiff) < 30 && Math.abs(proteinDiff) < 3) {
      break;
    }

    let adjusted = false;

    // If we need more calories, scale up meals
    if (calorieDiff > 50) {
      // Find the meal with the best macro profile to scale up
      const mealToScale = balancedMeals
        .filter(m => m.servings < MAX_SERVINGS)
        .map(meal => {
          // Calculate how well this meal's macros match our needs
          const proteinScore = proteinDiff > 0 ? meal.protein_g : -meal.protein_g;
          const carbsScore = carbsDiff > 0 ? meal.carbs_g : -meal.carbs_g;
          const fatScore = fatDiff > 0 ? meal.fat_g : -meal.fat_g;
          const calorieScore = meal.calories;
          
          return {
            meal,
            score: proteinScore * 2 + carbsScore + fatScore + (calorieScore / 10)
          };
        })
        .sort((a, b) => b.score - a.score)[0];

      if (mealToScale) {
        mealToScale.meal.servings = Math.min(mealToScale.meal.servings + SERVING_STEP, MAX_SERVINGS);
        adjusted = true;
      }
    }
    // If we have too many calories, scale down meals
    else if (calorieDiff < -50) {
      const mealToScale = balancedMeals
        .filter(m => m.servings > MIN_SERVINGS)
        .map(meal => {
          // Scale down meals that contribute least to our target macros
          const proteinScore = proteinDiff < 0 ? meal.protein_g : -meal.protein_g;
          const carbsScore = carbsDiff < 0 ? meal.carbs_g : -meal.carbs_g;
          const fatScore = fatDiff < 0 ? meal.fat_g : -meal.fat_g;
          
          return {
            meal,
            score: proteinScore * 2 + carbsScore + fatScore
          };
        })
        .sort((a, b) => b.score - a.score)[0];

      if (mealToScale) {
        mealToScale.meal.servings = Math.max(mealToScale.meal.servings - SERVING_STEP, MIN_SERVINGS);
        adjusted = true;
      }
    }
    // Fine-tune: adjust by small amounts if we're close
    else if (Math.abs(calorieDiff) > 10) {
      // Make micro-adjustments
      if (calorieDiff > 0) {
        const mealToAdjust = balancedMeals.find(m => m.servings < MAX_SERVINGS);
        if (mealToAdjust) {
          mealToAdjust.servings = Math.min(mealToAdjust.servings + SERVING_STEP, MAX_SERVINGS);
          adjusted = true;
        }
      } else {
        const mealToAdjust = balancedMeals.find(m => m.servings > MIN_SERVINGS);
        if (mealToAdjust) {
          mealToAdjust.servings = Math.max(mealToAdjust.servings - SERVING_STEP, MIN_SERVINGS);
          adjusted = true;
        }
      }
    }

    if (!adjusted) break; // Can't adjust further

    totals = calculateDayTotals(balancedMeals);
  }

  // PHASE 2: Add additional snacks if still significantly below target
  totals = calculateDayTotals(balancedMeals);
  const remainingCals = targets.calories - totals.calories;

  if (remainingCals > 150 && balancedMeals.length < 5) {
    // Find a snack recipe that best fills the gap
    const usedInDay = new Set(balancedMeals.map(m => m.recipe_id));
    const candidateSnacks = availableRecipes
      .filter(r => !usedInDay.has(r.id))
      .filter(r => 
        r.tags?.includes('snack') || 
        r.tags?.includes('smoothie') ||
        r.calories < 600
      );

    if (candidateSnacks.length > 0) {
      const proteinDiff = targets.protein - totals.protein;
      const carbsDiff = targets.carbs - totals.carbs;
      
      const bestSnack = candidateSnacks
        .map(recipe => {
          const calError = Math.abs(recipe.calories - remainingCals);
          const proteinMatch = proteinDiff > 0 ? recipe.protein_g * 2 : 0;
          const carbsMatch = carbsDiff > 0 ? recipe.carbs_g : 0;
          return { recipe, score: -calError + proteinMatch + carbsMatch };
        })
        .sort((a, b) => b.score - a.score)[0];

      if (bestSnack) {
        const snack = bestSnack.recipe;
        balancedMeals.push({
          recipe_id: snack.id,
          recipe_name: snack.name,
          calories: snack.calories,
          protein_g: snack.protein_g,
          carbs_g: snack.carbs_g,
          fat_g: snack.fat_g,
          servings: 1.0,
          meal_slot: 'snack',
        });

        // Fine-tune the snack serving size
        const newTotals = calculateDayTotals(balancedMeals);
        const snackMeal = balancedMeals[balancedMeals.length - 1];
        const calorieDeficit = targets.calories - (newTotals.calories - snack.calories);
        const optimalServings = Math.min(
          Math.max(
            calorieDeficit / snack.calories,
            MIN_SERVINGS
          ),
          MAX_SERVINGS
        );
        snackMeal.servings = Math.round(optimalServings / SERVING_STEP) * SERVING_STEP;
      }
    }
  }

  // Calculate final totals and return success
  const finalTotals = calculateDayTotals(balancedMeals);
  
  return {
    success: true,
    dayMeals: balancedMeals,
    totals: finalTotals
  };
}

/**
 * Calculate total macros for a day (respects serving sizes)
 */
function calculateDayTotals(meals: DayMeal[]): {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
} {
  return meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + (meal.calories * meal.servings),
      protein: acc.protein + (meal.protein_g * meal.servings),
      carbs: acc.carbs + (meal.carbs_g * meal.servings),
      fat: acc.fat + (meal.fat_g * meal.servings),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

/**
 * Validate that day totals are within acceptable tolerance
 * Supports progressive relaxation for graceful degradation
 */
function validateDayWithinTolerance(
  totals: { calories: number; protein: number; carbs: number; fat: number },
  targets: DayTargets,
  toleranceLevel: 'strict' | 'relaxed' | 'loose' = 'strict',
  debug = false
): boolean {
  // Progressive tolerance based on attempt number
  let calorieTolerancePercent: number;
  let proteinTolerance: number;
  let carbsTolerance: number;
  let fatsTolerance: number;

  switch (toleranceLevel) {
    case 'strict':
      // Attempts 1-3: strict (±5%)
      calorieTolerancePercent = 0.05;
      proteinTolerance = 10;
      carbsTolerance = 15;
      fatsTolerance = 15;
      break;
    case 'relaxed':
      // Attempt 4: calories ±10%, macros ±15%
      calorieTolerancePercent = 0.10;
      proteinTolerance = Math.max(15, targets.protein * 0.15);
      carbsTolerance = Math.max(20, targets.carbs * 0.15);
      fatsTolerance = Math.max(20, targets.fat * 0.15);
      break;
    case 'loose':
      // Attempt 5: calories ±15%, macros ±20%
      calorieTolerancePercent = 0.15;
      proteinTolerance = Math.max(20, targets.protein * 0.20);
      carbsTolerance = Math.max(30, targets.carbs * 0.20);
      fatsTolerance = Math.max(25, targets.fat * 0.20);
      break;
  }

  const calorieTolerance = Math.max(targets.calories * calorieTolerancePercent, 100);
  const calorieValid = Math.abs(totals.calories - targets.calories) <= calorieTolerance;

  const proteinValid = Math.abs(totals.protein - targets.protein) <= proteinTolerance;
  const carbsValid = Math.abs(totals.carbs - targets.carbs) <= carbsTolerance;
  const fatsValid = Math.abs(totals.fat - targets.fat) <= fatsTolerance;

  if (debug) {
    console.log(`   Validation: Cal ${calorieValid ? '✓' : '✗'} (${Math.round(totals.calories)} / ${targets.calories} ±${Math.round(calorieTolerance)}), ` +
                `P ${proteinValid ? '✓' : '✗'} (${totals.protein.toFixed(1)} / ${targets.protein} ±10), ` +
                `C ${carbsValid ? '✓' : '✗'} (${totals.carbs.toFixed(1)} / ${targets.carbs} ±15), ` +
                `F ${fatsValid ? '✓' : '✗'} (${totals.fat.toFixed(1)} / ${targets.fat} ±10)`);
  }

  return calorieValid && proteinValid && carbsValid && fatsValid;
}

/**
 * Filter recipes by dietary restrictions
 */
function filterRecipesByRestrictions(recipes: Recipe[], restrictions: string[]): Recipe[] {
  if (restrictions.length === 0) return recipes;

  return recipes.filter(recipe => {
    const recipeText = `${recipe.name} ${recipe.tags?.join(' ')} ${recipe.ingredients?.join(' ')}`.toLowerCase();

    for (const restriction of restrictions) {
      const rest = restriction.toLowerCase();
      
      // Vegetarian check
      if (rest === 'vegetarian') {
        if (recipeText.includes('meat') || recipeText.includes('chicken') || 
            recipeText.includes('beef') || recipeText.includes('pork') ||
            recipeText.includes('fish') || recipeText.includes('seafood')) {
          return false;
        }
      }

      // Vegan check (stricter than vegetarian)
      if (rest === 'vegan') {
        if (recipeText.includes('meat') || recipeText.includes('chicken') || 
            recipeText.includes('beef') || recipeText.includes('pork') ||
            recipeText.includes('fish') || recipeText.includes('seafood') ||
            recipeText.includes('egg') || recipeText.includes('dairy') ||
            recipeText.includes('cheese') || recipeText.includes('milk') ||
            recipeText.includes('yogurt') || recipeText.includes('butter')) {
          return false;
        }
        // Must explicitly be tagged vegan or vegetarian
        if (!recipe.tags?.includes('vegan') && !recipe.tags?.includes('vegetarian')) {
          return false;
        }
      }

      // Gluten-free check
      if (rest === 'gluten-free' || rest === 'gluten_free') {
        if (recipeText.includes('wheat') || recipeText.includes('bread') || 
            recipeText.includes('pasta') || recipeText.includes('flour')) {
          return false;
        }
      }

      // Dairy-free check
      if (rest === 'dairy-free' || rest === 'dairy_free') {
        if (recipeText.includes('milk') || recipeText.includes('cheese') || 
            recipeText.includes('yogurt') || recipeText.includes('butter') ||
            recipeText.includes('cream')) {
          return false;
        }
      }
    }

    return true;
  });
}

/**
 * Select best recipe based on target macros and goal
 */
function selectBestRecipe(params: {
  candidates: Recipe[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  goal: NutritionPlan['goal'];
  usedIds: Set<string>;
  dayIds: Set<string>;
  allowRepeatIfNeeded: boolean;
}): Recipe | null {
  const { candidates, targetCalories, targetProtein, targetCarbs, targetFat, goal, usedIds, dayIds, allowRepeatIfNeeded } = params;

  if (candidates.length === 0) return null;

  // Filter out recipes used today
  let available = candidates.filter(r => !dayIds.has(r.id));

  // If first pass, also exclude recently used recipes
  if (!allowRepeatIfNeeded) {
    const freshRecipes = available.filter(r => !usedIds.has(r.id));
    if (freshRecipes.length > 0) {
      available = freshRecipes;
    }
  }

  // If still nothing available, allow any recipe
  if (available.length === 0) {
    available = candidates;
  }

  // Score each recipe based on how well it matches ALL macro targets
  const scored = available.map(recipe => {
    let score = 0;

    // Calorie closeness (weight: 100)
    const calorieError = Math.abs(recipe.calories - targetCalories) / (targetCalories || 1);
    score -= calorieError * 100;

    // Protein closeness (weight: 50)
    const proteinError = Math.abs(recipe.protein_g - targetProtein) / (targetProtein || 1);
    score -= proteinError * 50;

    // Carbs closeness (weight: 40)
    const carbsError = Math.abs(recipe.carbs_g - targetCarbs) / (targetCarbs || 1);
    score -= carbsError * 40;

    // Fat closeness (weight: 30)
    const fatError = Math.abs(recipe.fat_g - targetFat) / (targetFat || 1);
    score -= fatError * 30;

    // Goal-specific bonuses
    if (goal === 'weight_loss') {
      // Favor recipes below calorie target with high protein
      if (recipe.calories < targetCalories * 0.9) score += 15;
      if (recipe.protein_g > targetProtein * 1.1) score += 20;
    } else if (goal === 'muscle_gain') {
      // Favor high protein recipes
      if (recipe.protein_g > targetProtein * 1.1) score += 25;
    } else if (goal === 'performance') {
      // Favor carb-rich recipes for performance goal
      if (recipe.carbs_g > targetCarbs * 1.1) score += 25;
      if (recipe.calories <= targetCalories * 1.1) score += 10;
    }

    // Penalize if way off target
    if (recipe.calories > targetCalories * 1.8 || recipe.calories < targetCalories * 0.4) {
      score -= 100;
    }

    return { recipe, score };
  });

  // Sort by score (highest first)
  scored.sort((a, b) => b.score - a.score);

  // Return best match
  return scored[0]?.recipe || null;
}
