/**
 * Script to replace unreliable source.unsplash.com URLs with working placeholder images
 * Uses picsum.photos which is reliable and doesn't require API keys
 */

const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../lib/recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Replace all source.unsplash.com URLs with picsum.photos
// Each recipe gets a unique seed based on its line number for consistency
let lineNumber = 500; // Starting seed

content = content.replace(
  /imageUrl: 'https:\/\/source\.unsplash\.com\/featured\/\?[^']+'/g,
  () => {
    const url = `imageUrl: 'https://picsum.photos/seed/${lineNumber}/800/600'`;
    lineNumber += 10;
    return url;
  }
);

fs.writeFileSync(recipesPath, content, 'utf8');
console.log(`✓ Updated all recipe image URLs to use picsum.photos`);
console.log(`✓ Total recipes updated: ${Math.floor((lineNumber - 500) / 10)}`);
