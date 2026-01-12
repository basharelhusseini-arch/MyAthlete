'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Target, User, Scale, Activity } from 'lucide-react';
import { NutritionPlan } from '@/types';

export default function GenerateNutritionPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    goal: 'maintenance' as NutritionPlan['goal'],
    gender: 'male' as 'male' | 'female',
    age: 30,
    height: 170, // in cm
    weight: 70, // in kg
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
    duration: 7,
    dietaryRestrictions: [] as string[],
    preferences: [] as string[],
  });

  const goals: { value: NutritionPlan['goal']; label: string }[] = [
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'performance', label: 'Performance' },
    { value: 'general_health', label: 'General Health' },
  ];

  const activityLevels: { value: typeof formData.activityLevel; label: string }[] = [
    { value: 'sedentary', label: 'Sedentary (little to no exercise)' },
    { value: 'light', label: 'Light (exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (exercise 6-7 days/week)' },
    { value: 'very_active', label: 'Very Active (intense exercise daily)' },
  ];

  const dietaryRestrictionOptions = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'nut-free',
    'keto',
    'paleo',
  ];

  const preferenceOptions = [
    'high-protein',
    'low-carb',
    'mediterranean',
    'low-fat',
    'high-fiber',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.memberId) {
      alert('Please enter a member ID');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/nutrition-plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const plan = await response.json();
        router.push(`/nutrition/${plan.id}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to generate nutrition plan');
      }
    } catch (error) {
      console.error('Failed to generate nutrition plan:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRestriction = (restriction: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  };

  const togglePreference = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/nutrition"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Nutrition Plans
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Generate Nutrition Plan</h1>
            <p className="mt-1 text-gray-600">Create a personalized AI-powered nutrition plan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Member ID */}
          <div>
            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-2">
              Member ID <span className="text-red-500">*</span>
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
          </div>

          {/* Goal */}
          <div>
            <label htmlFor="goal" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-2" />
              Goal <span className="text-red-500">*</span>
            </label>
            <select
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value as NutritionPlan['goal'] })}
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

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gender" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                min="1"
                max="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="height" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Scale className="w-4 h-4 mr-2" />
                Height (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="height"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                min="50"
                max="250"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                min="20"
                max="300"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label htmlFor="activityLevel" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Activity className="w-4 h-4 mr-2" />
              Activity Level <span className="text-red-500">*</span>
            </label>
            <select
              id="activityLevel"
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as typeof formData.activityLevel })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Plan Duration (days) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 7 })}
              min="1"
              max="90"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Restrictions
            </label>
            <div className="flex flex-wrap gap-2">
              {dietaryRestrictionOptions.map((restriction) => (
                <button
                  key={restriction}
                  type="button"
                  onClick={() => toggleRestriction(restriction)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    formData.dietaryRestrictions.includes(restriction)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {restriction.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {preferenceOptions.map((preference) => (
                <button
                  key={preference}
                  type="button"
                  onClick={() => togglePreference(preference)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    formData.preferences.includes(preference)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {preference.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Link
              href="/nutrition"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
