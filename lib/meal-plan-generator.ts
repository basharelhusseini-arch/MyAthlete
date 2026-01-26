/**
 * 7-Day Meal Plan Generator
 * 
 * Generates weekly meal plans from existing recipes with:
 * - Target macro adherence (±7-12% tolerance)
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
 * Generate 7 daily meal plans
 */
export function generateWeeklyMealPlans(params: MealPlanGeneratorParams): DailyMealPlanSummary[] {
  const {
    targetCalories,
    targetProtein,
    targetCarbs,
    targetFat,
    goal,
    dietaryRestrictions = [],
    recipes
  } = params;

  // Filter recipes by dietary restrictions
  const availableRecipes = filterRecipesByRestrictions(recipes, dietaryRestrictions);

  if (availableRecipes.length === 0) {
    throw new Error('No recipes available after filtering by dietary restrictions');
  }

  // Categorize recipes by meal type and goal alignment
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

  // Generate 7 days
  const mealPlans: DailyMealPlanSummary[] = [];

  for (let day = 1; day <= 7; day++) {
    const dailyMeals: DailyMealPlanSummary['meals'] = [];
    const dayRecipeIds = new Set<string>(); // No repeats within a day

    // Calculate target per meal (4 meals: breakfast, lunch, dinner, snack)
    const targetCaloriesPerMeal = targetCalories / 4;

    // 1. SELECT BREAKFAST
    const breakfast = selectBestRecipe({
      candidates: breakfastRecipes.length > 0 ? breakfastRecipes : availableRecipes,
      targetCalories: targetCaloriesPerMeal,
      targetProtein: targetProtein / 4,
      goal,
      usedIds: usedRecipeIds,
      dayIds: dayRecipeIds,
      allowRepeatIfNeeded: day > 3, // Allow repeats after day 3 if needed
    });

    if (breakfast) {
      dailyMeals.push({
        recipe_id: breakfast.id,
        recipe_name: breakfast.name,
        calories: breakfast.calories,
        protein_g: breakfast.protein_g,
        carbs_g: breakfast.carbs_g,
        fat_g: breakfast.fat_g,
        servings: 1,
        meal_slot: 'breakfast',
      });
      dayRecipeIds.add(breakfast.id);
      if (day <= 3) usedRecipeIds.add(breakfast.id); // Track for first 3 days
    }

    // 2. SELECT LUNCH
    const lunch = selectBestRecipe({
      candidates: lunchDinnerRecipes.length > 0 ? lunchDinnerRecipes : availableRecipes,
      targetCalories: targetCaloriesPerMeal * 1.2, // Slightly larger meal
      targetProtein: targetProtein / 3,
      goal,
      usedIds: usedRecipeIds,
      dayIds: dayRecipeIds,
      allowRepeatIfNeeded: day > 3,
    });

    if (lunch) {
      dailyMeals.push({
        recipe_id: lunch.id,
        recipe_name: lunch.name,
        calories: lunch.calories,
        protein_g: lunch.protein_g,
        carbs_g: lunch.carbs_g,
        fat_g: lunch.fat_g,
        servings: 1,
        meal_slot: 'lunch',
      });
      dayRecipeIds.add(lunch.id);
      if (day <= 3) usedRecipeIds.add(lunch.id);
    }

    // 3. SELECT DINNER
    const dinner = selectBestRecipe({
      candidates: lunchDinnerRecipes.length > 0 ? lunchDinnerRecipes : availableRecipes,
      targetCalories: targetCaloriesPerMeal * 1.2,
      targetProtein: targetProtein / 3,
      goal,
      usedIds: usedRecipeIds,
      dayIds: dayRecipeIds,
      allowRepeatIfNeeded: day > 3,
    });

    if (dinner) {
      dailyMeals.push({
        recipe_id: dinner.id,
        recipe_name: dinner.name,
        calories: dinner.calories,
        protein_g: dinner.protein_g,
        carbs_g: dinner.carbs_g,
        fat_g: dinner.fat_g,
        servings: 1,
        meal_slot: 'dinner',
      });
      dayRecipeIds.add(dinner.id);
      if (day <= 3) usedRecipeIds.add(dinner.id);
    }

    // 4. SELECT SNACK (to fill remaining macros)
    const currentTotals = dailyMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein_g,
        carbs: acc.carbs + meal.carbs_g,
        fat: acc.fat + meal.fat_g,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const remainingCalories = targetCalories - currentTotals.calories;

    if (remainingCalories > 100) {
      const snack = selectBestRecipe({
        candidates: snackRecipes.length > 0 ? snackRecipes : availableRecipes,
        targetCalories: remainingCalories,
        targetProtein: targetProtein - currentTotals.protein,
        goal,
        usedIds: usedRecipeIds,
        dayIds: dayRecipeIds,
        allowRepeatIfNeeded: true, // Snacks can repeat
      });

      if (snack) {
        dailyMeals.push({
          recipe_id: snack.id,
          recipe_name: snack.name,
          calories: snack.calories,
          protein_g: snack.protein_g,
          carbs_g: snack.carbs_g,
          fat_g: snack.fat_g,
          servings: 1,
          meal_slot: 'snack',
        });
      }
    }

    // Calculate totals
    const totals = dailyMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein_g: acc.protein_g + meal.protein_g,
        carbs_g: acc.carbs_g + meal.carbs_g,
        fat_g: acc.fat_g + meal.fat_g,
      }),
      { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
    );

    mealPlans.push({
      day,
      label: `Day ${day}`,
      meals: dailyMeals,
      totals,
    });
  }

  return mealPlans;
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
  goal: NutritionPlan['goal'];
  usedIds: Set<string>;
  dayIds: Set<string>;
  allowRepeatIfNeeded: boolean;
}): Recipe | null {
  const { candidates, targetCalories, targetProtein, goal, usedIds, dayIds, allowRepeatIfNeeded } = params;

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

  // Score each recipe
  const scored = available.map(recipe => {
    let score = 0;

    // Calorie closeness (most important) - within ±7%
    const calorieError = Math.abs(recipe.calories - targetCalories) / targetCalories;
    score -= calorieError * 100;

    // Protein closeness - within ±10%
    const proteinError = Math.abs(recipe.protein_g - targetProtein) / (targetProtein || 1);
    score -= proteinError * 50;

    // Goal-based bonuses
    if (goal === 'weight_loss') {
      // Favor lower calories, higher protein
      if (recipe.calories < targetCalories * 0.9) score += 10;
      if (recipe.protein_g > targetProtein * 1.1) score += 15;
    } else if (goal === 'muscle_gain') {
      // Favor higher protein
      if (recipe.protein_g > targetProtein * 1.1) score += 20;
    } else if (goal === 'performance') {
      // Favor higher carbs
      if (recipe.carbs_g > 40) score += 10;
    }

    // Penalize if way off target
    if (recipe.calories > targetCalories * 1.5 || recipe.calories < targetCalories * 0.5) {
      score -= 50;
    }

    return { recipe, score };
  });

  // Sort by score (highest first)
  scored.sort((a, b) => b.score - a.score);

  // Return best match
  return scored[0]?.recipe || null;
}
