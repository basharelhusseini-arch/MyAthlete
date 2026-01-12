import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      memberId,
      goal,
      gender,
      age,
      height,
      weight,
      activityLevel,
      duration,
      dietaryRestrictions,
      preferences,
    } = body;

    if (!memberId || !goal || !gender || !age || !height || !weight || !activityLevel || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const plan = store.generateNutritionPlan({
      memberId,
      goal,
      gender,
      age,
      height,
      weight,
      activityLevel,
      duration,
      dietaryRestrictions,
      preferences,
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('Failed to generate nutrition plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate nutrition plan' },
      { status: 500 }
    );
  }
}
