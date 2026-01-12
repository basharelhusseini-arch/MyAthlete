'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, Target, UtensilsCrossed, Apple, Calendar } from 'lucide-react';

export default function NutritionBuilderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    memberId: '',
    name: '',
    description: '',
    
    // Physical Stats
    gender: 'male' as 'male' | 'female',
    age: 30,
    height: 175, // cm
    weight: 70, // kg
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
    
    // Goals & Preferences
    goal: 'maintenance' as 'weight_loss' | 'muscle_gain' | 'maintenance' | 'performance' | 'general_health',
    duration: 30, // days
    
    // Dietary Preferences
    dietaryRestrictions: [] as string[],
    preferences: [] as string[],
    allergies: [] as string[],
    
    // Meal Preferences
    mealsPerDay: 3,
    preferLowCarb: false,
    preferHighProtein: false,
    preferMediterranean: false,
    preferVegetarian: false,
    preferVegan: false,
    preferPaleo: false,
    preferKeto: false,
    
    // Timing Preferences
    breakfastTime: '08:00',
    lunchTime: '13:00',
    dinnerTime: '19:00',
    preferMealPrep: false,
  });

  const dietaryOptions = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 
    'soy-free', 'egg-free', 'pescatarian', 'halal', 'kosher'
  ];

  const allergyOptions = [
    'peanuts', 'tree nuts', 'shellfish', 'fish', 'eggs', 
    'milk', 'soy', 'wheat', 'sesame'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Compile preferences
      const compiledPreferences: string[] = [];
      if (formData.preferLowCarb) compiledPreferences.push('low-carb');
      if (formData.preferHighProtein) compiledPreferences.push('high-protein');
      if (formData.preferMediterranean) compiledPreferences.push('mediterranean');
      if (formData.preferVegetarian) compiledPreferences.push('vegetarian');
      if (formData.preferVegan) compiledPreferences.push('vegan');
      if (formData.preferPaleo) compiledPreferences.push('paleo');
      if (formData.preferKeto) compiledPreferences.push('keto');
      if (formData.preferMealPrep) compiledPreferences.push('meal-prep');

      // Ensure dietary restrictions are consistent
      const compiledDietaryRestrictions = [...formData.dietaryRestrictions];
      if (formData.preferVegetarian && !compiledDietaryRestrictions.includes('vegetarian')) {
        compiledDietaryRestrictions.push('vegetarian');
      }
      if (formData.preferVegan && !compiledDietaryRestrictions.includes('vegan')) {
        compiledDietaryRestrictions.push('vegan');
      }

      const planData = {
        memberId: formData.memberId || 'demo-member',
        goal: formData.goal,
        gender: formData.gender,
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        activityLevel: formData.activityLevel,
        duration: formData.duration,
        dietaryRestrictions: compiledDietaryRestrictions,
        preferences: compiledPreferences,
        allergies: formData.allergies,
        name: formData.name || `Custom ${formData.goal.replace('_', ' ')} Plan`,
        description: formData.description || `Personalized nutrition plan for ${formData.goal.replace('_', ' ')}`,
      };

      const response = await fetch('/api/nutrition-plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData),
      });

      if (response.ok) {
        const plan = await response.json();
        router.push(`/nutrition/${plan.id}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to generate nutrition plan');
      }
    } catch (error) {
      alert('Failed to generate nutrition plan');
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: Target },
    { number: 2, title: 'Physical Stats', icon: Apple },
    { number: 3, title: 'Goals', icon: Target },
    { number: 4, title: 'Preferences', icon: UtensilsCrossed },
    { number: 5, title: 'Review', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="glass-effect border-b border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/nutrition"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Nutrition
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Nutrition Diet Builder</h1>
                <p className="text-sm text-gray-400">Build your personalized nutrition plan with AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 text-white'
                          : isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'bg-gray-800 border-gray-700 text-gray-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`mt-2 text-xs font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dark-card p-6 space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-gray-800/50 pb-2">Personal Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="My Custom Nutrition Plan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Describe your nutrition plan goals..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Member ID (Optional - for admin use)</label>
                <input
                  type="text"
                  value={formData.memberId}
                  onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Leave empty for demo"
                />
              </div>
            </div>
          )}

          {/* Step 2: Physical Stats */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-gray-800/50 pb-2">Physical Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gender *</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 30 })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm) *</label>
                  <input
                    type="number"
                    required
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 175 })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    required
                    min="30"
                    max="300"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 70 })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Activity Level *</label>
                  <select
                    required
                    value={formData.activityLevel}
                    onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                    <option value="active">Active (hard exercise 6-7 days/week)</option>
                    <option value="very_active">Very Active (very hard exercise, physical job)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-gray-800/50 pb-2">Goals & Duration</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Primary Goal *</label>
                <select
                  required
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="performance">Athletic Performance</option>
                  <option value="general_health">General Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Plan Duration (days) *</label>
                <input
                  type="number"
                  required
                  min="7"
                  max="365"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 30 days for a complete cycle</p>
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white border-b border-gray-800/50 pb-2">Dietary Preferences</h2>
              
              {/* Diet Types */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Diet Type Preferences</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: 'preferHighProtein', label: 'High Protein' },
                    { key: 'preferLowCarb', label: 'Low Carb' },
                    { key: 'preferMediterranean', label: 'Mediterranean' },
                    { key: 'preferVegetarian', label: 'Vegetarian' },
                    { key: 'preferVegan', label: 'Vegan' },
                    { key: 'preferPaleo', label: 'Paleo' },
                    { key: 'preferKeto', label: 'Keto' },
                    { key: 'preferMealPrep', label: 'Meal Prep Friendly' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-300">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleArrayItem(formData.dietaryRestrictions, option, (items) => setFormData({ ...formData, dietaryRestrictions: items }))}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        formData.dietaryRestrictions.includes(option)
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600'
                      }`}
                    >
                      {option.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map(allergy => (
                    <button
                      key={allergy}
                      type="button"
                      onClick={() => toggleArrayItem(formData.allergies, allergy, (items) => setFormData({ ...formData, allergies: items }))}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        formData.allergies.includes(allergy)
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-gray-800/50 pb-2">Review & Generate</h2>
              
              <div className="space-y-4">
                <div className="dark-card p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p><span className="text-gray-300">Plan Name:</span> {formData.name || 'Auto-generated'}</p>
                    <p><span className="text-gray-300">Gender:</span> {formData.gender}</p>
                    <p><span className="text-gray-300">Age:</span> {formData.age} years</p>
                    <p><span className="text-gray-300">Height:</span> {formData.height} cm</p>
                    <p><span className="text-gray-300">Weight:</span> {formData.weight} kg</p>
                  </div>
                </div>

                <div className="dark-card p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Goals & Activity</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p><span className="text-gray-300">Goal:</span> {formData.goal.replace('_', ' ')}</p>
                    <p><span className="text-gray-300">Activity Level:</span> {formData.activityLevel.replace('_', ' ')}</p>
                    <p><span className="text-gray-300">Duration:</span> {formData.duration} days</p>
                  </div>
                </div>

                <div className="dark-card p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Preferences</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    {formData.dietaryRestrictions.length > 0 && (
                      <p><span className="text-gray-300">Restrictions:</span> {formData.dietaryRestrictions.join(', ')}</p>
                    )}
                    {formData.allergies.length > 0 && (
                      <p><span className="text-gray-300">Allergies:</span> {formData.allergies.join(', ')}</p>
                    )}
                    {[
                      formData.preferHighProtein && 'High Protein',
                      formData.preferLowCarb && 'Low Carb',
                      formData.preferMediterranean && 'Mediterranean',
                      formData.preferVegetarian && 'Vegetarian',
                      formData.preferVegan && 'Vegan',
                      formData.preferPaleo && 'Paleo',
                      formData.preferKeto && 'Keto',
                    ].filter(Boolean).length > 0 && (
                      <p><span className="text-gray-300">Preferences:</span> {[
                        formData.preferHighProtein && 'High Protein',
                        formData.preferLowCarb && 'Low Carb',
                        formData.preferMediterranean && 'Mediterranean',
                        formData.preferVegetarian && 'Vegetarian',
                        formData.preferVegan && 'Vegan',
                        formData.preferPaleo && 'Paleo',
                        formData.preferKeto && 'Keto',
                      ].filter(Boolean).join(', ')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 bg-gray-800/50 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                className="px-6 py-2 btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Nutrition Plan
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
