#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Recipe calories (from original data)
const recipeCalories = {
  'grilled-chicken-quinoa-bowl': 485,
  'salmon-asparagus-plate': 420,
  'greek-yogurt-protein-pancakes': 380,
  'turkey-meatball-marinara': 395,
  'shrimp-cauliflower-rice': 340,
  'steak-mushroom-butter': 520,
  'egg-avocado-spinach': 385,
  'buffalo-chicken-lettuce-wraps': 315,
  'pork-chop-green-beans': 410,
  'tuna-cucumber-boats': 280,
  'chickpea-spinach-curry': 420,
  'black-bean-sweet-potato-bowl': 465,
  'caprese-stuffed-portobello': 320,
  'lentil-veggie-stew': 380,
  'greek-quinoa-salad': 395,
  'tuna-avocado-toast': 420,
  'cottage-cheese-berry-bowl': 340,
  'chicken-pesto-wrap': 445,
  'protein-smoothie-bowl': 385,
  'turkey-cheese-quesadilla': 425,
  'teriyaki-chicken-rice-bowl': 510,
  'beef-burrito-bowl': 495,
  'mediterranean-chicken-bowl': 465,
  'thai-peanut-tofu-bowl': 485,
  'cajun-shrimp-pasta-bowl': 475,
  'overnight-oats-pb-banana': 420,
  'spinach-feta-egg-muffins': 285,
  'apple-cinnamon-quinoa': 395,
  'protein-french-toast': 365,
  'breakfast-burrito-bowl': 445,
  'protein-energy-balls': 180,
  'turkey-cucumber-bites': 145,
  'greek-yogurt-parfait': 295,
  'apple-almond-butter': 240,
  'edamame-sea-salt': 190,
  'honey-mustard-chicken-veggies': 455,
  'baked-cod-lemon-herbs': 380,
  'veggie-egg-fried-rice': 415,
  'bison-burger-sweet-potato-fries': 520,
  'coconut-curry-lentils': 395,
  'chicken-fajita-bowl': 485,
  'pesto-chicken-pasta': 510,
  'moroccan-chickpea-couscous': 440,
  'seared-tuna-sesame': 420,
  'chicken-veggie-sheet-pan': 465,
  'turkey-chili-bowl': 425,
  'asian-chicken-lettuce-cups': 295,
  'baked-sweet-potato-black-bean': 410,
  'almond-crusted-tilapia': 360,
  'protein-chia-pudding': 320,
};

const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

let fixed = 0;

Object.entries(recipeCalories).forEach(([recipeId, calories]) => {
  // Pattern: find imageId line and add calories after it if missing
  const pattern = new RegExp(
    `(imageId: '[^']+',)\\s+protein_g:`,
    'g'
  );
  
  const replacement = `$1\n    calories: ${calories},\n    protein_g:`;
  
  const newContent = content.replace(pattern, replacement);
  
  if (newContent !== content) {
    content = newContent;
    fixed++;
  }
});

fs.writeFileSync(recipesPath, content, 'utf8');
console.log(`✅ Added calories field back to ${fixed} recipes`);
