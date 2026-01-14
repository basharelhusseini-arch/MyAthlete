import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    // Get days parameter from query string (default 14)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '14', 10);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: scores, error } = await supabase
      .from('health_scores')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (error) {
      console.error('Score history error:', error);
      return NextResponse.json(
        { error: 'Failed to get score history' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      scores: scores || [],
      days,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Get score history error:', error);
    return NextResponse.json(
      { error: 'Failed to get score history' },
      { status: 500 }
    );
  }
}
