import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    const workoutPlanId = searchParams.get('workoutPlanId');
    
    let query = supabase.from('workouts').select('*');
    
    if (memberId) {
      query = query.eq('member_id', memberId);
    } else if (workoutPlanId) {
      query = query.eq('workout_plan_id', workoutPlanId);
    }
    
    query = query.order('date', { ascending: true });
    
    const { data: workouts, error } = await query;
    
    if (error) {
      console.error('Failed to fetch workouts:', error);
      return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
    }
    
    // Convert snake_case to camelCase for frontend
    const formattedWorkouts = workouts?.map(w => ({
      id: w.id,
      workoutPlanId: w.workout_plan_id,
      memberId: w.member_id,
      name: w.name,
      date: w.date,
      exercises: w.exercises,
      duration: w.duration,
      status: w.status,
      notes: w.notes,
      rating: w.rating,
      completedAt: w.completed_at,
      warmup: w.warmup,
      weekNumber: w.week_number,
      sessionType: w.session_type,
    })) || [];
    
    return NextResponse.json(formattedWorkouts);
  } catch (error) {
    console.error('Error in workouts GET:', error);
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const workout = store.addWorkout(body);
    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 });
  }
}
