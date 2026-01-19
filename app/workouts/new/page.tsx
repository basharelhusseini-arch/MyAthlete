'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Target, TrendingUp, Calendar, Clock, Loader2, Dumbbell } from 'lucide-react';
import { WorkoutPlan } from '@/types';

export default function GenerateWorkoutPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    memberId: '',
    goal: 'general_fitness' as WorkoutPlan['goal'],
    difficulty: 'beginner' as WorkoutPlan['difficulty'],
    duration: 4,
    frequency: 3,
    equipment: [] as string[],
    limitations: '',
  });

  // Auto-populate memberId from localStorage
  useEffect(() => {
    const id = localStorage.getItem('memberId');
    if (id) {
      setMemberId(id);
      setFormData(prev => ({ ...prev, memberId: id }));
    }
  }, []);

  const goals: { value: WorkoutPlan['goal']; label: string; desc: string }[] = [
    { value: 'strength', label: 'Strength', desc: 'Build maximum strength' },
    { value: 'endurance', label: 'Endurance', desc: 'Improve cardiovascular fitness' },
    { value: 'weight_loss', label: 'Weight Loss', desc: 'Burn fat and calories' },
    { value: 'muscle_gain', label: 'Muscle Gain', desc: 'Build lean muscle mass' },
    { value: 'general_fitness', label: 'General Fitness', desc: 'Overall health and wellness' },
    { value: 'flexibility', label: 'Flexibility', desc: 'Improve mobility and range' },
    { value: 'athletic_performance', label: 'Athletic Performance', desc: 'Sport-specific training' },
  ];

  const difficulties: { value: WorkoutPlan['difficulty']; label: string; desc: string }[] = [
    { value: 'beginner', label: 'Beginner', desc: 'New to training' },
    { value: 'intermediate', label: 'Intermediate', desc: '6+ months experience' },
    { value: 'advanced', label: 'Advanced', desc: '2+ years experience' },
  ];

  const equipmentOptions = [
    { value: 'bodyweight', label: 'Bodyweight', icon: '💪' },
    { value: 'dumbbells', label: 'Dumbbells', icon: '🏋️' },
    { value: 'barbell', label: 'Barbell', icon: '⚡' },
    { value: 'machine', label: 'Machines', icon: '🔧' },
    { value: 'cable', label: 'Cables', icon: '🔗' },
    { value: 'kettlebell', label: 'Kettlebell', icon: '⚖️' },
    { value: 'resistance_bands', label: 'Resistance Bands', icon: '🎯' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.memberId) {
      setError('Please log in to generate a workout plan');
      setTimeout(() => router.push('/member/login'), 2000);
      return;
    }

    console.log('Submitting workout plan request:', formData);
    setLoading(true);
    
    try {
      const response = await fetch('/api/workout-plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const plan = await response.json();
        console.log('Plan generated successfully:', plan);
        // Success! Redirect to view the plan
        router.push(`/workouts/${plan.id}`);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setError(errorData.error || 'Failed to generate workout plan. Please try again.');
      }
    } catch (error) {
      console.error('Failed to generate workout plan:', error);
      setError('Network error. Please check your connection and try again.');
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
    <div className="min-h-screen bg-thrivv-bg-dark">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <Link
          href="/workouts"
          className="inline-flex items-center text-thrivv-text-secondary hover:text-thrivv-gold-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Workouts
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="icon-badge">
            <Sparkles className="w-8 h-8 text-thrivv-gold-500" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-thrivv-text-primary">
              Generate Workout Plan
            </h1>
            <p className="text-thrivv-text-secondary mt-1">
              AI-powered personalized training programs
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="premium-card p-4 bg-red-500/10 border border-red-500/20 animate-fade-in">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <div className="premium-card p-8 animate-slide-up">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Member ID */}
          {memberId && (
            <div>
              <label htmlFor="memberId" className="block text-sm font-medium text-thrivv-text-primary mb-2">
                Member ID
              </label>
              <input
                type="text"
                id="memberId"
                value={formData.memberId}
                className="input-premium bg-thrivv-bg-card/50 cursor-not-allowed"
                readOnly
                disabled
              />
              <p className="text-xs text-thrivv-text-muted mt-1">Auto-detected from your session</p>
            </div>
          )}

          {/* Goal Selection */}
          <div>
            <label htmlFor="goal" className="flex items-center text-sm font-medium text-thrivv-text-primary mb-3">
              <Target className="w-4 h-4 mr-2 text-thrivv-gold-500" />
              Training Goal <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, goal: goal.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.goal === goal.value
                      ? 'border-thrivv-gold-500 bg-thrivv-gold-500/10'
                      : 'border-thrivv-gold-500/20 bg-thrivv-bg-card hover:border-thrivv-gold-500/40'
                  }`}
                >
                  <div className="font-semibold text-thrivv-text-primary">{goal.label}</div>
                  <div className="text-xs text-thrivv-text-muted mt-1">{goal.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label htmlFor="difficulty" className="flex items-center text-sm font-medium text-thrivv-text-primary mb-3">
              <TrendingUp className="w-4 h-4 mr-2 text-thrivv-gold-500" />
              Experience Level <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, difficulty: diff.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.difficulty === diff.value
                      ? 'border-thrivv-gold-500 bg-thrivv-gold-500/10'
                      : 'border-thrivv-gold-500/20 bg-thrivv-bg-card hover:border-thrivv-gold-500/40'
                  }`}
                >
                  <div className="font-semibold text-thrivv-text-primary">{diff.label}</div>
                  <div className="text-xs text-thrivv-text-muted mt-1">{diff.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration and Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="duration" className="flex items-center text-sm font-medium text-thrivv-text-primary mb-2">
                <Calendar className="w-4 h-4 mr-2 text-thrivv-gold-500" />
                Duration (weeks) <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="number"
                id="duration"
                min="1"
                max="52"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 4 })}
                className="input-premium"
                required
              />
              <p className="text-xs text-thrivv-text-muted mt-1">Recommended: 4-12 weeks</p>
            </div>

            <div>
              <label htmlFor="frequency" className="flex items-center text-sm font-medium text-thrivv-text-primary mb-2">
                <Clock className="w-4 h-4 mr-2 text-thrivv-gold-500" />
                Workouts per Week <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="number"
                id="frequency"
                min="1"
                max="7"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) || 3 })}
                className="input-premium"
                required
              />
              <p className="text-xs text-thrivv-text-muted mt-1">Most programs: 3-5 days/week</p>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <label className="flex items-center text-sm font-medium text-thrivv-text-primary mb-3">
              <Dumbbell className="w-4 h-4 mr-2 text-thrivv-gold-500" />
              Available Equipment
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {equipmentOptions.map((eq) => (
                <button
                  key={eq.value}
                  type="button"
                  onClick={() => toggleEquipment(eq.value)}
                  className={`p-3 rounded-xl border-2 transition-all text-center ${
                    formData.equipment.includes(eq.value)
                      ? 'border-thrivv-gold-500 bg-thrivv-gold-500/10'
                      : 'border-thrivv-gold-500/20 bg-thrivv-bg-card hover:border-thrivv-gold-500/40'
                  }`}
                >
                  <div className="text-2xl mb-1">{eq.icon}</div>
                  <div className={`text-sm font-medium ${
                    formData.equipment.includes(eq.value) 
                      ? 'text-thrivv-gold-500' 
                      : 'text-thrivv-text-secondary'
                  }`}>
                    {eq.label}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-thrivv-text-muted mt-2">Select all equipment you have access to</p>
          </div>

          {/* Limitations */}
          <div>
            <label htmlFor="limitations" className="block text-sm font-medium text-thrivv-text-primary mb-2">
              Injuries or Limitations
            </label>
            <textarea
              id="limitations"
              value={formData.limitations}
              onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
              rows={4}
              placeholder="E.g., knee injury, lower back pain, shoulder mobility issues..."
              className="input-premium resize-none"
            />
            <p className="text-xs text-thrivv-text-muted mt-1">
              Help us customize exercises to work around any physical limitations
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-thrivv-gold-500/10">
            <Link
              href="/workouts"
              className="btn-ghost px-6 py-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-3 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
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
