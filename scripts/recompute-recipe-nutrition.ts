/**
 * Migration Script: Recompute Recipe Nutrition
 * 
 * This script:
 * 1. Reads all recipes from recipes.ts
 * 2. Calculates accurate nutrition from ingredients
 * 3. Outputs updated recipe data with correct macros
 * 4. Identifies recipes with missing ingredient data
 * 
 * Run with: npx ts-node scripts/recompute-recipe-nutrition.ts
 */

import { recipesData, Recipe } from '../lib/recipes.js';
import { calculateNutritionFromIngredients, verifyNutritionMath, compareNutrition } from '../lib/nutrition-calculator.js';

interface RecipeUpdate {
  id: string;
  name: string;
  oldNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  newNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  changes: {
    caloriesDiff: number;
    proteinDiff: number;
    carbsDiff: number;
    fatDiff: number;
  };
  missingIngredients: string[];
  mathValid: boolean;
}

console.log('🔍 Recomputing nutrition for all recipes...\n');

const updates: RecipeUpdate[] = [];
let totalRecipes = 0;
let recipesWithMissingData = 0;
let recipesWithInvalidMath = 0;

for (const recipe of recipesData) {
  totalRecipes++;
  
  // Calculate nutrition from ingredients
  const calculated = calculateNutritionFromIngredients(recipe.ingredients, recipe.servings);
  
  // Verify math
  const mathCheck = verifyNutritionMath(calculated);
  
  // Compare to old values
  const changes = compareNutrition(
    { calories: recipe.calories, protein: recipe.protein_g, carbs: recipe.carbs_g, fat: recipe.fat_g },
    calculated
  );
  
  if (calculated.missingIngredients.length > 0) {
    recipesWithMissingData++;
  }
  
  if (!mathCheck.isValid) {
    recipesWithInvalidMath++;
  }
  
  updates.push({
    id: recipe.id,
    name: recipe.name,
    oldNutrition: {
      calories: recipe.calories,
      protein: recipe.protein_g,
      carbs: recipe.carbs_g,
      fat: recipe.fat_g,
    },
    newNutrition: {
      calories: calculated.calories,
      protein: calculated.protein,
      carbs: calculated.carbs,
      fat: calculated.fat,
    },
    changes,
    missingIngredients: calculated.missingIngredients,
    mathValid: mathCheck.isValid,
  });
}

// Print summary
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`Total recipes processed: ${totalRecipes}`);
console.log(`Recipes with missing ingredient data: ${recipesWithMissingData}`);
console.log(`Recipes with questionable math: ${recipesWithInvalidMath}`);
console.log('');

// Print recipes with significant changes
console.log('📈 SIGNIFICANT CHANGES (>20% calorie difference)');
console.log('='.repeat(60));
const significantChanges = updates.filter(u => Math.abs(u.changes.caloriesDiff) > 20);
significantChanges.forEach(update => {
  console.log(`\n${update.name} (${update.id})`);
  console.log(`  Old: ${update.oldNutrition.calories} cal | ${update.oldNutrition.protein}g protein | ${update.oldNutrition.carbs}g carbs | ${update.oldNutrition.fat}g fat`);
  console.log(`  New: ${update.newNutrition.calories} cal | ${update.newNutrition.protein}g protein | ${update.newNutrition.carbs}g carbs | ${update.newNutrition.fat}g fat`);
  console.log(`  Change: ${update.changes.caloriesDiff > 0 ? '+' : ''}${update.changes.caloriesDiff}%`);
  if (update.missingIngredients.length > 0) {
    console.log(`  ⚠️  Missing: ${update.missingIngredients.join(', ')}`);
  }
});

// Print recipes with missing data
if (recipesWithMissingData > 0) {
  console.log('\n\n⚠️  RECIPES WITH MISSING INGREDIENT DATA');
  console.log('='.repeat(60));
  updates.filter(u => u.missingIngredients.length > 0).forEach(update => {
    console.log(`\n${update.name}`);
    console.log(`  Missing: ${update.missingIngredients.join(', ')}`);
  });
}

// Generate updated recipes.ts content
console.log('\n\n📝 Generating updated recipes...\n');

const updatedRecipesData = recipesData.map(recipe => {
  const calculated = calculateNutritionFromIngredients(recipe.ingredients, recipe.servings);
  
  return {
    ...recipe,
    calories: calculated.calories,
    protein_g: calculated.protein,
    carbs_g: calculated.carbs,
    fat_g: calculated.fat,
  };
});

// Print TypeScript code for a few examples
console.log('✅ Sample updated recipes:');
console.log('='.repeat(60));
updatedRecipesData.slice(0, 3).forEach(recipe => {
  console.log(`\n  {`);
  console.log(`    id: '${recipe.id}',`);
  console.log(`    name: '${recipe.name}',`);
  console.log(`    calories: ${recipe.calories},`);
  console.log(`    protein_g: ${recipe.protein_g},`);
  console.log(`    carbs_g: ${recipe.carbs_g},`);
  console.log(`    fat_g: ${recipe.fat_g},`);
  console.log(`    servings: ${recipe.servings},`);
  console.log(`    // ... rest of recipe`);
  console.log(`  },`);
});

console.log('\n\n✅ Script complete!');
console.log('\nNext steps:');
console.log('1. Review the changes above');
console.log('2. Run: npx ts-node scripts/write-updated-recipes.ts');
console.log('   (This will write the changes to lib/recipes.ts)');

// Export for use by other scripts
export { updatedRecipesData, updates };
