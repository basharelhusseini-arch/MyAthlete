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

  const entries = store.getMemberHabitEntries(memberId);
  return NextResponse.json(entries);
}
