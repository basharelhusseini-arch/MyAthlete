/**
 * Comprehensive Ingredient Database
 * Based on USDA FoodData Central nutritional data
 * All values are per 100g unless otherwise specified
 */

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  // Nutritional values per 100g
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  sugar_g?: number;
  // Metadata
  searchTerms?: string[]; // Alternative names for searching
  commonServing?: {
    amount: number;
    unit: string;
    grams: number;
  };
}

export const ingredientsDatabase: Ingredient[] = [
  // PROTEINS - Poultry
  {
    id: 'chicken-breast',
    name: 'Chicken Breast (Raw)',
    category: 'Poultry',
    calories: 165,
    protein_g: 31,
    carbs_g: 0,
    fat_g: 3.6,
    fiber_g: 0,
    commonServing: { amount: 1, unit: 'breast', grams: 174 }
  },
  {
    id: 'chicken-breast-cooked',
    name: 'Chicken Breast (Cooked)',
    category: 'Poultry',
    calories: 195,
    protein_g: 29.8,
    carbs_g: 0,
    fat_g: 7.8,
    fiber_g: 0
  },
  {
    id: 'chicken-thigh',
    name: 'Chicken Thigh (Raw)',
    category: 'Poultry',
    calories: 209,
    protein_g: 18.5,
    carbs_g: 0,
    fat_g: 14.7,
    fiber_g: 0
  },
  {
    id: 'turkey-breast',
    name: 'Turkey Breast (Raw)',
    category: 'Poultry',
    calories: 111,
    protein_g: 24,
    carbs_g: 0,
    fat_g: 0.7,
    fiber_g: 0
  },
  {
    id: 'ground-turkey',
    name: 'Ground Turkey (93% Lean)',
    category: 'Poultry',
    calories: 152,
    protein_g: 20,
    carbs_g: 0,
    fat_g: 8,
    fiber_g: 0
  },

  // PROTEINS - Beef
  {
    id: 'ground-beef-90',
    name: 'Ground Beef (90% Lean)',
    category: 'Beef',
    calories: 176,
    protein_g: 20,
    carbs_g: 0,
    fat_g: 10,
    fiber_g: 0
  },
  {
    id: 'ground-beef-95',
    name: 'Ground Beef (95% Lean)',
    category: 'Beef',
    calories: 137,
    protein_g: 21.4,
    carbs_g: 0,
    fat_g: 5,
    fiber_g: 0
  },
  {
    id: 'ribeye-steak',
    name: 'Ribeye Steak (Raw)',
    category: 'Beef',
    calories: 291,
    protein_g: 16.3,
    carbs_g: 0,
    fat_g: 24.6,
    fiber_g: 0
  },
  {
    id: 'sirloin-steak',
    name: 'Sirloin Steak (Raw)',
    category: 'Beef',
    calories: 158,
    protein_g: 21.2,
    carbs_g: 0,
    fat_g: 7.5,
    fiber_g: 0
  },
  {
    id: 'bison-ground',
    name: 'Ground Bison',
    category: 'Beef',
    calories: 146,
    protein_g: 20.2,
    carbs_g: 0,
    fat_g: 7.2,
    fiber_g: 0
  },

  // PROTEINS - Pork
  {
    id: 'pork-chop',
    name: 'Pork Chop (Raw)',
    category: 'Pork',
    calories: 206,
    protein_g: 17.5,
    carbs_g: 0,
    fat_g: 14.8,
    fiber_g: 0
  },
  {
    id: 'pork-tenderloin',
    name: 'Pork Tenderloin (Raw)',
    category: 'Pork',
    calories: 143,
    protein_g: 20.9,
    carbs_g: 0,
    fat_g: 5.9,
    fiber_g: 0
  },
  {
    id: 'bacon',
    name: 'Bacon (Cooked)',
    category: 'Pork',
    calories: 541,
    protein_g: 37.0,
    carbs_g: 1.4,
    fat_g: 41.8,
    fiber_g: 0,
    commonServing: { amount: 1, unit: 'slice', grams: 8 }
  },

  // PROTEINS - Seafood
  {
    id: 'salmon-atlantic',
    name: 'Salmon (Atlantic, Raw)',
    category: 'Seafood',
    calories: 208,
    protein_g: 20,
    carbs_g: 0,
    fat_g: 13.4,
    fiber_g: 0
  },
  {
    id: 'tuna-fresh',
    name: 'Tuna (Fresh, Raw)',
    category: 'Seafood',
    calories: 144,
    protein_g: 23.3,
    carbs_g: 0,
    fat_g: 4.9,
    fiber_g: 0
  },
  {
    id: 'tuna-canned',
    name: 'Tuna (Canned in Water)',
    category: 'Seafood',
    calories: 116,
    protein_g: 25.5,
    carbs_g: 0,
    fat_g: 0.8,
    fiber_g: 0
  },
  {
    id: 'cod',
    name: 'Cod (Raw)',
    category: 'Seafood',
    calories: 82,
    protein_g: 18,
    carbs_g: 0,
    fat_g: 0.7,
    fiber_g: 0
  },
  {
    id: 'tilapia',
    name: 'Tilapia (Raw)',
    category: 'Seafood',
    calories: 96,
    protein_g: 20,
    carbs_g: 0,
    fat_g: 1.7,
    fiber_g: 0
  },
  {
    id: 'shrimp',
    name: 'Shrimp (Raw)',
    category: 'Seafood',
    calories: 99,
    protein_g: 24,
    carbs_g: 0.2,
    fat_g: 0.3,
    fiber_g: 0
  },

  // PROTEINS - Eggs & Dairy
  {
    id: 'eggs-whole',
    name: 'Egg (Whole, Large)',
    category: 'Eggs & Dairy',
    calories: 143,
    protein_g: 12.6,
    carbs_g: 0.7,
    fat_g: 9.5,
    fiber_g: 0,
    commonServing: { amount: 1, unit: 'egg', grams: 50 }
  },
  {
    id: 'egg-whites',
    name: 'Egg Whites',
    category: 'Eggs & Dairy',
    calories: 52,
    protein_g: 10.9,
    carbs_g: 0.7,
    fat_g: 0.2,
    fiber_g: 0
  },
  {
    id: 'greek-yogurt-nonfat',
    name: 'Greek Yogurt (Non-Fat)',
    category: 'Eggs & Dairy',
    calories: 59,
    protein_g: 10.2,
    carbs_g: 3.6,
    fat_g: 0.4,
    fiber_g: 0,
    sugar_g: 3.2
  },
  {
    id: 'greek-yogurt-full',
    name: 'Greek Yogurt (Full-Fat)',
    category: 'Eggs & Dairy',
    calories: 97,
    protein_g: 9,
    carbs_g: 3.9,
    fat_g: 5,
    fiber_g: 0,
    sugar_g: 3.9
  },
  {
    id: 'cottage-cheese',
    name: 'Cottage Cheese (Low-Fat)',
    category: 'Eggs & Dairy',
    calories: 72,
    protein_g: 12.4,
    carbs_g: 4.3,
    fat_g: 1,
    fiber_g: 0
  },
  {
    id: 'milk-whole',
    name: 'Milk (Whole)',
    category: 'Eggs & Dairy',
    calories: 61,
    protein_g: 3.2,
    carbs_g: 4.8,
    fat_g: 3.3,
    fiber_g: 0,
    sugar_g: 5.1
  },
  {
    id: 'milk-skim',
    name: 'Milk (Skim)',
    category: 'Eggs & Dairy',
    calories: 34,
    protein_g: 3.4,
    carbs_g: 5,
    fat_g: 0.1,
    fiber_g: 0,
    sugar_g: 5.1
  },
  {
    id: 'cheese-cheddar',
    name: 'Cheddar Cheese',
    category: 'Eggs & Dairy',
    calories: 403,
    protein_g: 22.9,
    carbs_g: 3.1,
    fat_g: 33.3,
    fiber_g: 0
  },
  {
    id: 'cheese-mozzarella',
    name: 'Mozzarella Cheese (Part-Skim)',
    category: 'Eggs & Dairy',
    calories: 280,
    protein_g: 24.3,
    carbs_g: 3.1,
    fat_g: 17.1,
    fiber_g: 0
  },
  {
    id: 'cheese-feta',
    name: 'Feta Cheese',
    category: 'Eggs & Dairy',
    calories: 264,
    protein_g: 14.2,
    carbs_g: 4.1,
    fat_g: 21.3,
    fiber_g: 0
  },

  // PROTEINS - Plant-Based
  {
    id: 'tofu-firm',
    name: 'Tofu (Firm)',
    category: 'Plant-Based Protein',
    calories: 144,
    protein_g: 15.8,
    carbs_g: 3.5,
    fat_g: 8.7,
    fiber_g: 2.3
  },
  {
    id: 'tempeh',
    name: 'Tempeh',
    category: 'Plant-Based Protein',
    calories: 193,
    protein_g: 20.3,
    carbs_g: 7.6,
    fat_g: 10.8,
    fiber_g: 5.7
  },
  {
    id: 'chickpeas',
    name: 'Chickpeas (Cooked)',
    category: 'Plant-Based Protein',
    calories: 164,
    protein_g: 8.9,
    carbs_g: 27.4,
    fat_g: 2.6,
    fiber_g: 7.6
  },
  {
    id: 'black-beans',
    name: 'Black Beans (Cooked)',
    category: 'Plant-Based Protein',
    calories: 132,
    protein_g: 8.9,
    carbs_g: 23.7,
    fat_g: 0.5,
    fiber_g: 8.7
  },
  {
    id: 'lentils-cooked',
    name: 'Lentils (Cooked)',
    category: 'Plant-Based Protein',
    calories: 116,
    protein_g: 9,
    carbs_g: 20.1,
    fat_g: 0.4,
    fiber_g: 7.9
  },
  {
    id: 'kidney-beans',
    name: 'Kidney Beans (Cooked)',
    category: 'Plant-Based Protein',
    calories: 127,
    protein_g: 8.7,
    carbs_g: 22.8,
    fat_g: 0.5,
    fiber_g: 6.4
  },
  {
    id: 'edamame',
    name: 'Edamame (Cooked)',
    category: 'Plant-Based Protein',
    calories: 122,
    protein_g: 11.2,
    carbs_g: 8.9,
    fat_g: 5.2,
    fiber_g: 5.2
  },

  // GRAINS & CARBS
  {
    id: 'rice-white-cooked',
    name: 'White Rice (Cooked)',
    category: 'Grains',
    calories: 130,
    protein_g: 2.7,
    carbs_g: 28.2,
    fat_g: 0.3,
    fiber_g: 0.4
  },
  {
    id: 'rice-brown-cooked',
    name: 'Brown Rice (Cooked)',
    category: 'Grains',
    calories: 112,
    protein_g: 2.6,
    carbs_g: 23.5,
    fat_g: 0.9,
    fiber_g: 1.8
  },
  {
    id: 'quinoa-cooked',
    name: 'Quinoa (Cooked)',
    category: 'Grains',
    calories: 120,
    protein_g: 4.4,
    carbs_g: 21.3,
    fat_g: 1.9,
    fiber_g: 2.8
  },
  {
    id: 'oats-rolled',
    name: 'Oats (Rolled, Dry)',
    category: 'Grains',
    calories: 379,
    protein_g: 13.2,
    carbs_g: 67.7,
    fat_g: 6.9,
    fiber_g: 10.1
  },
  {
    id: 'pasta-whole-wheat',
    name: 'Whole Wheat Pasta (Cooked)',
    category: 'Grains',
    calories: 124,
    protein_g: 5.3,
    carbs_g: 26.5,
    fat_g: 0.5,
    fiber_g: 3.9
  },
  {
    id: 'pasta-white',
    name: 'White Pasta (Cooked)',
    category: 'Grains',
    calories: 131,
    protein_g: 5,
    carbs_g: 25,
    fat_g: 1.1,
    fiber_g: 1.8
  },
  {
    id: 'bread-whole-wheat',
    name: 'Whole Wheat Bread',
    category: 'Grains',
    calories: 247,
    protein_g: 13,
    carbs_g: 41,
    fat_g: 3.5,
    fiber_g: 7,
    commonServing: { amount: 1, unit: 'slice', grams: 28 }
  },
  {
    id: 'bread-white',
    name: 'White Bread',
    category: 'Grains',
    calories: 266,
    protein_g: 7.6,
    carbs_g: 49,
    fat_g: 3.6,
    fiber_g: 2.4,
    commonServing: { amount: 1, unit: 'slice', grams: 28 }
  },
  {
    id: 'couscous',
    name: 'Couscous (Cooked)',
    category: 'Grains',
    calories: 112,
    protein_g: 3.8,
    carbs_g: 23.2,
    fat_g: 0.2,
    fiber_g: 1.4
  },

  // VEGETABLES
  {
    id: 'broccoli',
    name: 'Broccoli (Raw)',
    category: 'Vegetables',
    calories: 34,
    protein_g: 2.8,
    carbs_g: 6.6,
    fat_g: 0.4,
    fiber_g: 2.6
  },
  {
    id: 'spinach',
    name: 'Spinach (Raw)',
    category: 'Vegetables',
    calories: 23,
    protein_g: 2.9,
    carbs_g: 3.6,
    fat_g: 0.4,
    fiber_g: 2.2
  },
  {
    id: 'kale',
    name: 'Kale (Raw)',
    category: 'Vegetables',
    calories: 35,
    protein_g: 2.9,
    carbs_g: 4.4,
    fat_g: 1.5,
    fiber_g: 4.1
  },
  {
    id: 'asparagus',
    name: 'Asparagus (Raw)',
    category: 'Vegetables',
    calories: 20,
    protein_g: 2.2,
    carbs_g: 3.9,
    fat_g: 0.1,
    fiber_g: 2.1
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper (Red)',
    category: 'Vegetables',
    calories: 31,
    protein_g: 1,
    carbs_g: 6,
    fat_g: 0.3,
    fiber_g: 2.1
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes (Raw)',
    category: 'Vegetables',
    calories: 18,
    protein_g: 0.9,
    carbs_g: 3.9,
    fat_g: 0.2,
    fiber_g: 1.2
  },
  {
    id: 'cucumber',
    name: 'Cucumber (Raw)',
    category: 'Vegetables',
    calories: 15,
    protein_g: 0.7,
    carbs_g: 3.6,
    fat_g: 0.1,
    fiber_g: 0.5
  },
  {
    id: 'lettuce-romaine',
    name: 'Romaine Lettuce',
    category: 'Vegetables',
    calories: 17,
    protein_g: 1.2,
    carbs_g: 3.3,
    fat_g: 0.3,
    fiber_g: 2.1
  },
  {
    id: 'carrots',
    name: 'Carrots (Raw)',
    category: 'Vegetables',
    calories: 41,
    protein_g: 0.9,
    carbs_g: 9.6,
    fat_g: 0.2,
    fiber_g: 2.8
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower (Raw)',
    category: 'Vegetables',
    calories: 25,
    protein_g: 1.9,
    carbs_g: 5,
    fat_g: 0.3,
    fiber_g: 2
  },
  {
    id: 'zucchini',
    name: 'Zucchini (Raw)',
    category: 'Vegetables',
    calories: 17,
    protein_g: 1.2,
    carbs_g: 3.1,
    fat_g: 0.3,
    fiber_g: 1
  },
  {
    id: 'green-beans',
    name: 'Green Beans (Raw)',
    category: 'Vegetables',
    calories: 31,
    protein_g: 1.8,
    carbs_g: 7,
    fat_g: 0.1,
    fiber_g: 3.4
  },
  {
    id: 'mushrooms',
    name: 'Mushrooms (White)',
    category: 'Vegetables',
    calories: 22,
    protein_g: 3.1,
    carbs_g: 3.3,
    fat_g: 0.3,
    fiber_g: 1
  },
  {
    id: 'onion',
    name: 'Onion (Raw)',
    category: 'Vegetables',
    calories: 40,
    protein_g: 1.1,
    carbs_g: 9.3,
    fat_g: 0.1,
    fiber_g: 1.7
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato (Raw)',
    category: 'Vegetables',
    calories: 86,
    protein_g: 1.6,
    carbs_g: 20.1,
    fat_g: 0.1,
    fiber_g: 3
  },
  {
    id: 'potato-white',
    name: 'Potato (White, Raw)',
    category: 'Vegetables',
    calories: 77,
    protein_g: 2,
    carbs_g: 17,
    fat_g: 0.1,
    fiber_g: 2.1
  },

  // FRUITS
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruits',
    calories: 89,
    protein_g: 1.1,
    carbs_g: 22.8,
    fat_g: 0.3,
    fiber_g: 2.6,
    sugar_g: 12.2,
    commonServing: { amount: 1, unit: 'medium', grams: 118 }
  },
  {
    id: 'apple',
    name: 'Apple',
    category: 'Fruits',
    calories: 52,
    protein_g: 0.3,
    carbs_g: 13.8,
    fat_g: 0.2,
    fiber_g: 2.4,
    sugar_g: 10.4,
    commonServing: { amount: 1, unit: 'medium', grams: 182 }
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    category: 'Fruits',
    calories: 57,
    protein_g: 0.7,
    carbs_g: 14.5,
    fat_g: 0.3,
    fiber_g: 2.4,
    sugar_g: 9.7
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    category: 'Fruits',
    calories: 32,
    protein_g: 0.7,
    carbs_g: 7.7,
    fat_g: 0.3,
    fiber_g: 2,
    sugar_g: 4.9
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Fruits',
    calories: 160,
    protein_g: 2,
    carbs_g: 8.5,
    fat_g: 14.7,
    fiber_g: 6.7,
    sugar_g: 0.7
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'Fruits',
    calories: 47,
    protein_g: 0.9,
    carbs_g: 11.8,
    fat_g: 0.1,
    fiber_g: 2.4,
    sugar_g: 9.4
  },

  // NUTS & SEEDS
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'Nuts & Seeds',
    calories: 579,
    protein_g: 21.2,
    carbs_g: 21.6,
    fat_g: 49.9,
    fiber_g: 12.5
  },
  {
    id: 'walnuts',
    name: 'Walnuts',
    category: 'Nuts & Seeds',
    calories: 654,
    protein_g: 15.2,
    carbs_g: 13.7,
    fat_g: 65.2,
    fiber_g: 6.7
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    category: 'Nuts & Seeds',
    calories: 588,
    protein_g: 25.1,
    carbs_g: 19.6,
    fat_g: 50,
    fiber_g: 6,
    commonServing: { amount: 2, unit: 'tbsp', grams: 32 }
  },
  {
    id: 'almond-butter',
    name: 'Almond Butter',
    category: 'Nuts & Seeds',
    calories: 614,
    protein_g: 20.3,
    carbs_g: 18.8,
    fat_g: 55.5,
    fiber_g: 10.3
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    category: 'Nuts & Seeds',
    calories: 486,
    protein_g: 16.5,
    carbs_g: 42.1,
    fat_g: 30.7,
    fiber_g: 34.4
  },
  {
    id: 'flax-seeds',
    name: 'Flax Seeds',
    category: 'Nuts & Seeds',
    calories: 534,
    protein_g: 18.3,
    carbs_g: 28.9,
    fat_g: 42.2,
    fiber_g: 27.3
  },

  // OILS & FATS
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    category: 'Oils & Fats',
    calories: 884,
    protein_g: 0,
    carbs_g: 0,
    fat_g: 100,
    fiber_g: 0,
    commonServing: { amount: 1, unit: 'tbsp', grams: 14 }
  },
  {
    id: 'coconut-oil',
    name: 'Coconut Oil',
    category: 'Oils & Fats',
    calories: 862,
    protein_g: 0,
    carbs_g: 0,
    fat_g: 100,
    fiber_g: 0
  },
  {
    id: 'butter',
    name: 'Butter',
    category: 'Oils & Fats',
    calories: 717,
    protein_g: 0.9,
    carbs_g: 0.1,
    fat_g: 81.1,
    fiber_g: 0
  },

  // CONDIMENTS & SEASONINGS
  {
    id: 'honey',
    name: 'Honey',
    category: 'Condiments',
    calories: 304,
    protein_g: 0.3,
    carbs_g: 82.4,
    fat_g: 0,
    fiber_g: 0.2,
    sugar_g: 82.1
  },
  {
    id: 'maple-syrup',
    name: 'Maple Syrup',
    category: 'Condiments',
    calories: 260,
    protein_g: 0,
    carbs_g: 67,
    fat_g: 0.1,
    fiber_g: 0,
    sugar_g: 60.5
  },
  {
    id: 'soy-sauce',
    name: 'Soy Sauce',
    category: 'Condiments',
    calories: 53,
    protein_g: 5.6,
    carbs_g: 4.9,
    fat_g: 0.1,
    fiber_g: 0.8
  },

  // CHOCOLATE & SWEETS
  {
    id: 'dark-chocolate-70',
    name: 'Dark Chocolate (70% Cacao)',
    category: 'Chocolate & Sweets',
    calories: 598,
    protein_g: 7.8,
    carbs_g: 45.8,
    fat_g: 42.6,
    fiber_g: 10.9,
    sugar_g: 24,
    searchTerms: ['dark chocolate', 'cocoa'],
    commonServing: { amount: 1, unit: 'square', grams: 10 }
  },
  {
    id: 'dark-chocolate-85',
    name: 'Dark Chocolate (85% Cacao)',
    category: 'Chocolate & Sweets',
    calories: 599,
    protein_g: 9.7,
    carbs_g: 32.2,
    fat_g: 49.9,
    fiber_g: 15.6,
    sugar_g: 14,
    searchTerms: ['dark chocolate', 'bitter chocolate', 'cocoa']
  },
  {
    id: 'milk-chocolate',
    name: 'Milk Chocolate',
    category: 'Chocolate & Sweets',
    calories: 535,
    protein_g: 7.6,
    carbs_g: 59.4,
    fat_g: 29.7,
    fiber_g: 3.4,
    sugar_g: 51.5,
    searchTerms: ['chocolate'],
    commonServing: { amount: 1, unit: 'bar', grams: 43 }
  },
  {
    id: 'cadbury-dairy-milk',
    name: 'Cadbury Dairy Milk Chocolate',
    category: 'Chocolate & Sweets',
    calories: 524,
    protein_g: 7.3,
    carbs_g: 57,
    fat_g: 29.5,
    fiber_g: 2.1,
    sugar_g: 56,
    searchTerms: ['cadbury', 'milk chocolate', 'chocolate bar'],
    commonServing: { amount: 1, unit: 'bar', grams: 45 }
  },
  {
    id: 'kitkat',
    name: 'Kit Kat Chocolate Bar',
    category: 'Chocolate & Sweets',
    calories: 518,
    protein_g: 6.8,
    carbs_g: 63.7,
    fat_g: 26.3,
    fiber_g: 1.5,
    sugar_g: 47.9,
    searchTerms: ['kitkat', 'kit kat', 'wafer', 'chocolate'],
    commonServing: { amount: 1, unit: 'bar (4-finger)', grams: 45 }
  },
  {
    id: 'snickers',
    name: 'Snickers Bar',
    category: 'Chocolate & Sweets',
    calories: 488,
    protein_g: 9.3,
    carbs_g: 57.6,
    fat_g: 24.5,
    fiber_g: 3.5,
    sugar_g: 47.8,
    searchTerms: ['snickers', 'chocolate', 'peanut bar'],
    commonServing: { amount: 1, unit: 'bar', grams: 52 }
  },
  {
    id: 'mars-bar',
    name: 'Mars Bar',
    category: 'Chocolate & Sweets',
    calories: 449,
    protein_g: 4.3,
    carbs_g: 68.2,
    fat_g: 17.4,
    fiber_g: 0,
    sugar_g: 59.7,
    searchTerms: ['mars', 'chocolate', 'caramel'],
    commonServing: { amount: 1, unit: 'bar', grams: 51 }
  },
  {
    id: 'twix',
    name: 'Twix Bar',
    category: 'Chocolate & Sweets',
    calories: 495,
    protein_g: 4.9,
    carbs_g: 64.4,
    fat_g: 24.3,
    fiber_g: 1.4,
    sugar_g: 47.2,
    searchTerms: ['twix', 'chocolate', 'caramel', 'cookie'],
    commonServing: { amount: 1, unit: 'bar (2-finger)', grams: 50 }
  },
  {
    id: 'milky-way',
    name: 'Milky Way Bar',
    category: 'Chocolate & Sweets',
    calories: 456,
    protein_g: 3.2,
    carbs_g: 71.8,
    fat_g: 16.7,
    fiber_g: 0,
    sugar_g: 58.7,
    searchTerms: ['milky way', 'chocolate', 'nougat'],
    commonServing: { amount: 1, unit: 'bar', grams: 52 }
  },
  {
    id: 'white-chocolate',
    name: 'White Chocolate',
    category: 'Chocolate & Sweets',
    calories: 539,
    protein_g: 5.9,
    carbs_g: 59.2,
    fat_g: 32.1,
    fiber_g: 0.2,
    sugar_g: 59,
    searchTerms: ['white chocolate'],
    commonServing: { amount: 1, unit: 'bar', grams: 43 }
  },
  {
    id: 'chocolate-chips',
    name: 'Chocolate Chips (Semi-Sweet)',
    category: 'Chocolate & Sweets',
    calories: 479,
    protein_g: 4.2,
    carbs_g: 63.3,
    fat_g: 25,
    fiber_g: 5,
    sugar_g: 50.8,
    searchTerms: ['chocolate chips', 'baking chocolate', 'choc chips'],
    commonServing: { amount: 1, unit: 'cup', grams: 168 }
  },
  {
    id: 'cocoa-powder',
    name: 'Cocoa Powder (Unsweetened)',
    category: 'Chocolate & Sweets',
    calories: 228,
    protein_g: 19.6,
    carbs_g: 57.9,
    fat_g: 13.7,
    fiber_g: 33.2,
    sugar_g: 1.8,
    searchTerms: ['cocoa', 'cacao powder', 'baking cocoa'],
    commonServing: { amount: 1, unit: 'tbsp', grams: 5 }
  },
  {
    id: 'nutella',
    name: 'Nutella Hazelnut Spread',
    category: 'Chocolate & Sweets',
    calories: 539,
    protein_g: 6.3,
    carbs_g: 57.5,
    fat_g: 30.9,
    fiber_g: 4.4,
    sugar_g: 56.3,
    searchTerms: ['nutella', 'chocolate spread', 'hazelnut'],
    commonServing: { amount: 1, unit: 'tbsp', grams: 19 }
  },
  {
    id: 'ferrero-rocher',
    name: 'Ferrero Rocher',
    category: 'Chocolate & Sweets',
    calories: 573,
    protein_g: 8.5,
    carbs_g: 44.1,
    fat_g: 39.9,
    fiber_g: 3.8,
    sugar_g: 40.6,
    searchTerms: ['ferrero', 'hazelnut', 'chocolate'],
    commonServing: { amount: 1, unit: 'piece', grams: 12.5 }
  },
  {
    id: 'reeses-peanut-butter-cups',
    name: "Reese's Peanut Butter Cups",
    category: 'Chocolate & Sweets',
    calories: 515,
    protein_g: 10.5,
    carbs_g: 52.7,
    fat_g: 30.5,
    fiber_g: 3.8,
    sugar_g: 47.4,
    searchTerms: ['reeses', 'reese', 'peanut butter', 'chocolate'],
    commonServing: { amount: 2, unit: 'cups', grams: 42 }
  },
  {
    id: 'm-and-ms',
    name: 'M&Ms Milk Chocolate',
    category: 'Chocolate & Sweets',
    calories: 492,
    protein_g: 4.9,
    carbs_g: 69.8,
    fat_g: 21,
    fiber_g: 2.5,
    sugar_g: 62.9,
    searchTerms: ['m&ms', 'mnms', 'chocolate candy'],
    commonServing: { amount: 1, unit: 'pack', grams: 45 }
  },
  {
    id: 'toblerone',
    name: 'Toblerone Milk Chocolate',
    category: 'Chocolate & Sweets',
    calories: 530,
    protein_g: 5.4,
    carbs_g: 61.6,
    fat_g: 29.5,
    fiber_g: 2.4,
    sugar_g: 60.4,
    searchTerms: ['toblerone', 'swiss chocolate', 'honey almond'],
    commonServing: { amount: 1, unit: 'bar', grams: 50 }
  },
  {
    id: 'lindt-dark-chocolate',
    name: 'Lindt Excellence Dark 70%',
    category: 'Chocolate & Sweets',
    calories: 590,
    protein_g: 6.6,
    carbs_g: 42,
    fat_g: 44,
    fiber_g: 11,
    sugar_g: 29,
    searchTerms: ['lindt', 'dark chocolate', 'swiss'],
    commonServing: { amount: 1, unit: 'bar', grams: 100 }
  },
  {
    id: 'hersheys-milk-chocolate',
    name: "Hershey's Milk Chocolate Bar",
    category: 'Chocolate & Sweets',
    calories: 531,
    protein_g: 7.7,
    carbs_g: 59.2,
    fat_g: 29.2,
    fiber_g: 3.8,
    sugar_g: 51.5,
    searchTerms: ['hersheys', 'hershey', 'chocolate bar'],
    commonServing: { amount: 1, unit: 'bar', grams: 43 }
  }
];

