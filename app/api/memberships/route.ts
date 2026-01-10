import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const memberships = store.getAllMemberships();
    return NextResponse.json(memberships);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch memberships' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const membership = store.addMembership(body);
    return NextResponse.json(membership, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create membership' }, { status: 500 });
  }
}
