import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    const friendsScores = store.getFriendsHealthScores(memberId);
    return NextResponse.json(friendsScores);
  } catch (error) {
    console.error('Failed to fetch friends scores:', error);
    return NextResponse.json({ error: 'Failed to fetch friends scores' }, { status: 500 });
  }
}
