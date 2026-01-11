import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const plan = store.getWorkoutPlan(params.id);
    if (!plan) {
      return NextResponse.json({ error: 'Workout plan not found' }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workout plan' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const plan = store.updateWorkoutPlan(params.id, body);
    if (!plan) {
      return NextResponse.json({ error: 'Workout plan not found' }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update workout plan' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = store.deleteWorkoutPlan(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Workout plan not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete workout plan' }, { status: 500 });
  }
}
