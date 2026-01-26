/**
 * Test Script: Nutrition Plan Balancing
 * 
 * Validates that generated nutrition plans hit macro targets accurately
 */

import { generateWeeklyMealPlans } from '../lib/meal-plan-generator';
import { recipesData } from '../lib/recipes';

console.log('🧪 Testing Nutrition Plan Balancing\n');
console.log('=' .repeat(80));

// Test case: Performance goal with 2555 calories
const testParams = {
  targetCalories: 2555,
  targetProtein: 126,
  targetCarbs: 350,
  targetFat: 67,
  goal: 'performance' as const,
  dietaryRestrictions: [],
  preferences: [],
  recipes: recipesData,
};

console.log('\n📊 Target Macros:');
console.log(`  Calories: ${testParams.targetCalories} kcal`);
console.log(`  Protein:  ${testParams.targetProtein}g`);
console.log(`  Carbs:    ${testParams.targetCarbs}g`);
console.log(`  Fat:      ${testParams.targetFat}g`);
console.log('\n' + '='.repeat(80));

try {
  const result = generateWeeklyMealPlans(testParams);
  const mealPlans = result.mealPlans;

  console.log('\n✅ Successfully generated 7-day meal plan!');
  if (result.warnings.length > 0) {
    console.log('\n⚠️  Warnings:', result.warnings.join(', '));
  }
  console.log('\n📋 Daily Breakdown:\n');

  let allDaysValid = true;

  mealPlans.forEach((day, index) => {
    const calorieTolerance = Math.max(testParams.targetCalories * 0.05, 100);
    const calorieError = Math.abs(day.totals.calories - testParams.targetCalories);
    const proteinError = Math.abs(day.totals.protein_g - testParams.targetProtein);
    const carbsError = Math.abs(day.totals.carbs_g - testParams.targetCarbs);
    const fatError = Math.abs(day.totals.fat_g - testParams.targetFat);

    const calorieValid = calorieError <= calorieTolerance;
    const proteinValid = proteinError <= 10;
    const carbsValid = carbsError <= 15;
    const fatValid = fatError <= 10;

    const dayValid = calorieValid && proteinValid && carbsValid && fatValid;
    allDaysValid = allDaysValid && dayValid;

    const icon = dayValid ? '✅' : '❌';

    console.log(`${icon} ${day.label}:`);
    console.log(`   Totals:  ${day.totals.calories} cal | ${day.totals.protein_g}g P | ${day.totals.carbs_g}g C | ${day.totals.fat_g}g F`);
    console.log(`   Error:   ${calorieError > 0 ? '+' : ''}${Math.round(calorieError)} cal | ${proteinError > 0 ? '+' : ''}${proteinError.toFixed(1)}g P | ${carbsError > 0 ? '+' : ''}${carbsError.toFixed(1)}g C | ${fatError > 0 ? '+' : ''}${fatError.toFixed(1)}g F`);
    console.log(`   Meals:   ${day.meals.length} meals`);
    
    // Show servings
    const servingsInfo = day.meals.map(m => `${m.meal_slot}(${m.servings}x)`).join(', ');
    console.log(`   Servings: ${servingsInfo}`);
    console.log('');
  });

  console.log('='.repeat(80));
  
  if (allDaysValid) {
    console.log('\n🎉 SUCCESS: All 7 days meet target tolerances!');
    console.log('   ✅ Calories within ±5% (or ±100 kcal)');
    console.log('   ✅ Protein within ±10g');
    console.log('   ✅ Carbs within ±15g');
    console.log('   ✅ Fat within ±10g');
  } else {
    console.log('\n⚠️  WARNING: Some days do not meet tolerances');
    process.exit(1);
  }

  // Test variety
  const allRecipeIds = mealPlans.flatMap(day => day.meals.map(m => m.recipe_id));
  const uniqueRecipes = new Set(allRecipeIds);
  console.log(`\n🔄 Recipe Variety: ${uniqueRecipes.size} unique recipes across ${allRecipeIds.length} total meals`);

  // Test serving size distribution
  const allServings = mealPlans.flatMap(day => day.meals.map(m => m.servings));
  const avgServing = allServings.reduce((a, b) => a + b, 0) / allServings.length;
  const minServing = Math.min(...allServings);
  const maxServing = Math.max(...allServings);
  console.log(`\n📏 Serving Sizes: min=${minServing}x, avg=${avgServing.toFixed(2)}x, max=${maxServing}x`);

  console.log('\n' + '='.repeat(80));
  console.log('✅ All tests passed!');

} catch (error: any) {
  console.error('\n❌ Test FAILED:', error.message);
  console.error(error.stack);
  process.exit(1);
}
