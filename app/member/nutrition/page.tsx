'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Calendar, Target, TrendingUp, UtensilsCrossed } from 'lucide-react';
import { NutritionPlan } from '@/types';

export default function MemberNutritionPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<NutritionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    if (!storedMemberId) {
      router.push('/member/login');
      return;
    }
    setMemberId(storedMemberId);
    fetchPlans(storedMemberId);
  }, [router]);

  const fetchPlans = async (id: string) => {
    try {
      const response = await fetch(`/api/nutrition-plans?memberId=${id}`);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading nutrition plans...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="glass-effect border-b border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/member/dashboard"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">My Nutrition Plans</h1>
                <p className="text-sm text-gray-400">View and manage your nutrition plans</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Your Nutrition Plans</h2>
            <p className="text-gray-400 mt-1">Personalized meal plans tailored to your goals</p>
          </div>
          <Link
            href="/nutrition/new"
            className="flex items-center px-4 py-2 btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Generate New Plan
          </Link>
        </div>

        {plans.length === 0 ? (
          <div className="glass-effect p-12 text-center">
            <UtensilsCrossed className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
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
                    plan.status === 'completed' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }`}>
                    {plan.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{plan.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Target className="w-4 h-4 mr-2 text-yellow-400" />
                    Goal: <span className="font-medium ml-1 capitalize text-white">{plan.goal.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-2 text-yellow-400" />
                    Calories: <span className="font-medium ml-1 text-white">{plan.macroTargets.calories}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                    Duration: <span className="font-medium ml-1 text-white">{plan.duration} days</span>
                  </div>
                </div>

                <div className="flex items-center text-gradient text-sm font-medium mt-4">
                  View Details →
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
