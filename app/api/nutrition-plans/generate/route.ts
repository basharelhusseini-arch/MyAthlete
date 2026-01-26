import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { store } from '@/lib/store';
import { generateWeeklyMealPlans } from '@/lib/meal-plan-generator';
import { recipesData } from '@/lib/recipes';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      memberId,
      goal,
      gender,
      age,
      height,
      weight,
      activityLevel,
      duration,
      dietaryRestrictions,
      preferences,
    } = body;

    if (!memberId || !goal || !gender || !age || !height || !weight || !activityLevel || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate plan using in-memory logic (keeps existing generation algorithm)
    const generatedPlan = store.generateNutritionPlan({
      memberId,
      goal,
      gender,
      age,
      height,
      weight,
      activityLevel,
      duration,
      dietaryRestrictions,
      preferences,
    });

    // Generate 7-day meal plans from recipes
    let mealPlans;
    try {
      mealPlans = generateWeeklyMealPlans({
        targetCalories: generatedPlan.macroTargets.calories,
        targetProtein: generatedPlan.macroTargets.protein,
        targetCarbs: generatedPlan.macroTargets.carbohydrates,
        targetFat: generatedPlan.macroTargets.fats,
        goal: generatedPlan.goal,
        dietaryRestrictions: dietaryRestrictions,
        preferences: preferences,
        recipes: recipesData,
      });
    } catch (error: any) {
      console.error('Failed to generate meal plans:', error);
      return NextResponse.json(
        { 
          error: 'Failed to generate meal plans',
          details: error.message,
          hint: 'Not enough recipes available for the selected dietary restrictions'
        },
        { status: 500 }
      );
    }

    // Save to Supabase for persistence
    const { data: plan, error } = await supabase
      .from('nutrition_plans')
      .insert({
        id: generatedPlan.id,
        member_id: memberId,
        name: generatedPlan.name,
        description: generatedPlan.description,
        goal: generatedPlan.goal,
        duration: generatedPlan.duration,
        status: generatedPlan.status,
        macro_targets: generatedPlan.macroTargets,
        meals: generatedPlan.meals,
        meal_plans: mealPlans, // Add 7-day meal plans
        dietary_restrictions: dietaryRestrictions || [],
        preferences: preferences || [],
        created_by: 'ai',
        start_date: generatedPlan.startDate,
        end_date: generatedPlan.endDate,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to save nutrition plan',
          details: error.message,
          hint: error.hint || 'Check if nutrition_plans table exists and migration is run'
        },
        { status: 500 }
      );
    }

    // Return the plan in the same format the UI expects
    return NextResponse.json({
      id: plan.id,
      memberId: plan.member_id,
      name: plan.name,
      description: plan.description,
      goal: plan.goal,
      duration: plan.duration,
      status: plan.status,
      macroTargets: plan.macro_targets,
      meals: plan.meals,
      mealPlans: plan.meal_plans, // Include 7-day meal plans
      dietaryRestrictions: plan.dietary_restrictions,
      preferences: plan.preferences,
      createdBy: plan.created_by,
      startDate: plan.start_date,
      endDate: plan.end_date,
      createdAt: plan.created_at,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to generate nutrition plan:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate nutrition plan',
        details: error.message || error.toString()
      },
      { status: 500 }
    );
  }
}
