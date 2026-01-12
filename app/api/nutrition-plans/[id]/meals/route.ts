import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const mealPlans = store.getDailyMealPlans(params.id);
  return NextResponse.json(mealPlans);
}
