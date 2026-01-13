import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    const healthScore = store.calculateHealthScore(memberId);
    return NextResponse.json(healthScore);
  } catch (error) {
    console.error('Failed to calculate health score:', error);
    return NextResponse.json({ error: 'Failed to calculate health score' }, { status: 500 });
  }
}
