'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Target, 
  Calendar, 
  TrendingUp,
  UtensilsCrossed,
  ChefHat
} from 'lucide-react';
import { NutritionPlan, DailyMealPlanSummary } from '@/types';

export default function NutritionPlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlan();
  }, [params.id]);

  const fetchPlan = async () => {
    try {
      const response = await fetch(`/api/nutrition-plans/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch nutrition plan');
      }
      const data = await response.json();
      setPlan(data);
    } catch (err: any) {
      console.error('Failed to fetch plan:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-thrivv-bg-dark">
        <p className="text-thrivv-text-secondary">Loading nutrition plan...</p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-thrivv-bg-dark">
        <div className="premium-card p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold text-thrivv-text-primary mb-4">Plan Not Found</h2>
          <p className="text-thrivv-text-secondary mb-6">{error || 'This nutrition plan could not be loaded.'}</p>
          <Link href="/member/nutrition" className="btn-primary px-6 py-3">
            ← Back to Nutrition
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-thrivv-bg-dark">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <button
          onClick={() => router.back()}
          className="flex items-center text-thrivv-text-secondary hover:text-thrivv-gold-500 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-thrivv-text-primary mb-2">
              {plan.name}
            </h1>
            <p className="text-thrivv-text-secondary">{plan.description}</p>
          </div>
          <span className={`px-4 py-2 text-sm font-medium rounded-lg ${
            plan.status === 'active' ? 'success-badge' :
            plan.status === 'completed' ? 'bg-thrivv-gold-500/10 text-thrivv-gold-500 border border-thrivv-gold-500/20' :
            'bg-thrivv-bg-card text-thrivv-text-muted border border-thrivv-gold-500/10'
          }`}>
            {plan.status}
          </span>
        </div>
      </div>

      {/* Plan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="premium-card p-6">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-thrivv-gold-500 mr-2" />
            <h3 className="text-sm font-medium text-thrivv-text-secondary">Goal</h3>
          </div>
          <p className="text-xl font-semibold text-thrivv-text-primary capitalize">
            {plan.goal.replace('_', ' ')}
          </p>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center mb-3">
            <Calendar className="w-5 h-5 text-thrivv-gold-500 mr-2" />
            <h3 className="text-sm font-medium text-thrivv-text-secondary">Duration</h3>
          </div>
          <p className="text-xl font-semibold text-thrivv-text-primary">
            {plan.duration} days
          </p>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-thrivv-gold-500 mr-2" />
            <h3 className="text-sm font-medium text-thrivv-text-secondary">Daily Calories</h3>
          </div>
          <p className="text-xl font-semibold text-thrivv-text-primary">
            {plan.macroTargets.calories} kcal
          </p>
        </div>
      </div>

      {/* Macro Targets */}
      <div className="premium-card p-6 mb-8">
        <h2 className="text-2xl font-semibold text-thrivv-text-primary mb-6">Daily Macro Targets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-sm text-thrivv-text-muted mb-2">Calories</p>
            <p className="text-3xl font-semibold text-thrivv-gold-500">{plan.macroTargets.calories}</p>
            <p className="text-xs text-thrivv-text-muted mt-1">kcal</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-thrivv-text-muted mb-2">Protein</p>
            <p className="text-3xl font-semibold text-thrivv-text-primary">{Math.round(plan.macroTargets.protein)}</p>
            <p className="text-xs text-thrivv-text-muted mt-1">grams</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-thrivv-text-muted mb-2">Carbs</p>
            <p className="text-3xl font-semibold text-thrivv-text-primary">{Math.round(plan.macroTargets.carbohydrates)}</p>
            <p className="text-xs text-thrivv-text-muted mt-1">grams</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-thrivv-text-muted mb-2">Fats</p>
            <p className="text-3xl font-semibold text-thrivv-text-primary">{Math.round(plan.macroTargets.fats)}</p>
            <p className="text-xs text-thrivv-text-muted mt-1">grams</p>
          </div>
        </div>
      </div>

      {/* Daily Meal Plans */}
      <div className="premium-card p-6 mb-8">
        <h2 className="text-2xl font-semibold text-thrivv-text-primary mb-6">7-Day Meal Plans</h2>
        
        {plan.mealPlans && plan.mealPlans.length > 0 ? (
          <div className="space-y-6">
            {plan.mealPlans.map((dayPlan: DailyMealPlanSummary) => (
              <div key={dayPlan.day} className="p-6 bg-thrivv-bg-card/50 rounded-xl border border-thrivv-gold-500/10">
                {/* Day Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-thrivv-gold-500/10">
                  <h3 className="text-xl font-semibold text-thrivv-text-primary">
                    {dayPlan.label}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-thrivv-text-muted">
                    <span>{dayPlan.totals.calories} kcal</span>
                    <span>•</span>
                    <span>{Math.round(dayPlan.totals.protein_g)}g protein</span>
                  </div>
                </div>

                {/* Meals */}
                <div className="space-y-3 mb-4">
                  {dayPlan.meals.map((meal, index) => (
                    <Link
                      key={`${meal.recipe_id}-${index}`}
                      href={`/member/recipes/${meal.recipe_id}`}
                      className="flex items-center justify-between p-4 bg-thrivv-bg-dark/50 rounded-lg hover:bg-thrivv-bg-dark transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-thrivv-gold-500/10 flex items-center justify-center">
                          {meal.meal_slot === 'breakfast' && <ChefHat className="w-5 h-5 text-thrivv-gold-500" />}
                          {meal.meal_slot === 'lunch' && <UtensilsCrossed className="w-5 h-5 text-thrivv-gold-500" />}
                          {meal.meal_slot === 'dinner' && <UtensilsCrossed className="w-5 h-5 text-thrivv-gold-500" />}
                          {meal.meal_slot === 'snack' && <ChefHat className="w-5 h-5 text-thrivv-gold-500" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-thrivv-text-primary group-hover:text-thrivv-gold-500 transition-colors">
                              {meal.recipe_name}
                            </p>
                            {meal.servings !== 1 && (
                              <span className="text-xs px-2 py-0.5 rounded bg-thrivv-gold-500/10 text-thrivv-gold-500 font-medium">
                                {meal.servings}x
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-thrivv-text-muted capitalize">{meal.meal_slot}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-thrivv-text-secondary">
                        <span>{meal.calories} kcal</span>
                        <span className="text-thrivv-gold-500">{Math.round(meal.protein_g)}g protein</span>
                        <span className="text-xs text-thrivv-text-muted">→</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Day Totals */}
                <div className="flex items-center justify-between pt-4 border-t border-thrivv-gold-500/10">
                  <span className="text-sm font-medium text-thrivv-text-secondary">Daily Totals</span>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-thrivv-text-muted mb-1">Calories</p>
                      <p className="font-semibold text-thrivv-gold-500">{dayPlan.totals.calories}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-thrivv-text-muted mb-1">Protein</p>
                      <p className="font-semibold text-thrivv-text-primary">{Math.round(dayPlan.totals.protein_g)}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-thrivv-text-muted mb-1">Carbs</p>
                      <p className="font-semibold text-thrivv-text-primary">{Math.round(dayPlan.totals.carbs_g)}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-thrivv-text-muted mb-1">Fat</p>
                      <p className="font-semibold text-thrivv-text-primary">{Math.round(dayPlan.totals.fat_g)}g</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="icon-badge w-20 h-20 mx-auto mb-4">
              <UtensilsCrossed className="w-10 h-10 text-thrivv-gold-500" />
            </div>
            <h3 className="text-lg font-semibold text-thrivv-text-primary mb-2">No meal plans available</h3>
            <p className="text-thrivv-text-secondary mb-6">
              This plan was created before meal plan generation was available.
            </p>
            <button
              onClick={() => alert('Meal plan regeneration coming soon!')}
              className="btn-primary px-6 py-3"
            >
              Generate Meal Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
