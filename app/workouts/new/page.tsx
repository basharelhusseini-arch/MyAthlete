'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Target, TrendingUp, Calendar, Clock } from 'lucide-react';
import { WorkoutPlan } from '@/types';

export default function GenerateWorkoutPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    goal: 'general_fitness' as WorkoutPlan['goal'],
    difficulty: 'beginner' as WorkoutPlan['difficulty'],
    duration: 4,
    frequency: 3,
    equipment: [] as string[],
    limitations: '',
  });

  const goals: { value: WorkoutPlan['goal']; label: string }[] = [
    { value: 'strength', label: 'Strength' },
    { value: 'endurance', label: 'Endurance' },
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'general_fitness', label: 'General Fitness' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'athletic_performance', label: 'Athletic Performance' },
  ];

  const difficulties: { value: WorkoutPlan['difficulty']; label: string }[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const equipmentOptions = [
    'bodyweight',
    'dumbbells',
    'barbell',
    'machine',
    'cable',
    'kettlebell',
    'resistance_bands',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.memberId) {
      alert('Please select a member');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/workout-plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const plan = await response.json();
        router.push(`/workouts/${plan.id}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to generate workout plan');
      }
    } catch (error) {
      console.error('Failed to generate workout plan:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleEquipment = (eq: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(eq)
        ? prev.equipment.filter(e => e !== eq)
        : [...prev.equipment, eq],
    }));
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

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Generate Workout Plan</h1>
            <p className="mt-1 text-gray-600">Create a personalized AI-powered workout plan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Member Selection */}
          <div>
            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-2">
              Member <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="memberId"
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              placeholder="Enter member ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">Enter the member ID to create the workout plan for</p>
          </div>

          {/* Goal */}
          <div>
            <label htmlFor="goal" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-2" />
              Fitness Goal <span className="text-red-500">*</span>
            </label>
            <select
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value as WorkoutPlan['goal'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {goals.map((goal) => (
                <option key={goal.value} value={goal.value}>
                  {goal.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Difficulty Level <span className="text-red-500">*</span>
            </label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as WorkoutPlan['difficulty'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {difficulties.map((diff) => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duration and Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="duration" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Duration (weeks) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="duration"
                min="1"
                max="52"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 4 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="frequency" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                Frequency (per week) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="frequency"
                min="1"
                max="7"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) || 3 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Equipment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Equipment
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {equipmentOptions.map((eq) => (
                <button
                  key={eq}
                  type="button"
                  onClick={() => toggleEquipment(eq)}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.equipment.includes(eq)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {eq.charAt(0).toUpperCase() + eq.slice(1).replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Limitations */}
          <div>
            <label htmlFor="limitations" className="block text-sm font-medium text-gray-700 mb-2">
              Limitations or Special Considerations
            </label>
            <textarea
              id="limitations"
              value={formData.limitations}
              onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
              rows={4}
              placeholder="E.g., knee injury, lower back pain, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t">
            <Link
              href="/workouts"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Workout Plan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
