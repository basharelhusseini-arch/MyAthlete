import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const membership = store.getMembership(params.id);
    if (!membership) {
      return NextResponse.json({ error: 'Membership not found' }, { status: 404 });
    }
    return NextResponse.json(membership);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch membership' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const membership = store.updateMembership(params.id, body);
    if (!membership) {
      return NextResponse.json({ error: 'Membership not found' }, { status: 404 });
    }
    return NextResponse.json(membership);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update membership' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = store.deleteMembership(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Membership not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Membership deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete membership' }, { status: 500 });
  }
}
