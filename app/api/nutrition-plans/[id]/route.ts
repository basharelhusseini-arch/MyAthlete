import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const plan = store.getNutritionPlan(params.id);
  if (!plan) {
    return NextResponse.json(
      { error: 'Nutrition plan not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(plan);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedPlan = store.updateNutritionPlan(params.id, body);
    if (!updatedPlan) {
      return NextResponse.json(
        { error: 'Nutrition plan not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedPlan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update nutrition plan' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = store.deleteNutritionPlan(params.id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Nutrition plan not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true });
}
