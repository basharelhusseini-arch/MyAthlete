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
    
    // Convert camelCase to snake_case for database
    const workoutData = {
      id: body.id || `workout-${Date.now()}`,
      workout_plan_id: body.workoutPlanId,
      member_id: body.memberId,
      name: body.name,
      date: body.date,
      exercises: body.exercises || [],
      duration: body.duration,
      status: body.status || 'scheduled',
      notes: body.notes,
      warmup: body.warmup || null,
      week_number: body.weekNumber,
      session_type: body.sessionType,
    };
    
    const { data: workout, error } = await supabase
      .from('workouts')
      .insert(workoutData)
      .select()
      .single();
    
    if (error) {
      console.error('Failed to create workout:', error);
      return NextResponse.json({ error: 'Failed to create workout', details: error.message }, { status: 500 });
    }
    
    // Convert snake_case back to camelCase
    const formattedWorkout = {
      id: workout.id,
      workoutPlanId: workout.workout_plan_id,
      memberId: workout.member_id,
      name: workout.name,
      date: workout.date,
      exercises: workout.exercises,
      duration: workout.duration,
      status: workout.status,
      notes: workout.notes,
      rating: workout.rating,
      completedAt: workout.completed_at,
      warmup: workout.warmup,
      weekNumber: workout.week_number,
      sessionType: workout.session_type,
    };
    
    return NextResponse.json(formattedWorkout, { status: 201 });
  } catch (error) {
    console.error('Error in workouts POST:', error);
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 });
  }
}
