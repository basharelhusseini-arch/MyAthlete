import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workout = store.getWorkout(params.id);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }
    return NextResponse.json(workout);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workout' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const workout = store.updateWorkout(params.id, body);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }
    return NextResponse.json(workout);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update workout' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = store.deleteWorkout(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete workout' }, { status: 500 });
  }
}
