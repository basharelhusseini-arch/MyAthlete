import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: plan, error } = await supabase
      .from('nutrition_plans')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch nutrition plan', details: error.message },
        { status: 500 }
      );
    }

    if (!plan) {
      return NextResponse.json(
        { error: 'Nutrition plan not found' },
        { status: 404 }
      );
    }

    // Convert snake_case to camelCase for UI
    const formattedPlan = {
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
      dietaryRestrictions: plan.dietary_restrictions || [],
      preferences: plan.preferences || [],
      createdBy: plan.created_by,
      startDate: plan.start_date,
      endDate: plan.end_date,
      createdAt: plan.created_at,
    };

    return NextResponse.json(formattedPlan);
  } catch (error: any) {
    console.error('Failed to fetch nutrition plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nutrition plan', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('nutrition_plans')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete nutrition plan', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete nutrition plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete nutrition plan', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updates: any = {};
    if (body.name !== undefined) updates.name = body.name;
    if (body.description !== undefined) updates.description = body.description;
    if (body.status !== undefined) updates.status = body.status;
    if (body.macroTargets !== undefined) updates.macro_targets = body.macroTargets;
    if (body.meals !== undefined) updates.meals = body.meals;
    if (body.mealPlans !== undefined) updates.meal_plans = body.mealPlans;

    const { data: plan, error } = await supabase
      .from('nutrition_plans')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Failed to update nutrition plan', details: error.message },
        { status: 500 }
      );
    }

    // Convert snake_case to camelCase for UI
    const formattedPlan = {
      id: plan.id,
      memberId: plan.member_id,
      name: plan.name,
      description: plan.description,
      goal: plan.goal,
      duration: plan.duration,
      status: plan.status,
      macroTargets: plan.macro_targets,
      meals: plan.meals,
      mealPlans: plan.meal_plans,
      dietaryRestrictions: plan.dietary_restrictions || [],
      preferences: plan.preferences || [],
      createdBy: plan.created_by,
      startDate: plan.start_date,
      endDate: plan.end_date,
      createdAt: plan.created_at,
    };

    return NextResponse.json(formattedPlan);
  } catch (error: any) {
    console.error('Failed to update nutrition plan:', error);
    return NextResponse.json(
      { error: 'Failed to update nutrition plan', details: error.message },
      { status: 500 }
    );
  }
}
