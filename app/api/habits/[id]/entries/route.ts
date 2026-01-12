import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const entries = store.getHabitEntries(params.id);
  return NextResponse.json(entries);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const entry = store.addHabitEntry({
      ...body,
      habitId: params.id,
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create habit entry' },
      { status: 400 }
    );
  }
}
