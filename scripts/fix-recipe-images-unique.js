#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Recipe-specific keywords (3-6 per recipe)
const recipeKeywords = {
  'grilled-chicken-quinoa-bowl': ['grilled', 'chicken', 'quinoa', 'bowl', 'vegetables', 'healthy'],
  'salmon-asparagus-plate': ['salmon', 'asparagus', 'fish', 'roasted', 'lemon'],
  'greek-yogurt-protein-pancakes': ['pancakes', 'breakfast', 'yogurt', 'berries', 'syrup'],
  'turkey-meatballs-marinara': ['meatballs', 'turkey', 'marinara', 'pasta', 'italian'],
  'garlic-butter-shrimp-cauliflower': ['shrimp', 'prawns', 'garlic', 'cauliflower', 'seafood'],
  'ribeye-steak-mushroom': ['ribeye', 'steak', 'beef', 'mushroom', 'grilled'],
  'scrambled-eggs-avocado-spinach': ['eggs', 'scrambled', 'avocado', 'spinach', 'breakfast'],
  'buffalo-chicken-lettuce-wraps': ['chicken', 'buffalo', 'lettuce', 'wraps', 'spicy'],
  'pork-chop-green-beans': ['pork', 'chop', 'green beans', 'meat', 'dinner'],
  'tuna-cucumber-boats': ['tuna', 'cucumber', 'boats', 'mediterranean', 'healthy'],
  'chickpea-spinach-curry': ['chickpea', 'curry', 'spinach', 'indian', 'vegetarian'],
  'black-bean-sweet-potato-bowl': ['sweet potato', 'black beans', 'bowl', 'vegan', 'healthy'],
  'caprese-stuffed-portobello': ['portobello', 'mushroom', 'caprese', 'mozzarella', 'tomato'],
  'lentil-vegetable-stew': ['lentil', 'stew', 'vegetables', 'soup', 'vegetarian'],
  'greek-quinoa-salad': ['greek', 'quinoa', 'salad', 'feta', 'vegetables'],
  'tuna-avocado-toast': ['tuna', 'avocado', 'toast', 'breakfast', 'healthy'],
  'cottage-cheese-berry-bowl': ['cottage cheese', 'berries', 'bowl', 'breakfast', 'protein'],
  'chicken-pesto-wrap': ['chicken', 'pesto', 'wrap', 'lunch', 'sandwich'],
  'berry-protein-smoothie-bowl': ['smoothie bowl', 'berries', 'breakfast', 'acai', 'healthy'],
  'turkey-cheese-quesadilla': ['quesadilla', 'turkey', 'cheese', 'mexican', 'lunch'],
  'teriyaki-chicken-rice-bowl': ['teriyaki', 'chicken', 'rice', 'bowl', 'asian'],
  'lean-beef-burrito-bowl': ['burrito bowl', 'beef', 'mexican', 'rice', 'beans'],
  'mediterranean-chicken-bowl': ['mediterranean', 'chicken', 'bowl', 'hummus', 'healthy'],
  'thai-peanut-tofu-bowl': ['tofu', 'thai', 'peanut', 'bowl', 'asian'],
  'cajun-shrimp-pasta': ['shrimp', 'pasta', 'cajun', 'spicy', 'dinner'],
  'peanut-butter-banana-oats': ['overnight oats', 'peanut butter', 'banana', 'breakfast', 'healthy'],
  'spinach-feta-egg-muffins': ['egg muffins', 'spinach', 'feta', 'breakfast', 'meal prep'],
  'apple-cinnamon-quinoa': ['quinoa', 'apple', 'cinnamon', 'breakfast', 'warm'],
  'protein-french-toast': ['french toast', 'breakfast', 'protein', 'berries', 'syrup'],
  'breakfast-burrito-bowl': ['breakfast bowl', 'eggs', 'burrito', 'avocado', 'mexican'],
  'chocolate-pb-protein-balls': ['protein balls', 'chocolate', 'peanut butter', 'snack', 'energy'],
  'turkey-cucumber-bites': ['cucumber', 'turkey', 'bites', 'appetizer', 'healthy'],
  'berry-yogurt-parfait': ['parfait', 'yogurt', 'berries', 'granola', 'breakfast'],
  'apple-almond-butter': ['apple', 'almond butter', 'snack', 'healthy', 'simple'],
  'sea-salt-edamame': ['edamame', 'soybeans', 'snack', 'japanese', 'healthy'],
  'honey-mustard-chicken-veggies': ['chicken', 'honey mustard', 'vegetables', 'roasted', 'dinner'],
  'baked-cod-lemon': ['cod', 'fish', 'lemon', 'baked', 'healthy'],
  'vegetable-egg-fried-rice': ['fried rice', 'eggs', 'vegetables', 'asian', 'dinner'],
  'bison-burger-sweet-potato-fries': ['burger', 'bison', 'sweet potato fries', 'american', 'dinner'],
  'coconut-curry-lentils': ['lentils', 'curry', 'coconut', 'indian', 'vegan'],
  'chicken-fajita-bowl': ['fajita', 'chicken', 'bowl', 'mexican', 'peppers'],
  'pesto-chicken-pasta': ['pesto', 'chicken', 'pasta', 'italian', 'basil'],
  'moroccan-chickpea-couscous': ['chickpea', 'couscous', 'moroccan', 'spices', 'vegetarian'],
  'sesame-seared-tuna': ['tuna', 'sesame', 'seared', 'asian', 'soy'],
  'chicken-veggie-sheet-pan': ['chicken', 'vegetables', 'sheet pan', 'roasted', 'dinner'],
  'turkey-chili': ['chili', 'turkey', 'beans', 'spicy', 'soup'],
  'asian-chicken-lettuce-cups': ['lettuce cups', 'chicken', 'asian', 'fresh', 'appetizer'],
  'loaded-sweet-potato-black-beans': ['sweet potato', 'black beans', 'stuffed', 'vegan', 'healthy'],
  'almond-crusted-tilapia': ['tilapia', 'fish', 'almond', 'crusted', 'baked'],
  'vanilla-protein-chia-pudding': ['chia pudding', 'vanilla', 'protein', 'breakfast', 'healthy']
};

