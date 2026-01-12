'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Target, TrendingUp, LogOut, Dumbbell, Plus, Sparkles } from 'lucide-react';
import { WorkoutPlan } from '@/types';

export default function MemberWorkoutsPage() {
  const router = useRouter();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('memberId');
    if (!id) {
      router.push('/member/login');
      return;
    }
    setMemberId(id);
    fetchWorkoutPlans(id);
  }, [router]);

  const fetchWorkoutPlans = async (memberId: string) => {
    try {
      const response = await fetch(`/api/workout-plans?memberId=${memberId}`);
      if (response.ok) {
        const data = await response.json();
        setWorkoutPlans(data);
      }
    } catch (error) {
      console.error('Failed to fetch workout plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberName');
    router.push('/member/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const activePlans = workoutPlans.filter(p => p.status === 'active');
  const completedPlans = workoutPlans.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/member/dashboard" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                MyAthlete
              </Link>
              <p className="text-sm text-gray-600">My Workout Plans</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/member/dashboard"
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Workout Plans</h1>
            <p className="mt-2 text-gray-600">View and manage your personalized workout plans</p>
          </div>
          <Link
            href="/workouts/new"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate New Plan
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Plans</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{workoutPlans.length}</p>
              </div>
              <Dumbbell className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Plans</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{activePlans.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{completedPlans.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Workout Plans List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Workout Plans</h2>
          </div>
          <div className="p-6">
            {workoutPlans.length === 0 ? (
              <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No workout plans yet</p>
                <p className="text-gray-400 text-sm mb-4">Generate your first AI-powered workout plan</p>
                <Link
                  href="/workouts/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Workout Plan
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workoutPlans.map((plan) => (
                  <Link
                    key={plan.id}
                    href={`/workouts/${plan.id}`}
                    className="block border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        plan.status === 'active' ? 'bg-green-100 text-green-800' :
                        plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {plan.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Goal: <span className="font-medium ml-1 capitalize">{plan.goal.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Difficulty: <span className="font-medium ml-1 capitalize">{plan.difficulty}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {plan.duration} weeks • {plan.frequency}x/week
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
