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
    console.log('Exercise database size:', exercisesDatabase?.length || 0);
    
    if (!exercisesDatabase || exercisesDatabase.length === 0) {
      console.error('❌ Exercise database is empty!');
      return NextResponse.json({ 
        error: 'Exercise database not loaded',
        details: 'The exercise library failed to load. This is a server configuration issue.'
      }, { status: 500 });
    }
    
    const result = generateAthleteWorkoutPlan(
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
    
    if (!result) {
      console.error('❌ generateAthleteWorkoutPlan returned null/undefined');
      return NextResponse.json({ 
        error: 'Workout generation failed',
        details: 'The workout generator did not return a result'
      }, { status: 500 });
    }
    
    const { plan, workouts } = result;
    
    if (!plan) {
      console.error('❌ No plan generated');
      return NextResponse.json({ 
        error: 'Plan generation failed',
        details: 'No plan object was created'
      }, { status: 500 });
    }
    
    if (!workouts || workouts.length === 0) {
      console.error('❌ No workouts generated!');
      console.error('Plan details:', { goal, difficulty, duration, frequency });
      console.error('Available exercises:', exercisesDatabase.length);
      return NextResponse.json({ 
        error: 'No workouts generated',
        details: `Expected ${duration * frequency} workouts but got 0. Check exercise database and generation logic.`,
        debug: {
          planId: plan.id,
          expectedWorkouts: duration * frequency,
          actualWorkouts: 0,
          exerciseCount: exercisesDatabase.length
        }
      }, { status: 500 });
    }

    console.log(`✅ Generated plan ${plan.id} with ${workouts.length} workouts`);
    console.log('Plan details:', { 
      id: plan.id, 
      name: plan.name,
      duration: plan.duration,
      frequency: plan.frequency,
      workoutCount: workouts.length
    });

    // Insert workout plan into Supabase
    console.log('Attempting to insert plan into Supabase...');
    console.log('Supabase URL configured:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Service key configured:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
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
      console.error('❌ Failed to insert workout plan:', planError);
      console.error('Error details:', JSON.stringify(planError, null, 2));
      console.error('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.error('Has Service Role Key:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
      return NextResponse.json({ 
        error: 'Failed to save workout plan',
        details: planError.message,
        hint: 'Check if workout_plans table exists in Supabase'
      }, { status: 500 });
    }
    
    console.log('✅ Plan inserted successfully:', insertedPlan?.id);

    // Insert all workouts into Supabase
    console.log(`Attempting to insert ${workouts.length} workouts...`);
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

    console.log('Sample workout record:', JSON.stringify(workoutRecords[0], null, 2));

    const { error: workoutsError, data: insertedWorkouts } = await supabase
      .from('workouts')
      .insert(workoutRecords)
      .select();

    if (workoutsError) {
      console.error('❌ Failed to insert workouts:', workoutsError);
      console.error('Error details:', JSON.stringify(workoutsError, null, 2));
      // Try to clean up the plan
      await supabase.from('workout_plans').delete().eq('id', plan.id);
      return NextResponse.json({ 
        error: 'Failed to save workouts',
        details: workoutsError.message,
        hint: 'Check if workouts table exists in Supabase'
      }, { status: 500 });
    }
    
    console.log(`✅ ${insertedWorkouts?.length || 0} workouts inserted successfully`);

    console.log(`✅✅✅ SUCCESS! Plan ${plan.id} saved with ${insertedWorkouts?.length} workouts`);
    
    // IMPORTANT: Return the inserted plan from database, not the generated one
    // This ensures the frontend gets the actual database record
    return NextResponse.json({
      ...plan,
      id: insertedPlan.id, // Use database ID
      success: true,
      workoutsCreated: insertedWorkouts?.length || 0
    }, { status: 201 });
  } catch (error) {
    console.error('Error generating workout plan:', error);
    return NextResponse.json({ 
      error: 'Failed to generate workout plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
