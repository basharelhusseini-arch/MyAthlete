'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, X } from 'lucide-react';
import { recipesData, filterRecipes, sortRecipes, searchRecipes, type Recipe } from '@/lib/recipes';

export default function MemberRecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'protein' | 'calories' | 'carbs'>('protein');
  
  // Filter states
  const [filters, setFilters] = useState({
    highProtein: false,
    lowCarb: false,
    lowCalorie: false,
    vegetarian: false,
    mealPrep: false,
  });

  // DEV: Log first 3 recipe URLs to verify uniqueness
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const logged = (window as any).__recipeUrlsLogged;
    if (!logged) {
      console.log('🖼️ First 3 recipe image URLs:');
      recipesData.slice(0, 3).forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.name}: ${r.imageUrl}`);
      });
      (window as any).__recipeUrlsLogged = true;
    }
  }

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const clearAllFilters = () => {
    setFilters({
      highProtein: false,
      lowCarb: false,
      lowCalorie: false,
      vegetarian: false,
      mealPrep: false,
    });
    setSearchQuery('');
  };

  const filteredAndSortedRecipes = useMemo(() => {
    let recipes: Recipe[] = recipesData;

    // Apply search
    if (searchQuery.trim()) {
      recipes = searchRecipes(searchQuery);
    }

    // Apply filters
    const activeFilters = Object.entries(filters).some(([_, value]) => value);
    if (activeFilters) {
      recipes = filterRecipes(filters);
    }

    // Apply sorting
    recipes = sortRecipes(recipes, sortBy);

    return recipes;
  }, [searchQuery, filters, sortBy]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-thrivv-bg-dark">
      {/* Hero Section */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-semibold text-thrivv-text-primary mb-2">
          Recipes
        </h1>
        <p className="text-thrivv-text-secondary">Macro-friendly recipes to fuel your goals</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-thrivv-text-muted" />
            <input
              type="text"
              placeholder="Search recipes by name or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium w-full pl-12 pr-4 py-3"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-ghost px-6 py-3 flex items-center gap-2 relative ${showFilters ? 'bg-thrivv-gold-500/10' : ''}`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-thrivv-gold-500 text-black text-xs font-semibold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="premium-card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-thrivv-text-primary">Filter Recipes</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-thrivv-gold-500 hover:text-thrivv-gold-400 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <button
                onClick={() => toggleFilter('highProtein')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filters.highProtein
                    ? 'bg-thrivv-gold-500 text-black'
                    : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10 border border-thrivv-gold-500/20'
                }`}
              >
                High Protein (≥35g)
              </button>
              <button
                onClick={() => toggleFilter('lowCarb')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filters.lowCarb
                    ? 'bg-thrivv-gold-500 text-black'
                    : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10 border border-thrivv-gold-500/20'
                }`}
              >
                Low Carb (≤25g)
              </button>
              <button
                onClick={() => toggleFilter('lowCalorie')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filters.lowCalorie
                    ? 'bg-thrivv-gold-500 text-black'
                    : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10 border border-thrivv-gold-500/20'
                }`}
              >
                Low Calorie (≤450)
              </button>
              <button
                onClick={() => toggleFilter('vegetarian')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filters.vegetarian
                    ? 'bg-thrivv-gold-500 text-black'
                    : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10 border border-thrivv-gold-500/20'
                }`}
              >
                Vegetarian
              </button>
              <button
                onClick={() => toggleFilter('mealPrep')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filters.mealPrep
                    ? 'bg-thrivv-gold-500 text-black'
                    : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10 border border-thrivv-gold-500/20'
                }`}
              >
                Meal Prep
              </button>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-thrivv-text-secondary">Sort by:</span>
          <button
            onClick={() => setSortBy('protein')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'protein'
                ? 'bg-thrivv-gold-500 text-black'
                : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10'
            }`}
          >
            Highest Protein
          </button>
          <button
            onClick={() => setSortBy('calories')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'calories'
                ? 'bg-thrivv-gold-500 text-black'
                : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10'
            }`}
          >
            Lowest Calories
          </button>
          <button
            onClick={() => setSortBy('carbs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'carbs'
                ? 'bg-thrivv-gold-500 text-black'
                : 'bg-thrivv-bg-card text-thrivv-text-secondary hover:bg-thrivv-gold-500/10'
            }`}
          >
            Lowest Carbs
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-thrivv-text-secondary text-sm">
          Showing <span className="text-thrivv-gold-500 font-semibold">{filteredAndSortedRecipes.length}</span> of {recipesData.length} recipes
        </p>
      </div>

      {/* Recipe Grid */}
      {filteredAndSortedRecipes.length === 0 ? (
        <div className="premium-card p-12 text-center">
          <X className="w-16 h-16 text-thrivv-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-thrivv-text-primary mb-2">No recipes found</h3>
          <p className="text-thrivv-text-secondary mb-6">Try adjusting your filters or search query</p>
          <button
            onClick={clearAllFilters}
            className="btn-primary px-6 py-3"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/member/recipes/${recipe.id}`}
              className="premium-card p-0 overflow-hidden group cursor-pointer"
            >
              {/* Recipe Image */}
              <div className="relative h-48 overflow-hidden bg-thrivv-bg-card">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  key={recipe.id}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Recipe Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-thrivv-text-primary mb-2 line-clamp-1">
                  {recipe.name}
                </h3>
                <p className="text-sm text-thrivv-text-secondary mb-4 line-clamp-2">
                  {recipe.description}
                </p>

                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-thrivv-bg-card/50 rounded-xl">
                  <div className="text-center">
                    <p className="text-xs text-thrivv-text-muted mb-1">Calories</p>
                    <p className="text-sm font-semibold text-thrivv-gold-500">{recipe.calories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-thrivv-text-muted mb-1">Protein</p>
                    <p className="text-sm font-semibold text-thrivv-text-primary">{recipe.protein_g}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-thrivv-text-muted mb-1">Carbs</p>
                    <p className="text-sm font-semibold text-thrivv-text-primary">{recipe.carbs_g}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-thrivv-text-muted mb-1">Fat</p>
                    <p className="text-sm font-semibold text-thrivv-text-primary">{recipe.fat_g}g</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-thrivv-gold-500/10 text-thrivv-gold-500 text-xs rounded-lg border border-thrivv-gold-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {recipe.tags.length > 3 && (
                    <span className="px-2 py-1 text-thrivv-text-muted text-xs">
                      +{recipe.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
