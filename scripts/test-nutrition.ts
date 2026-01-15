#!/usr/bin/env ts-node
/**
 * Test script for nutrition calculations
 * Run with: npx ts-node scripts/test-nutrition.ts
 */

import { runNutritionTests, calculateTargets, splitIntoMeals, verifyMealPlan } from '../lib/nutrition';

console.log('='.repeat(60));
console.log('NUTRITION CALCULATOR TEST SUITE');
console.log('='.repeat(60));
console.log('');

// Run automated tests
console.log('Running automated test cases...\n');
const testResults = runNutritionTests();

console.log(`Results: ${testResults.passed} passed, ${testResults.failed} failed\n`);

testResults.results.forEach((result, index) => {
  const status = result.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${index + 1}. ${status}: ${result.name}`);
  if (result.error) {
    console.log(`   Error: ${result.error}`);
  }
});

console.log('');
console.log('='.repeat(60));
console.log('DETAILED EXAMPLE');
console.log('='.repeat(60));
console.log('');

// Example: Male, 30yo, 180cm, 80kg, moderate activity, weight loss
console.log('User Profile:');
console.log('  Sex: Male');
console.log('  Age: 30 years');
console.log('  Height: 180 cm');
console.log('  Weight: 80 kg');
console.log('  Activity: Moderate (exercise 3-5 days/week)');
console.log('  Goal: Weight Loss');
console.log('');

const targets = calculateTargets({
  sex: 'male',
  age: 30,
  heightCm: 180,
  weightKg: 80,
  activityLevel: 'moderate',
  goal: 'weight_loss',
});

console.log('Daily Targets:');
console.log(`  Calories: ${targets.calories} kcal`);
console.log(`  Protein: ${targets.protein_g}g (${targets.protein_g * 4} kcal)`);
console.log(`  Carbs: ${targets.carbs_g}g (${targets.carbs_g * 4} kcal)`);
console.log(`  Fat: ${targets.fat_g}g (${targets.fat_g * 9} kcal)`);
console.log('');
console.log(`Verification:`);
console.log(`  Calories from macros: ${targets.caloriesFromMacros} kcal`);
console.log(`  Balanced: ${targets.isBalanced ? '✅ YES' : '❌ NO'}`);
console.log(`  Difference: ${Math.abs(targets.calories - targets.caloriesFromMacros)} kcal`);
console.log('');

// Show meal split
const mealPlan = splitIntoMeals(targets, 3);

console.log('Meal Distribution (3 meals):');
console.log('');
console.log('  Breakfast (30%):');
console.log(`    Calories: ${mealPlan.breakfast.calories} kcal`);
console.log(`    Protein: ${mealPlan.breakfast.protein_g}g | Carbs: ${mealPlan.breakfast.carbs_g}g | Fat: ${mealPlan.breakfast.fat_g}g`);
console.log('');
console.log('  Lunch (35%):');
console.log(`    Calories: ${mealPlan.lunch.calories} kcal`);
console.log(`    Protein: ${mealPlan.lunch.protein_g}g | Carbs: ${mealPlan.lunch.carbs_g}g | Fat: ${mealPlan.lunch.fat_g}g`);
console.log('');
console.log('  Dinner (35%):');
console.log(`    Calories: ${mealPlan.dinner.calories} kcal`);
console.log(`    Protein: ${mealPlan.dinner.protein_g}g | Carbs: ${mealPlan.dinner.carbs_g}g | Fat: ${mealPlan.dinner.fat_g}g`);
console.log('');

console.log('Total from Meals:');
console.log(`  Calories: ${mealPlan.total.calories} kcal`);
console.log(`  Protein: ${mealPlan.total.protein_g}g | Carbs: ${mealPlan.total.carbs_g}g | Fat: ${mealPlan.total.fat_g}g`);
console.log('');

const verification = verifyMealPlan(mealPlan, targets);
console.log(`Meal Plan Verification: ${verification.isValid ? '✅ VALID' : '❌ INVALID'}`);
if (!verification.isValid) {
  console.log('Errors:');
  verification.errors.forEach(error => console.log(`  - ${error}`));
}

console.log('');
console.log('='.repeat(60));
console.log('TEST COMPLETE');
console.log('='.repeat(60));

// Exit with appropriate code
process.exit(testResults.failed > 0 ? 1 : 0);
