'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Target, Calendar, TrendingUp, UtensilsCrossed, Trash2, Clock } from 'lucide-react';
import { NutritionPlan, DailyMealPlan, Recipe } from '@/types';

export default function NutritionPlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [mealPlans, setMealPlans] = useState<DailyMealPlan[]>([]);
  const [recipes, setRecipes] = useState<Record<string, Recipe>>({});
  const [loading, setLoading] = useState(true);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const recipesData: Recipe[] = await response.json();
        const recipesMap: Record<string, Recipe> = {};
        recipesData.forEach(recipe => {
          recipesMap[recipe.id] = recipe;
        });
        setRecipes(recipesMap);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  }, []);

  const fetchPlanData = useCallback(async () => {
    if (!planId) return;

    try {
      const [planRes, mealsRes] = await Promise.all([
        fetch(`/api/nutrition-plans/${planId}`),
        fetch(`/api/nutrition-plans/${planId}/meals`),
      ]);

      if (planRes.ok) {
        const planData = await planRes.json();
        setPlan(planData);
      }

      if (mealsRes.ok) {
        const mealsData = await mealsRes.json();
        setMealPlans(mealsData);
      }
    } catch (error) {
      console.error('Failed to fetch plan data:', error);
    } finally {
      setLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    if (planId) {
      setLoading(true);
      Promise.all([fetchPlanData(), fetchRecipes()]).finally(() => {
        setLoading(false);
      });
    }
  }, [planId, fetchPlanData, fetchRecipes]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this nutrition plan?')) return;

    try {
      const response = await fetch(`/api/nutrition-plans/${planId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/nutrition');
      } else {
        alert('Failed to delete nutrition plan');
      }
    } catch (error) {
      console.error('Failed to delete nutrition plan:', error);
      alert('Failed to delete nutrition plan');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading nutrition plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 mb-4">Nutrition plan not found</p>
        <Link
          href="/nutrition"
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Nutrition Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/nutrition"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Nutrition Plans
        </Link>
      </div>

      {/* Plan Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h1>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Goal: <span className="font-medium ml-1 capitalize">{plan.goal.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Calories: <span className="font-medium ml-1">{plan.macroTargets.calories}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Duration: <span className="font-medium ml-1">{plan.duration} days</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              plan.status === 'active' ? 'bg-green-100 text-green-800' :
              plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {plan.status}
            </span>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete nutrition plan"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Macro Targets */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Macro Targets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-2xl font-bold text-blue-600">{plan.macroTargets.calories}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Protein</p>
              <p className="text-2xl font-bold text-green-600">{plan.macroTargets.protein}g</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="text-2xl font-bold text-orange-600">{plan.macroTargets.carbohydrates}g</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Fats</p>
              <p className="text-2xl font-bold text-purple-600">{plan.macroTargets.fats}g</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Meal Plans */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Daily Meal Plans</h2>
        </div>
        <div className="p-6">
          {mealPlans.length === 0 ? (
            <div className="text-center py-12">
              <UtensilsCrossed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No meal plans available</p>
            </div>
          ) : (
            <div className="space-y-6">
              {mealPlans.map((mealPlan) => (
                <div
                  key={mealPlan.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {new Date(mealPlan.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>
                    <div className="text-sm text-gray-600">
                      Total: {mealPlan.totalCalories} cal | {mealPlan.totalProtein}g protein | {mealPlan.totalCarbohydrates}g carbs | {mealPlan.totalFats}g fats
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mealPlan.meals.map((meal) => {
                      const recipe = meal.recipeId ? recipes[meal.recipeId] : undefined;
                      return (
                        <div
                          key={meal.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-blue-600 uppercase">
                              {meal.mealType}
                            </span>
                            {meal.time && (
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                {meal.time}
                              </div>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{meal.name}</h4>
                          <div className="space-y-1 text-xs text-gray-600">
                            <div>{meal.calories} calories</div>
                            <div>P: {meal.protein}g | C: {meal.carbohydrates}g | F: {meal.fats}g</div>
                          </div>
                          {recipe && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-500 mb-1">Prep: {recipe.prepTime} min</p>
                              {recipe.cookTime > 0 && (
                                <p className="text-xs text-gray-500">Cook: {recipe.cookTime} min</p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
