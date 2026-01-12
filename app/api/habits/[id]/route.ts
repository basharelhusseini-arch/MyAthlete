import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const habit = store.getHabit(params.id);
  if (!habit) {
    return NextResponse.json(
      { error: 'Habit not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(habit);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedHabit = store.updateHabit(params.id, body);
    if (!updatedHabit) {
      return NextResponse.json(
        { error: 'Habit not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedHabit);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update habit' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = store.deleteHabit(params.id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Habit not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true });
}
