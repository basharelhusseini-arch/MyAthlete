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
          <h1 className="text-3xl font-bold text-gradient">Diet Tracker</h1>
          <p className="mt-2 text-gray-400">Track your nutrition and generate AI-powered meal plans</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/nutrition/builder"
            className="flex items-center px-4 py-2 bg-thrivv-gold-500 text-black font-semibold rounded-lg hover:from-thrivv-gold-500 hover:to-thrivv-gold-500 transition-all duration-200 shadow-lg shadow-thrivv-gold-500/20"
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
        <div className="glass-effect rounded-lg shadow-lg shadow-thrivv-gold-500/10 p-12 text-center">
          <Target className="w-16 h-16 text-thrivv-gold-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No nutrition plans yet</h3>
          <p className="text-gray-400 mb-6">Get started by generating a personalized nutrition plan</p>
          <Link
            href="/nutrition/new"
            className="inline-flex items-center px-4 py-2 btn-primary"
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
              className="dark-card card-hover p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  plan.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  plan.status === 'completed' ? 'bg-thrivv-gold-500/20 text-yellow-300 border border-thrivv-gold-500/30' :
                  'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                }`}>
                  {plan.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{plan.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Target className="w-4 h-4 mr-2 text-thrivv-gold-400" />
                  Goal: <span className="font-medium ml-1 capitalize text-white">{plan.goal.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4 mr-2 text-thrivv-gold-400" />
                  Calories: <span className="font-medium ml-1 text-white">{plan.macroTargets.calories}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-2 text-thrivv-gold-400" />
                  Duration: <span className="font-medium ml-1 text-white">{plan.duration} days</span>
                </div>
              </div>

              <div className="flex items-center text-gradient text-sm font-medium mt-4">
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
