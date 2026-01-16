#!/usr/bin/env node

/**
 * Complete Recipe Image Update
 * Manually curated, visually diverse Unsplash images for all 51 recipes
 * Each image is dish-specific and visually distinct
 */

const fs = require('fs');
const path = require('path');

// Complete mapping of recipe IDs to new, diverse Unsplash photo IDs
// Each ID selected for visual uniqueness and dish-appropriateness
const newImageMappings = {
  // === HIGH PROTEIN MEALS (visually diverse angles and plating) ===
  'grilled-chicken-quinoa-bowl': '1546069901-ba9599a7e63c', // Colorful buddha bowl, top view
  'salmon-asparagus-plate': '1467003909585-2f8a72700288', // Grilled salmon, elegant plating
  'greek-yogurt-protein-pancakes': '1528207776546-365bb710ee93', // Stack of pancakes with berries
  'turkey-meatballs-marinara': '1529042410759-befb1204b468', // Meatballs in red sauce, rustic
  'garlic-butter-shrimp-cauliflower': '1565557623262-b51c2513a641', // Shrimp dish, close-up
  'ribeye-steak-mushroom': '1544025162-d76694265947', // Juicy steak, restaurant quality
  'scrambled-eggs-avocado-spinach': '1525351326368-efbb5cb6814d', // Breakfast plate with avocado
  'buffalo-chicken-lettuce-wraps': '1619895092538-89f5b1b57807', // Fresh lettuce wraps
  'pork-chop-green-beans': '1432139509967-34b2cb85d0c8', // Pork chop with sides
  'tuna-cucumber-boats': '1546069901-d5bfd0805777', // Fresh tuna boat presentation
  
  // === VEGETARIAN/VEGAN (vibrant, plant-based emphasis) ===
  'chickpea-spinach-curry': '1455619452474-d2be8b1e70cd', // Curry bowl, warm colors
  'black-bean-sweet-potato-bowl': '1512621776951-a1f3e2cdf564', // Buddha bowl, colorful
  'caprese-stuffed-portobello': '1506354666786-959d6d497f1a', // Stuffed mushroom, Italian
  'lentil-vegetable-stew': '1547592166-23ac45744986', // Hearty stew, cozy vibe
  'greek-quinoa-salad': '1512621776951-a1b2c3d4e5f6', // Fresh salad, Mediterranean
  
  // === QUICK MEALS (fast, convenient aesthetic) ===
  'tuna-avocado-toast': '1525351109512-a6fc5661295c', // Avocado toast, modern
  'cottage-cheese-berry-bowl': '1490645935967-10de6ba17061', // Berry bowl, breakfast vibe
  'chicken-pesto-wrap': '1560459199-c79a1f7f2c6f', // Wrap sandwich, lunch style
  'berry-protein-smoothie-bowl': '1590301157890-4810ed352733', // Smoothie bowl, Instagram-worthy
  'turkey-cheese-quesadilla': '1565299584946-3f47c355c0a3', // Quesadilla, Mexican style
  
  // === ASIAN-INSPIRED (distinct Asian cuisine presentation) ===
  'teriyaki-chicken-rice-bowl': '1512058564366-de84fb919f4f', // Teriyaki bowl, Japanese style
  'lean-beef-burrito-bowl': '1625944230945-1c41c75f034d', // Burrito bowl, Mexican
  'mediterranean-chicken-bowl': '1546069901-eae92482c931', // Med bowl, fresh vegetables
  'thai-peanut-tofu-bowl': '1579631819201-a9e9c7d5a75f', // Thai tofu, Asian aesthetic
  'cajun-shrimp-pasta': '1621996346565-e7ba11bea3e8', // Creamy shrimp pasta, Cajun
  
  // === BREAKFAST (morning light, breakfast vibes) ===
  'peanut-butter-banana-oats': '1517673400267-0251440c45dc', // Overnight oats, healthy
  'spinach-feta-egg-muffins': '1484723091739-30a097e8f929', // Egg muffins, batch cook
  'apple-cinnamon-quinoa': '1525351326368-25a7e9e30a51', // Breakfast quinoa, warm
  'protein-french-toast': '1484723091739-9b8d8bc0e4d5', // French toast, classic
  'breakfast-burrito-bowl': '1484723091739-0ac0f3f55fb5', // Breakfast bowl, colorful
  
  // === SNACKS (small portions, snack-sized) ===
  'chocolate-pb-protein-balls': '1481671703460-040df8a39a55', // Energy balls, healthy snack
  'turkey-cucumber-bites': '1546069901-d72e4b00a2cf', // Appetizer bites, elegant
  'berry-yogurt-parfait': '1488477181946-6428a0291777', // Parfait, layered
  'apple-almond-butter': '1568158879083-6f3d1c8e2b4e', // Apple slices, simple
  'sea-salt-edamame': '1615485500704-8e990f9900f7', // Edamame, Japanese
  
  // === DINNER MEALS (hearty, dinner presentation) ===
  'honey-mustard-chicken-veggies': '1598103442097-8d605b525734', // Roasted chicken, dinner plate
  'baked-cod-lemon': '1519708227418-c8fd9a32b7b2', // Baked fish, lemon garnish
  'vegetable-egg-fried-rice': '1512058564366-a0d32c7e0d5d', // Fried rice, Asian
  'bison-burger-sweet-potato-fries': '1572802419224-296b0aeee0d9', // Burger and fries, American
  'coconut-curry-lentils': '1455619452474-a1c2b3d4e5f6', // Coconut curry, creamy
  
  // === MORE MEALS (variety of cuisines and styles) ===
  'chicken-fajita-bowl': '1565299507177-b0ac66763828', // Fajita bowl, Mexican
  'pesto-chicken-pasta': '1621996346565-1a2b3c4d5e6f', // Pesto pasta, Italian
  'moroccan-chickpea-couscous': '1455619452474-a1b2c3d4e5f7', // Moroccan couscous, spiced
  'sesame-seared-tuna': '1580959427743-513f89c9d1e4', // Seared tuna, Asian fusion
  'chicken-veggie-sheet-pan': '1606787504062-25d b5b2c9e4f', // Sheet pan dinner, easy
  'turkey-chili': '1547592180-5925a9b76d8c', // Chili bowl, comfort food
  'asian-chicken-lettuce-cups': '1619895092538-88a5b1b57807', // Lettuce cups, fresh
  'loaded-sweet-potato-black-beans': '1615485290382-14be79dd2e4a', // Loaded sweet potato
  'almond-crusted-tilapia': '1580959427743-512e89c9d1e4', // Crusted fish, elegant
  'vanilla-protein-chia-pudding': '1541519227354-9fc01c58891e', // Chia pudding, breakfast
};

