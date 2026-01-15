/**
 * Fix Recipe Nutrition - Replace hardcoded 485 with accurate calculated values
 * Run with: node scripts/fix-all-recipe-nutrition.js
 */

const fs = require('fs');
const path = require('path');

// Comprehensive nutrition database (per 100g)
const nutritionDB = {
  // Proteins
  'chicken breast': { cal: 165, pro: 31, carb: 0, fat: 3.6 },
  'ground chicken breast': { cal: 144, pro: 27, carb: 0, fat: 3.2 },
  'chicken thighs': { cal: 209, pro: 26, carb: 0, fat: 11 },
  'boneless, skinless chicken thighs': { cal: 209, pro: 26, carb: 0, fat: 11 },
  'turkey breast': { cal: 135, pro: 29, carb: 0, fat: 1.5 },
  'sliced turkey breast': { cal: 135, pro: 29, carb: 0, fat: 1.5 },
  'ground turkey': { cal: 149, pro: 28, carb: 0, fat: 3.4 },
  'lean ground turkey': { cal: 149, pro: 28, carb: 0, fat: 3.4 },
  'ground beef (93/7)': { cal: 217, pro: 26, carb: 0, fat: 12 },
  'lean ground beef (93/7)': { cal: 217, pro: 26, carb: 0, fat: 12 },
  'ribeye steak': { cal: 250, pro: 26, carb: 0, fat: 16 },
  'ground bison': { cal: 146, pro: 28, carb: 0, fat: 2.8 },
  'pork chop (bone-in)': { cal: 206, pro: 27, carb: 0, fat: 10 },
  'salmon fillet': { cal: 208, pro: 20, carb: 0, fat: 13 },
  'tuna steak (sushi-grade)': { cal: 144, pro: 30, carb: 0, fat: 1.4 },
  'canned tuna in water': { cal: 116, pro: 26, carb: 0, fat: 0.8 },
  'cod fillet': { cal: 82, pro: 18, carb: 0, fat: 0.7 },
  'tilapia fillet': { cal: 96, pro: 20, carb: 0, fat: 1.7 },
  'large shrimp (peeled)': { cal: 99, pro: 24, carb: 0.2, fat: 0.3 },
  'large eggs': { cal: 143, pro: 13, carb: 1.1, fat: 9.5 },
  'egg whites': { cal: 52, pro: 11, carb: 0.7, fat: 0.2 },
  'egg white': { cal: 52, pro: 11, carb: 0.7, fat: 0.2 },
  'Greek yogurt (0% fat)': { cal: 59, pro: 10, carb: 3.6, fat: 0.4 },
  'Greek yogurt': { cal: 59, pro: 10, carb: 3.6, fat: 0.4 },
  'low-fat cottage cheese': { cal: 98, pro: 11, carb: 4.5, fat: 2.5 },
  'firm tofu (pressed)': { cal: 83, pro: 10, carb: 2.3, fat: 5 },
  'cooked chickpeas': { cal: 164, pro: 8.9, carb: 27, fat: 2.6 },
  'black beans (cooked)': { cal: 132, pro: 8.9, carb: 24, fat: 0.5 },
  'kidney beans (canned)': { cal: 127, pro: 8.7, carb: 23, fat: 0.5 },
  'brown lentils (dry)': { cal: 116, pro: 9, carb: 20, fat: 0.4 },
  'red lentils (dry)': { cal: 116, pro: 9, carb: 20, fat: 0.4 },
  'edamame (shelled)': { cal: 122, pro: 11, carb: 8.9, fat: 5.2 },
  
  // Carbs
  'cooked quinoa': { cal: 120, pro: 4.4, carb: 21, fat: 1.9 },
  'quinoa (uncooked)': { cal: 368, pro: 14, carb: 64, fat: 6 },
  'cooked brown rice': { cal: 112, pro: 2.6, carb: 24, fat: 0.9 },
  'cooked jasmine rice': { cal: 130, pro: 2.7, carb: 28, fat: 0.3 },
  'cooked brown rice (cold)': { cal: 112, pro: 2.6, carb: 24, fat: 0.9 },
  'cooked couscous': { cal: 112, pro: 3.8, carb: 23, fat: 0.2 },
  'whole wheat pasta': { cal: 131, pro: 5.5, carb: 26, fat: 0.5 },
  'whole wheat penne': { cal: 131, pro: 5.5, carb: 26, fat: 0.5 },
  'rolled oats': { cal: 389, pro: 17, carb: 66, fat: 6.9 },
  'oat flour': { cal: 404, pro: 14, carb: 66, fat: 9.1 },
  'sweet potato (cubed)': { cal: 86, pro: 1.6, carb: 20, fat: 0.1 },
  'cooked sweet potato': { cal: 86, pro: 1.6, carb: 20, fat: 0.1 },
  'large sweet potato': { cal: 86, pro: 1.6, carb: 20, fat: 0.1 },
  'baby potatoes (halved)': { cal: 77, pro: 2, carb: 17, fat: 0.1 },
  'whole grain bread': { cal: 250, pro: 13, carb: 41, fat: 3.4 },
  'whole wheat tortillas': { cal: 240, pro: 8, carb: 45, fat: 4 },
  'whole wheat tortilla': { cal: 240, pro: 8, carb: 45, fat: 4 },
  'whole grain bun': { cal: 260, pro: 11, carb: 44, fat: 4.5 },
  
  // Veggies
  'broccoli florets': { cal: 35, pro: 2.8, carb: 7, fat: 0.4 },
  'asparagus spears': { cal: 20, pro: 2.2, carb: 3.9, fat: 0.1 },
  'fresh spinach': { cal: 23, pro: 2.9, carb: 3.6, fat: 0.4 },
  'kale (chopped)': { cal: 49, pro: 4.3, carb: 8.8, fat: 0.9 },
  'mixed greens': { cal: 25, pro: 2.5, carb: 4, fat: 0.4 },
  'romaine lettuce leaves': { cal: 17, pro: 1.2, carb: 3.3, fat: 0.3 },
  'butter lettuce leaves': { cal: 13, pro: 1.4, carb: 2.2, fat: 0.2 },
  'cauliflower rice': { cal: 25, pro: 1.9, carb: 5, fat: 0.3 },
  'zucchini (spiralized)': { cal: 17, pro: 1.2, carb: 3.1, fat: 0.3 },
  'zucchini (sliced)': { cal: 17, pro: 1.2, carb: 3.1, fat: 0.3 },
  'zucchini (diced)': { cal: 17, pro: 1.2, carb: 3.1, fat: 0.3 },
  'bell peppers (sliced)': { cal: 31, pro: 1, carb: 6, fat: 0.3 },
  'red bell pepper (sliced)': { cal: 31, pro: 1, carb: 6, fat: 0.3 },
  'red bell pepper (chunks)': { cal: 31, pro: 1, carb: 6, fat: 0.3 },
  'cherry tomatoes': { cal: 18, pro: 0.9, carb: 3.9, fat: 0.2 },
  'cherry tomatoes (halved)': { cal: 18, pro: 0.9, carb: 3.9, fat: 0.2 },
  'cherry tomatoes (quartered)': { cal: 18, pro: 0.9, carb: 3.9, fat: 0.2 },
  'tomatoes (diced)': { cal: 18, pro: 0.9, carb: 3.9, fat: 0.2 },
  'diced tomatoes (canned)': { cal: 32, pro: 1.6, carb: 7, fat: 0.3 },
  'cucumber': { cal: 16, pro: 0.7, carb: 3.6, fat: 0.1 },
  'cucumber (diced)': { cal: 16, pro: 0.7, carb: 3.6, fat: 0.1 },
  'green beans': { cal: 31, pro: 1.8, carb: 7, fat: 0.2 },
  'carrots (julienned)': { cal: 41, pro: 0.9, carb: 10, fat: 0.2 },
  'carrots (chopped)': { cal: 41, pro: 0.9, carb: 10, fat: 0.2 },
  'mushrooms (sliced)': { cal: 22, pro: 3.1, carb: 3.3, fat: 0.3 },
  'mushrooms (diced)': { cal: 22, pro: 3.1, carb: 3.3, fat: 0.3 },
  'portobello mushroom caps': { cal: 22, pro: 2.1, carb: 3.9, fat: 0.3 },
  'Brussels sprouts (halved)': { cal: 43, pro: 3.4, carb: 9, fat: 0.3 },
  'celery (chopped)': { cal: 14, pro: 0.7, carb: 3, fat: 0.2 },
  'celery (diced)': { cal: 14, pro: 0.7, carb: 3, fat: 0.2 },
  'onion (diced)': { cal: 40, pro: 1.1, carb: 9.3, fat: 0.1 },
  'red onion (diced)': { cal: 40, pro: 1.1, carb: 9.3, fat: 0.1 },
  'red onion (sliced)': { cal: 40, pro: 1.1, carb: 9.3, fat: 0.1 },
  'green onions (sliced)': { cal: 32, pro: 1.8, carb: 7.3, fat: 0.2 },
  'snap peas': { cal: 42, pro: 2.8, carb: 7.6, fat: 0.2 },
  'corn kernels': { cal: 86, pro: 3.2, carb: 19, fat: 1.2 },
  
  // Fruits
  'banana (mashed)': { cal: 89, pro: 1.1, carb: 23, fat: 0.3 },
  'banana (sliced)': { cal: 89, pro: 1.1, carb: 23, fat: 0.3 },
  'banana (frozen)': { cal: 89, pro: 1.1, carb: 23, fat: 0.3 },
  'apple (diced)': { cal: 52, pro: 0.3, carb: 14, fat: 0.2 },
  'mixed berries (fresh)': { cal: 57, pro: 0.7, carb: 14, fat: 0.3 },
  'mixed berries (fresh/frozen)': { cal: 57, pro: 0.7, carb: 14, fat: 0.3 },
  'frozen mixed berries': { cal: 57, pro: 0.7, carb: 14, fat: 0.3 },
  'fresh berries': { cal: 57, pro: 0.7, carb: 14, fat: 0.3 },
  'avocado': { cal: 160, pro: 2, carb: 8.5, fat: 15 },
  'lime juice': { cal: 25, pro: 0.4, carb: 8.4, fat: 0.1 },
  'lemon juice': { cal: 22, pro: 0.4, carb: 6.9, fat: 0.2 },
  
  // Fats
  'olive oil': { cal: 884, pro: 0, carb: 0, fat: 100 },
  'sesame oil': { cal: 884, pro: 0, carb: 0, fat: 100 },
  'butter': { cal: 717, pro: 0.9, carb: 0.1, fat: 81 },
  'peanut butter': { cal: 588, pro: 25, carb: 20, fat: 50 },
  'natural peanut butter': { cal: 588, pro: 25, carb: 20, fat: 50 },
  'almond butter': { cal: 614, pro: 21, carb: 19, fat: 56 },
  'tahini': { cal: 595, pro: 17, carb: 21, fat: 54 },
  
  // Cheese
  'feta cheese': { cal: 264, pro: 14, carb: 4.1, fat: 21 },
  'feta cheese (crumbled)': { cal: 264, pro: 14, carb: 4.1, fat: 21 },
  'parmesan cheese (grated)': { cal: 431, pro: 38, carb: 3.2, fat: 29 },
  'parmesan cheese': { cal: 431, pro: 38, carb: 3.2, fat: 29 },
  'cheddar cheese (shredded)': { cal: 403, pro: 25, carb: 1.3, fat: 33 },
  'reduced-fat cheddar': { cal: 280, pro: 28, carb: 2, fat: 17 },
  'fresh mozzarella': { cal: 280, pro: 28, carb: 2.2, fat: 17 },
  'mozzarella cheese (shredded)': { cal: 280, pro: 28, carb: 2.2, fat: 17 },
  'light cream cheese': { cal: 216, pro: 8, carb: 9, fat: 17 },
  'blue cheese crumbles': { cal: 353, pro: 21, carb: 2.3, fat: 29 },
  
  // Nuts
  'almonds': { cal: 579, pro: 21, carb: 22, fat: 50 },
  'sliced almonds': { cal: 579, pro: 21, carb: 22, fat: 50 },
  'walnuts (chopped)': { cal: 654, pro: 15, carb: 14, fat: 65 },
  'chia seeds': { cal: 486, pro: 17, carb: 42, fat: 31 },
  'sesame seeds (mixed black/white)': { cal: 573, pro: 18, carb: 23, fat: 50 },
  'granola': { cal: 489, pro: 11, carb: 55, fat: 24 },
  
  // Sauces
  'marinara sauce (low-sugar)': { cal: 66, pro: 2, carb: 12, fat: 1.6 },
  'salsa': { cal: 27, pro: 1, carb: 6, fat: 0.1 },
  'buffalo sauce': { cal: 33, pro: 0.5, carb: 3, fat: 2 },
  'teriyaki sauce (low-sodium)': { cal: 89, pro: 6, carb: 15, fat: 0.1 },
  'soy sauce (low-sodium)': { cal: 53, pro: 5.5, carb: 4.9, fat: 0.1 },
  'soy sauce': { cal: 53, pro: 5.5, carb: 4.9, fat: 0.1 },
  'hoisin sauce': { cal: 220, pro: 2, carb: 50, fat: 1 },
  'basil pesto': { cal: 369, pro: 8, carb: 8, fat: 35 },
  'Dijon mustard': { cal: 66, pro: 4, carb: 6, fat: 3 },
  'honey': { cal: 304, pro: 0.3, carb: 82, fat: 0 },
  'maple syrup': { cal: 260, pro: 0, carb: 67, fat: 0.1 },
  'sugar-free syrup': { cal: 20, pro: 0, carb: 8, fat: 0 },
  'balsamic glaze': { cal: 227, pro: 0.5, carb: 56, fat: 0 },
  'hummus': { cal: 177, pro: 8, carb: 14, fat: 10 },
  'tzatziki sauce': { cal: 69, pro: 3, carb: 5, fat: 4 },
  'Greek yogurt ranch': { cal: 80, pro: 4, carb: 7, fat: 3 },
  
  // Protein powder
  'vanilla protein powder': { cal: 400, pro: 80, carb: 10, fat: 5 },
  'chocolate protein powder': { cal: 400, pro: 80, carb: 10, fat: 5 },
  
  // Misc
  'coconut milk (light)': { cal: 125, pro: 1.2, carb: 3, fat: 12 },
  'almond milk': { cal: 17, pro: 0.6, carb: 0.6, fat: 1.2 },
  'milk': { cal: 42, pro: 3.4, carb: 5, fat: 1 },
  'breadcrumbs': { cal: 395, pro: 13, carb: 72, fat: 5 },
  'almond flour': { cal: 571, pro: 21, carb: 21, fat: 50 },
  'dark chocolate chips': { cal: 546, pro: 5, carb: 60, fat: 32 },
  'kalamata olives': { cal: 115, pro: 0.8, carb: 6, fat: 11 },
  'kalamata olives (chopped)': { cal: 115, pro: 0.8, carb: 6, fat: 11 },
  'water chestnuts (diced)': { cal: 97, pro: 1.4, carb: 24, fat: 0.1 },
  'raisins': { cal: 299, pro: 3.1, carb: 79, fat: 0.5 },
  'vegetable broth': { cal: 12, pro: 0.5, carb: 2, fat: 0.3 },
  'couscous (dry)': { cal: 376, pro: 13, carb: 77, fat: 0.6 },
  'mixed vegetables (frozen)': { cal: 65, pro: 2.5, carb: 13, fat: 0.3 },
  
  // Herbs/spices (minimal impact)
  'garlic cloves': { cal: 5, pro: 0.2, carb: 1, fat: 0 },
  'garlic cloves (minced)': { cal: 5, pro: 0.2, carb: 1, fat: 0 },
  'ginger (grated)': { cal: 2, pro: 0, carb: 0.4, fat: 0 },
  'grated ginger': { cal: 2, pro: 0, carb: 0.4, fat: 0 },
  'fresh parsley': { cal: 1, pro: 0.1, carb: 0.2, fat: 0 },
  'fresh basil leaves': { cal: 1, pro: 0.1, carb: 0.1, fat: 0 },
  'fresh dill': { cal: 1, pro: 0.1, carb: 0.2, fat: 0 },
  'fresh cilantro': { cal: 1, pro: 0.1, carb: 0.1, fat: 0 },
  'fresh mint': { cal: 1, pro: 0.1, carb: 0.4, fat: 0 },
  'fresh rosemary': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'fresh thyme': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'bay leaves': { cal: 0, pro: 0, carb: 0, fat: 0 },
  
  // Zero-cal seasonings
  'salt and pepper': { cal: 0, pro: 0, carb: 0, fat: 0 },
  'sea salt': { cal: 0, pro: 0, carb: 0, fat: 0 },
  'garlic powder': { cal: 1, pro: 0, carb: 0.3, fat: 0 },
  'paprika': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'cumin': { cal: 1, pro: 0, carb: 0.1, fat: 0 },
  'chili powder': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'curry powder': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'turmeric': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'cinnamon': { cal: 1, pro: 0, carb: 0.3, fat: 0 },
  'Italian seasoning': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'fajita seasoning': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'Cajun seasoning': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'taco seasoning': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'dried oregano': { cal: 1, pro: 0, carb: 0.3, fat: 0 },
  'vanilla extract': { cal: 12, pro: 0, carb: 0.5, fat: 0 },
  'baking powder': { cal: 1, pro: 0, carb: 0.3, fat: 0 },
  'red pepper flakes': { cal: 1, pro: 0, carb: 0.2, fat: 0 },
  'everything bagel seasoning': { cal: 2, pro: 0.1, carb: 0.2, fat: 0.1 },
  'cooking spray': { cal: 0, pro: 0, carb: 0, fat: 0 },
};

