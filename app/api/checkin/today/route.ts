import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { calculateHealthScore } from '@/lib/health-score';

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth();

    const body = await request.json();
    const { didWorkout, calories, sleepHours } = body;

    // Validation
    if (typeof didWorkout !== 'boolean') {
      return NextResponse.json(
        { error: 'didWorkout must be a boolean' },
        { status: 400 }
      );
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Upsert check-in (insert or update if exists)
    const { data: checkin, error: checkinError } = await supabase
      .from('daily_checkins')
      .upsert(
        {
          user_id: user.id,
          date: today,
          did_workout: didWorkout,
          calories: calories || 0,
          sleep_hours: sleepHours || 0,
        },
        {
          onConflict: 'user_id,date',
        }
      )
      .select()
      .single();

    if (checkinError) {
      console.error('Check-in error:', checkinError);
      return NextResponse.json(
        { error: 'Failed to save check-in' },
        { status: 500 }
      );
    }

    // Calculate health score
    const score = calculateHealthScore({
      didWorkout,
      calories,
      sleepHours,
    });

    // Upsert health score
    const { data: healthScore, error: scoreError } = await supabase
      .from('health_scores')
      .upsert(
        {
          user_id: user.id,
          date: today,
          score: score.totalScore,
          training_score: score.trainingScore,
          diet_score: score.dietScore,
          sleep_score: score.sleepScore,
        },
        {
          onConflict: 'user_id,date',
        }
      )
      .select()
      .single();

    if (scoreError) {
      console.error('Score error:', scoreError);
      return NextResponse.json(
        { error: 'Failed to save health score' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkin,
      score: healthScore,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: 'Failed to process check-in' },
      { status: 500 }
    );
  }
}

// Get today's check-in
export async function GET() {
  try {
    const user = await requireAuth();
    const today = new Date().toISOString().split('T')[0];

    const { data: checkin } = await supabase
      .from('daily_checkins')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    return NextResponse.json({
      checkin: checkin || null,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Get check-in error:', error);
    return NextResponse.json(
      { error: 'Failed to get check-in' },
      { status: 500 }
    );
  }
}
