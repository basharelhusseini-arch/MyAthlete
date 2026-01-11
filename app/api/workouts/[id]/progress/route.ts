import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const progress = store.getWorkoutProgress(params.id);
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workout progress' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { memberId, exerciseId, setsCompleted, repsCompleted, weightUsed, durationCompleted, restTimeActual, notes } = body;

    if (!memberId || !exerciseId) {
      return NextResponse.json(
        { error: 'Missing required fields: memberId, exerciseId' },
        { status: 400 }
      );
    }

    const progress = store.addWorkoutProgress({
      workoutId: params.id,
      memberId,
      exerciseId,
      setsCompleted,
      repsCompleted,
      weightUsed,
      durationCompleted,
      restTimeActual,
      notes,
    });

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save workout progress' }, { status: 500 });
  }
}