// Unit conversions to grams
const unitConv = {
  'g': 1, 'kg': 1000, 'oz': 28.35, 'lb': 453.59,
  'ml': 1, 'l': 1000, 'cup': 240, 'tbsp': 15, 'tsp': 5,
  'whole': 100, 'medium': 100, 'large': 120, 'small': 80,
  'leaves': 2, 'slices': 25, 'stalks': 10, 'sprigs': 2, 'rings': 10,
  'pinch': 0.5, 'spray': 0.2,
};

function convertToGrams(qty, unit) {
  return qty * (unitConv[unit.toLowerCase()] || 1);
}

function calculate(ingredients, servings) {
  let cal = 0, pro = 0, carb = 0, fat = 0;
  const missing = [];
  
  for (const ing of ingredients) {
    const key = ing.item.toLowerCase();
    const nutData = nutritionDB[key];
    
    if (!nutData) {
      missing.push(ing.item);
      continue;
    }
    
    const grams = convertToGrams(ing.quantity, ing.unit);
    const factor = grams / 100;
    
    cal += nutData.cal * factor;
    pro += nutData.pro * factor;
    carb += nutData.carb * factor;
    fat += nutData.fat * factor;
  }
  
  return {
    calories: Math.round(cal / servings),
    protein_g: Math.round((pro / servings) * 10) / 10,
    carbs_g: Math.round((carb / servings) * 10) / 10,
    fat_g: Math.round((fat / servings) * 10) / 10,
    missing,
  };
}

