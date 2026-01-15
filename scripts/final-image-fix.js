#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Recipe-specific keywords mapped to ALL 50 recipe IDs found in the file
const recipeKeywords = {
  'grilled-chicken-quinoa-bowl': ['grilled', 'chicken', 'quinoa', 'bowl', 'vegetables', 'healthy'],
  'salmon-asparagus-plate': ['salmon', 'asparagus', 'fish', 'roasted', 'lemon'],
  'greek-yogurt-protein-pancakes': ['pancakes', 'breakfast', 'yogurt', 'berries', 'syrup'],
  'turkey-meatball-marinara': ['meatballs', 'turkey', 'marinara', 'pasta', 'italian'],
  'shrimp-cauliflower-rice': ['shrimp', 'prawns', 'garlic', 'cauliflower', 'seafood'],
  'steak-mushroom-butter': ['ribeye', 'steak', 'beef', 'mushroom', 'grilled', 'butter'],
  'egg-avocado-spinach': ['eggs', 'scrambled', 'avocado', 'spinach', 'breakfast'],
  'buffalo-chicken-lettuce-wraps': ['chicken', 'buffalo', 'lettuce', 'wraps', 'spicy'],
  'pork-chop-green-beans': ['pork', 'chop', 'green beans', 'meat', 'dinner'],
  'tuna-cucumber-boats': ['tuna', 'cucumber', 'boats', 'mediterranean', 'healthy'],
  'chickpea-spinach-curry': ['chickpea', 'curry', 'spinach', 'indian', 'vegetarian'],
  'black-bean-sweet-potato-bowl': ['sweet potato', 'black beans', 'bowl', 'vegan', 'healthy'],
  'caprese-stuffed-portobello': ['portobello', 'mushroom', 'caprese', 'mozzarella', 'tomato'],
  'lentil-veggie-stew': ['lentil', 'stew', 'vegetables', 'soup', 'vegetarian'],
  'greek-quinoa-salad': ['greek', 'quinoa', 'salad', 'feta', 'vegetables'],
  'tuna-avocado-toast': ['tuna', 'avocado', 'toast', 'breakfast', 'healthy'],
  'cottage-cheese-berry-bowl': ['cottage cheese', 'berries', 'bowl', 'breakfast', 'protein'],
  'chicken-pesto-wrap': ['chicken', 'pesto', 'wrap', 'lunch', 'sandwich'],
  'protein-smoothie-bowl': ['smoothie bowl', 'berries', 'breakfast', 'acai', 'protein'],
  'turkey-cheese-quesadilla': ['quesadilla', 'turkey', 'cheese', 'mexican', 'lunch'],
  'teriyaki-chicken-rice-bowl': ['teriyaki', 'chicken', 'rice', 'bowl', 'asian'],
  'beef-burrito-bowl': ['burrito bowl', 'beef', 'mexican', 'rice', 'beans'],
  'mediterranean-chicken-bowl': ['mediterranean', 'chicken', 'bowl', 'hummus', 'healthy'],
  'thai-peanut-tofu-bowl': ['tofu', 'thai', 'peanut', 'bowl', 'asian'],
  'cajun-shrimp-pasta-bowl': ['shrimp', 'pasta', 'cajun', 'spicy', 'bowl'],
  'overnight-oats-pb-banana': ['overnight oats', 'peanut butter', 'banana', 'breakfast', 'healthy'],
  'spinach-feta-egg-muffins': ['egg muffins', 'spinach', 'feta', 'breakfast', 'meal prep'],
  'apple-cinnamon-quinoa': ['quinoa', 'apple', 'cinnamon', 'breakfast', 'warm'],
  'protein-french-toast': ['french toast', 'breakfast', 'protein', 'berries', 'syrup'],
  'breakfast-burrito-bowl': ['breakfast bowl', 'eggs', 'burrito', 'avocado', 'mexican'],
  'protein-energy-balls': ['protein balls', 'chocolate', 'peanut butter', 'snack', 'energy'],
  'turkey-cucumber-bites': ['cucumber', 'turkey', 'bites', 'appetizer', 'healthy'],
  'greek-yogurt-parfait': ['parfait', 'greek yogurt', 'berries', 'granola', 'breakfast'],
  'apple-almond-butter': ['apple', 'almond butter', 'snack', 'healthy', 'simple'],
  'edamame-sea-salt': ['edamame', 'soybeans', 'snack', 'japanese', 'healthy'],
  'honey-mustard-chicken-veggies': ['chicken', 'honey mustard', 'vegetables', 'roasted', 'dinner'],
  'baked-cod-lemon-herbs': ['cod', 'fish', 'lemon', 'herbs', 'baked'],
  'veggie-egg-fried-rice': ['fried rice', 'eggs', 'vegetables', 'asian', 'dinner'],
  'bison-burger-sweet-potato-fries': ['burger', 'bison', 'sweet potato fries', 'american', 'dinner'],
  'coconut-curry-lentils': ['lentils', 'curry', 'coconut', 'indian', 'vegan'],
  'chicken-fajita-bowl': ['fajita', 'chicken', 'bowl', 'mexican', 'peppers'],
  'pesto-chicken-pasta': ['pesto', 'chicken', 'pasta', 'italian', 'basil'],
  'moroccan-chickpea-couscous': ['chickpea', 'couscous', 'moroccan', 'spices', 'vegetarian'],
  'seared-tuna-sesame': ['tuna', 'sesame', 'seared', 'asian', 'soy'],
  'chicken-veggie-sheet-pan': ['chicken', 'vegetables', 'sheet pan', 'roasted', 'dinner'],
  'turkey-chili-bowl': ['chili', 'turkey', 'beans', 'spicy', 'bowl'],
  'asian-chicken-lettuce-cups': ['lettuce cups', 'chicken', 'asian', 'fresh', 'appetizer'],
  'baked-sweet-potato-black-bean': ['sweet potato', 'black beans', 'stuffed', 'baked', 'healthy'],
  'almond-crusted-tilapia': ['tilapia', 'fish', 'almond', 'crusted', 'baked'],
  'protein-chia-pudding': ['chia pudding', 'vanilla', 'protein', 'breakfast', 'healthy']
};

