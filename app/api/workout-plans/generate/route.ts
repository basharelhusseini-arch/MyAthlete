import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateAthleteWorkoutPlan } from '@/lib/athlete-workout-generator';
import { exercisesDatabase } from '@/lib/exercises';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memberId, goal, difficulty, duration, frequency, equipment, limitations } = body;

    console.log('Workout plan generation request:', { memberId, goal, difficulty, duration, frequency, equipment, limitations });

    if (!memberId || !goal || !difficulty || !duration || !frequency) {
      console.error('Missing required fields:', { memberId, goal, difficulty, duration, frequency });
      return NextResponse.json(
        { error: 'Missing required fields: memberId, goal, difficulty, duration, frequency' },
        { status: 400 }
      );
    }

    // Generate workout plan using athlete-intelligent generator
    console.log('Generating workout plan with AI...');
    const { plan, workouts } = generateAthleteWorkoutPlan(
      {
        memberId,
        goal,
        difficulty,
        duration,
        frequency,
        equipment,
        limitations,
      },
      exercisesDatabase
    );

    console.log(`Generated ${workouts.length} workouts for plan ${plan.id}`);

    // Insert workout plan into Supabase
    const { data: insertedPlan, error: planError } = await supabase
      .from('workout_plans')
      .insert({
        id: plan.id,
        member_id: plan.memberId,
        name: plan.name,
        description: plan.description,
        goal: plan.goal,
        duration: plan.duration,
        frequency: plan.frequency,
        difficulty: plan.difficulty,
        status: plan.status,
        start_date: plan.startDate,
        end_date: plan.endDate || null,
        created_by: plan.createdBy,
        created_at: plan.createdAt,
      })
      .select()
      .single();

    if (planError) {
      console.error('Failed to insert workout plan:', planError);
      return NextResponse.json({ 
        error: 'Failed to save workout plan',
        details: planError.message
      }, { status: 500 });
    }

    // Insert all workouts into Supabase
    const workoutRecords = workouts.map(w => ({
      id: w.id,
      workout_plan_id: w.workoutPlanId,
      member_id: w.memberId,
      name: w.name,
      date: w.date,
      exercises: w.exercises,
      duration: w.duration,
      status: w.status,
      notes: w.notes,
      warmup: w.warmup || null,
      week_number: w.weekNumber,
      session_type: w.sessionType,
    }));

    const { error: workoutsError } = await supabase
      .from('workouts')
      .insert(workoutRecords);

    if (workoutsError) {
      console.error('Failed to insert workouts:', workoutsError);
      // Try to clean up the plan
      await supabase.from('workout_plans').delete().eq('id', plan.id);
      return NextResponse.json({ 
        error: 'Failed to save workouts',
        details: workoutsError.message
      }, { status: 500 });
    }

    console.log(`Workout plan ${plan.id} saved successfully with ${workouts.length} workouts`);
    
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('Error generating workout plan:', error);
    return NextResponse.json({ 
      error: 'Failed to generate workout plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
