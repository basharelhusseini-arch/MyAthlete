/**
 * Backfill Recipe Images Script
 * Updates all recipes with unique, matching image URLs
 */

import * as fs from 'fs';
import * as path from 'path';
import { recipesData, Recipe } from '../lib/recipes';
import { getRecipeImageUrl, resetUsedImages } from '../lib/recipe-image-helper';

// Reset to ensure uniqueness across all recipes
resetUsedImages();

console.log(`🖼️  Backfilling images for ${recipesData.length} recipes...\n`);

const updatedRecipes: Recipe[] = [];
const imageIdCounts = new Map<string, number>();

for (const recipe of recipesData) {
  // Generate new matching image
  const { imageUrl, imageId } = getRecipeImageUrl(recipe);
  
  // Track usage
  imageIdCounts.set(imageId, (imageIdCounts.get(imageId) || 0) + 1);
  
  // Update recipe
  const updatedRecipe: Recipe = {
    ...recipe,
    imageUrl,
    imageId,
  };
  
  updatedRecipes.push(updatedRecipe);
  
  console.log(`✅ ${recipe.name}`);
  console.log(`   Old: ${recipe.imageId}`);
  console.log(`   New: ${imageId}`);
  console.log(`   URL: ${imageUrl}\n`);
}

// Check for duplicates
const duplicates = Array.from(imageIdCounts.entries()).filter(([_, count]) => count > 1);
if (duplicates.length > 0) {
  console.warn('\n⚠️  WARNING: Duplicate image IDs found:');
  duplicates.forEach(([id, count]) => {
    console.warn(`   ${id}: used ${count} times`);
  });
} else {
  console.log('\n✅ All images are unique!');
}

// Generate the updated recipes file content
const fileContent = `/**
 * Recipes Database - 50 Original Macro-Friendly Recipes
 * All recipes are original content with realistic macros
 * Images: Unique, matching Unsplash photos
 * Macros verified: calories ≈ protein*4 + carbs*4 + fat*9 (±25 kcal)
 * Last updated: ${new Date().toISOString()}
 */

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageId: string; // Unsplash photo ID for stable images
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  ingredients: { item: string; quantity: number; unit: string }[];
  instructions: string[];
  tags: string[]; // e.g., ["high-protein","low-carb","vegetarian","meal-prep"]
}

export const recipesData: Recipe[] = ${JSON.stringify(updatedRecipes, null, 2)};
`;

// Write to file
const recipesPath = path.join(__dirname, '../lib/recipes.ts');
fs.writeFileSync(recipesPath, fileContent, 'utf-8');

console.log(`\n✅ Successfully updated ${recipesPath}`);
console.log(`📊 Total recipes: ${updatedRecipes.length}`);
console.log(`🎨 Unique images: ${imageIdCounts.size}`);
