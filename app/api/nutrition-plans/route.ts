import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const memberId = searchParams.get('memberId');

    let query = supabase.from('nutrition_plans').select('*');

    if (memberId) {
      query = query.eq('member_id', memberId);
    }

    const { data: plans, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch nutrition plans', details: error.message },
        { status: 500 }
      );
    }

    // Convert snake_case to camelCase for UI
    const formattedPlans = (plans || []).map((plan: any) => ({
      id: plan.id,
      memberId: plan.member_id,
      name: plan.name,
      description: plan.description,
      goal: plan.goal,
      duration: plan.duration,
      status: plan.status,
      macroTargets: plan.macro_targets,
      meals: plan.meals,
      dietaryRestrictions: plan.dietary_restrictions || [],
      preferences: plan.preferences || [],
      createdBy: plan.created_by,
      startDate: plan.start_date,
      endDate: plan.end_date,
      createdAt: plan.created_at,
    }));

    return NextResponse.json(formattedPlans);
  } catch (error: any) {
    console.error('Failed to fetch nutrition plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nutrition plans', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data: plan, error } = await supabase
      .from('nutrition_plans')
      .insert({
        member_id: body.memberId,
        name: body.name,
        description: body.description,
        goal: body.goal,
        duration: body.duration,
        status: body.status || 'active',
        macro_targets: body.macroTargets,
        meals: body.meals,
        dietary_restrictions: body.dietaryRestrictions || [],
        preferences: body.preferences || [],
        created_by: body.createdBy || 'manual',
        start_date: body.startDate,
        end_date: body.endDate,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to create nutrition plan', details: error.message },
        { status: 500 }
      );
    }

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
      dietaryRestrictions: plan.dietary_restrictions,
      preferences: plan.preferences,
      createdBy: plan.created_by,
      startDate: plan.start_date,
      endDate: plan.end_date,
      createdAt: plan.created_at,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create nutrition plan:', error);
    return NextResponse.json(
      { error: 'Failed to create nutrition plan', details: error.message },
      { status: 400 }
    );
  }
}
