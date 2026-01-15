#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '..', 'lib', 'recipes.ts');
let content = fs.readFileSync(recipesPath, 'utf8');

// Fix the formatting: add newline after imageKeywords if missing
content = content.replace(/(imageKeywords: \[[^\]]+\]),(\s*)calories:/g, '$1,\n    calories:');

fs.writeFileSync(recipesPath, content, 'utf8');
console.log('✅ Fixed formatting');
