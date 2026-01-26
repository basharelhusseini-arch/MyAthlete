import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { calculateConfidenceScore, getConfidenceLevel } from '@/lib/trust-scoring';

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

      // Enrich with confidence scores
      const enrichedLeaderboard = await enrichWithConfidenceScores(data || []);

      return NextResponse.json({
        leaderboard: enrichedLeaderboard,
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

      // Enrich with confidence scores
      const enrichedLeaderboard = await enrichWithConfidenceScores(leaderboard);

      return NextResponse.json({
        leaderboard: enrichedLeaderboard,
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

/**
 * Enrich leaderboard entries with confidence scores
 * 
 * CRITICAL: This is ADDITIVE ONLY
 * - Health scores are NEVER reduced
 * - Confidence is purely informational
 * - All users are shown regardless of confidence level
 * 
 * OPTIMIZED: Batch queries to avoid N+1 problem
 */
async function enrichWithConfidenceScores(leaderboard: any[]) {
  if (leaderboard.length === 0) return [];
  
  const userIds = leaderboard.map(entry => entry.id);
  
  // BATCH 1: Fetch all profiles
  const { data: profiles } = await supabase
    .from('user_health_profile')
    .select('user_id, has_wearable')
    .in('user_id', userIds);

  const profileMap = new Map(
    profiles?.map(p => [p.user_id, p]) || []
  );

  // BATCH 2: Fetch all consistency passes (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { data: consistencyEvents } = await supabase
    .from('verification_events')
    .select('user_id')
    .in('user_id', userIds)
    .eq('method', 'consistency_check')
    .eq('status', 'verified')
    .gte('created_at', thirtyDaysAgo.toISOString());

  const consistencyCountMap = new Map<string, number>();
  consistencyEvents?.forEach(event => {
    consistencyCountMap.set(
      event.user_id,
      (consistencyCountMap.get(event.user_id) || 0) + 1
    );
  });

  // BATCH 3: Fetch all survey completions (last 90 days)
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const { data: surveyEvents } = await supabase
    .from('verification_events')
    .select('user_id')
    .in('user_id', userIds)
    .eq('method', 'survey')
    .eq('status', 'verified')
    .gte('created_at', ninetyDaysAgo.toISOString());

  const surveyCountMap = new Map<string, number>();
  surveyEvents?.forEach(event => {
    surveyCountMap.set(
      event.user_id,
      (surveyCountMap.get(event.user_id) || 0) + 1
    );
  });

  // BATCH 4: Fetch first event for each user
  const { data: firstEvents } = await supabase
    .from('verification_events')
    .select('user_id, created_at')
    .in('user_id', userIds)
    .order('created_at', { ascending: true });

  const firstEventMap = new Map<string, string>();
  firstEvents?.forEach(event => {
    if (!firstEventMap.has(event.user_id)) {
      firstEventMap.set(event.user_id, event.created_at);
    }
  });

  // Calculate confidence scores for all users
  const enrichedEntries = leaderboard.map((entry) => {
    const profile = profileMap.get(entry.id);
    const hasWearable = profile?.has_wearable || false;
    const consistencyPasses = consistencyCountMap.get(entry.id) || 0;
    const surveyCompletions = surveyCountMap.get(entry.id) || 0;
    
    const firstEventDate = firstEventMap.get(entry.id);
    const daysActive = firstEventDate
      ? Math.floor((Date.now() - new Date(firstEventDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    const confidenceScore = calculateConfidenceScore({
      hasWearable,
      consistencyPassesLast30Days: consistencyPasses,
      surveyCompletionsLast90Days: surveyCompletions,
      daysActive,
    });

    return {
      ...entry,
      confidence_score: confidenceScore.score,
      confidence_level: confidenceScore.level,
      has_wearable: hasWearable,
    };
  });

  return enrichedEntries;
}