function buildRecipeImageUrl(keywords, recipeId) {
  const keywordStr = keywords.join(',');
  return `https://source.unsplash.com/1600x900/?food,${encodeURIComponent(keywordStr)}&sig=${recipeId}`;
}

const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Process each recipe by ID
let updatedCount = 0;

Object.entries(recipeKeywords).forEach(([recipeId, keywords]) => {
  const imageUrl = buildRecipeImageUrl(keywords, recipeId);
  
  // Pattern: find the recipe and replace its imageUrl (whatever it currently is)
  // Also add imageKeywords field after imageUrl
  const recipePattern = new RegExp(
    `(id: '${recipeId}',\\s+name: '[^']+',\\s+description: '[^']+',\\s+imageUrl: )'[^']+'(,)`,
    'g'
  );
  
  const newContent = content.replace(
    recipePattern,
    `$1'${imageUrl}'$2\n    imageKeywords: ${JSON.stringify(keywords)},`
  );
  
  if (newContent !== content) {
    content = newContent;
    updatedCount++;
  }
});

// Also update the interface to include imageKeywords if not already there
if (!content.includes('imageKeywords: string[];')) {
  content = content.replace(
    /(export interface Recipe \{[^}]*imageUrl: string;)/,
    '$1\n  imageKeywords: string[]; // Keywords for image generation'
  );
  console.log('✅ Added imageKeywords to Recipe interface');
}

fs.writeFileSync(recipesPath, content, 'utf8');

console.log(`✅ Updated ${updatedCount} recipes with unique image URLs and keywords`);
console.log(`   Each recipe now has a unique sig= parameter to prevent caching issues`);
