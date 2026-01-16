import { NextRequest, NextResponse } from 'next/server';

// This route is deprecated and replaced by /api/health/summary
// Kept for backwards compatibility but returns deprecation message
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
    message: 'This endpoint is deprecated. Use /api/health/summary or /api/score/today instead.',
    deprecatedSince: '2026-01-16',
    newEndpoint: '/api/health/summary'
  }, { status: 410 }); // 410 Gone status
}
