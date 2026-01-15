'use client';

import { ChefHat } from 'lucide-react';

export default function MemberRecipesPage() {
  return (
    <div className="min-h-screen bg-thrivv-bg-dark">
      {/* Hero Section */}
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-semibold text-thrivv-text-primary mb-2">
          Recipes
        </h1>
        <p className="text-thrivv-text-secondary">Discover healthy meal ideas</p>
      </div>

      {/* Placeholder Card */}
      <div className="premium-card p-12 text-center animate-slide-up">
        <div className="icon-badge w-20 h-20 mx-auto mb-6">
          <ChefHat className="w-10 h-10 text-thrivv-gold-500" />
        </div>
        <h2 className="text-2xl font-semibold text-thrivv-text-primary mb-3">
          Recipes Coming Soon
        </h2>
        <p className="text-thrivv-text-secondary max-w-md mx-auto">
          We&apos;re preparing a collection of nutritious and delicious recipes tailored to your fitness goals.
        </p>
      </div>
    </div>
  );
}
