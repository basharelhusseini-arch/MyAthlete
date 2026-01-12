import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; entryId: string } }
) {
  try {
    const body = await request.json();
    const updatedEntry = store.updateHabitEntry(params.entryId, body);
    if (!updatedEntry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedEntry);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update entry' },
      { status: 400 }
    );
  }
}
