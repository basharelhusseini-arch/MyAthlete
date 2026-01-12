import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  const recipes = store.getAllRecipes();
  return NextResponse.json(recipes);
}
