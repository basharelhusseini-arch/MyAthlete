'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Filter, UtensilsCrossed, Clock, Users, Flame } from 'lucide-react';
import { Recipe } from '@/types';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = Array.from(new Set(recipes.flatMap(r => r.tags)));

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || recipe.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Recipe Database</h1>
          <p className="mt-2 text-gray-400">Browse and manage all recipes</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/recipes/builder"
            className="flex items-center px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <UtensilsCrossed className="w-5 h-5 mr-2" />
            Build Your Recipe
          </Link>
          <Link
            href="/recipes/new"
            className="flex items-center px-4 py-2 btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Recipe
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500/50 w-5 h-5" />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="pl-10 pr-8 py-2 bg-black border border-yellow-500/30 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all appearance-none"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="dark-card p-12 text-center">
          <UtensilsCrossed className="w-16 h-16 text-yellow-500/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No recipes found</h3>
          <p className="text-gray-300 mb-6">
            {searchTerm || selectedTag ? 'Try adjusting your search or filters' : 'Get started by adding your first recipe'}
          </p>
          {!searchTerm && !selectedTag && (
            <Link
              href="/recipes/new"
              className="inline-flex items-center px-4 py-2 btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Recipe
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="dark-card overflow-hidden card-hover flex flex-col"
            >
              {/* Recipe Image */}
              {recipe.imageUrl ? (
                <div className="relative w-full h-48 bg-black overflow-hidden">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={85}
                    unoptimized={true}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-900"><svg class="w-12 h-12 text-yellow-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-900 flex items-center justify-center">
                  <UtensilsCrossed className="w-12 h-12 text-yellow-500/30" />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{recipe.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{recipe.description}</p>
                </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {(recipe.prepTime ?? recipe.prepMinutes ?? 0) + (recipe.cookTime ?? recipe.cookMinutes ?? 0)} min
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Flame className="w-4 h-4 mr-2" />
                    {recipe.calories} cal
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium">Per serving:</span>
                  <span>P: {recipe.protein ?? recipe.protein_g}g</span>
                  <span>C: {recipe.carbohydrates ?? recipe.carbs_g}g</span>
                  <span>F: {recipe.fats ?? recipe.fat_g}g</span>
                </div>

                {recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/50">
                    {recipe.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full border border-gray-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className="px-2 py-1 text-gray-500 text-xs">+{recipe.tags.length - 3}</span>
                    )}
                  </div>
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
