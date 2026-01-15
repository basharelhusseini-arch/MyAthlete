'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Target, Calendar, Clock, TrendingUp, Dumbbell, Edit, Trash2, ChevronDown, ChevronUp, Info, CheckCircle2, Wind, Timer, Zap } from 'lucide-react';
import { WorkoutPlan, Workout, Exercise } from '@/types';

export default function WorkoutPlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Record<string, Exercise>>({});
  const [loading, setLoading] = useState(true);
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set());

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

  const toggleExercise = (exerciseKey: string) => {
    setExpandedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseKey)) {
        newSet.delete(exerciseKey);
      } else {
        newSet.add(exerciseKey);
      }
      return newSet;
    });
  };

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
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Exercises:</h4>
                    {workout.exercises.map((ex, index) => {
                      const exercise = exercises[ex.exerciseId];
                      const exerciseKey = `${workout.id}-${index}`;
                      const isExpanded = expandedExercises.has(exerciseKey);
                      
                      if (!exercise) {
                        return (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Exercise data not found</p>
                          </div>
                        );
                      }
                      
                      return (
                        <div
                          key={index}
                          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                        >
                          {/* Exercise Header - Always Visible */}
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                                    {index + 1}
                                  </div>
                                  <h5 className="font-semibold text-gray-900 text-lg">{exercise.name}</h5>
                                </div>
                                <p className="text-sm text-gray-600 ml-11">{exercise.description}</p>
                              </div>
                              <button
                                onClick={() => toggleExercise(exerciseKey)}
                                className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title={isExpanded ? "Hide details" : "Show details"}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-gray-600" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-600" />
                                )}
                              </button>
                            </div>

                            {/* Exercise Prescription */}
                            <div className="ml-11 flex flex-wrap gap-3 text-sm">
                              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                                <Dumbbell className="w-4 h-4" />
                                <span className="font-medium">{ex.sets} sets</span>
                              </div>
                              {ex.reps && (
                                <div className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 font-medium">
                                  {ex.reps} reps
                                </div>
                              )}
                              {ex.duration && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-200">
                                  <Timer className="w-4 h-4" />
                                  <span className="font-medium">{ex.duration}s hold</span>
                                </div>
                              )}
                              {ex.weight && (
                                <div className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg border border-orange-200 font-medium">
                                  {ex.weight} lbs
                                </div>
                              )}
                              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-200">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">Rest: {ex.restSeconds}s</span>
                              </div>
                              <div className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 font-medium capitalize">
                                {exercise.difficulty}
                              </div>
                              <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium capitalize">
                                {exercise.equipment.replace('_', ' ')}
                              </div>
                            </div>

                            {/* Expandable Details */}
                            {isExpanded && (
                              <div className="mt-6 space-y-6 animate-fade-in-up">
                                {/* Instructions */}
                                <div>
                                  <h6 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                    How to Perform
                                  </h6>
                                  <ol className="space-y-2 ml-7">
                                    {exercise.instructions.map((instruction, i) => (
                                      <li key={i} className="text-sm text-gray-700 leading-relaxed">
                                        <span className="font-semibold text-blue-600 mr-2">{i + 1}.</span>
                                        {instruction}
                                      </li>
                                    ))}
                                  </ol>
                                </div>

                                {/* Coaching Tips */}
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                                  <h6 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-600" />
                                    Coaching Tips
                                  </h6>
                                  <ul className="space-y-2">
                                    {exercise.tips.map((tip, i) => (
                                      <li key={i} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                                        <span className="text-yellow-500 mt-0.5">▪</span>
                                        <span>{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Additional Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Breathing */}
                                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Wind className="w-5 h-5 text-blue-600" />
                                      <h6 className="font-semibold text-gray-900">Breathing</h6>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{exercise.breathing}</p>
                                  </div>

                                  {/* Tempo */}
                                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Timer className="w-5 h-5 text-purple-600" />
                                      <h6 className="font-semibold text-gray-900">Tempo</h6>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{exercise.tempo}</p>
                                  </div>

                                  {/* Rest Recommendation */}
                                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Clock className="w-5 h-5 text-green-600" />
                                      <h6 className="font-semibold text-gray-900">Rest Time</h6>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{exercise.rest}</p>
                                  </div>
                                </div>

                                {/* Muscle Groups */}
                                <div>
                                  <h6 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-red-500" />
                                    Target Muscles
                                  </h6>
                                  <div className="flex flex-wrap gap-2 ml-7">
                                    {exercise.muscleGroups.map((muscle, i) => (
                                      <span
                                        key={i}
                                        className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 capitalize font-medium"
                                      >
                                        {muscle}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Recommended Sets/Reps by Level */}
                                <div>
                                  <h6 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                                    Programming Recommendations
                                  </h6>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-7">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                      <p className="text-xs font-semibold text-green-700 uppercase mb-1">Beginner</p>
                                      <p className="text-sm font-medium text-gray-900">
                                        {exercise.recommendedSets.beginner.sets} sets × {exercise.recommendedSets.beginner.reps || exercise.recommendedSets.beginner.duration}
                                      </p>
                                    </div>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                      <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">Intermediate</p>
                                      <p className="text-sm font-medium text-gray-900">
                                        {exercise.recommendedSets.intermediate.sets} sets × {exercise.recommendedSets.intermediate.reps || exercise.recommendedSets.intermediate.duration}
                                      </p>
                                    </div>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                      <p className="text-xs font-semibold text-red-700 uppercase mb-1">Advanced</p>
                                      <p className="text-sm font-medium text-gray-900">
                                        {exercise.recommendedSets.advanced.sets} sets × {exercise.recommendedSets.advanced.reps || exercise.recommendedSets.advanced.duration}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Show Details Button (when collapsed) */}
                            {!isExpanded && (
                              <button
                                onClick={() => toggleExercise(exerciseKey)}
                                className="mt-4 ml-11 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                              >
                                <Info className="w-4 h-4" />
                                Show exercise details
                              </button>
                            )}
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
