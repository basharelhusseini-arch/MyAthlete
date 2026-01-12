'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Target, Calendar, Clock, TrendingUp, Dumbbell, Edit, Trash2 } from 'lucide-react';
import { WorkoutPlan, Workout, Exercise } from '@/types';

export default function WorkoutPlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Record<string, Exercise>>({});
  const [loading, setLoading] = useState(true);

  const fetchExercises = useCallback(async () => {
    try {
      const response = await fetch('/api/exercises');
      if (response.ok) {
        const exercisesData: Exercise[] = await response.json();
        const exercisesMap: Record<string, Exercise> = {};
        exercisesData.forEach(ex => {
          exercisesMap[ex.id] = ex;
        });
        setExercises(exercisesMap);
      }
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    }
  }, []);

  const fetchPlanData = useCallback(async () => {
    if (!planId) return;

    try {
      const [planRes, workoutsRes] = await Promise.all([
        fetch(`/api/workout-plans/${planId}`),
        fetch(`/api/workouts?workoutPlanId=${planId}`),
      ]);

      if (planRes.ok) {
        const planData = await planRes.json();
        setPlan(planData);
      }

      if (workoutsRes.ok) {
        const workoutsData = await workoutsRes.json();
        setWorkouts(workoutsData);
      }
    } catch (error) {
      console.error('Failed to fetch plan data:', error);
    }
  }, [planId]);

  useEffect(() => {
    if (planId) {
      setLoading(true);
      Promise.all([fetchPlanData(), fetchExercises()]).finally(() => {
        setLoading(false);
      });
    }
  }, [planId, fetchPlanData, fetchExercises]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this workout plan?')) return;

    try {
      const response = await fetch(`/api/workout-plans/${planId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/workouts');
      } else {
        alert('Failed to delete workout plan');
      }
    } catch (error) {
      console.error('Failed to delete workout plan:', error);
      alert('Failed to delete workout plan');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading workout plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 mb-4">Workout plan not found</p>
        <Link
          href="/workouts"
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const completedWorkouts = workouts.filter(w => w.status === 'completed').length;
  const scheduledWorkouts = workouts.filter(w => w.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/workouts"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Workouts
        </Link>
      </div>

      {/* Plan Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h1>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                Duration: {plan.duration} weeks
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Frequency: {plan.frequency}x/week
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              plan.status === 'active' ? 'bg-green-100 text-green-800' :
              plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {plan.status}
            </span>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete workout plan"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Workouts</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{workouts.length}</p>
            </div>
            <Dumbbell className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{completedWorkouts}</p>
            </div>
            <Target className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{scheduledWorkouts}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Workouts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Workouts</h2>
        </div>
        <div className="p-6">
          {workouts.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No workouts in this plan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(workout.date).toLocaleDateString()}
                        </div>
                        {workout.duration && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {workout.duration} min
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      workout.status === 'completed' ? 'bg-green-100 text-green-800' :
                      workout.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      workout.status === 'skipped' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {workout.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Exercises */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Exercises:</h4>
                    {workout.exercises.map((ex, index) => {
                      const exercise = exercises[ex.exerciseId];
                      return (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 mb-1">
                                {exercise?.name || `Exercise ${index + 1}`}
                              </h5>
                              {exercise && (
                                <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                              )}
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{ex.sets} sets</span>
                                {ex.reps && <span>{ex.reps} reps</span>}
                                {ex.duration && <span>{ex.duration}s hold</span>}
                                {ex.weight && <span>{ex.weight} lbs</span>}
                                <span>Rest: {ex.restSeconds}s</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
