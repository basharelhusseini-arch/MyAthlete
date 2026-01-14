import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await requireAuth(); // Require auth to view leaderboard
    
    // Get days parameter (default to today only)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '1', 10);

    let dateFilter;
    if (days === 1) {
      // Today only
      dateFilter = new Date().toISOString().split('T')[0];
    } else {
      // Last N days - use average score
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      dateFilter = startDate.toISOString().split('T')[0];
    }

    if (days === 1) {
      // Today's leaderboard - try view first, fallback to direct query
      let { data, error } = await supabase
        .from('leaderboard_today')
        .select('*')
        .limit(100);

      // Fallback: If view doesn't exist or errors, query directly
      if (error) {
        console.warn('leaderboard_today view not available, using fallback query:', error.message);
        
        const fallbackResult = await supabase
          .from('health_scores')
          .select(`
            user_id,
            score,
            users (
              id,
              first_name,
              last_name
            )
          `)
          .eq('date', dateFilter)
          .order('score', { ascending: false })
          .limit(100);

        if (fallbackResult.error) {
          console.error('Leaderboard fallback error:', fallbackResult.error);
          return NextResponse.json(
            { error: 'Failed to get leaderboard' },
            { status: 500 }
          );
        }

        // Transform to match view structure and add ranks
        data = fallbackResult.data?.map((item: any, index: number) => ({
          id: item.user_id,
          first_name: item.users?.first_name || '',
          last_name: item.users?.last_name || '',
          score: item.score,
          rank: index + 1,
        })) || [];
      }

      return NextResponse.json({
        leaderboard: data || [],
        period: 'today',
      });
    } else {
      // Average over multiple days
      const { data, error } = await supabase
        .from('health_scores')
        .select(`
          user_id,
          score,
          users (
            id,
            first_name,
            last_name
          )
        `)
        .gte('date', dateFilter)
        .order('score', { ascending: false });

      if (error) {
        console.error('Leaderboard error:', error);
        return NextResponse.json(
          { error: 'Failed to get leaderboard' },
          { status: 500 }
        );
      }

      // Group by user and calculate average
      const userScores = new Map();
      data?.forEach((score: any) => {
        if (!userScores.has(score.user_id)) {
          userScores.set(score.user_id, {
            id: score.user_id,
            first_name: score.users.first_name,
            last_name: score.users.last_name,
            scores: [],
          });
        }
        userScores.get(score.user_id).scores.push(score.score);
      });

      // Calculate averages and sort
      const leaderboard = Array.from(userScores.values())
        .map((user: any, index) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          score: Math.round(
            user.scores.reduce((sum: number, s: number) => sum + s, 0) / user.scores.length
          ),
        }))
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({
          ...user,
          rank: index + 1,
        }))
        .slice(0, 100);

      return NextResponse.json({
        leaderboard,
        period: `last_${days}_days`,
      });
    }
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to get leaderboard' },
      { status: 500 }
    );
  }
}
