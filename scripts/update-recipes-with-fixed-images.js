#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Curated Unsplash photo IDs - each is a real food photo from Unsplash
// Format: recipeId -> Unsplash photo ID
const recipeImageIds = {
  'grilled-chicken-quinoa-bowl': 'IGfIGP5ONV0', // Chicken bowl
  'salmon-asparagus-plate': '4_jhDO54BYg', // Salmon dish
  'greek-yogurt-protein-pancakes': 'TLD6iCOlyb0', // Pancakes
  'turkey-meatball-marinara': '9MzCd76xLGk', // Meatballs
  'shrimp-cauliflower-rice': 'jpkfc5_d-DI', // Shrimp dish
  'steak-mushroom-butter': 'xY55bL5mZAM', // Steak
  'egg-avocado-spinach': 'XoByiBymX20', // Eggs and avocado
  'buffalo-chicken-lettuce-wraps': 'ZPmXjHTA7YI', // Lettuce wraps
  'pork-chop-green-beans': 'vdx5hPQhXFk', // Pork chop
  'tuna-cucumber-boats': 'YwRJkiJBLaQ', // Tuna salad
  'chickpea-spinach-curry': 'WoVGndRTx2o', // Curry dish
  'black-bean-sweet-potato-bowl': 'ng_OB1IvsW4', // Sweet potato bowl
  'caprese-stuffed-portobello': 'fEU1jGrj2kE', // Stuffed mushrooms
  'lentil-veggie-stew': '5O1ddenSwtY', // Lentil stew
  'greek-quinoa-salad': 'JmVaNyemtN8', // Greek salad
  'tuna-avocado-toast': 'GOM2_IDSF_4', // Avocado toast
  'cottage-cheese-berry-bowl': 'hrlvr2ZlUNk', // Cottage cheese bowl
  'chicken-pesto-wrap': 'J1i5N2NzzYY', // Wrap
  'protein-smoothie-bowl': 'hZYiEfmlTWY', // Smoothie bowl
  'turkey-cheese-quesadilla': 'Yr4n8O_3UPc', // Quesadilla
  'teriyaki-chicken-rice-bowl': 'MqT0asuoIcU', // Teriyaki bowl
  'beef-burrito-bowl': 'j6g1p_dDsGg', // Burrito bowl
  'mediterranean-chicken-bowl': '_jk-kJbR7c8', // Mediterranean bowl
  'thai-peanut-tofu-bowl': 'N_Y88TWmGwA', // Thai bowl
  'cajun-shrimp-pasta-bowl': 'q54Oxq44MZs', // Pasta dish
  'overnight-oats-pb-banana': 'auIbTAcSH6E', // Overnight oats
  'spinach-feta-egg-muffins': 'HNXSWX_vbLo', // Egg muffins
  'apple-cinnamon-quinoa': '5O9R7Fxwtgg', // Quinoa breakfast
  'protein-french-toast': 'a9YsGUlDg0c', // French toast
  'breakfast-burrito-bowl': 'CRoAeTh5S_I', // Breakfast bowl
  'protein-energy-balls': 'Ujg-Um6DsXM', // Energy balls
  'turkey-cucumber-bites': 'qJ92ZQ8lYo0', // Appetizer bites
  'greek-yogurt-parfait': 'NFvdKIhxYlU', // Yogurt parfait
  'apple-almond-butter': '7jl9AEgUpjE', // Apple snack
  'edamame-sea-salt': 'uQs1802D0M0', // Edamame
  'honey-mustard-chicken-veggies': 'nyNl5to_0kY', // Chicken vegetables
  'baked-cod-lemon-herbs': 'cnseVhmbA7Q', // Baked fish
  'veggie-egg-fried-rice': 'h4i9G-de7Po', // Fried rice
  'bison-burger-sweet-potato-fries': '-YHSwy34rRs', // Burger
  'coconut-curry-lentils': 'SqYmTDQYMrk', // Coconut curry
  'chicken-fajita-bowl': 'VT7up6PYUqM', // Fajita bowl
  'pesto-chicken-pasta': 'O6fs2ekIjjk', // Pesto pasta
  'moroccan-chickpea-couscous': 'W9OKrxBqiZA', // Moroccan dish
  'seared-tuna-sesame': 'dU-CgjBF7sM', // Seared tuna
  'chicken-veggie-sheet-pan': 'BkmdKnuAZtg', // Sheet pan chicken
  'turkey-chili-bowl': 'QJc7WcHZbhY', // Chili
  'asian-chicken-lettuce-cups': 'oyqBhn8OSQM', // Asian lettuce cups
  'baked-sweet-potato-black-bean': 'vnwPwXL6gTw', // Stuffed sweet potato
  'almond-crusted-tilapia': 'c_7FPvHLDEg', // Fish dish
  'protein-chia-pudding': 'J39djf2TX4w', // Chia pudding
};

function buildImageUrl(imageId) {
  return `https://images.unsplash.com/photo-${imageId}?w=1600&auto=format&fit=crop&q=80`;
}

const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Update Recipe interface to include imageId
if (!content.includes('imageId: string;')) {
  content = content.replace(
    /(imageUrl: string;)/,
    'imageUrl: string;\n  imageId: string; // Unsplash photo ID for stable images'
  );
  console.log('✅ Added imageId to Recipe interface');
}

// Remove imageKeywords if it exists (no longer needed)
content = content.replace(/\s+imageKeywords: string\[\];[^\n]*/g, '');
content = content.replace(/\s+imageKeywords: \[[^\]]+\],?\n/g, '');

let updatedCount = 0;
let errors = [];

// Update each recipe with fixed image ID and URL
Object.entries(recipeImageIds).forEach(([recipeId, imageId]) => {
  const imageUrl = buildImageUrl(imageId);
  
  // Pattern: find the recipe and replace imageUrl, remove imageKeywords, add imageId
  const recipePattern = new RegExp(
    `(id: '${recipeId}',\\s+name: '[^']+',\\s+description: '[^']+',\\s+)imageUrl: '[^']+'[^\\n]*\\n(?:\\s+imageKeywords: \\[[^\\]]+\\],?\\n)?`,
    'g'
  );
  
  const replacement = `$1imageUrl: '${imageUrl}',\n    imageId: '${imageId}',\n`;
  
  const newContent = content.replace(recipePattern, replacement);
  
  if (newContent !== content) {
    content = newContent;
    updatedCount++;
  } else {
    errors.push(recipeId);
  }
});

fs.writeFileSync(recipesPath, content, 'utf8');

console.log(`✅ Updated ${updatedCount} recipes with fixed Unsplash photo IDs`);

if (errors.length > 0) {
  console.log(`⚠️  Could not update ${errors.length} recipes:`, errors);
}

// Verify no duplicate imageIds
const imageIds = Object.values(recipeImageIds);
const uniqueIds = new Set(imageIds);
console.log(`\n📊 Verification:`);
console.log(`   Total image IDs: ${imageIds.length}`);
console.log(`   Unique IDs: ${uniqueIds.size}`);

if (imageIds.length !== uniqueIds.size) {
  console.log(`❌ WARNING: Found duplicate image IDs!`);
  const duplicates = imageIds.filter((id, index) => imageIds.indexOf(id) !== index);
  console.log(`   Duplicates:`, [...new Set(duplicates)]);
} else {
  console.log(`✅ All image IDs are unique!`);
}
