'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Users, CreditCard, LogOut, User, BookOpen, CheckCircle, Bell, DollarSign, Dumbbell, UtensilsCrossed, Target, Activity, Watch, Trophy, AlertCircle } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
}

interface HealthScore {
  id: string;
  user_id: string;
  date: string;
  score: number;
  training_score: number;
  diet_score: number;
  sleep_score: number;
  created_at: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

interface CheckinData {
  id: string;
  user_id: string;
  date: string;
  did_workout: boolean;
  calories: number;
  sleep_hours: number;
  created_at: string;
}

export default function MemberDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [scoreHistory, setScoreHistory] = useState<HealthScore[]>([]);
  const [todayCheckin, setTodayCheckin] = useState<CheckinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Check authentication
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/member/login');
        return;
      }
      const authData = await authRes.json();
      setUser(authData.user);

      // Fetch today's health score
      const scoreRes = await fetch('/api/score/today');
      if (scoreRes.ok) {
        const scoreData = await scoreRes.json();
        setHealthScore(scoreData.healthScore);
      }

      // Fetch score history (last 7 days)
      const historyRes = await fetch('/api/score/history?days=7');
      if (historyRes.ok) {
        const historyData = await historyRes.json();
        setScoreHistory(historyData.history || []);
      }

      // Fetch leaderboard
      const leaderboardRes = await fetch('/api/leaderboard');
      if (leaderboardRes.ok) {
        const leaderboardData = await leaderboardRes.json();
        setLeaderboard(leaderboardData.leaderboard || []);
      }

      // Check if today's check-in exists
      const checkinRes = await fetch('/api/checkin/today');
      if (checkinRes.ok) {
        const checkinData = await checkinRes.json();
        setTodayCheckin(checkinData.checkin);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/member/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/member/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userDisplayName = user.email.split('@')[0];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="glass-effect border-b border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Thrivv</h1>
              <p className="text-sm text-gray-300">Welcome back, {userDisplayName}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800/50 rounded-lg transition-all duration-200 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Check-in Alert */}
        {!todayCheckin && (
          <div className="mb-6 dark-card border-l-4 border-yellow-400 bg-yellow-500/10">
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Complete Today's Check-in</h3>
                  <p className="text-gray-300 text-sm">
                    You haven't logged your workout, calories, and sleep for today. Complete your check-in to update your health score!
                  </p>
                </div>
              </div>
              <Link
                href="/member/checkin"
                className="ml-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors whitespace-nowrap"
              >
                Check In
              </Link>
            </div>
          </div>
        )}

        {/* Health Score & Leaderboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Large Health Score Display */}
          <div className="lg:col-span-1">
            <div className="dark-card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800/50">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Your Health Score
                </h2>
              </div>
              <div className="p-8 flex flex-col items-center justify-center">
                {healthScore ? (
                  <>
                    {/* Circular Score Display */}
                    <div className="relative w-48 h-48 mb-6">
                      {/* Background Circle */}
                      <svg className="transform -rotate-90 w-48 h-48">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-gray-800"
                        />
                        {/* Progress Circle */}
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 88}`}
                          strokeDashoffset={`${2 * Math.PI * 88 * (1 - healthScore.score / 100)}`}
                          className={`transition-all duration-1000 ${
                            healthScore.score >= 90 ? 'text-green-400' :
                            healthScore.score >= 80 ? 'text-blue-400' :
                            healthScore.score >= 70 ? 'text-yellow-400' :
                            healthScore.score >= 60 ? 'text-orange-400' :
                            'text-red-400'
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Score Number */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className={`text-6xl font-bold ${
                          healthScore.score >= 90 ? 'text-green-400' :
                          healthScore.score >= 80 ? 'text-blue-400' :
                          healthScore.score >= 70 ? 'text-yellow-400' :
                          healthScore.score >= 60 ? 'text-orange-400' :
                          'text-red-400'
                        }`}>
                          {healthScore.score}
                        </div>
                        <div className="text-gray-400 text-sm font-medium">/ 100</div>
                      </div>
                    </div>

                    {/* Score Category */}
                    <div className="text-center mb-6">
                      <p className={`text-xl font-bold mb-1 ${
                        healthScore.score >= 90 ? 'text-green-400' :
                        healthScore.score >= 80 ? 'text-blue-400' :
                        healthScore.score >= 70 ? 'text-yellow-400' :
                        healthScore.score >= 60 ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        {healthScore.score >= 90 ? '🏆 Elite Lifestyle' :
                         healthScore.score >= 80 ? '💪 Very Strong' :
                         healthScore.score >= 70 ? '✅ Healthy' :
                         healthScore.score >= 60 ? '⚠️ Suboptimal' :
                         '🚨 Risk Zone'}
                      </p>
                      <p className="text-gray-500 text-sm">Keep up the great work!</p>
                    </div>

                    {/* Score Breakdown */}
                    <div className="w-full space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Dumbbell className="w-4 h-4 mr-2 text-orange-400" />
                          Training
                        </span>
                        <span className="text-white font-semibold">{healthScore.training_score}/30</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <UtensilsCrossed className="w-4 h-4 mr-2 text-green-400" />
                          Diet
                        </span>
                        <span className="text-white font-semibold">{healthScore.diet_score}/40</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Activity className="w-4 h-4 mr-2 text-blue-400" />
                          Sleep
                        </span>
                        <span className="text-white font-semibold">{healthScore.sleep_score}/30</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-400 mb-2">No score yet</p>
                    <Link
                      href="/member/checkin"
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      Complete your first check-in →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="dark-card">
              <div className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Health Score Leaderboard
                </h2>
                <span className="text-sm text-gray-400">Top Athletes</span>
              </div>
              <div className="p-6">
                {leaderboard.length > 0 ? (
                  <div className="space-y-3">
                    {leaderboard.slice(0, 10).map((entry, index) => {
                      const isCurrentUser = entry.id === user?.id;
                      const rank = index + 1;
                      return (
                        <div
                          key={entry.id}
                          className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                            isCurrentUser 
                              ? 'bg-blue-500/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                              : 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-800/50'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            {/* Rank Badge */}
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                              rank === 1 ? 'bg-yellow-500/20 text-yellow-400 text-lg' :
                              rank === 2 ? 'bg-gray-400/20 text-gray-300 text-lg' :
                              rank === 3 ? 'bg-orange-500/20 text-orange-400 text-lg' :
                              'bg-gray-700/50 text-gray-400'
                            }`}>
                              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                            </div>
                            
                            {/* User Name */}
                            <div>
                              <p className={`font-semibold ${isCurrentUser ? 'text-blue-300' : 'text-white'}`}>
                                {entry.name}
                                {isCurrentUser && (
                                  <span className="ml-2 text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                                    You
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                {entry.score >= 90 ? 'Elite Lifestyle' :
                                 entry.score >= 80 ? 'Very Strong' :
                                 entry.score >= 70 ? 'Healthy' :
                                 entry.score >= 60 ? 'Suboptimal' :
                                 'Risk Zone'}
                              </p>
                            </div>
                          </div>

                          {/* Score */}
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              entry.score >= 90 ? 'text-green-400' :
                              entry.score >= 80 ? 'text-blue-400' :
                              entry.score >= 70 ? 'text-yellow-400' :
                              entry.score >= 60 ? 'text-orange-400' :
                              'text-red-400'
                            }`}>
                              {entry.score}
                            </div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm mb-2">No leaderboard data yet</p>
                    <p className="text-gray-500 text-xs">Complete your check-in to appear on the leaderboard!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Daily Check-in */}
          <Link
            href="/member/checkin"
            className="dark-card group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-blue-500/20 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Daily Check-in</h2>
              <p className="text-gray-400 mb-4">
                Log your workout, calories, and sleep to track your health score every day.
              </p>
              <div className="flex items-center text-blue-400 font-medium">
                {todayCheckin ? 'Update Check-in' : 'Complete Check-in'}
                <CheckCircle className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Score History */}
          <div className="dark-card">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-green-500/20 rounded-xl">
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">7-Day Trend</h2>
              <p className="text-gray-400 mb-4">
                {scoreHistory.length > 0 
                  ? `${scoreHistory.length} day${scoreHistory.length !== 1 ? 's' : ''} of data tracked` 
                  : 'Start tracking your daily progress'}
              </p>
              {scoreHistory.length > 0 && (
                <div className="flex items-center space-x-2">
                  {scoreHistory.map((score, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden"
                      title={`${new Date(score.date).toLocaleDateString()}: ${score.score}`}
                    >
                      <div
                        className={`h-full ${
                          score.score >= 90 ? 'bg-green-400' :
                          score.score >= 80 ? 'bg-blue-400' :
                          score.score >= 70 ? 'bg-yellow-400' :
                          score.score >= 60 ? 'bg-orange-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${score.score}%` }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard Rank */}
          <div className="dark-card bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-yellow-500/20 rounded-xl">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Rank</h2>
              {leaderboard.length > 0 ? (
                <>
                  <p className="text-gray-400 mb-4">
                    {leaderboard.findIndex(e => e.id === user?.id) !== -1
                      ? `#${leaderboard.findIndex(e => e.id === user?.id) + 1} of ${leaderboard.length}`
                      : 'Complete check-in to rank'}
                  </p>
                  <div className="flex items-center text-yellow-400 font-medium">
                    View Leaderboard
                    <Trophy className="w-4 h-4 ml-2" />
                  </div>
                </>
              ) : (
                <p className="text-gray-400 mb-4">
                  No rankings yet. Be the first!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Score History Detail */}
        {scoreHistory.length > 0 && (
          <div className="dark-card">
            <div className="px-6 py-4 border-b border-gray-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Recent Health Scores
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {scoreHistory.slice().reverse().map((score) => (
                  <div
                    key={score.id}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-800/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-400 text-sm">
                        {new Date(score.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Dumbbell className="w-3 h-3 mr-1 text-orange-400" />
                          {score.training_score}
                        </span>
                        <span className="flex items-center">
                          <UtensilsCrossed className="w-3 h-3 mr-1 text-green-400" />
                          {score.diet_score}
                        </span>
                        <span className="flex items-center">
                          <Activity className="w-3 h-3 mr-1 text-blue-400" />
                          {score.sleep_score}
                        </span>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${
                      score.score >= 90 ? 'text-green-400' :
                      score.score >= 80 ? 'text-blue-400' :
                      score.score >= 70 ? 'text-yellow-400' :
                      score.score >= 60 ? 'text-orange-400' :
                      'text-red-400'
                    }`}>
                      {score.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