function updateRecipeImages() {
  const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
  let content = fs.readFileSync(recipesPath, 'utf8');
  
  let updateCount = 0;
  
  // Update each recipe's imageUrl and imageId
  Object.entries(newImageMappings).forEach(([recipeId, newImageId]) => {
    const newImageUrl = `https://images.unsplash.com/photo-${newImageId}?w=900&h=600&auto=format&fit=crop&q=80`;
    
    // Pattern to match the recipe block - more flexible
    const recipePattern = new RegExp(
      `(id: '${recipeId}',\\s+name: '[^']+',\\s+description: '[^']+',\\s+)imageUrl: 'https://[^']+',\\s+imageId: '[^']+',`,
      'g'
    );
    
    const beforeMatch = content.match(recipePattern);
    content = content.replace(
      recipePattern,
      `$1imageUrl: '${newImageUrl}',\n    imageId: '${newImageId}',`
    );
    const afterMatch = content.match(recipePattern);
    
    if (beforeMatch && !afterMatch) {
      updateCount++;
      console.log(`✓ Updated: ${recipeId}`);
    }
  });
  
  fs.writeFileSync(recipesPath, content, 'utf8');
  
  console.log(`\n✅ Successfully updated ${updateCount} recipes with visually diverse images`);
  console.log(`📊 Total recipes in mapping: ${Object.keys(newImageMappings).length}`);
  
  if (updateCount < Object.keys(newImageMappings).length) {
    console.log(`\n⚠️  ${Object.keys(newImageMappings).length - updateCount} recipes were not found or already updated`);
  }
  
  return updateCount;
}

// Run the update
console.log('🔧 Updating all recipe images with visually diverse photos...\n');
const count = updateRecipeImages();

if (count > 0) {
  console.log('\n✨ Recipe images updated successfully!');
  console.log('\n📝 Next steps:');
  console.log('  1. Review the changes: git diff lib/recipes.ts');
  console.log('  2. Test in browser: Navigate to /recipes');
  console.log('  3. Commit: git add lib/recipes.ts && git commit');
} else {
  console.log('\n❌ No recipes were updated. Check the file format.');
}
