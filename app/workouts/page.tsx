'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Dumbbell, Calendar, Target, TrendingUp } from 'lucide-react';
import { WorkoutPlan } from '@/types';

export default function WorkoutsPage() {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    try {
      const response = await fetch('/api/workout-plans');
      const data = await response.json();
      setWorkoutPlans(data);
    } catch (error) {
      console.error('Failed to fetch workout plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading workouts...</p>
      </div>
    );
  }

  const activePlans = workoutPlans.filter(p => p.status === 'active');
  const completedPlans = workoutPlans.filter(p => p.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Workout Plans</h1>
          <p className="mt-2 text-gray-400">Manage AI-generated and custom workout plans</p>
        </div>
        <Link
          href="/workouts/new"
          className="flex items-center px-4 py-2 btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Generate Workout Plan
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="dark-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Plans</p>
              <p className="mt-2 text-3xl font-bold text-white">{workoutPlans.length}</p>
            </div>
            <Dumbbell className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="dark-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Plans</p>
              <p className="mt-2 text-3xl font-bold text-white">{activePlans.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="dark-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="mt-2 text-3xl font-bold text-white">{completedPlans.length}</p>
            </div>
            <Target className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="dark-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">AI Generated</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {workoutPlans.filter(p => p.createdBy === 'ai').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Workout Plans List */}
      <div className="glass-effect">
        <div className="px-6 py-4 border-b border-yellow-500/20">
          <h2 className="text-lg font-semibold text-white">All Workout Plans</h2>
        </div>
        <div className="p-6">
          {workoutPlans.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-white text-lg mb-2">No workout plans yet</p>
              <p className="text-gray-400 text-sm mb-4">Generate your first AI-powered workout plan</p>
              <Link
                href="/workouts/new"
                className="inline-flex items-center px-4 py-2 btn-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Generate Workout Plan
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workoutPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="dark-card card-hover p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                      <p className="text-sm text-gray-400">{plan.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      plan.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      plan.status === 'completed' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                      'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-yellow-400" />
                      Goal: <span className="font-medium ml-1 capitalize text-white">{plan.goal}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-yellow-400" />
                      Difficulty: <span className="font-medium ml-1 capitalize text-white">{plan.difficulty}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      <span className="text-white">{plan.duration} weeks • {plan.frequency}x/week</span>
                    </div>
                  </div>
                  <Link
                    href={`/workouts/${plan.id}`}
                    className="block text-center px-4 py-2 btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
