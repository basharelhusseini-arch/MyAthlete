#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Recipe-specific keywords (3-6 per recipe)
const recipeKeywords = {
  'grilled-chicken-quinoa-bowl': ['grilled', 'chicken', 'quinoa', 'bowl', 'vegetables', 'healthy'],
  'salmon-asparagus-plate': ['salmon', 'asparagus', 'fish', 'roasted', 'lemon'],
  'greek-yogurt-protein-pancakes': ['pancakes', 'breakfast', 'yogurt', 'berries', 'syrup'],
  'turkey-meatball-marinara': ['meatballs', 'turkey', 'marinara', 'pasta', 'italian'],
  'shrimp-cauliflower-rice': ['shrimp', 'prawns', 'garlic', 'cauliflower', 'seafood'],
  'ribeye-steak-mushroom': ['ribeye', 'steak', 'beef', 'mushroom', 'grilled'],
  'steak-mushroom-butter': ['ribeye', 'steak', 'beef', 'mushroom', 'grilled', 'butter'],
  'scrambled-eggs-avocado-spinach': ['eggs', 'scrambled', 'avocado', 'spinach', 'breakfast'],
  'egg-avocado-spinach': ['eggs', 'scrambled', 'avocado', 'spinach', 'breakfast'],
  'buffalo-chicken-lettuce-wraps': ['chicken', 'buffalo', 'lettuce', 'wraps', 'spicy'],
  'pork-chop-green-beans': ['pork', 'chop', 'green beans', 'meat', 'dinner'],
  'tuna-cucumber-boats': ['tuna', 'cucumber', 'boats', 'mediterranean', 'healthy'],
  'chickpea-spinach-curry': ['chickpea', 'curry', 'spinach', 'indian', 'vegetarian'],
  'black-bean-sweet-potato-bowl': ['sweet potato', 'black beans', 'bowl', 'vegan', 'healthy'],
  'caprese-stuffed-portobello': ['portobello', 'mushroom', 'caprese', 'mozzarella', 'tomato'],
  'lentil-vegetable-stew': ['lentil', 'stew', 'vegetables', 'soup', 'vegetarian'],
  'lentil-veggie-stew': ['lentil', 'stew', 'vegetables', 'soup', 'vegetarian'],
  'greek-quinoa-salad': ['greek', 'quinoa', 'salad', 'feta', 'vegetables'],
  'tuna-avocado-toast': ['tuna', 'avocado', 'toast', 'breakfast', 'healthy'],
  'cottage-cheese-berry-bowl': ['cottage cheese', 'berries', 'bowl', 'breakfast', 'protein'],
  'chicken-pesto-wrap': ['chicken', 'pesto', 'wrap', 'lunch', 'sandwich'],
  'berry-protein-smoothie-bowl': ['smoothie bowl', 'berries', 'breakfast', 'acai', 'healthy'],
  'protein-smoothie-bowl': ['smoothie bowl', 'berries', 'breakfast', 'acai', 'protein'],
  'turkey-cheese-quesadilla': ['quesadilla', 'turkey', 'cheese', 'mexican', 'lunch'],
  'teriyaki-chicken-rice-bowl': ['teriyaki', 'chicken', 'rice', 'bowl', 'asian'],
  'lean-beef-burrito-bowl': ['burrito bowl', 'beef', 'mexican', 'rice', 'beans'],
  'beef-burrito-bowl': ['burrito bowl', 'beef', 'mexican', 'rice', 'beans'],
  'mediterranean-chicken-bowl': ['mediterranean', 'chicken', 'bowl', 'hummus', 'healthy'],
  'thai-peanut-tofu-bowl': ['tofu', 'thai', 'peanut', 'bowl', 'asian'],
  'cajun-shrimp-pasta': ['shrimp', 'pasta', 'cajun', 'spicy', 'dinner'],
  'cajun-shrimp-pasta-bowl': ['shrimp', 'pasta', 'cajun', 'spicy', 'bowl'],
  'peanut-butter-banana-oats': ['overnight oats', 'peanut butter', 'banana', 'breakfast', 'healthy'],
  'overnight-oats-pb-banana': ['overnight oats', 'peanut butter', 'banana', 'breakfast', 'healthy'],
  'spinach-feta-egg-muffins': ['egg muffins', 'spinach', 'feta', 'breakfast', 'meal prep'],
  'apple-cinnamon-quinoa': ['quinoa', 'apple', 'cinnamon', 'breakfast', 'warm'],
  'protein-french-toast': ['french toast', 'breakfast', 'protein', 'berries', 'syrup'],
  'breakfast-burrito-bowl': ['breakfast bowl', 'eggs', 'burrito', 'avocado', 'mexican'],
  'chocolate-pb-protein-balls': ['protein balls', 'chocolate', 'peanut butter', 'snack', 'energy'],
  'protein-energy-balls': ['protein balls', 'chocolate', 'peanut butter', 'snack', 'energy'],
  'turkey-cucumber-bites': ['cucumber', 'turkey', 'bites', 'appetizer', 'healthy'],
  'berry-yogurt-parfait': ['parfait', 'yogurt', 'berries', 'granola', 'breakfast'],
  'greek-yogurt-parfait': ['parfait', 'greek yogurt', 'berries', 'granola', 'breakfast'],
  'apple-almond-butter': ['apple', 'almond butter', 'snack', 'healthy', 'simple'],
  'sea-salt-edamame': ['edamame', 'soybeans', 'snack', 'japanese', 'healthy'],
  'edamame-sea-salt': ['edamame', 'soybeans', 'snack', 'japanese', 'healthy'],
  'honey-mustard-chicken-veggies': ['chicken', 'honey mustard', 'vegetables', 'roasted', 'dinner'],
  'baked-cod-lemon': ['cod', 'fish', 'lemon', 'baked', 'healthy'],
  'baked-cod-lemon-herbs': ['cod', 'fish', 'lemon', 'herbs', 'baked'],
  'vegetable-egg-fried-rice': ['fried rice', 'eggs', 'vegetables', 'asian', 'dinner'],
  'veggie-egg-fried-rice': ['fried rice', 'eggs', 'vegetables', 'asian', 'dinner'],
  'bison-burger-sweet-potato-fries': ['burger', 'bison', 'sweet potato fries', 'american', 'dinner'],
  'coconut-curry-lentils': ['lentils', 'curry', 'coconut', 'indian', 'vegan'],
  'chicken-fajita-bowl': ['fajita', 'chicken', 'bowl', 'mexican', 'peppers'],
  'pesto-chicken-pasta': ['pesto', 'chicken', 'pasta', 'italian', 'basil'],
  'moroccan-chickpea-couscous': ['chickpea', 'couscous', 'moroccan', 'spices', 'vegetarian'],
  'sesame-seared-tuna': ['tuna', 'sesame', 'seared', 'asian', 'soy'],
  'seared-tuna-sesame': ['tuna', 'sesame', 'seared', 'asian', 'soy'],
  'chicken-veggie-sheet-pan': ['chicken', 'vegetables', 'sheet pan', 'roasted', 'dinner'],
  'turkey-chili': ['chili', 'turkey', 'beans', 'spicy', 'soup'],
  'turkey-chili-bowl': ['chili', 'turkey', 'beans', 'spicy', 'bowl'],
  'asian-chicken-lettuce-cups': ['lettuce cups', 'chicken', 'asian', 'fresh', 'appetizer'],
  'loaded-sweet-potato-black-beans': ['sweet potato', 'black beans', 'stuffed', 'vegan', 'healthy'],
  'baked-sweet-potato-black-bean': ['sweet potato', 'black beans', 'stuffed', 'baked', 'healthy'],
  'almond-crusted-tilapia': ['tilapia', 'fish', 'almond', 'crusted', 'baked'],
  'vanilla-protein-chia-pudding': ['chia pudding', 'vanilla', 'protein', 'breakfast', 'healthy'],
  'protein-chia-pudding': ['chia pudding', 'vanilla', 'protein', 'breakfast', 'healthy']
};

