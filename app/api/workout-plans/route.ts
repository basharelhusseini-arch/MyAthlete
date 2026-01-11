import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    
    let plans;
    if (memberId) {
      plans = store.getMemberWorkoutPlans(memberId);
    } else {
      plans = store.getAllWorkoutPlans();
    }
    
    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const plan = store.addWorkoutPlan(body);
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workout plan' }, { status: 500 });
  }
}
