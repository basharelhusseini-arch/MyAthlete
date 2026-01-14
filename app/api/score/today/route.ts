import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const user = await requireAuth();
    const today = new Date().toISOString().split('T')[0];

    const { data: score, error } = await supabase
      .from('health_scores')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Score error:', error);
      return NextResponse.json(
        { error: 'Failed to get score' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      score: score || null,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Get score error:', error);
    return NextResponse.json(
      { error: 'Failed to get score' },
      { status: 500 }
    );
  }
}
