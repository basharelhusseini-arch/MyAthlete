import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const memberId = searchParams.get('memberId');

  if (!memberId) {
    return NextResponse.json(
      { error: 'Member ID is required' },
      { status: 400 }
    );
  }

  const connection = store.getWhoopConnection(memberId);
  return NextResponse.json(connection || { connected: false });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // In production, encrypt tokens before storing
    const connection = store.addWhoopConnection({
      ...body,
      connected: true,
      connectedAt: new Date().toISOString(),
    });
    return NextResponse.json(connection, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to connect Whoop' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const memberId = searchParams.get('memberId');

  if (!memberId) {
    return NextResponse.json(
      { error: 'Member ID is required' },
      { status: 400 }
    );
  }

  const deleted = store.deleteWhoopConnection(memberId);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Connection not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true });
}
