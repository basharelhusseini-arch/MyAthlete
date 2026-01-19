import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { calculateHealthScore, hasMealsLogged, calculateConsumedFromMeals } from '@/lib/health-score';
import { healthToRewardPoints } from '@/lib/reward-points';
import { getTodayLog } from '@/lib/nutrition-log';

/**
 * POST /api/health/update-from-nutrition
 * 
 * Called automatically when user logs meals in nutrition tracker
 * Updates health score to include calories and macros from logged meals
 * 
 * Body: { memberId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { memberId } = body;

    if (!memberId) {
      return NextResponse.json(
        { error: 'memberId is required' },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split('T')[0];

    // Get today's nutrition log (from localStorage via client or future Supabase)
    // For now, we'll get the logged meals data from the request body
    // In the future, this will query Supabase daily_meals table
    
    // Get existing check-in data if any
    const { data: existingCheckin } = await supabase
      .from('daily_checkins')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    // Get today's nutrition totals from the request
    // This assumes the client sends the computed totals
    const { totalCalories, totalProtein, totalCarbs, totalFat, mealCount } = body;

    if (!totalCalories && totalCalories !== 0) {
      return NextResponse.json(
        { error: 'totalCalories is required' },
        { status: 400 }
      );
    }

    // Prepare consumed nutrition data
    const consumed = {
      calories: totalCalories || 0,
      protein_g: totalProtein || 0,
      carbs_g: totalCarbs || 0,
      fat_g: totalFat || 0,
    };

    // Get user's nutrition targets (if they have a plan)
    // For now, use defaults - in future, fetch from nutrition_plans table
    const target = {
      calories: 2200,
      protein_g: 150,
      carbs_g: 250,
      fat_g: 70,
    };

    // Determine which sections are logged
    const hasLoggedMeals = mealCount > 0;
    const hasLoggedWorkout = existingCheckin?.did_workout !== null && existingCheckin?.did_workout !== undefined;
    const hasLoggedSleep = existingCheckin?.sleep_hours !== null && existingCheckin?.sleep_hours !== undefined && existingCheckin.sleep_hours > 0;
    const hasLoggedHabits = existingCheckin?.habit_details && Object.values(existingCheckin.habit_details).some(Boolean);

    // Calculate updated health score
    const score = calculateHealthScore(
      {
        didWorkout: existingCheckin?.did_workout || false,
        calories: totalCalories,
        sleepHours: existingCheckin?.sleep_hours || null,
        habits: existingCheckin?.habit_details || undefined,
        hasLoggedWorkout,
        hasLoggedMeals,
        hasLoggedSleep,
        hasLoggedHabits,
      },
      target,
      consumed
    );

    // Update or insert check-in with nutrition data
    const checkinPayload = {
      user_id: user.id,
      date: today,
      did_workout: existingCheckin?.did_workout || false,
      calories: totalCalories,
      sleep_hours: existingCheckin?.sleep_hours || 0,
      habits_completed: existingCheckin?.habits_completed || 0,
      habit_details: existingCheckin?.habit_details || {},
    };

    await supabase
      .from('daily_checkins')
      .upsert(checkinPayload, {
        onConflict: 'user_id,date',
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
          habit_score: score.habitScore,
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
        { error: 'Failed to save health score', details: scoreError.message },
        { status: 500 }
      );
    }

    // Calculate reward points from health score
    const rewardPointsEarned = healthToRewardPoints(score.totalScore);

    // Update reward history
    await supabase
      .from('reward_history')
      .upsert(
        {
          user_id: user.id,
          date: today,
          health_score: score.totalScore,
          points_earned: rewardPointsEarned,
        },
        {
          onConflict: 'user_id,date',
        }
      );

    // Recalculate total reward points
    const { data: historyData } = await supabase
      .from('reward_history')
      .select('points_earned')
      .eq('user_id', user.id);

    const totalPoints = historyData?.reduce((sum, h) => sum + Number(h.points_earned), 0) || 0;

    await supabase
      .from('users')
      .update({ reward_points: totalPoints })
      .eq('id', user.id);

    return NextResponse.json({
      success: true,
      score: healthScore,
      rewardPoints: {
        earned: rewardPointsEarned,
        total: totalPoints,
      },
      breakdown: score.breakdown,
      message: 'Health score updated from nutrition data',
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Session expired. Please sign in again.' },
        { status: 401 }
      );
    }
    console.error('Health score update error:', error);
    return NextResponse.json(
      { error: 'Failed to update health score', details: error.message },
      { status: 500 }
    );
  }
}
