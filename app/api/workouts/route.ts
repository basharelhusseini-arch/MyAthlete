import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    const workoutPlanId = searchParams.get('workoutPlanId');
    
    let workouts;
    if (memberId) {
      workouts = store.getMemberWorkouts(memberId);
    } else if (workoutPlanId) {
      workouts = store.getWorkoutPlanWorkouts(workoutPlanId);
    } else {
      workouts = store.getAllWorkouts();
    }
    
    return NextResponse.json(workouts);
  } catch (error) {
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
