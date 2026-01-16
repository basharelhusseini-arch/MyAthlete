import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const user = await requireAuth();
    const today = new Date().toISOString().split('T')[0];

    // Get today's health score
    const { data: todayScore } = await supabase
      .from('health_scores')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    // Get last 7 days of scores for trend
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

    const { data: last7Days } = await supabase
      .from('health_scores')
      .select('date, score, training_score, diet_score, sleep_score, habit_score')
      .eq('user_id', user.id)
      .gte('date', sevenDaysAgoStr)
      .order('date', { ascending: true });

    // Get last 7 days of check-ins for insights
    const { data: last7Checkins } = await supabase
      .from('daily_checkins')
      .select('date, did_workout, calories, sleep_hours, habits_completed')
      .eq('user_id', user.id)
      .gte('date', sevenDaysAgoStr)
      .order('date', { ascending: true });

    // Calculate streak
    let streak = 0;
    if (last7Days && last7Days.length > 0) {
      const sortedDays = [...last7Days].reverse();
      for (const day of sortedDays) {
        const dayDate = new Date(day.date).toISOString().split('T')[0];
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - streak);
        const expectedDateStr = expectedDate.toISOString().split('T')[0];
        
        if (dayDate === expectedDateStr) {
          streak++;
        } else {
          break;
        }
      }
    }

    // Build insights
    const insights = buildInsights(last7Checkins || [], last7Days || [], todayScore);

    return NextResponse.json({
      score: todayScore?.score || 0,
      updatedAt: todayScore?.created_at || today,
      streak,
      last7Days: (last7Days || []).map(d => ({
        date: d.date,
        score: d.score,
        training_score: d.training_score,
        diet_score: d.diet_score,
        sleep_score: d.sleep_score,
        habit_score: d.habit_score || 0,
      })),
      components: todayScore ? {
        training: todayScore.training_score || 0,
        diet: todayScore.diet_score || 0,
        sleep: todayScore.sleep_score || 0,
        habits: todayScore.habit_score || 0,
      } : {
        training: 0,
        diet: 0,
        sleep: 0,
        habits: 0,
      },
      insights,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Session expired. Please sign in again.' },
        { status: 401 }
      );
    }
    console.error('Health summary error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health summary' },
      { status: 500 }
    );
  }
}

interface CheckinData {
  date: string;
  did_workout: boolean;
  calories: number;
  sleep_hours: number;
  habits_completed: number;
}

interface ScoreData {
  date: string;
  score: number;
  training_score: number;
  diet_score: number;
  sleep_score: number;
  habit_score?: number;
}

function buildInsights(
  checkins: CheckinData[],
  scores: ScoreData[],
  todayScore: any
): string[] {
  const insights: string[] = [];

  // No data yet - onboarding insights
  if (checkins.length === 0) {
    return [
      'Complete your first check-in to start tracking your health score.',
      'Aim for at least 3 check-ins this week to establish a baseline.',
      'Track workouts, nutrition, sleep, and wellness habits for the most accurate score.',
    ];
  }

  // Limited data - encouragement
  if (checkins.length < 3) {
    insights.push(`You've checked in ${checkins.length} time${checkins.length !== 1 ? 's' : ''}. Complete 3 check-ins to unlock detailed trends.`);
  }

  // Sleep insights
  const sleepData = checkins.filter(c => c.sleep_hours > 0);
  if (sleepData.length > 0) {
    const avgSleep = sleepData.reduce((sum, c) => sum + c.sleep_hours, 0) / sleepData.length;
    const optimalDays = sleepData.filter(c => c.sleep_hours >= 7 && c.sleep_hours <= 9).length;
    
    if (avgSleep < 7) {
      insights.push(`Your average sleep is ${avgSleep.toFixed(1)} hours. Try to get 7-9 hours for optimal recovery.`);
    } else if (optimalDays >= sleepData.length * 0.7) {
      insights.push(`Excellent! You hit the optimal sleep range (7-9 hours) on ${optimalDays} of the last ${sleepData.length} days.`);
    }
  }

  // Workout insights
  const workoutDays = checkins.filter(c => c.did_workout).length;
  if (workoutDays === 0) {
    insights.push('No workouts tracked yet. Aim for at least 3 sessions per week to boost your training score.');
  } else if (workoutDays < 3 && checkins.length >= 7) {
    insights.push(`You worked out ${workoutDays} time${workoutDays !== 1 ? 's' : ''} this week. Aim for 3+ sessions to maximize your training score.`);
  } else if (workoutDays >= 4) {
    insights.push(`Great work! ${workoutDays} workouts completed. You're building strong consistency.`);
  }

  // Habit insights
  const habitData = checkins.filter(c => c.habits_completed > 0);
  if (habitData.length > 0) {
    const avgHabits = habitData.reduce((sum, c) => sum + c.habits_completed, 0) / habitData.length;
    const fullPointsDays = habitData.filter(c => c.habits_completed >= 2).length;
    
    if (fullPointsDays >= habitData.length * 0.7) {
      insights.push(`You're crushing wellness habits! Full points earned on ${fullPointsDays} of ${habitData.length} days.`);
    } else if (avgHabits < 2) {
      insights.push(`Average ${avgHabits.toFixed(1)} habits per day. Aim for 2+ daily to unlock full habit points (10 pts).`);
    }
  } else if (checkins.length >= 3) {
    insights.push('Try adding wellness habits (sauna, meditation, stretching) to your check-ins for bonus points.');
  }

  // Calorie tracking insights
  const calorieData = checkins.filter(c => c.calories > 0);
  if (calorieData.length === 0 && checkins.length >= 2) {
    insights.push('Start tracking calories to maximize your diet score. Target 2200 ± 300 calories for optimal points.');
  } else if (calorieData.length >= 3) {
    const avgCalories = calorieData.reduce((sum, c) => sum + c.calories, 0) / calorieData.length;
    const inRange = calorieData.filter(c => Math.abs(c.calories - 2200) <= 300).length;
    
    if (inRange >= calorieData.length * 0.7) {
      insights.push(`Calories on target! You hit the range on ${inRange} of ${calorieData.length} days.`);
    } else {
      insights.push(`Average ${Math.round(avgCalories)} cal/day. Aim for 2200 ± 300 to maximize diet points.`);
    }
  }

  // Streak insights
  if (scores.length >= 2) {
    const streak = calculateCurrentStreak(scores);
    if (streak >= 3) {
      insights.push(`${streak} day streak! Keep it going to build lasting healthy habits.`);
    } else if (streak === 1) {
      insights.push('Check in tomorrow to start building your streak.');
    }
  }

  // Overall score insights
  if (todayScore) {
    if (todayScore.score >= 90) {
      insights.push('Exceptional health score! You\'re in the top tier. Maintain this momentum!');
    } else if (todayScore.score >= 80) {
      insights.push('Strong health score! Small improvements in any area can push you into the 90s.');
    } else if (todayScore.score >= 60) {
      insights.push('Good progress! Focus on your lowest scoring area to boost your overall health score.');
    }
  }

  // Return top 5 insights
  return insights.slice(0, 5);
}

function calculateCurrentStreak(scores: ScoreData[]): number {
  if (scores.length === 0) return 0;
  
  const sortedScores = [...scores].reverse();
  let streak = 0;
  const today = new Date();
  
  for (const score of sortedScores) {
    const scoreDate = new Date(score.date);
    const expectedDate = new Date();
    expectedDate.setDate(today.getDate() - streak);
    expectedDate.setHours(0, 0, 0, 0);
    scoreDate.setHours(0, 0, 0, 0);
    
    if (scoreDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}
