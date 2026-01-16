import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

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

    // Generate workout plan using AI (placeholder implementation)
    console.log('Generating workout plan...');
    const plan = store.generateWorkoutPlan({
      memberId,
      goal,
      difficulty,
      duration,
      frequency,
      equipment,
      limitations,
    });

    console.log('Workout plan generated successfully:', plan.id);
    // TODO: Integrate with AI service (OpenAI, Anthropic, etc.) to generate personalized workouts
    // For now, this creates a basic plan structure
    
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('Error generating workout plan:', error);
    return NextResponse.json({ 
      error: 'Failed to generate workout plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
