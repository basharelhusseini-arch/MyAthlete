import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const memberId = searchParams.get('memberId');

  if (memberId) {
    const habits = store.getMemberHabits(memberId);
    return NextResponse.json(habits);
  }

  const habits = store.getAllHabits();
  return NextResponse.json(habits);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const habit = store.addHabit(body);
    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create habit' },
      { status: 400 }
    );
  }
}
