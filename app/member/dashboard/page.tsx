'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Users, CreditCard, LogOut, User, BookOpen, CheckCircle, Bell, DollarSign, Dumbbell, UtensilsCrossed, Target, Activity, Watch, Trophy } from 'lucide-react';

interface MemberData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipId: string | null;
  status: string;
  completedSessions: number;
}

interface MembershipData {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface ClassData {
  id: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolledMembers: string[];
  checkedInMembers: string[];
  waitlist: string[];
  status: string;
}

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

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

export default function MemberDashboardPage() {
  const router = useRouter();
  const [member, setMember] = useState<MemberData | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [upcomingClasses, setUpcomingClasses] = useState<ClassData[]>([]);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      router.push('/member/login');
      return;
    }

    fetchMemberData(memberId);
  }, [router]);

  const fetchMemberData = async (memberId: string) => {
    try {
      // Fetch member data
      const memberRes = await fetch(`/api/members/${memberId}`);
      const memberData = await memberRes.json();
      setMember(memberData);
      setCompletedSessions(memberData.completedSessions || 0);

      // Fetch session count
      const sessionsRes = await fetch(`/api/member/${memberId}/sessions`);
      const sessionsData = await sessionsRes.json();
      setCompletedSessions(sessionsData.completedSessions || 0);

      // Fetch membership if exists
      if (memberData.membershipId) {
        const membershipRes = await fetch(`/api/memberships/${memberData.membershipId}`);
        const membershipData = await membershipRes.json();
        setMembership(membershipData);
      }

      // Fetch all classes and filter enrolled ones
      const classesRes = await fetch('/api/classes');
      const allClasses = await classesRes.json();
      const enrolled = allClasses.filter((c: ClassData) => 
        c.enrolledMembers.includes(memberId) && 
        c.status === 'scheduled' &&
        new Date(`${c.date}T${c.startTime}`) >= new Date()
      );
      setUpcomingClasses(enrolled);

      // Fetch health score
      const healthScoreRes = await fetch(`/api/health/score?memberId=${memberId}`);
      const healthScoreData = await healthScoreRes.json();
      setHealthScore(healthScoreData);

      // Fetch leaderboard
      const leaderboardRes = await fetch(`/api/health/friends?memberId=${memberId}`);
      const leaderboardData = await leaderboardRes.json();
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Failed to fetch member data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberName');
    router.push('/member/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!member) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="glass-effect border-b border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Thrivv</h1>
              <p className="text-sm text-gray-300">Welcome back, {member.firstName}!</p>
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
                          strokeDashoffset={`${2 * Math.PI * 88 * (1 - healthScore.total / 100)}`}
                          className={`transition-all duration-1000 ${
                            healthScore.total >= 90 ? 'text-green-400' :
                            healthScore.total >= 80 ? 'text-blue-400' :
                            healthScore.total >= 70 ? 'text-yellow-400' :
                            healthScore.total >= 60 ? 'text-orange-400' :
                            'text-red-400'
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Score Number */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className={`text-6xl font-bold ${
                          healthScore.total >= 90 ? 'text-green-400' :
                          healthScore.total >= 80 ? 'text-blue-400' :
                          healthScore.total >= 70 ? 'text-yellow-400' :
                          healthScore.total >= 60 ? 'text-orange-400' :
                          'text-red-400'
                        }`}>
                          {healthScore.total}
                        </div>
                        <div className="text-gray-400 text-sm font-medium">/ 100</div>
                      </div>
                    </div>

                    {/* Score Category */}
                    <div className="text-center mb-6">
                      <p className={`text-xl font-bold mb-1 ${
                        healthScore.total >= 90 ? 'text-green-400' :
                        healthScore.total >= 80 ? 'text-blue-400' :
                        healthScore.total >= 70 ? 'text-yellow-400' :
                        healthScore.total >= 60 ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        {healthScore.total >= 90 ? '🏆 Elite Lifestyle' :
                         healthScore.total >= 80 ? '💪 Very Strong' :
                         healthScore.total >= 70 ? '✅ Healthy' :
                         healthScore.total >= 60 ? '⚠️ Suboptimal' :
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
                        <span className="text-white font-semibold">{healthScore.workoutScore}/30</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <UtensilsCrossed className="w-4 h-4 mr-2 text-green-400" />
                          Diet
                        </span>
                        <span className="text-white font-semibold">{healthScore.dietScore.toFixed(1)}/30</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Activity className="w-4 h-4 mr-2 text-blue-400" />
                          Sleep
                        </span>
                        <span className="text-white font-semibold">{healthScore.sleepScore.toFixed(1)}/25</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-purple-400" />
                          Habits
                        </span>
                        <span className="text-white font-semibold">{healthScore.habitScore.toFixed(1)}/15</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-400">Calculating your score...</p>
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
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Health Score Leaderboard
                </h2>
                <span className="text-sm text-gray-400">Top Athletes</span>
              </div>
              <div className="p-6">
                {leaderboard.length > 0 ? (
                  <div className="space-y-3">
                    {leaderboard.slice(0, 10).map((entry, index) => {
                      const isCurrentUser = entry.id === member?.id;
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
                    <p className="text-gray-400">Loading leaderboard...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Book a Class */}
          <Link
            href="/member/classes"
            className="dark-card group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-blue-500/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Book a Class</h2>
              <p className="text-gray-400 mb-4">
                Browse and enroll in fitness classes. You have {upcomingClasses.length} upcoming {upcomingClasses.length === 1 ? 'class' : 'classes'}.
              </p>
              <div className="flex items-center text-blue-400 font-medium">
                Browse Classes
                <BookOpen className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Diet / Nutrition */}
          <Link
            href="/member/nutrition"
            className="dark-card group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-green-500/20 rounded-xl">
                  <UtensilsCrossed className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Diet & Nutrition</h2>
              <p className="text-gray-400 mb-4">
                Get personalized nutrition plans and meal recommendations tailored to your fitness goals.
              </p>
              <div className="flex items-center text-green-400 font-medium">
                View Nutrition Plans
                <UtensilsCrossed className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Workout */}
          <Link
            href="/member/workouts"
            className="dark-card group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-orange-500/20 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dumbbell className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Workouts</h2>
              <p className="text-gray-400 mb-4">
                Track your workouts, view progress, and access personalized workout plans designed for you.
              </p>
              <div className="flex items-center text-orange-400 font-medium">
                View Workouts
                <Dumbbell className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Habit Tracking */}
          <Link
            href="/member/habits"
            className="dark-card group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-purple-500/20 rounded-xl">
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Target className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Habit Tracking</h2>
              <p className="text-gray-400 mb-4">
                Build and track healthy habits. Monitor your progress and maintain consistency with your goals.
              </p>
              <div className="flex items-center text-purple-400 font-medium">
                Manage Habits
                <Target className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Connect Wearable */}
          <Link
            href="/member/wearables"
            className="dark-card group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-pink-500/20 rounded-xl">
                  <Watch className="w-8 h-8 text-pink-400" />
                </div>
                <div className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Watch className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Connect Wearable</h2>
              <p className="text-gray-400 mb-4">
                Sync your Whoop, Garmin, or Apple Health data for automatic tracking and personalized insights.
              </p>
              <div className="flex items-center text-pink-400 font-medium">
                Connect Device
                <Watch className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Rewards */}
          <Link
            href="/member/rewards"
            className="dark-card group hover:scale-[1.02] transition-all duration-200 cursor-pointer bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-yellow-500/20 rounded-xl">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Rewards</h2>
              <p className="text-gray-400 mb-4">
                Earn points with your health score and unlock exclusive discounts, free classes, and premium perks.
              </p>
              <div className="flex items-center text-yellow-400 font-medium">
                View Rewards
                <Trophy className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Stats and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2">
            <div className="dark-card">
              <div className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">My Upcoming Classes</h2>
                <Link
                  href="/member/classes"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="p-6">
                {upcomingClasses.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No upcoming classes</p>
                    <Link
                      href="/member/classes"
                      className="inline-flex items-center px-4 py-2 btn-primary"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Classes
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingClasses.map((classItem) => {
                      const isCheckedIn = classItem.checkedInMembers?.includes(member?.id || '');
                      const canCheckIn = new Date(`${classItem.date}T${classItem.startTime}`) <= new Date() && 
                                        !isCheckedIn && 
                                        classItem.enrolledMembers.includes(member?.id || '');
                      
                      return (
                        <div
                          key={classItem.id}
                          className="border border-gray-800/50 rounded-lg p-4 hover:bg-gray-800/30 transition-all duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-white mb-1">
                                {classItem.name}
                              </h3>
                              <p className="text-sm text-gray-400 mb-2">
                                {classItem.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(classItem.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {classItem.startTime} - {classItem.endTime}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {classItem.enrolledMembers.length}/{classItem.capacity}
                                </div>
                              </div>
                              {isCheckedIn && (
                                <div className="flex items-center text-green-400 text-sm">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Checked in
                                </div>
                              )}
                              {canCheckIn && (
                                <button
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    try {
                                      const res = await fetch(`/api/classes/${classItem.id}/checkin`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ memberId: member?.id }),
                                      });
                                      if (res.ok) {
                                        const data = await res.json();
                                        setCompletedSessions(data.sessionsCompleted);
                                        fetchMemberData(member?.id || '');
                                        alert('Successfully checked in!');
                                      }
                                    } catch (error) {
                                      alert('Failed to check in');
                                    }
                                  }}
                                  className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  Check In
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Membership Info & Quick Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="dark-card">
              <div className="px-6 py-4 border-b border-gray-800/50">
                <h2 className="text-lg font-semibold text-white">Quick Stats</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Completed Sessions</p>
                      <p className="text-xl font-bold text-white">{completedSessions}</p>
                    </div>
                  </div>
                </div>
                {membership && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-blue-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Membership</p>
                        <p className="text-xl font-bold text-white">{membership.name}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-purple-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <p className="text-xl font-bold text-white capitalize">{member.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Card */}
            {membership && (
              <div className="dark-card">
                <div className="px-6 py-4 border-b border-gray-800/50">
                  <h2 className="text-lg font-semibold text-white">My Membership</h2>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-white">{membership.name}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
                      ${membership.price.toFixed(2)}
                      <span className="text-sm font-normal text-gray-400">/month</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-300">Features:</p>
                    <ul className="space-y-1">
                      {membership.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
