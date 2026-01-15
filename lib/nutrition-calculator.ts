/**
 * Nutrition Calculator - Compute accurate nutrition from ingredients
 */

import { findIngredientNutrition, convertToGrams } from './nutrition-database.js';

export interface IngredientInput {
  item: string;
  quantity: number;
  unit: string;
}

export interface NutritionResult {
  // Per serving
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  
  // Total batch
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  
  // Metadata
  servings: number;
  missingIngredients: string[];
  hasCompletionNutrition: boolean;
}

/**
 * Calculate nutrition from ingredients
 * Returns per-serving and total values
 */
export function calculateNutritionFromIngredients(
  ingredients: IngredientInput[],
  servings: number
): NutritionResult {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  const missingIngredients: string[] = [];
  
  for (const ingredient of ingredients) {
    const nutritionData = findIngredientNutrition(ingredient.item);
    
    if (!nutritionData) {
      missingIngredients.push(ingredient.item);
      console.warn(`⚠️  Missing nutrition data for: "${ingredient.item}"`);
      continue;
    }
    
    // Convert to grams
    const grams = convertToGrams(ingredient.quantity, ingredient.unit, ingredient.item);
    
    // Calculate nutrition (scale from per 100g to actual grams)
    const scaleFactor = grams / 100;
    totalCalories += nutritionData.calories * scaleFactor;
    totalProtein += nutritionData.protein * scaleFactor;
    totalCarbs += nutritionData.carbs * scaleFactor;
    totalFats += nutritionData.fat * scaleFactor;
  }
  
  // Calculate per-serving values
  const perServingCalories = servings > 0 ? totalCalories / servings : totalCalories;
  const perServingProtein = servings > 0 ? totalProtein / servings : totalProtein;
  const perServingCarbs = servings > 0 ? totalCarbs / servings : totalCarbs;
  const perServingFat = servings > 0 ? totalFats / servings : totalFats;
  
  return {
    // Per serving (rounded)
    calories: Math.round(perServingCalories),
    protein: Math.round(perServingProtein * 10) / 10, // 1 decimal
    carbs: Math.round(perServingCarbs * 10) / 10,
    fat: Math.round(perServingFat * 10) / 10,
    
    // Total batch (rounded)
    totalCalories: Math.round(totalCalories),
    totalProtein: Math.round(totalProtein * 10) / 10,
    totalCarbs: Math.round(totalCarbs * 10) / 10,
    totalFats: Math.round(totalFats * 10) / 10,
    
    // Metadata
    servings,
    missingIngredients,
    hasCompletionNutrition: missingIngredients.length === 0,
  };
}

/**
 * Verify nutrition calculation is reasonable
 * Macros should roughly equal calories (protein*4 + carbs*4 + fat*9)
 */
export function verifyNutritionMath(nutrition: NutritionResult): {
  isValid: boolean;
  expectedCalories: number;
  actualCalories: number;
  difference: number;
  differencePercent: number;
} {
  const expectedCalories = 
    nutrition.protein * 4 +
    nutrition.carbs * 4 +
    nutrition.fat * 9;
  
  const difference = Math.abs(expectedCalories - nutrition.calories);
  const differencePercent = (difference / expectedCalories) * 100;
  
  // Allow up to 15% variance (accounts for fiber, alcohol, etc.)
  const isValid = differencePercent <= 15;
  
  return {
    isValid,
    expectedCalories: Math.round(expectedCalories),
    actualCalories: nutrition.calories,
    difference: Math.round(difference),
    differencePercent: Math.round(differencePercent * 10) / 10,
  };
}

/**
 * Format nutrition result for display
 */
export function formatNutrition(nutrition: NutritionResult): string {
  return `${nutrition.calories} cal | ${nutrition.protein}g protein | ${nutrition.carbs}g carbs | ${nutrition.fat}g fat`;
}

/**
 * Compare two nutrition values and return percentage difference
 */
export function compareNutrition(
  old: { calories: number; protein: number; carbs: number; fat: number },
  calculated: NutritionResult
): {
  caloriesDiff: number;
  proteinDiff: number;
  carbsDiff: number;
  fatDiff: number;
} {
  return {
    caloriesDiff: Math.round(((calculated.calories - old.calories) / old.calories) * 100),
    proteinDiff: Math.round(((calculated.protein - old.protein) / old.protein) * 100),
    carbsDiff: Math.round(((calculated.carbs - old.carbs) / old.carbs) * 100),
    fatDiff: Math.round(((calculated.fat - old.fat) / old.fat) * 100),
  };
}
