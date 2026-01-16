import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// GET - Fetch all custom recipes for current user
export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user's custom recipes
    const { data: recipes, error } = await supabase
      .from('custom_recipes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching custom recipes:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(recipes || []);
  } catch (error: any) {
    console.error('Error in GET /api/custom-recipes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create a new custom recipe
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      servings,
      ingredients,
      totalNutrition,
      perServingNutrition
    } = body;

    // Validate required fields
    if (!name || !ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Recipe name and at least one ingredient are required' },
        { status: 400 }
      );
    }

    // Insert custom recipe
    const { data: recipe, error } = await supabase
      .from('custom_recipes')
      .insert({
        user_id: user.id,
        name,
        description: description || '',
        servings: servings || 1,
        ingredients: ingredients,
        // Total nutrition
        calories: totalNutrition.calories,
        protein_g: totalNutrition.protein_g,
        carbs_g: totalNutrition.carbs_g,
        fat_g: totalNutrition.fat_g,
        fiber_g: totalNutrition.fiber_g || 0,
        sugar_g: totalNutrition.sugar_g || 0,
        // Per-serving nutrition
        calories_per_serving: perServingNutrition.calories,
        protein_per_serving: perServingNutrition.protein_g,
        carbs_per_serving: perServingNutrition.carbs_g,
        fat_per_serving: perServingNutrition.fat_g,
        is_public: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating custom recipe:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(recipe, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/custom-recipes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