// Read recipes.ts
const recipesPath = path.join(__dirname, '../lib/recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf-8');

console.log('🔍 Analyzing recipes.ts...\n');

// Find all recipe blocks with calories: 485
const recipePattern = /\{\s*id:\s*'([^']+)',[\s\S]*?calories:\s*485,[\s\S]*?protein_g:\s*(\d+\.?\d*),[\s\S]*?carbs_g:\s*(\d+\.?\d*),[\s\S]*?fat_g:\s*(\d+\.?\d*),[\s\S]*?servings:\s*(\d+),[\s\S]*?ingredients:\s*\[([\s\S]*?)\],/g;

let match;
let count = 0;
let fixed = 0;
const changes = [];

while ((match = recipePattern.exec(content)) !== null) {
  count++;
  const [fullMatch, id, oldProtein, oldCarbs, oldFat, servings, ingredientsStr] = match;
  
  // Parse ingredients from the match
  const ingredientMatches = ingredientsStr.matchAll(/\{\s*item:\s*'([^']+)',\s*quantity:\s*(\d+\.?\d*),\s*unit:\s*'([^']+)'\s*\}/g);
  const ingredients = Array.from(ingredientMatches).map(m => ({
    item: m[1],
    quantity: parseFloat(m[2]),
    unit: m[3],
  }));
  
  if (ingredients.length === 0) continue;
  
  // Calculate accurate nutrition
  const calc = calculate(ingredients, parseInt(servings));
  
  // Create replacement
  const oldNutrition = `calories: 485,\n    protein_g: ${oldProtein},\n    carbs_g: ${oldCarbs},\n    fat_g: ${oldFat},`;
  const newNutrition = `calories: ${calc.calories},\n    protein_g: ${calc.protein_g},\n    carbs_g: ${calc.carbs_g},\n    fat_g: ${calc.fat_g},`;
  
  content = content.replace(oldNutrition, newNutrition);
  
  changes.push({
    id,
    old: { cal: 485, pro: parseFloat(oldProtein), carb: parseFloat(oldCarbs), fat: parseFloat(oldFat) },
    new: calc,
  });
  fixed++;
}

// Write updated file
fs.writeFileSync(recipesPath, content, 'utf-8');

console.log(`✅ Fixed ${fixed}/${count} recipes\n`);
console.log('Sample changes:');
changes.slice(0, 5).forEach(c => {
  console.log(`\n${c.id}:`);
  console.log(`  485 → ${c.new.calories} calories (${c.new.calories > 485 ? '+' : ''}${c.new.calories - 485})`);
  console.log(`  ${c.old.pro}g → ${c.new.protein_g}g protein`);
  console.log(`  ${c.old.carb}g → ${c.new.carbs_g}g carbs`);
  console.log(`  ${c.old.fat}g → ${c.new.fat_g}g fat`);
  if (c.new.missing.length > 0) {
    console.log(`  ⚠️  Missing: ${c.new.missing.join(', ')}`);
  }
});

console.log('\n\n✅ recipes.ts updated successfully!');
