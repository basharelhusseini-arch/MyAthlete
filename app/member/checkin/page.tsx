'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Dumbbell, UtensilsCrossed, Moon, CheckCircle, Loader2 } from 'lucide-react';

interface CheckinForm {
  didWorkout: boolean;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  sleepHours: string;
}

export default function CheckinPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [currentScore, setCurrentScore] = useState<any>(null);

  const [formData, setFormData] = useState<CheckinForm>({
    didWorkout: false,
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    sleepHours: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          router.push('/member/login');
          return false;
        }
        return true;
      } catch (error) {
        router.push('/member/login');
        return false;
      }
    };

    const fetchTodayCheckin = async () => {
      try {
        const response = await fetch('/api/checkin/today');
        if (response.ok) {
          const data = await response.json();
          if (data.checkin) {
            setHasCheckedIn(true);
            setFormData({
              didWorkout: data.checkin.did_workout,
              calories: data.checkin.calories?.toString() || '',
              protein: data.checkin.protein_g?.toString() || '',
              carbs: data.checkin.carbs_g?.toString() || '',
              fat: data.checkin.fat_g?.toString() || '',
              sleepHours: data.checkin.sleep_hours?.toString() || '',
            });
          }
        }

        // Also fetch current score
        const scoreResponse = await fetch('/api/score/today');
        if (scoreResponse.ok) {
          const scoreData = await scoreResponse.json();
          setCurrentScore(scoreData.score);
        }
      } catch (error) {
        console.error('Failed to fetch check-in:', error);
      } finally {
        setLoading(false);
      }
    };

    const initializePage = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        await fetchTodayCheckin();
      }
    };

    initializePage();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/checkin/today', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          didWorkout: formData.didWorkout,
          calories: formData.calories ? parseInt(formData.calories, 10) : 0,
          protein: formData.protein ? parseFloat(formData.protein) : 0,
          carbs: formData.carbs ? parseFloat(formData.carbs) : 0,
          fat: formData.fat ? parseFloat(formData.fat) : 0,
          sleepHours: formData.sleepHours ? parseFloat(formData.sleepHours) : 0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setCurrentScore(data.score);
        setHasCheckedIn(true);
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/member/dashboard');
        }, 2000);
      } else {
        // Handle specific error cases
        if (response.status === 401) {
          setError('Session expired. Please sign in again.');
          setTimeout(() => router.push('/member/login'), 2000);
        } else {
          const errorMsg = data.error || `Failed to save check-in (HTTP ${response.status})`;
          const codeMsg = data.code ? ` [Code: ${data.code}]` : '';
          setError(`${errorMsg}${codeMsg}`);
        }
        // Log full error for debugging
        console.error('Check-in failed:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          code: data.code,
          details: data.details,
          supabaseError: data.supabaseError
        });
      }
    } catch (error) {
      console.error('Check-in exception:', error);
      setError(`Network error: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient">Daily Check-In</h1>
        <p className="mt-2 text-gray-400">
          {hasCheckedIn ? 'Update your daily progress' : 'Complete your check-in to update your health score'}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="glass-effect p-6 rounded-xl border-2 border-green-500/50 bg-green-500/10">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-lg font-semibold text-white">Check-in Complete!</p>
              <p className="text-gray-400">Your health score has been updated. Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Score */}
      {currentScore && (
        <div className="dark-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Today&apos;s Health Score</h3>
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-5xl font-bold text-gradient">
                {currentScore.score}
              </div>
              <div className="text-sm text-gray-400">
                <div>Training: {currentScore.training_score}/30</div>
                <div>Diet: {currentScore.diet_score}/40</div>
                <div>Sleep: {currentScore.sleep_score}/30</div>
              </div>
            </div>
            <Activity className="w-12 h-12 text-yellow-400" />
          </div>
        </div>
      )}

      {/* Check-in Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="dark-card p-6 space-y-6">
          {/* Workout */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                formData.didWorkout 
                  ? 'bg-yellow-500 border-yellow-500' 
                  : 'border-gray-600 group-hover:border-yellow-400'
              }`}>
                {formData.didWorkout && <CheckCircle className="w-4 h-4 text-black" />}
              </div>
              <input
                type="checkbox"
                checked={formData.didWorkout}
                onChange={(e) => setFormData({ ...formData, didWorkout: e.target.checked })}
                className="sr-only"
              />
              <Dumbbell className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">I worked out today</span>
            </label>
            <p className="text-sm text-gray-400 mt-2 ml-9">
              Any physical activity counts! (30 points)
            </p>
          </div>

          {/* Nutrition Tracking */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <UtensilsCrossed className="w-5 h-5 text-green-400" />
              <span>Nutrition Tracking (optional - helps maximize diet score)</span>
            </h3>
            
            {/* Calories */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Calories
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                placeholder="e.g., 2200"
                min="0"
                max="10000"
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              />
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Protein */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={formData.protein}
                  onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                  placeholder="150"
                  min="0"
                  max="500"
                  step="0.1"
                  className="w-full px-3 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm"
                />
              </div>

              {/* Carbs */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={formData.carbs}
                  onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                  placeholder="200"
                  min="0"
                  max="1000"
                  step="0.1"
                  className="w-full px-3 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm"
                />
              </div>

              {/* Fat */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Fat (g)
                </label>
                <input
                  type="number"
                  value={formData.fat}
                  onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                  placeholder="70"
                  min="0"
                  max="500"
                  step="0.1"
                  className="w-full px-3 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400">
              <span className="font-medium">Tip:</span> Track macros for up to 15 bonus points! Perfect: 2200±300 cal, ~150g protein, ~200g carbs, ~70g fat
            </p>
          </div>

          {/* Sleep */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-blue-400" />
                <span>Hours of Sleep (optional)</span>
              </div>
            </label>
            <input
              type="number"
              value={formData.sleepHours}
              onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
              placeholder="e.g., 7.5"
              min="0"
              max="24"
              step="0.5"
              className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
            />
            <p className="text-sm text-gray-400 mt-2">
              Optimal: 7-9 hours for full 30 points
            </p>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || success}
          className="w-full btn-primary py-4 px-6 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : success ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Saved!</span>
            </>
          ) : (
            <span>{hasCheckedIn ? 'Update Check-In' : 'Complete Check-In'}</span>
          )}
        </button>
      </form>
    </div>
  );
}
