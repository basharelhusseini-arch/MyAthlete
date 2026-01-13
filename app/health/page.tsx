'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, TrendingUp, Users, Zap, Moon, UtensilsCrossed, Target, Award, Link2, ExternalLink } from 'lucide-react';

interface HealthScore {
  total: number;
  workoutScore: number;
  dietScore: number;
  habitScore: number;
  sleepScore: number;
  workoutCount: number;
  workoutIntensity: number;
  dietQuality: number;
  habitCompletion: number;
  sleepQuality: number;
}

interface FriendScore {
  id: string;
  name: string;
  score: number;
  avatar?: string;
}

export default function HealthStatisticsPage() {
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [friends, setFriends] = useState<FriendScore[]>([]);
  const [whoopConnected, setWhoopConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    // If member is logged in, use their ID, otherwise this is a staff view
    if (storedMemberId) {
      setMemberId(storedMemberId);
      fetchHealthData(storedMemberId);
    } else {
      // Staff view - show message or allow member selection
      setLoading(false);
    }
  }, []);

  const fetchHealthData = async (memberId: string) => {
    try {
      // Fetch health score
      const scoreRes = await fetch(`/api/health/score?memberId=${memberId}`);
      if (scoreRes.ok) {
        const scoreData = await scoreRes.json();
        setHealthScore(scoreData);
      }

      // Check Whoop connection
      const whoopRes = await fetch(`/api/whoop/connection?memberId=${memberId}`);
      if (whoopRes.ok) {
        const whoopData = await whoopRes.json();
        setWhoopConnected(!!whoopData);
      }

      // Fetch friends' scores
      const friendsRes = await fetch(`/api/health/friends?memberId=${memberId}`);
      if (friendsRes.ok) {
        const friendsData = await friendsRes.json();
        setFriends(friendsData);
      }
    } catch (error) {
      console.error('Failed to fetch health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectWhoop = async () => {
    try {
      const response = await fetch('/api/whoop/connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      });
      if (response.ok) {
        setWhoopConnected(true);
        if (memberId) {
          fetchHealthData(memberId);
        }
      }
    } catch (error) {
      console.error('Failed to connect Whoop:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    if (score >= 40) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading health statistics...</p>
      </div>
    );
  }

  if (!memberId) {
    return (
      <div className="text-center py-12">
        <Activity className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400 mb-4">Please log in to view health statistics</p>
        <Link
          href="/member/login"
          className="inline-flex items-center px-4 py-2 btn-primary"
        >
          Member Login
        </Link>
      </div>
    );
  }

  if (!healthScore) {
    return (
      <div className="text-center py-12">
        <Activity className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">No health data available</p>
      </div>
    );
  }

  const userRank = friends.findIndex(f => f.id === memberId) + 1;
  const totalUsers = friends.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Health Statistics</h1>
          <p className="mt-2 text-gray-400">Track your overall health and wellness</p>
        </div>
        {!whoopConnected && (
          <button
            onClick={connectWhoop}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Link2 className="w-5 h-5 mr-2" />
            Connect Whoop
          </button>
        )}
      </div>

      {/* Health Score Card */}
      <div className="dark-card">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-400 mb-2">Your Health Score</h2>
              <div className="flex items-baseline space-x-3">
                <span className={`text-6xl font-bold ${getScoreColor(healthScore.total)}`}>
                  {Math.round(healthScore.total)}
                </span>
                <span className="text-2xl text-gray-500">/ 100</span>
              </div>
            </div>
            <div className={`p-6 rounded-full ${getScoreBgColor(healthScore.total)} border-2`}>
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Workouts</span>
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">{Math.round(healthScore.workoutScore)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {healthScore.workoutCount} workouts • {Math.round(healthScore.workoutIntensity)}% intensity
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Diet</span>
                <UtensilsCrossed className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">{Math.round(healthScore.dietScore)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(healthScore.dietQuality)}% quality
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Habits</span>
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">{Math.round(healthScore.habitScore)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(healthScore.habitCompletion)}% completion
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Sleep</span>
                <Moon className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-bold text-white">{Math.round(healthScore.sleepScore)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(healthScore.sleepQuality)}% quality
                {!whoopConnected && ' (Connect Whoop)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Friends Leaderboard */}
        <div className="dark-card">
          <div className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Friends Leaderboard
            </h2>
            <span className="text-sm text-gray-400">Rank #{userRank} of {totalUsers}</span>
          </div>
          <div className="p-6">
            {friends.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No friends yet</p>
                <p className="text-sm text-gray-500">Connect with friends to compare health scores</p>
              </div>
            ) : (
              <div className="space-y-3">
                {friends.slice(0, 10).map((friend, index) => {
                  const isCurrentUser = friend.id === memberId;
                  return (
                    <div
                      key={friend.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        isCurrentUser
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-gray-800/50 hover:bg-gray-800/70'
                      } transition-all`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className={`font-medium ${isCurrentUser ? 'text-blue-400' : 'text-white'}`}>
                            {friend.name}
                            {isCurrentUser && ' (You)'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {Math.round(friend.score)} Health Score
                          </p>
                        </div>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(friend.score)}`}>
                        {Math.round(friend.score)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Health Insights */}
        <div className="dark-card">
          <div className="px-6 py-4 border-b border-gray-800/50">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Health Insights
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {healthScore.workoutScore < 20 && (
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                <p className="text-sm font-medium text-orange-400 mb-1">Workout Activity Low</p>
                <p className="text-xs text-gray-400">
                  Try to complete at least 3 workouts per week to improve your score.
                </p>
                <Link href="/workouts" className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block">
                  View Workouts →
                </Link>
              </div>
            )}

            {healthScore.dietScore < 20 && (
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                <p className="text-sm font-medium text-orange-400 mb-1">Diet Quality Needs Improvement</p>
                <p className="text-xs text-gray-400">
                  Track your meals and follow nutrition plans to boost your diet score.
                </p>
                <Link href="/nutrition" className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block">
                  View Diet Tracker →
                </Link>
              </div>
            )}

            {healthScore.habitScore < 20 && (
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                <p className="text-sm font-medium text-orange-400 mb-1">Habit Consistency Low</p>
                <p className="text-xs text-gray-400">
                  Complete your daily habits consistently to improve your score.
                </p>
                <Link href="/habits" className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block">
                  View Habits →
                </Link>
              </div>
            )}

            {!whoopConnected && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-400 mb-1">Connect Whoop for Sleep Tracking</p>
                <p className="text-xs text-gray-400">
                  Connect your Whoop device to track sleep quality and improve your health score.
                </p>
                <button
                  onClick={connectWhoop}
                  className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
                >
                  Connect Whoop →
                </button>
              </div>
            )}

            {healthScore.total >= 80 && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm font-medium text-green-400 mb-1">Excellent Health Score!</p>
                <p className="text-xs text-gray-400">
                  You&apos;re maintaining great health across all categories. Keep it up!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/workouts"
          className="dark-card p-6 hover:scale-105 transition-transform cursor-pointer"
        >
          <Zap className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="font-semibold text-white mb-1">Workouts</h3>
          <p className="text-sm text-gray-400">Track your exercise</p>
        </Link>

        <Link
          href="/nutrition"
          className="dark-card p-6 hover:scale-105 transition-transform cursor-pointer"
        >
          <UtensilsCrossed className="w-8 h-8 text-green-400 mb-3" />
          <h3 className="font-semibold text-white mb-1">Diet Tracker</h3>
          <p className="text-sm text-gray-400">Monitor nutrition</p>
        </Link>

        <Link
          href="/habits"
          className="dark-card p-6 hover:scale-105 transition-transform cursor-pointer"
        >
          <Target className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="font-semibold text-white mb-1">Habits</h3>
          <p className="text-sm text-gray-400">Build consistency</p>
        </Link>

        <Link
          href="/member/whoop"
          className="dark-card p-6 hover:scale-105 transition-transform cursor-pointer"
        >
          <Moon className="w-8 h-8 text-indigo-400 mb-3" />
          <h3 className="font-semibold text-white mb-1">Whoop</h3>
          <p className="text-sm text-gray-400">Sleep & recovery</p>
        </Link>
      </div>
    </div>
  );
}
