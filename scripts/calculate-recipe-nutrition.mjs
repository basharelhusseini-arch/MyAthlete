/**
 * Calculate accurate nutrition for recipes
 * Run with: node scripts/calculate-recipe-nutrition.mjs
 */

// Simplified nutrition database (key ingredients)
const nutritionDB = {
  'chicken breast': { cal: 165, pro: 31, carb: 0, fat: 3.6 },
  'cooked quinoa': { cal: 120, pro: 4.4, carb: 21, fat: 1.9 },
  'broccoli florets': { cal: 35, pro: 2.8, carb: 7, fat: 0.4 },
  'cherry tomatoes': { cal: 18, pro: 0.9, carb: 3.9, fat: 0.2 },
  'tahini': { cal: 595, pro: 17, carb: 21, fat: 54 },
  'lemon juice': { cal: 22, pro: 0.4, carb: 6.9, fat: 0.2 },
  'olive oil': { cal: 884, pro: 0, carb: 0, fat: 100 },
  'garlic powder': { cal: 331, pro: 16, carb: 73, fat: 0.7 },
  'salt and pepper': { cal: 0, pro: 0, carb: 0, fat: 0 },
  'salmon fillet': { cal: 208, pro: 20, carb: 0, fat: 13 },
  'asparagus spears': { cal: 20, pro: 2.2, carb: 3.9, fat: 0.1 },
  'fresh dill': { cal: 43, pro: 3.5, carb: 7, fat: 1.1 },
  'fresh parsley': { cal: 36, pro: 3, carb: 6.3, fat: 0.8 },
  'lemon': { cal: 29, pro: 1.1, carb: 9, fat: 0.3 },
  'butter': { cal: 717, pro: 0.9, carb: 0.1, fat: 81 },
  'garlic cloves': { cal: 149, pro: 6.4, carb: 33, fat: 0.5 },
};

// Convert units to grams
const unitConversions = {
  'g': 1,
  'kg': 1000,
  'oz': 28.35,
  'tbsp': 15,
  'tsp': 5,
  'cup': 240,
  'ml': 1,
  'pinch': 0.5,
  'whole': 100, // Default
};

function convertToGrams(qty, unit) {
  return qty * (unitConversions[unit.toLowerCase()] || 1);
}

function calculateNutrition(ingredients, servings) {
  let totalCal = 0, totalPro = 0, totalCarb = 0, totalFat = 0;
  const missing = [];
  
  for (const ing of ingredients) {
    const nutData = nutritionDB[ing.item.toLowerCase()] || nutritionDB[ing.item];
    if (!nutData) {
      missing.push(ing.item);
      continue;
    }
    
    const grams = convertToGrams(ing.quantity, ing.unit);
    const factor = grams / 100;
    
    totalCal += nutData.cal * factor;
    totalPro += nutData.pro * factor;
    totalCarb += nutData.carb * factor;
    totalFat += nutData.fat * factor;
  }
  
  return {
    perServing: {
      calories: Math.round(totalCal / servings),
      protein: Math.round((totalPro / servings) * 10) / 10,
      carbs: Math.round((totalCarb / servings) * 10) / 10,
      fat: Math.round((totalFat / servings) * 10) / 10,
    },
    total: {
      calories: Math.round(totalCal),
      protein: Math.round(totalPro * 10) / 10,
      carbs: Math.round(totalCarb * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
    },
    missing,
  };
}

// Test with first recipe
const recipe1 = {
  id: 'grilled-chicken-quinoa-bowl',
  name: 'Grilled Chicken Quinoa Power Bowl',
  servings: 1,
  ingredients: [
    { item: 'chicken breast', quantity: 150, unit: 'g' },
    { item: 'cooked quinoa', quantity: 100, unit: 'g' },
    { item: 'broccoli florets', quantity: 100, unit: 'g' },
    { item: 'cherry tomatoes', quantity: 80, unit: 'g' },
    { item: 'tahini', quantity: 15, unit: 'g' },
    { item: 'lemon juice', quantity: 1, unit: 'tbsp' },
    { item: 'olive oil', quantity: 1, unit: 'tsp' },
    { item: 'garlic powder', quantity: 0.5, unit: 'tsp' },
    { item: 'salt and pepper', quantity: 1, unit: 'pinch' }
  ]
};

const result = calculateNutrition(recipe1.ingredients, recipe1.servings);

console.log('🔍 Sample Calculation - Grilled Chicken Quinoa Bowl\\n');
console.log('Per Serving:', result.perServing);
console.log('Total Batch:', result.total);
console.log('Missing ingredients:', result.missing.length > 0 ? result.missing : 'None');
console.log('\\n✅ Calculated calories:', result.perServing.calories, 'vs hardcoded 485');
console.log('Difference:', result.perServing.calories - 485, 'calories');
