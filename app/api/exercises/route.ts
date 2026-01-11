import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const exercises = store.getAllExercises();
    return NextResponse.json(exercises);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const exercise = store.addExercise(body);
    return NextResponse.json(exercise, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create exercise' }, { status: 500 });
  }
}
