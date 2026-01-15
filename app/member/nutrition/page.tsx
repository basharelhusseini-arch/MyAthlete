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
      <div className="min-h-screen flex items-center justify-center bg-thrivv-bg-dark">
        <p className="text-thrivv-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-thrivv-bg-dark">
      {/* Hero Section */}
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-semibold text-thrivv-text-primary mb-2">
          My Nutrition
        </h1>
        <p className="text-thrivv-text-secondary">Personalized meal plans tailored to your goals</p>
      </div>

      <main className="space-y-8">
        <div className="flex items-center justify-end mb-8">
          <Link
            href="/nutrition/new"
            className="flex items-center btn-primary px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Generate New Plan
          </Link>
        </div>

        {plans.length === 0 ? (
          <div className="premium-card p-12 text-center">
            <div className="icon-badge w-20 h-20 mx-auto mb-6">
              <UtensilsCrossed className="w-10 h-10 text-thrivv-gold-500" />
            </div>
            <h3 className="text-2xl font-semibold text-thrivv-text-primary mb-2">No nutrition plans yet</h3>
            <p className="text-thrivv-text-secondary mb-8">Generate a personalized AI-powered meal plan</p>
            <Link
              href="/nutrition/new"
              className="inline-flex items-center btn-primary px-6 py-3"
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
                className="premium-card p-6 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-thrivv-text-primary">{plan.name}</h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-lg ${
                    plan.status === 'active' ? 'success-badge' :
                    plan.status === 'completed' ? 'bg-thrivv-gold-500/10 text-thrivv-gold-500 border border-thrivv-gold-500/20' :
                    'bg-thrivv-bg-card text-thrivv-text-muted border border-thrivv-gold-500/10'
                  }`}>
                    {plan.status}
                  </span>
                </div>
                <p className="text-thrivv-text-secondary text-sm mb-6 line-clamp-2">{plan.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-thrivv-text-secondary">
                    <Target className="w-4 h-4 mr-2 text-thrivv-gold-500" />
                    <span className="capitalize">{plan.goal.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center text-sm text-thrivv-text-secondary">
                    <TrendingUp className="w-4 h-4 mr-2 text-thrivv-gold-500" />
                    {plan.macroTargets.calories} calories/day
                  </div>
                  <div className="flex items-center text-sm text-thrivv-text-secondary">
                    <Calendar className="w-4 h-4 mr-2 text-thrivv-gold-500" />
                    {plan.duration} days
                  </div>
                </div>

                <div className="flex items-center text-thrivv-gold-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
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
