'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Users, Flame, ChefHat, UtensilsCrossed, Image as ImageIcon } from 'lucide-react';
import { Recipe } from '@/types';

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = useCallback(async () => {
    if (!params.id || typeof params.id !== 'string') return;
    try {
      const response = await fetch(`/api/recipes/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
      } else {
        console.error('Failed to fetch recipe');
      }
    } catch (error) {
      console.error('Failed to fetch recipe:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="dark-card p-12 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Recipe not found</h3>
        <Link
          href="/recipes"
          className="text-blue-400 hover:text-blue-300"
        >
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/recipes"
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Recipes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Info */}
        <div className="space-y-6">
          {/* Recipe Image */}
          <div className="dark-card overflow-hidden">
            {recipe.imageUrl ? (
              <div className="relative w-full h-80 lg:h-96">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="w-full h-80 lg:h-96 bg-gray-800/50 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">No image available</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="dark-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Nutrition Facts</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">Calories</p>
                  <p className="text-xl font-bold text-white">{recipe.calories}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ChefHat className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Protein</p>
                  <p className="text-xl font-bold text-white">{recipe.protein ?? recipe.protein_g}g</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <UtensilsCrossed className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Carbs</p>
                  <p className="text-xl font-bold text-white">{recipe.carbohydrates ?? recipe.carbs_g}g</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Flame className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Fats</p>
                  <p className="text-xl font-bold text-white">{recipe.fats ?? recipe.fat_g}g</p>
                </div>
              </div>
            </div>
            {recipe.fiber !== undefined && (
              <div className="mt-4 pt-4 border-t border-gray-800/50">
                <p className="text-sm text-gray-400">
                  Fiber: <span className="text-white font-medium">{recipe.fiber}g</span>
                </p>
              </div>
            )}
          </div>

          {/* Recipe Info */}
          <div className="dark-card p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Prep Time</span>
                </div>
                <span className="text-white font-medium">{recipe.prepTime ?? recipe.prepMinutes ?? 0} min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Cook Time</span>
                </div>
                <span className="text-white font-medium">{recipe.cookTime ?? recipe.cookMinutes ?? 0} min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Servings</span>
                </div>
                <span className="text-white font-medium">{recipe.servings}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Total Time</span>
                </div>
                <span className="text-white font-medium">{(recipe.prepTime ?? recipe.prepMinutes ?? 0) + (recipe.cookTime ?? recipe.cookMinutes ?? 0)} min</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div className="dark-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title and Description */}
          <div className="dark-card p-6">
            <h1 className="text-3xl font-bold text-white mb-3">{recipe.name}</h1>
            <p className="text-gray-400 text-lg">{recipe.description}</p>
          </div>

          {/* Ingredients */}
          <div className="dark-card p-6">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <UtensilsCrossed className="w-6 h-6 mr-2" />
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300">
                    <span className="font-medium text-white">{ingredient.amount ?? ingredient.quantity} {ingredient.unit}</span>
                    {' '}
                    <span>{ingredient.name ?? ingredient.item}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="dark-card p-6">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <ChefHat className="w-6 h-6 mr-2" />
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 flex-1 pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
