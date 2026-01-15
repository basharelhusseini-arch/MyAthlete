/**
 * Script to update all recipe images with relevant Unsplash food images
 * Uses specific food keywords per recipe for accurate image matching
 */

const fs = require('fs');
const path = require('path');

// Mapping of recipe names to specific food keywords
const recipeImageKeywords = {
  'Grilled Chicken Quinoa Power Bowl': ['grilled-chicken', 'quinoa-bowl', 'healthy-meal', 'protein-bowl'],
  'Herb-Crusted Salmon with Asparagus': ['salmon-fillet', 'asparagus', 'herb-crusted-fish', 'lemon'],
  'Greek Yogurt Protein Pancakes': ['protein-pancakes', 'breakfast-pancakes', 'healthy-breakfast', 'berries'],
  'Lean Turkey Meatballs in Marinara': ['turkey-meatballs', 'marinara-sauce', 'italian', 'tomato-sauce'],
  'Garlic Butter Shrimp with Cauliflower Rice': ['garlic-shrimp', 'cauliflower-rice', 'seafood', 'low-carb'],
  'Ribeye Steak with Mushroom Butter': ['ribeye-steak', 'mushroom', 'grilled-steak', 'meat'],
  'Scrambled Eggs with Avocado & Spinach': ['scrambled-eggs', 'avocado', 'spinach', 'breakfast'],
  'Buffalo Chicken Lettuce Wraps': ['chicken-wraps', 'lettuce-wraps', 'buffalo-chicken', 'healthy-lunch'],
  'Pan-Seared Pork Chop with Green Beans': ['pork-chop', 'green-beans', 'meat-dinner', 'grilled'],
  'Mediterranean Tuna Cucumber Boats': ['tuna-salad', 'cucumber', 'mediterranean', 'healthy-snack'],
  'Creamy Chickpea & Spinach Curry': ['chickpea-curry', 'spinach-curry', 'indian', 'vegetarian'],
  'Black Bean & Sweet Potato Power Bowl': ['sweet-potato', 'black-beans', 'vegan-bowl', 'plant-based'],
  'Caprese Stuffed Portobello Mushrooms': ['portobello-mushroom', 'caprese', 'italian', 'mozzarella'],
  'Hearty Lentil & Vegetable Stew': ['lentil-stew', 'vegetable-soup', 'hearty-stew', 'vegetarian'],
  'Greek Quinoa Salad Bowl': ['greek-salad', 'quinoa', 'feta-cheese', 'mediterranean'],
  'Protein-Packed Tuna Avocado Toast': ['tuna-toast', 'avocado-toast', 'protein-breakfast', 'healthy'],
  'Cottage Cheese Berry Protein Bowl': ['cottage-cheese', 'berries', 'protein-bowl', 'breakfast'],
  'Chicken Pesto Wrap': ['chicken-wrap', 'pesto', 'lunch-wrap', 'healthy'],
  'Triple Berry Protein Smoothie Bowl': ['smoothie-bowl', 'berries', 'acai-bowl', 'healthy-breakfast'],
  'Turkey & Cheese Quesadilla': ['quesadilla', 'turkey', 'cheese', 'mexican'],
  'Teriyaki Chicken Rice Bowl': ['teriyaki-chicken', 'rice-bowl', 'asian', 'edamame'],
  'Lean Beef Burrito Bowl': ['burrito-bowl', 'beef', 'mexican', 'rice-beans'],
  'Mediterranean Chicken Bowl': ['mediterranean', 'chicken-bowl', 'hummus', 'healthy'],
  'Thai Peanut Tofu Bowl': ['tofu-bowl', 'peanut-sauce', 'thai', 'vegetarian'],
  'Cajun Shrimp Pasta Bowl': ['cajun-shrimp', 'pasta', 'spicy', 'seafood'],
  'Peanut Butter Banana Overnight Oats': ['overnight-oats', 'banana', 'peanut-butter', 'breakfast'],
  'Spinach & Feta Egg Muffins': ['egg-muffins', 'spinach', 'feta', 'protein-breakfast'],
  'Apple Cinnamon Breakfast Quinoa': ['quinoa-breakfast', 'apple-cinnamon', 'warm-breakfast', 'oatmeal'],
  'High-Protein French Toast': ['french-toast', 'protein-breakfast', 'breakfast', 'berries'],
  'Breakfast Burrito Bowl': ['breakfast-bowl', 'eggs', 'burrito', 'avocado'],
  'Chocolate Peanut Butter Protein Balls': ['energy-balls', 'protein-balls', 'healthy-snack', 'chocolate'],
  'Turkey & Cream Cheese Cucumber Bites': ['cucumber-bites', 'turkey', 'appetizer', 'healthy-snack'],
  'Berry Greek Yogurt Parfait': ['yogurt-parfait', 'berries', 'granola', 'healthy-breakfast'],
  'Apple Slices with Almond Butter': ['apple-almond-butter', 'healthy-snack', 'fruit', 'nuts'],
  'Sea Salt Edamame': ['edamame', 'soybeans', 'healthy-snack', 'japanese'],
  'Honey Mustard Chicken with Roasted Vegetables': ['honey-mustard-chicken', 'roasted-vegetables', 'healthy-dinner', 'chicken'],
  'Baked Cod with Lemon & Herbs': ['baked-cod', 'lemon', 'herbs', 'white-fish'],
  'Vegetable Egg Fried Rice': ['fried-rice', 'vegetables', 'eggs', 'asian'],
  'Lean Bison Burger with Sweet Potato Fries': ['bison-burger', 'sweet-potato-fries', 'burger', 'healthy'],
  'Coconut Curry Red Lentils': ['red-lentil-curry', 'coconut-curry', 'indian', 'vegetarian'],
  'Chicken Fajita Bowl': ['chicken-fajitas', 'peppers', 'mexican', 'rice-bowl'],
  'Pesto Chicken Pasta': ['pesto-pasta', 'chicken-pasta', 'italian', 'basil'],
  'Moroccan Chickpea & Couscous Bowl': ['moroccan', 'chickpea', 'couscous', 'middle-eastern'],
  'Sesame-Crusted Seared Tuna': ['seared-tuna', 'sesame', 'tuna-steak', 'asian'],
  'One-Pan Chicken & Veggie Bake': ['sheet-pan-chicken', 'roasted-vegetables', 'chicken-dinner', 'meal-prep'],
  'Lean Turkey Chili': ['turkey-chili', 'chili', 'healthy', 'comfort-food'],
  'Asian Chicken Lettuce Cups': ['lettuce-cups', 'asian-chicken', 'healthy-appetizer', 'low-carb'],
  'Loaded Sweet Potato with Black Beans': ['loaded-sweet-potato', 'black-beans', 'vegetarian', 'mexican'],
  'Almond-Crusted Tilapia': ['tilapia', 'almond-crusted-fish', 'baked-fish', 'lemon'],
  'Vanilla Protein Chia Pudding': ['chia-pudding', 'protein-pudding', 'healthy-dessert', 'berries'],
};

