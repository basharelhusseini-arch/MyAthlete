import { NextRequest, NextResponse } from 'next/server';

// This route is deprecated and replaced by /api/score/today
// Kept for backwards compatibility but returns empty data
export async function GET(request: NextRequest) {
  return NextResponse.json({
    total: 0,
    workoutScore: 0,
    dietScore: 0,
    habitScore: 0,
    sleepScore: 0,
    workoutCount: 0,
    workoutIntensity: 0,
    dietQuality: 0,
    habitCompletion: 0,
    sleepQuality: 0,
    message: 'This endpoint is deprecated. Use /api/score/today instead.'
  }, { status: 410 }); // 410 Gone status
}
