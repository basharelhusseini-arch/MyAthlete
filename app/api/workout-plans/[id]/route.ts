import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const plan = store.getWorkoutPlan(id);
    
    if (!plan) {
      return NextResponse.json(
        { error: 'Workout plan not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workout plan' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const success = store.deleteWorkoutPlan(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Workout plan not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete workout plan' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const updatedPlan = store.updateWorkoutPlan(id, body);
    
    if (!updatedPlan) {
      return NextResponse.json(
        { error: 'Workout plan not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error('Error updating workout plan:', error);
    return NextResponse.json(
      { error: 'Failed to update workout plan' },
      { status: 500 }
    );
  }
}
