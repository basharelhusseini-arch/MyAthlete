/**
 * API: Verification Events
 * 
 * POST /api/verification/event - Create verification event
 * GET /api/verification/event - Get verification history
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateVerificationMultiplier } from '@/lib/trust-scoring';
import { VerificationMethod, EntityType } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      entity_type,
      entity_id,
      method,
      status = 'verified',
      confidence = 'medium',
      metadata = {},
    } = body;

    // Validate inputs
    if (!entity_type || !method) {
      return NextResponse.json(
        { error: 'Missing required fields: entity_type, method' },
        { status: 400 }
      );
    }

    // Calculate multiplier
    const multiplier = calculateVerificationMultiplier([method as VerificationMethod]);

    // Insert verification event
    const { data: event, error } = await supabase
      .from('verification_events')
      .insert({
        user_id: userId,
        entity_type: entity_type as EntityType,
        entity_id: entity_id || null,
        method: method as VerificationMethod,
        status,
        confidence,
        multiplier,
        metadata,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating verification event:', error);
      return NextResponse.json(
        { error: 'Failed to create verification event' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      event,
      multiplier,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Verification event POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const entityType = searchParams.get('entity_type');

    let query = supabase
      .from('verification_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (entityType) {
      query = query.eq('entity_type', entityType);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error('Error fetching verification events:', error);
      return NextResponse.json(
        { error: 'Failed to fetch verification events' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      events: events || [],
      count: events?.length || 0,
    });

  } catch (error: any) {
    console.error('Verification event GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
