import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { Recipe } from '@/types';

// Helper function to add backwards-compatible fields
function mapRecipeWithCompatFields(recipe: Recipe): Recipe {
  return {
    ...recipe,
    prepTime: recipe.prepMinutes,
    cookTime: recipe.cookMinutes,
    totalTime: recipe.prepMinutes + recipe.cookMinutes,
    protein: recipe.protein_g,
    carbohydrates: recipe.carbs_g,
    fats: recipe.fat_g,
  };
}

export async function GET() {
  try {
    const recipes = store.getAllRecipes().map(mapRecipeWithCompatFields);
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const recipe = store.addRecipe(body);
    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}