function generateFoodImageUrl(recipeName) {
  const keywords = recipeImageKeywords[recipeName];
  if (!keywords || keywords.length === 0) {
    // Fallback to generic food keywords
    return 'https://source.unsplash.com/1600x900/?food,healthy,meal';
  }
  
  // Always prepend 'food' to ensure food-related images
  const keywordString = ['food', ...keywords].join(',');
  return `https://source.unsplash.com/1600x900/?${keywordString}`;
}

// Read the recipes file
const recipesPath = path.join(__dirname, '../lib/recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Extract all recipe names and replace imageUrl
const nameRegex = /name: '([^']+)',/g;
let match;
const updates = [];

while ((match = nameRegex.exec(content)) !== null) {
  const recipeName = match[1];
  const newUrl = generateFoodImageUrl(recipeName);
  updates.push({ name: recipeName, url: newUrl });
}

// Replace all picsum.photos URLs with Unsplash food URLs
let updateCount = 0;
updates.forEach((update, index) => {
  const seedPattern = new RegExp(`imageUrl: 'https://picsum\\.photos/seed/${500 + index * 10}/800/600'`);
  if (seedPattern.test(content)) {
    content = content.replace(seedPattern, `imageUrl: '${update.url}'`);
    updateCount++;
    console.log(`✓ Updated: ${update.name}`);
  }
});

// Write back to file
fs.writeFileSync(recipesPath, content, 'utf8');

console.log(`\n✓ Updated ${updateCount} recipe images with food-specific Unsplash URLs`);
console.log('✓ All images now use: https://source.unsplash.com/1600x900/?food,{keywords}');
