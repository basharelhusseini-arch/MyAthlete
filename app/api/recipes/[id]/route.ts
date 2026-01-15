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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = store.getRecipe(params.id);
    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(mapRecipeWithCompatFields(recipe));
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    );
  }
}
