import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const memberId = searchParams.get('memberId');

  if (memberId) {
    const plans = store.getMemberNutritionPlans(memberId);
    return NextResponse.json(plans);
  }

  const plans = store.getAllNutritionPlans();
  return NextResponse.json(plans);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const plan = store.addNutritionPlan(body);
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create nutrition plan' },
      { status: 400 }
    );
  }
}
