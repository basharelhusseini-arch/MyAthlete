/**
 * Nutrition Log - Single Source of Truth for Daily Meal Tracking
 * Integrates Recipes with Diet Tracker and Health Score
 * 
 * Storage Strategy:
 * 1. Primary: Supabase table `daily_meals` (if configured)
 * 2. Fallback: localStorage (for development/offline)
 */

import { recipesData, getRecipeById, type Recipe } from '@/lib/recipes';

// ===== TYPES =====

export interface LoggedMeal {
  id?: string; // Supabase ID (optional for localStorage)
  recipeId: string;
  servings: number;
  addedAt: string; // ISO timestamp
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: LoggedMeal[];
}

export interface NutritionTotals {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  mealCount: number;
}

// ===== STORAGE DETECTION =====

function isSupabaseAvailable(): boolean {
  // Check if Supabase is configured
  return false; // TODO: Implement Supabase detection
  // return typeof window !== 'undefined' && !!process.env.NEXT_PUBLIC_SUPABASE_URL;
}

// ===== HELPER FUNCTIONS =====

function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getStorageKey(memberId: string, date: string): string {
  return `nutrition_log_${memberId}_${date}`;
}

// ===== COMPUTE TOTALS FROM LOG =====

export function computeTotals(log: DailyLog): NutritionTotals {
  let calories = 0;
  let protein_g = 0;
  let carbs_g = 0;
  let fat_g = 0;

  log.meals.forEach(meal => {
    const recipe = getRecipeById(meal.recipeId);
    if (recipe) {
      const multiplier = meal.servings / recipe.servings;
      calories += recipe.calories * multiplier;
      protein_g += recipe.protein_g * multiplier;
      carbs_g += recipe.carbs_g * multiplier;
      fat_g += recipe.fat_g * multiplier;
    }
  });

  return {
    calories: Math.round(calories),
    protein_g: Math.round(protein_g),
    carbs_g: Math.round(carbs_g),
    fat_g: Math.round(fat_g),
    mealCount: log.meals.length,
  };
}

// ===== LOCALSTORAGE IMPLEMENTATION =====

function getTodayLogFromLocalStorage(memberId: string): DailyLog {
  const today = getTodayDate();
  const key = getStorageKey(memberId, today);
  
  if (typeof window === 'undefined') {
    return { date: today, meals: [] };
  }

  const stored = localStorage.getItem(key);
  if (!stored) {
    return { date: today, meals: [] };
  }

  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error('Failed to parse nutrition log:', error);
    return { date: today, meals: [] };
  }
}

function saveTodayLogToLocalStorage(memberId: string, log: DailyLog): void {
  const key = getStorageKey(memberId, log.date);
  localStorage.setItem(key, JSON.stringify(log));
}

// ===== SUPABASE IMPLEMENTATION (Placeholder) =====

async function getTodayLogFromSupabase(memberId: string): Promise<DailyLog> {
  // TODO: Implement Supabase fetch
  // const { data, error } = await supabase
  //   .from('daily_meals')
  //   .select('*')
  //   .eq('member_id', memberId)
  //   .eq('date', getTodayDate());
  
  // For now, fallback to localStorage
  return getTodayLogFromLocalStorage(memberId);
}

async function addMealToSupabase(memberId: string, recipeId: string, servings: number): Promise<DailyLog> {
  // TODO: Implement Supabase insert
  // const { data, error } = await supabase
  //   .from('daily_meals')
  //   .insert({
  //     member_id: memberId,
  //     date: getTodayDate(),
  //     recipe_id: recipeId,
  //     servings: servings,
  //   });
  
  // For now, use localStorage
  const log = getTodayLogFromLocalStorage(memberId);
  log.meals.push({
    recipeId,
    servings,
    addedAt: new Date().toISOString(),
  });
  saveTodayLogToLocalStorage(memberId, log);
  return log;
}

async function removeMealFromSupabase(memberId: string, recipeId: string): Promise<DailyLog> {
  // TODO: Implement Supabase delete
  // For now, use localStorage
  const log = getTodayLogFromLocalStorage(memberId);
  log.meals = log.meals.filter(meal => meal.recipeId !== recipeId);
  saveTodayLogToLocalStorage(memberId, log);
  return log;
}

// ===== PUBLIC API =====

export async function getTodayLog(memberId: string): Promise<DailyLog> {
  if (isSupabaseAvailable()) {
    return await getTodayLogFromSupabase(memberId);
  }
  return getTodayLogFromLocalStorage(memberId);
}

export async function addMealToToday(
  memberId: string,
  recipeId: string,
  servings: number = 1
): Promise<DailyLog> {
  // Validate recipe exists
  const recipe = getRecipeById(recipeId);
  if (!recipe) {
    throw new Error(`Recipe not found: ${recipeId}`);
  }

  if (isSupabaseAvailable()) {
    return await addMealToSupabase(memberId, recipeId, servings);
  }

  // localStorage implementation
  const log = getTodayLogFromLocalStorage(memberId);
  
  // Check if already added today (prevent duplicates)
  const existingIndex = log.meals.findIndex(m => m.recipeId === recipeId);
  if (existingIndex >= 0) {
    // Update servings instead of adding duplicate
    log.meals[existingIndex].servings += servings;
  } else {
    log.meals.push({
      recipeId,
      servings,
      addedAt: new Date().toISOString(),
    });
  }
  
  saveTodayLogToLocalStorage(memberId, log);
  return log;
}

export async function removeMealFromToday(
  memberId: string,
  recipeId: string
): Promise<DailyLog> {
  if (isSupabaseAvailable()) {
    return await removeMealFromSupabase(memberId, recipeId);
  }

  // localStorage implementation
  const log = getTodayLogFromLocalStorage(memberId);
  log.meals = log.meals.filter(meal => meal.recipeId !== recipeId);
  saveTodayLogToLocalStorage(memberId, log);
  return log;
}

export async function updateMealServings(
  memberId: string,
  recipeId: string,
  servings: number
): Promise<DailyLog> {
  const log = await getTodayLog(memberId);
  const meal = log.meals.find(m => m.recipeId === recipeId);
  
  if (meal) {
    meal.servings = servings;
    saveTodayLogToLocalStorage(memberId, log);
  }
  
  return log;
}

// ===== UTILITY FUNCTIONS =====

export function getRecipeFromMeal(meal: LoggedMeal): Recipe | undefined {
  return getRecipeById(meal.recipeId);
}

export function getTodayTotals(memberId: string): NutritionTotals {
  const log = getTodayLogFromLocalStorage(memberId);
  return computeTotals(log);
}

export function getMealMacros(meal: LoggedMeal): NutritionTotals | null {
  const recipe = getRecipeById(meal.recipeId);
  if (!recipe) return null;

  const multiplier = meal.servings / recipe.servings;
  return {
    calories: Math.round(recipe.calories * multiplier),
    protein_g: Math.round(recipe.protein_g * multiplier),
    carbs_g: Math.round(recipe.carbs_g * multiplier),
    fat_g: Math.round(recipe.fat_g * multiplier),
    mealCount: 1,
  };
}
