import { NextRequest, NextResponse } from 'next/server';

// This route is deprecated and replaced by /api/leaderboard
// Kept for backwards compatibility but returns empty data
export async function GET(request: NextRequest) {
  return NextResponse.json([], { status: 410 }); // 410 Gone status with empty array
}