function buildRecipeImageUrl(keywords, recipeId) {
  const keywordStr = keywords.join(',');
  // Use recipe ID as cache-buster to ensure unique URLs
  return `https://source.unsplash.com/1600x900/?food,${encodeURIComponent(keywordStr)}&sig=${recipeId}`;
}

const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Update interface to include imageKeywords
content = content.replace(
  /export interface Recipe \{[^}]+\}/s,
  `export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageKeywords: string[]; // Keywords for image generation
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  ingredients: { item: string; quantity: number; unit: string }[];
  instructions: string[];
  tags: string[]; // e.g., ["high-protein","low-carb","vegetarian","meal-prep"]
}`
);

// Add helper function before the recipes array
const helperFunction = `
/**
 * Build unique image URL for a recipe with cache-buster
 */
function buildRecipeImageUrl(keywords: string[], sig: string): string {
  const keywordStr = keywords.join(',');
  return \`https://source.unsplash.com/1600x900/?food,\${encodeURIComponent(keywordStr)}&sig=\${sig}\`;
}
`;

content = content.replace(
  'export const recipesData: Recipe[] = [',
  helperFunction + '\nexport const recipesData: Recipe[] = ['
);

// Update each recipe
Object.entries(recipeKeywords).forEach(([recipeId, keywords]) => {
  const imageUrl = buildRecipeImageUrl(keywords, recipeId);
  
  // Find the recipe block and update it
  const recipePattern = new RegExp(
    `(\\s+id: '${recipeId}',\\s+name: '[^']+',\\s+description: '[^']+',\\s+)imageUrl: '[^']+',`,
    'g'
  );
  
  content = content.replace(
    recipePattern,
    `$1imageUrl: '${imageUrl}',\n    imageKeywords: ${JSON.stringify(keywords)},`
  );
});

fs.writeFileSync(recipesPath, content, 'utf8');
console.log('✅ Updated all 50 recipes with unique keywords and cache-busting URLs');
console.log('✅ Added imageKeywords field to Recipe interface');
console.log('✅ Added buildRecipeImageUrl helper function');
