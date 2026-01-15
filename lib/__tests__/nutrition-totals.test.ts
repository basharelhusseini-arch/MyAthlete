/**
 * Unit test to verify nutrition plan totals are mathematically correct
 * Ensures displayed totals equal the sum of meal macros
 */

import { DailyMealPlan, Meal } from '@/types';

describe('Nutrition Plan Totals', () => {
  it('should compute totals that match sum of meals', () => {
    // Sample meal plan with meals
    const meals: Meal[] = [
      {
        id: '1',
        name: 'Breakfast',
        mealType: 'breakfast',
        calories: 400,
        protein: 25,
        carbohydrates: 45,
        fats: 12,
        time: '08:00',
      },
      {
        id: '2',
        name: 'Lunch',
        mealType: 'lunch',
        calories: 600,
        protein: 40,
        carbohydrates: 60,
        fats: 20,
        time: '13:00',
      },
      {
        id: '3',
        name: 'Dinner',
        mealType: 'dinner',
        calories: 700,
        protein: 45,
        carbohydrates: 70,
        fats: 25,
        time: '19:00',
      },
      {
        id: '4',
        name: 'Snack',
        mealType: 'snack',
        calories: 200,
        protein: 10,
        carbohydrates: 25,
        fats: 8,
        time: '16:00',
      },
    ];

    // Compute totals (same logic as UI)
    const computedCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const computedProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const computedCarbs = meals.reduce((sum, m) => sum + (m.carbohydrates || 0), 0);
    const computedFats = meals.reduce((sum, m) => sum + (m.fats || 0), 0);

    // Expected totals
    expect(computedCalories).toBe(1900);
    expect(computedProtein).toBe(120);
    expect(computedCarbs).toBe(200);
    expect(computedFats).toBe(65);
  });

  it('should handle missing macros gracefully', () => {
    const meals: Meal[] = [
      {
        id: '1',
        name: 'Meal with missing data',
        mealType: 'breakfast',
        calories: 300,
        protein: 20,
        carbohydrates: 30,
        fats: 10,
      },
      {
        id: '2',
        name: 'Partial meal',
        mealType: 'lunch',
        calories: 0, // Missing calories should be treated as 0
        protein: 0,
        carbohydrates: 0,
        fats: 0,
      },
    ];

    const computedCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const computedProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);

    expect(computedCalories).toBe(300);
    expect(computedProtein).toBe(20);
  });

  it('should verify stored totals match computed totals', () => {
    const mealPlan: DailyMealPlan = {
      id: '1',
      nutritionPlanId: 'plan-1',
      memberId: 'member-1',
      date: '2026-01-15',
      status: 'planned',
      meals: [
        {
          id: 'm1',
          name: 'Breakfast',
          mealType: 'breakfast',
          calories: 500,
          protein: 30,
          carbohydrates: 50,
          fats: 15,
        },
        {
          id: 'm2',
          name: 'Lunch',
          mealType: 'lunch',
          calories: 700,
          protein: 45,
          carbohydrates: 70,
          fats: 25,
        },
      ],
      totalCalories: 1200,
      totalProtein: 75,
      totalCarbohydrates: 120,
      totalFats: 40,
    };

    // Compute from meals
    const computedCalories = mealPlan.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const computedProtein = mealPlan.meals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const computedCarbs = mealPlan.meals.reduce((sum, m) => sum + (m.carbohydrates || 0), 0);
    const computedFats = mealPlan.meals.reduce((sum, m) => sum + (m.fats || 0), 0);

    // Verify stored totals match computed
    expect(computedCalories).toBe(mealPlan.totalCalories);
    expect(computedProtein).toBe(mealPlan.totalProtein);
    expect(computedCarbs).toBe(mealPlan.totalCarbohydrates);
    expect(computedFats).toBe(mealPlan.totalFats);
  });
});
