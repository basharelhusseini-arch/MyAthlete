'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Target, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { NutritionPlan } from '@/types';

export default function NutritionPlansPage() {
  const [plans, setPlans] = useState<NutritionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/nutrition-plans');
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      }
    } catch (error) {
      console.error('Failed to fetch nutrition plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading nutrition plans...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Nutrition Plans</h1>
          <p className="mt-2 text-gray-400">Manage and view all nutrition plans</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/nutrition/builder"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            AI Diet Builder
          </Link>
          <Link
            href="/nutrition/new"
            className="flex items-center px-4 py-2 btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Quick Generate
          </Link>
        </div>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No nutrition plans yet</h3>
          <p className="text-gray-600 mb-6">Get started by generating a personalized nutrition plan</p>
          <Link
            href="/nutrition/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Generate Your First Plan
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/nutrition/${plan.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  plan.status === 'active' ? 'bg-green-100 text-green-800' :
                  plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {plan.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plan.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="w-4 h-4 mr-2" />
                  Goal: <span className="font-medium ml-1 capitalize">{plan.goal.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Calories: <span className="font-medium ml-1">{plan.macroTargets.calories}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Duration: <span className="font-medium ml-1">{plan.duration} days</span>
                </div>
              </div>

              <div className="flex items-center text-blue-600 text-sm font-medium mt-4">
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
