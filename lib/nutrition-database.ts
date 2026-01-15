/**
 * Nutrition Database - Per 100g values for common ingredients
 * Source: USDA FoodData Central and reliable nutrition databases
 */

export interface IngredientNutrition {
  name: string;
  calories: number; // per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fat: number; // grams per 100g
  aliases?: string[]; // Alternative names for matching
}

// Unit conversion to grams
export const UNIT_TO_GRAMS: Record<string, number> = {
  // Weight
  'g': 1,
  'kg': 1000,
  'oz': 28.35,
  'lb': 453.59,
  
  // Volume (approximations for common ingredients)
  'ml': 1, // 1ml water = ~1g (varies by density)
  'l': 1000,
  'cup': 240, // ~240ml
  'tbsp': 15,
  'tsp': 5,
  
  // Counts (handled specially)
  'whole': 0, // Requires lookup
  'medium': 0,
  'large': 0,
  'small': 0,
  'leaves': 0,
  'slices': 0,
  'stalks': 0,
  'sprigs': 0,
  'pinch': 0.5,
  'spray': 0.5,
};

// Common ingredient weights for "whole" items
export const WHOLE_ITEM_WEIGHTS: Record<string, number> = {
  'egg': 50,
  'large egg': 50,
  'medium egg': 44,
  'small egg': 38,
  'banana': 120,
  'small banana': 100,
  'medium banana': 120,
  'large banana': 140,
  'apple': 180,
  'small apple': 150,
  'medium apple': 180,
  'large apple': 220,
  'lemon': 60,
  'lime': 45,
  'onion': 150,
  'small onion': 110,
  'medium onion': 150,
  'large onion': 200,
  'garlic clove': 3,
  'tomato': 120,
  'avocado': 200,
  'sweet potato': 130,
  'potato': 170,
};

/**
 * Comprehensive nutrition database (per 100g)
 */
