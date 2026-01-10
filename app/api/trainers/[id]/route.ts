import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trainer = store.getTrainer(params.id);
    if (!trainer) {
      return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
    }
    return NextResponse.json(trainer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trainer' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const trainer = store.updateTrainer(params.id, body);
    if (!trainer) {
      return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
    }
    return NextResponse.json(trainer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update trainer' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = store.deleteTrainer(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete trainer' }, { status: 500 });
  }
}
