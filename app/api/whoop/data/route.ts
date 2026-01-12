import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const memberId = searchParams.get('memberId');
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;

  if (!memberId) {
    return NextResponse.json(
      { error: 'Member ID is required' },
      { status: 400 }
    );
  }

  const data = store.getWhoopData(memberId, startDate, endDate);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // In production, this would sync from Whoop API
    const data = store.addWhoopData(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to sync Whoop data' },
      { status: 400 }
    );
  }
}