function buildRecipeImageUrl(keywords, recipeId) {
  const keywordStr = keywords.join(',');
  return `https://source.unsplash.com/1600x900/?food,${encodeURIComponent(keywordStr)}&sig=${recipeId}`;
}

const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Step 1: Remove ALL existing imageKeywords lines (to clean up duplicates)
console.log('Removing all existing imageKeywords...');
content = content.replace(/\s+imageKeywords: \[.*?\],?\n/g, '');

// Step 2: Extract all recipe IDs
const recipeIdMatches = content.matchAll(/id: '([^']+)',/g);
const actualIds = Array.from(recipeIdMatches, m => m[1]);

console.log(`Found ${actualIds.length} recipes in file`);

// Step 3: For each recipe, add imageKeywords right after imageUrl
let updatedCount = 0;
let missingKeywords = [];

actualIds.forEach((recipeId) => {
  const keywords = recipeKeywords[recipeId];
  
  if (!keywords) {
    missingKeywords.push(recipeId);
    return;
  }
  
  const imageUrl = buildRecipeImageUrl(keywords, recipeId);
  
  // Find the recipe block and inject imageKeywords after imageUrl
  const recipeBlockPattern = new RegExp(
    `(id: '${recipeId}',\\s+name: '[^']+',\\s+description: '[^']+',\\s+imageUrl: )'[^']+'(,)`,
    'g'
  );
  
  const replacement = `$1'${imageUrl}'$2\n    imageKeywords: ${JSON.stringify(keywords)},`;
  
  const newContent = content.replace(recipeBlockPattern, replacement);
  
  if (newContent !== content) {
    content = newContent;
    updatedCount++;
  }
});

fs.writeFileSync(recipesPath, content, 'utf8');

console.log(`✅ Updated ${updatedCount} recipes with unique URLs and keywords`);

if (missingKeywords.length > 0) {
  console.log(`⚠️  Missing keywords for ${missingKeywords.length} recipes:`);
  missingKeywords.forEach(id => console.log(`  - ${id}`));
}
