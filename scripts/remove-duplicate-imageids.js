#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Remove duplicate imageId lines (keep only the first occurrence in each recipe)
const lines = content.split('\n');
const result = [];
let lastWasImageId = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const isImageId = line.trim().startsWith('imageId:');
  
  if (isImageId && lastWasImageId) {
    // Skip this duplicate imageId line
    continue;
  }
  
  result.push(line);
  lastWasImageId = isImageId;
}

fs.writeFileSync(recipesPath, result.join('\n'), 'utf8');

console.log('✅ Removed duplicate imageId fields');
