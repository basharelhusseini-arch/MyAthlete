import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const trainers = store.getAllTrainers();
    return NextResponse.json(trainers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trainers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const trainer = store.addTrainer(body);
    return NextResponse.json(trainer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create trainer' }, { status: 500 });
  }
}