// Helper functions
export function searchIngredients(query: string): Ingredient[] {
  const lowercaseQuery = query.toLowerCase();
  return ingredientsDatabase.filter(ingredient => 
    ingredient.name.toLowerCase().includes(lowercaseQuery) ||
    ingredient.category.toLowerCase().includes(lowercaseQuery) ||
    ingredient.searchTerms?.some(term => term.toLowerCase().includes(lowercaseQuery))
  );
}

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredientsDatabase.find(ing => ing.id === id);
}

export function getIngredientsByCategory(category: string): Ingredient[] {
  return ingredientsDatabase.filter(ing => ing.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(ingredientsDatabase.map(ing => ing.category));
  return Array.from(categories).sort();
}

// Calculate nutrition for a specific amount
export function calculateNutrition(ingredient: Ingredient, grams: number) {
  const multiplier = grams / 100;
  return {
    calories: Math.round(ingredient.calories * multiplier),
    protein_g: Math.round(ingredient.protein_g * multiplier * 10) / 10,
    carbs_g: Math.round(ingredient.carbs_g * multiplier * 10) / 10,
    fat_g: Math.round(ingredient.fat_g * multiplier * 10) / 10,
    fiber_g: ingredient.fiber_g ? Math.round(ingredient.fiber_g * multiplier * 10) / 10 : 0,
    sugar_g: ingredient.sugar_g ? Math.round(ingredient.sugar_g * multiplier * 10) / 10 : 0,
  };
}
