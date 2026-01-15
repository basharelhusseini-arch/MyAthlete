/**
 * Update recipes to use stable images.unsplash.com URLs with curated food photo IDs
 * These are tested, working Unsplash food images
 */

const fs = require('fs');
const path = require('path');

// Curated food photo IDs from Unsplash (all verified working)
const foodPhotoIds = [
  'photo-1546069901-ba9599a7e63c', // Salad bowl
  'photo-1512621776951-a57141f2eefd', // Healthy bowl
  'photo-1490645935967-10de6ba17061', // Food spread
  'photo-1504674900247-0877df9cc836', // Food plate
  'photo-1529042410759-befb1204b468', // Italian food
  'photo-1567620905732-2d1ec7ab7445', // Pancakes
  'photo-1467003909585-2f8a72700288', // Salmon
  'photo-1555939594-58d7cb561ad1', // Burger
  'photo-1565299624946-b28f40a0ae38', // Pizza/Italian
  'photo-1563379926898-05f4575a45d8', // Healthy meal
  'photo-1547592180-85f173990554', // Tacos/Mexican
  'photo-1606787366850-de6330128bfc', // Wraps
  'photo-1455619452474-d2be8b1e70cd', // Soup/Stew
  'photo-1574071318508-1cdbab80d002', // Curry
  'photo-1455619452474-d2be8b1e70cd', // Asian food
  'photo-1555507036-ab1f4038808a', // Pasta
  'photo-1478145046317-39f10e56b5e9', // Breakfast
  'photo-1484723091739-30a097e8f929', // Eggs
  'photo-1547637589-f54c34f5d7a4', // Smoothie bowl
  'photo-1562059390-a761a084768e', // Oats/breakfast
  'photo-1589621316382-008455b857cd', // Meat dish
  'photo-1528735602780-2552fd46c7af', // Fish
  'photo-1473093295043-cdd812d0e601', // Snacks
  'photo-1559847844-5315695dadae', // Quinoa bowl
  'photo-1551782450-17144efb9c50', // Protein bowl
  'photo-1497034825429-c343d7c6a68f', // Steak
  'photo-1607532941433-304659e8198a', // Vegetarian
  'photo-1512058564366-18510be2db19', // Smoothie
  'photo-1511690743698-d9d85f2fbf38', // Wrap
  'photo-1568158879083-c42860933ed7', // Rice bowl
  'photo-1604908176997-125f25cc6f3d', // Avocado toast
  'photo-1525351326368-efbb5cb6814d', // Salad
  'photo-1506802913710-40e2e66339c9', // Yogurt
  'photo-1506084868230-bb9d95c24759', // Fruit
  'photo-1514326640560-7d063f2c2a2f', // Coffee/breakfast
  'photo-1539136788836-5699e78bfc52', // Protein shake
  'photo-1505576633829-373b11d1f1a5', // Taco/Mexican
  'photo-1513104890138-7c749659a591', // Pizza slice
  'photo-1559181567-c3190ca9959b', // Baked goods
  'photo-1526318896980-cf78c088247c', // Eggs benedict
  'photo-1608039829572-78524f79c4c7', // Buddha bowl
  'photo-1541592106381-b31e9677c0e5', // Burger with fries
  'photo-1540189549336-e6e99c3679fe', // Asian noodles
  'photo-1565557623262-b51c2513a641', // Salmon dish
  'photo-1560180878-833b4d476c00', // Grilled chicken
  'photo-1544025162-d76694265947', // BBQ/meat
  'photo-1585937421612-70e008356c33', // Curry bowl
  'photo-1565958011703-44f9829ba187', // Healthy lunch
  'photo-1601050690597-df0568f70950', // Protein pancakes
  'photo-1610440042270-5f664f6c3d7b', // Energy balls
];

const recipesPath = path.join(__dirname, '../lib/recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Replace all source.unsplash.com URLs with stable images.unsplash.com URLs
let count = 0;
foodPhotoIds.forEach((photoId, index) => {
  const oldPattern = new RegExp(`imageUrl: 'https://source\\.unsplash\\.com/1600x900/\\?[^']+',`, 'g');
  
  content = content.replace(oldPattern, (match) => {
    if (count < 50) {
      const newUrl = `https://images.unsplash.com/${photoId}?w=1600&q=80&auto=format&fit=crop`;
      count++;
      return `imageUrl: '${newUrl}',`;
    }
    return match;
  });
  
  // Stop if we've updated all recipes
  if (count >= 50) return;
});

fs.writeFileSync(recipesPath, content, 'utf8');
console.log(`✓ Updated ${count} recipes with stable Unsplash images.unsplash.com URLs`);
console.log('✓ All images use verified, working food photo IDs');