export const NUTRITION_DATABASE: IngredientNutrition[] = [
  // PROTEINS - Meat & Poultry
  { name: 'chicken breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, aliases: ['chicken', 'grilled chicken'] },
  { name: 'ground chicken breast', calories: 144, protein: 27, carbs: 0, fat: 3.2 },
  { name: 'chicken thighs', calories: 209, protein: 26, carbs: 0, fat: 11, aliases: ['boneless skinless chicken thighs'] },
  { name: 'turkey breast', calories: 135, protein: 29, carbs: 0, fat: 1.5, aliases: ['sliced turkey breast', 'turkey'] },
  { name: 'ground turkey', calories: 149, protein: 28, carbs: 0, fat: 3.4, aliases: ['lean ground turkey'] },
  { name: 'ground beef', calories: 217, protein: 26, carbs: 0, fat: 12, aliases: ['lean ground beef', 'ground beef (93/7)'] },
  { name: 'ribeye steak', calories: 250, protein: 26, carbs: 0, fat: 16 },
  { name: 'ground bison', calories: 146, protein: 28, carbs: 0, fat: 2.8 },
  { name: 'pork chop', calories: 206, protein: 27, carbs: 0, fat: 10 },
  
  // PROTEINS - Seafood
  { name: 'salmon fillet', calories: 208, protein: 20, carbs: 0, fat: 13, aliases: ['salmon'] },
  { name: 'tuna steak', calories: 144, protein: 30, carbs: 0, fat: 1.4, aliases: ['sushi-grade tuna'] },
  { name: 'canned tuna in water', calories: 116, protein: 26, carbs: 0, fat: 0.8, aliases: ['tuna'] },
  { name: 'cod fillet', calories: 82, protein: 18, carbs: 0, fat: 0.7, aliases: ['cod'] },
  { name: 'tilapia fillet', calories: 96, protein: 20, carbs: 0, fat: 1.7, aliases: ['tilapia'] },
  { name: 'shrimp', calories: 99, protein: 24, carbs: 0.2, fat: 0.3, aliases: ['large shrimp', 'peeled shrimp'] },
  
  // PROTEINS - Eggs & Dairy
  { name: 'large eggs', calories: 143, protein: 13, carbs: 1.1, fat: 9.5, aliases: ['egg', 'eggs'] },
  { name: 'egg whites', calories: 52, protein: 11, carbs: 0.7, fat: 0.2, aliases: ['egg white'] },
  { name: 'Greek yogurt (0% fat)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, aliases: ['Greek yogurt', 'fat-free Greek yogurt'] },
  { name: 'low-fat cottage cheese', calories: 98, protein: 11, carbs: 4.5, fat: 2.5, aliases: ['cottage cheese'] },
  { name: 'milk', calories: 42, protein: 3.4, carbs: 5, fat: 1 },
  { name: 'almond milk', calories: 17, protein: 0.6, carbs: 0.6, fat: 1.2 },
  
  // PROTEINS - Plant-based
  { name: 'firm tofu', calories: 83, protein: 10, carbs: 2.3, fat: 5, aliases: ['tofu', 'pressed tofu'] },
  { name: 'cooked chickpeas', calories: 164, protein: 8.9, carbs: 27, fat: 2.6, aliases: ['chickpeas', 'garbanzo beans'] },
  { name: 'black beans', calories: 132, protein: 8.9, carbs: 24, fat: 0.5, aliases: ['black beans (cooked)', 'cooked black beans'] },
  { name: 'kidney beans', calories: 127, protein: 8.7, carbs: 23, fat: 0.5 },
  { name: 'brown lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, aliases: ['lentils', 'cooked lentils', 'lentils (dry)'] },
  { name: 'red lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, aliases: ['red lentils (dry)'] },
  { name: 'edamame', calories: 122, protein: 11, carbs: 8.9, fat: 5.2, aliases: ['edamame (shelled)', 'frozen edamame', 'frozen edamame (in pods)'] },
  
  // CARBS - Grains & Starches
  { name: 'cooked quinoa', calories: 120, protein: 4.4, carbs: 21, fat: 1.9, aliases: ['quinoa'] },
  { name: 'cooked brown rice', calories: 112, protein: 2.6, carbs: 24, fat: 0.9, aliases: ['brown rice'] },
  { name: 'cooked jasmine rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, aliases: ['jasmine rice', 'white rice'] },
  { name: 'cooked couscous', calories: 112, protein: 3.8, carbs: 23, fat: 0.2, aliases: ['couscous'] },
  { name: 'whole wheat pasta', calories: 131, protein: 5.5, carbs: 26, fat: 0.5, aliases: ['pasta', 'whole wheat penne'] },
  { name: 'rolled oats', calories: 389, protein: 17, carbs: 66, fat: 6.9, aliases: ['oats'] },
  { name: 'oat flour', calories: 404, protein: 14, carbs: 66, fat: 9.1 },
  { name: 'sweet potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, aliases: ['cooked sweet potato', 'sweet potato (cubed)'] },
  { name: 'baby potatoes', calories: 77, protein: 2, carbs: 17, fat: 0.1, aliases: ['potato', 'potatoes'] },
  { name: 'whole grain bread', calories: 250, protein: 13, carbs: 41, fat: 3.4, aliases: ['bread'] },
  { name: 'whole wheat tortillas', calories: 240, protein: 8, carbs: 45, fat: 4, aliases: ['whole wheat tortilla', 'tortilla', 'tortillas'] },
  { name: 'whole grain bun', calories: 260, protein: 11, carbs: 44, fat: 4.5 },
  
  // VEGETABLES
  { name: 'broccoli florets', calories: 35, protein: 2.8, carbs: 7, fat: 0.4, aliases: ['broccoli'] },
  { name: 'asparagus spears', calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, aliases: ['asparagus'] },
  { name: 'spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, aliases: ['fresh spinach', 'baby spinach'] },
  { name: 'kale', calories: 49, protein: 4.3, carbs: 8.8, fat: 0.9, aliases: ['chopped kale'] },
  { name: 'mixed greens', calories: 25, protein: 2.5, carbs: 4, fat: 0.4 },
  { name: 'romaine lettuce leaves', calories: 17, protein: 1.2, carbs: 3.3, fat: 0.3, aliases: ['lettuce', 'romaine'] },
  { name: 'butter lettuce leaves', calories: 13, protein: 1.4, carbs: 2.2, fat: 0.2 },
  { name: 'cauliflower rice', calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
  { name: 'zucchini', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, aliases: ['zucchini (spiralized)', 'zucchini (sliced)', 'zucchini (diced)'] },
  { name: 'bell peppers', calories: 31, protein: 1, carbs: 6, fat: 0.3, aliases: ['red bell pepper', 'bell pepper (sliced)', 'bell peppers (sliced)', 'red bell pepper (chunks)'] },
  { name: 'cherry tomatoes', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, aliases: ['tomatoes', 'cherry tomatoes (halved)', 'tomato', 'tomatoes (diced)', 'tomato (sliced)'] },
  { name: 'cucumber', calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, aliases: ['cucumber (diced)'] },
  { name: 'green beans', calories: 31, protein: 1.8, carbs: 7, fat: 0.2 },
  { name: 'carrots', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, aliases: ['carrots (julienned)', 'carrots (chopped)'] },
  { name: 'mushrooms', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, aliases: ['mushrooms (sliced)', 'mushrooms (diced)'] },
  { name: 'portobello mushroom caps', calories: 22, protein: 2.1, carbs: 3.9, fat: 0.3 },
  { name: 'Brussels sprouts', calories: 43, protein: 3.4, carbs: 9, fat: 0.3, aliases: ['Brussels sprouts (halved)'] },
  { name: 'celery', calories: 14, protein: 0.7, carbs: 3, fat: 0.2, aliases: ['celery (chopped)', 'celery (diced)'] },
  { name: 'onion', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, aliases: ['red onion', 'onion (diced)', 'red onion (diced)', 'red onion (sliced)'] },
  { name: 'green onions', calories: 32, protein: 1.8, carbs: 7.3, fat: 0.2, aliases: ['green onions (sliced)'] },
  { name: 'snap peas', calories: 42, protein: 2.8, carbs: 7.6, fat: 0.2 },
  { name: 'corn kernels', calories: 86, protein: 3.2, carbs: 19, fat: 1.2 },
  
  // FRUITS
  { name: 'banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, aliases: ['banana (mashed)', 'banana (sliced)', 'banana (frozen)'] },
  { name: 'apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, aliases: ['apple (diced)', 'apple (large)'] },
  { name: 'mixed berries', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, aliases: ['berries', 'fresh berries', 'mixed berries (fresh)', 'mixed berries (fresh/frozen)', 'frozen mixed berries'] },
  { name: 'avocado', calories: 160, protein: 2, carbs: 8.5, fat: 15 },
  { name: 'lemon', calories: 29, protein: 1.1, carbs: 9, fat: 0.3 },
  { name: 'lime juice', calories: 25, protein: 0.4, carbs: 8.4, fat: 0.1 },
  { name: 'lemon juice', calories: 22, protein: 0.4, carbs: 6.9, fat: 0.2 },
  
  // FATS & OILS
  { name: 'olive oil', calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: 'olive oil spray', calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: 'sesame oil', calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: 'butter', calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
  { name: 'peanut butter', calories: 588, protein: 25, carbs: 20, fat: 50, aliases: ['natural peanut butter'] },
  { name: 'almond butter', calories: 614, protein: 21, carbs: 19, fat: 56 },
  { name: 'tahini', calories: 595, protein: 17, carbs: 21, fat: 54 },
  
  // CHEESE
  { name: 'feta cheese', calories: 264, protein: 14, carbs: 4.1, fat: 21 },
  { name: 'parmesan cheese', calories: 431, protein: 38, carbs: 3.2, fat: 29, aliases: ['parmesan cheese (grated)'] },
  { name: 'cheddar cheese', calories: 403, protein: 25, carbs: 1.3, fat: 33, aliases: ['reduced-fat cheddar', 'cheddar cheese (shredded)'] },
  { name: 'mozzarella cheese', calories: 280, protein: 28, carbs: 2.2, fat: 17, aliases: ['fresh mozzarella', 'mozzarella cheese (shredded)'] },
  { name: 'light cream cheese', calories: 216, protein: 8, carbs: 9, fat: 17, aliases: ['cream cheese'] },
  { name: 'blue cheese crumbles', calories: 353, protein: 21, carbs: 2.3, fat: 29 },
  
  // NUTS & SEEDS
  { name: 'almonds', calories: 579, protein: 21, carbs: 22, fat: 50, aliases: ['sliced almonds'] },
  { name: 'walnuts', calories: 654, protein: 15, carbs: 14, fat: 65, aliases: ['walnuts (chopped)'] },
  { name: 'chia seeds', calories: 486, protein: 17, carbs: 42, fat: 31 },
  { name: 'sesame seeds', calories: 573, protein: 18, carbs: 23, fat: 50, aliases: ['sesame seeds (mixed black/white)'] },
  { name: 'granola', calories: 489, protein: 11, carbs: 55, fat: 24, aliases: ['granola (topping)'] },
  
  // SAUCES & CONDIMENTS
  { name: 'marinara sauce', calories: 66, protein: 2, carbs: 12, fat: 1.6, aliases: ['marinara sauce (low-sugar)'] },
  { name: 'salsa', calories: 27, protein: 1, carbs: 6, fat: 0.1 },
  { name: 'buffalo sauce', calories: 33, protein: 0.5, carbs: 3, fat: 2 },
  { name: 'teriyaki sauce', calories: 89, protein: 6, carbs: 15, fat: 0.1, aliases: ['teriyaki sauce (low-sodium)'] },
  { name: 'soy sauce', calories: 53, protein: 5.5, carbs: 4.9, fat: 0.1, aliases: ['soy sauce (low-sodium)'] },
  { name: 'hoisin sauce', calories: 220, protein: 2, carbs: 50, fat: 1 },
  { name: 'basil pesto', calories: 369, protein: 8, carbs: 8, fat: 35, aliases: ['pesto'] },
  { name: 'Dijon mustard', calories: 66, protein: 4, carbs: 6, fat: 3 },
  { name: 'honey', calories: 304, protein: 0.3, carbs: 82, fat: 0 },
  { name: 'maple syrup', calories: 260, protein: 0, carbs: 67, fat: 0.1 },
  { name: 'sugar-free syrup', calories: 20, protein: 0, carbs: 8, fat: 0 },
  { name: 'balsamic glaze', calories: 227, protein: 0.5, carbs: 56, fat: 0 },
  { name: 'hummus', calories: 177, protein: 8, carbs: 14, fat: 10 },
  { name: 'tzatziki sauce', calories: 69, protein: 3, carbs: 5, fat: 4 },
  { name: 'Greek yogurt ranch', calories: 80, protein: 4, carbs: 7, fat: 3 },
  
  // PROTEIN POWDERS & SUPPLEMENTS
  { name: 'vanilla protein powder', calories: 400, protein: 80, carbs: 10, fat: 5, aliases: ['protein powder', 'chocolate protein powder'] },
  
  // CANNED/PACKAGED
  { name: 'coconut milk', calories: 230, protein: 2.3, carbs: 6, fat: 24, aliases: ['coconut milk (light)'] },
  { name: 'diced tomatoes', calories: 32, protein: 1.6, carbs: 7, fat: 0.3, aliases: ['diced tomatoes (canned)', 'canned tomatoes'] },
  { name: 'vegetable broth', calories: 12, protein: 0.5, carbs: 2, fat: 0.3 },
  
  // MISC
  { name: 'breadcrumbs', calories: 395, protein: 13, carbs: 72, fat: 5 },
  { name: 'almond flour', calories: 571, protein: 21, carbs: 21, fat: 50 },
  { name: 'dark chocolate chips', calories: 546, protein: 5, carbs: 60, fat: 32 },
  { name: 'kalamata olives', calories: 115, protein: 0.8, carbs: 6, fat: 11, aliases: ['olives'] },
  { name: 'water chestnuts', calories: 97, protein: 1.4, carbs: 24, fat: 0.1, aliases: ['water chestnuts (diced)'] },
  { name: 'raisins', calories: 299, protein: 3.1, carbs: 79, fat: 0.5 },
  
  // SPICES & HERBS (negligible nutrition, but included for completeness)
  { name: 'garlic cloves', calories: 149, protein: 6.4, carbs: 33, fat: 0.5, aliases: ['garlic', 'garlic cloves (minced)', 'minced garlic'] },
  { name: 'ginger', calories: 80, protein: 1.8, carbs: 18, fat: 0.8, aliases: ['ginger (grated)', 'grated ginger'] },
  { name: 'fresh parsley', calories: 36, protein: 3, carbs: 6.3, fat: 0.8, aliases: ['parsley'] },
  { name: 'fresh basil leaves', calories: 23, protein: 3.2, carbs: 2.7, fat: 0.6, aliases: ['basil'] },
  { name: 'fresh dill', calories: 43, protein: 3.5, carbs: 7, fat: 1.1, aliases: ['dill'] },
  { name: 'fresh cilantro', calories: 23, protein: 2.1, carbs: 3.7, fat: 0.5, aliases: ['cilantro'] },
  { name: 'fresh mint', calories: 70, protein: 3.8, carbs: 15, fat: 0.9 },
  { name: 'fresh rosemary', calories: 131, protein: 3.3, carbs: 20, fat: 5.9 },
  { name: 'fresh thyme', calories: 101, protein: 5.6, carbs: 24, fat: 1.7, aliases: ['thyme'] },
  
  // SEASONINGS (trace amounts - typically 0 cal per recipe serving)
  { name: 'salt and pepper', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { name: 'sea salt', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { name: 'garlic powder', calories: 331, protein: 16, carbs: 73, fat: 0.7 },
  { name: 'paprika', calories: 282, protein: 14, carbs: 54, fat: 13 },
  { name: 'cumin', calories: 375, protein: 18, carbs: 44, fat: 22 },
  { name: 'chili powder', calories: 282, protein: 13, carbs: 50, fat: 14 },
  { name: 'curry powder', calories: 325, protein: 14, carbs: 55, fat: 14 },
  { name: 'turmeric', calories: 312, protein: 9.7, carbs: 67, fat: 3.3 },
  { name: 'cinnamon', calories: 247, protein: 4, carbs: 81, fat: 1.2 },
  { name: 'Italian seasoning', calories: 265, protein: 9, carbs: 58, fat: 7 },
  { name: 'fajita seasoning', calories: 275, protein: 11, carbs: 52, fat: 5 },
  { name: 'Cajun seasoning', calories: 250, protein: 10, carbs: 48, fat: 5 },
  { name: 'taco seasoning', calories: 275, protein: 11, carbs: 52, fat: 5 },
  { name: 'dried oregano', calories: 265, protein: 9, carbs: 69, fat: 4.3 },
  { name: 'vanilla extract', calories: 288, protein: 0.1, carbs: 13, fat: 0 },
  { name: 'baking powder', calories: 53, protein: 0, carbs: 28, fat: 0 },
  { name: 'red pepper flakes', calories: 318, protein: 12, carbs: 57, fat: 17 },
  { name: 'bay leaves', calories: 313, protein: 7.6, carbs: 75, fat: 8.4 },
  { name: 'everything bagel seasoning', calories: 400, protein: 15, carbs: 40, fat: 20 },
  { name: 'cooking spray', calories: 2, protein: 0, carbs: 0, fat: 0.2 },
];

/**
 * Find ingredient nutrition data by name (case-insensitive, checks aliases)
 */
export function findIngredientNutrition(ingredientName: string): IngredientNutrition | null {
  const normalized = ingredientName.toLowerCase().trim();
  
  return NUTRITION_DATABASE.find(item => {
    if (item.name.toLowerCase() === normalized) return true;
    if (item.aliases) {
      return item.aliases.some(alias => alias.toLowerCase() === normalized);
    }
    return false;
  }) || null;
}

/**
 * Convert ingredient quantity to grams
 */
export function convertToGrams(quantity: number, unit: string, ingredientName: string): number {
  const unitLower = unit.toLowerCase().trim();
  
  // Handle "whole" items by looking up typical weight
  if (unitLower === 'whole' || unitLower === 'medium' || unitLower === 'large' || unitLower === 'small') {
    const lookupName = unitLower === 'whole' ? ingredientName.toLowerCase() : `${unitLower} ${ingredientName.toLowerCase()}`;
    const weight = WHOLE_ITEM_WEIGHTS[lookupName] || WHOLE_ITEM_WEIGHTS[ingredientName.toLowerCase()];
    if (weight) {
      return quantity * weight;
    }
    // Default fallbacks for whole items
    return quantity * 100; // Conservative estimate
  }
  
  // Handle countable items (leaves, slices, etc.)
  if (unitLower === 'leaves') return quantity * 2; // ~2g per leaf
  if (unitLower === 'slices') return quantity * 25; // ~25g per slice
  if (unitLower === 'stalks') return quantity * 10; // ~10g per stalk
  if (unitLower === 'sprigs') return quantity * 2; // ~2g per sprig
  
  // Use standard conversion
  const conversionFactor = UNIT_TO_GRAMS[unitLower];
  if (conversionFactor) {
    return quantity * conversionFactor;
  }
  
  // Fallback: assume it's already in grams
  return quantity;
}
