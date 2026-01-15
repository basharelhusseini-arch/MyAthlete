'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, CheckCircle, X } from 'lucide-react';
import { getRecipeById, type Recipe } from '@/lib/recipes';
import { addMealToToday, getTodayLog, computeTotals, type DailyLog } from '@/lib/nutrition-log';

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [addedToToday, setAddedToToday] = useState(false);
  const [servings, setServings] = useState(1);
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('memberId');
    if (!id) {
      router.push('/member/login');
      return;
    }
    setMemberId(id);

    const foundRecipe = getRecipeById(params.id);
    if (!foundRecipe) {
      router.push('/member/recipes');
      return;
    }
    setRecipe(foundRecipe);
    setServings(foundRecipe.servings);

    // Load today's log
    loadTodayLog(id);
  }, [params.id, router]);

  const loadTodayLog = async (userId: string) => {
    const log = await getTodayLog(userId);
    setTodayLog(log);
    setAddedToToday(log.meals.some(m => m.recipeId === params.id));
  };

  const handleAddToToday = async () => {
    if (!recipe || !memberId) return;

    try {
      await addMealToToday(memberId, recipe.id, servings);
      setAddedToToday(true);
      setShowToast(true);
      
      // Reload today's log
      await loadTodayLog(memberId);

      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to add meal:', error);
      alert('Failed to add recipe to today. Please try again.');
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-thrivv-bg-dark">
        <p className="text-thrivv-text-secondary">Loading recipe...</p>
      </div>
    );
  }

  const totalTime = recipe.prepMinutes + recipe.cookMinutes;

  return (
    <div className="min-h-screen bg-thrivv-bg-dark">
      {/* Back Button */}
      <div className="mb-6 animate-fade-in-up">
        <Link
          href="/member/recipes"
          className="inline-flex items-center text-thrivv-text-secondary hover:text-thrivv-gold-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Recipes
        </Link>
      </div>

      {/* Hero Image */}
      <div className="premium-card p-0 overflow-hidden mb-8 animate-slide-up">
        <div className="relative h-80 md:h-96 overflow-hidden bg-thrivv-bg-card">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
            loading="eager"
            key={recipe.id}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-thrivv-gold-500/20 backdrop-blur-sm text-thrivv-gold-500 text-xs font-medium rounded-lg border border-thrivv-gold-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3">
              {recipe.name}
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ingredients */}
          <div className="premium-card p-6">
            <h2 className="text-2xl font-semibold text-thrivv-text-primary mb-6">Ingredients</h2>
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 bg-thrivv-bg-card/50 rounded-xl hover:bg-thrivv-bg-card transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-thrivv-gold-500/10 border border-thrivv-gold-500/30 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs text-thrivv-gold-500 font-medium">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-thrivv-text-primary">
                      {ingredient.quantity} {ingredient.unit} {ingredient.item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="premium-card p-6">
            <h2 className="text-2xl font-semibold text-thrivv-text-primary mb-6">Instructions</h2>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-lg font-semibold text-black">{index + 1}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-thrivv-text-primary leading-relaxed">{instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Macros Panel */}
          <div className="premium-card p-6 sticky top-6">
            <h3 className="text-xl font-semibold text-thrivv-text-primary mb-6">Nutrition Facts</h3>
            
            {/* Calories - Featured */}
            <div className="p-4 bg-gradient-to-br from-thrivv-gold-500/10 to-thrivv-amber-500/10 border border-thrivv-gold-500/30 rounded-xl mb-6">
              <p className="text-sm text-thrivv-text-secondary mb-1">Total Calories</p>
              <p className="text-4xl font-semibold text-thrivv-gold-500">{recipe.calories}</p>
              <p className="text-xs text-thrivv-text-muted mt-1">per serving</p>
            </div>

            {/* Macros Grid */}
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-thrivv-bg-card/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-thrivv-text-secondary">Protein</span>
                  <span className="text-xl font-semibold text-thrivv-text-primary">{recipe.protein_g}g</span>
                </div>
                <div className="mt-2 h-2 bg-thrivv-bg-card rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-thrivv-gold-500 to-thrivv-amber-500"
                    style={{ width: `${Math.min((recipe.protein_g / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-thrivv-bg-card/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-thrivv-text-secondary">Carbs</span>
                  <span className="text-xl font-semibold text-thrivv-text-primary">{recipe.carbs_g}g</span>
                </div>
                <div className="mt-2 h-2 bg-thrivv-bg-card rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-thrivv-gold-500 to-thrivv-amber-500"
                    style={{ width: `${Math.min((recipe.carbs_g / 80) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-thrivv-bg-card/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-thrivv-text-secondary">Fat</span>
                  <span className="text-xl font-semibold text-thrivv-text-primary">{recipe.fat_g}g</span>
                </div>
                <div className="mt-2 h-2 bg-thrivv-bg-card rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-thrivv-gold-500 to-thrivv-amber-500"
                    style={{ width: `${Math.min((recipe.fat_g / 40) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Time and Servings */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-thrivv-bg-card/50 rounded-xl text-center">
                <Clock className="w-5 h-5 text-thrivv-gold-500 mx-auto mb-2" />
                <p className="text-sm text-thrivv-text-secondary mb-1">Total Time</p>
                <p className="text-lg font-semibold text-thrivv-text-primary">{totalTime} min</p>
              </div>
              <div className="p-3 bg-thrivv-bg-card/50 rounded-xl text-center">
                <Users className="w-5 h-5 text-thrivv-gold-500 mx-auto mb-2" />
                <p className="text-sm text-thrivv-text-secondary mb-1">Servings</p>
                <p className="text-lg font-semibold text-thrivv-text-primary">{recipe.servings}</p>
              </div>
            </div>

            {/* Servings Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-thrivv-text-secondary mb-2">
                Servings to Add
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-10 h-10 rounded-xl bg-thrivv-bg-card border border-thrivv-gold-500/20 text-thrivv-text-primary hover:bg-thrivv-gold-500/10 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input-premium text-center w-20 px-3 py-2"
                />
                <button
                  onClick={() => setServings(servings + 1)}
                  className="w-10 h-10 rounded-xl bg-thrivv-bg-card border border-thrivv-gold-500/20 text-thrivv-text-primary hover:bg-thrivv-gold-500/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Today Button */}
            <button
              onClick={handleAddToToday}
              disabled={addedToToday}
              className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                addedToToday
                  ? 'bg-thrivv-neon-green/20 text-thrivv-neon-green border border-thrivv-neon-green/30 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {addedToToday ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Added to Today
                </>
              ) : (
                `Add ${servings} ${servings === 1 ? 'Serving' : 'Servings'} to Today`
              )}
            </button>
            {addedToToday && (
              <p className="text-xs text-thrivv-text-muted text-center mt-2">
                This recipe has been added to your daily log
              </p>
            )}

            {/* Today's Summary */}
            {todayLog && todayLog.meals.length > 0 && (
              <div className="mt-6 p-4 bg-thrivv-bg-card/50 rounded-xl">
                <h4 className="text-sm font-semibold text-thrivv-text-primary mb-3">Today&apos;s Total</h4>
                {(() => {
                  const totals = computeTotals(todayLog);
                  return (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-thrivv-text-muted">Calories:</span>
                        <span className="ml-2 text-thrivv-gold-500 font-semibold">{totals.calories}</span>
                      </div>
                      <div>
                        <span className="text-thrivv-text-muted">Protein:</span>
                        <span className="ml-2 text-thrivv-text-primary font-semibold">{totals.protein_g}g</span>
                      </div>
                      <div>
                        <span className="text-thrivv-text-muted">Carbs:</span>
                        <span className="ml-2 text-thrivv-text-primary font-semibold">{totals.carbs_g}g</span>
                      </div>
                      <div>
                        <span className="text-thrivv-text-muted">Fat:</span>
                        <span className="ml-2 text-thrivv-text-primary font-semibold">{totals.fat_g}g</span>
                      </div>
                    </div>
                  );
                })()}
                <Link
                  href="/member/nutrition"
                  className="block mt-3 text-center text-xs text-thrivv-gold-500 hover:text-thrivv-gold-400 transition-colors"
                >
                  View Full Diet Log →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="success-badge px-6 py-4 flex items-center gap-3 shadow-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Added to today&apos;s meals!</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-thrivv-neon-green/70 hover:text-thrivv-neon-green"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
