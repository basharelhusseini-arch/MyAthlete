'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trophy, Star, Gift, TrendingUp, Zap, Award, DollarSign, Users, Dumbbell, UtensilsCrossed, Lock, CheckCircle } from 'lucide-react';

interface HealthScore {
  total: number;
  workoutScore: number;
  dietScore: number;
  habitScore: number;
  sleepScore: number;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  category: 'classes' | 'trainers' | 'restaurants' | 'brands';
  icon: any;
  discount: string;
  color: string;
  redeemed: boolean;
}

export default function RewardsPage() {
  const router = useRouter();
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    if (!storedMemberId) {
      router.push('/member/login');
      return;
    }
    setMemberId(storedMemberId);
    fetchHealthScore(storedMemberId);
  }, [router]);

  const fetchHealthScore = async (id: string) => {
    try {
      // Fetch actual reward points from API
      const rewardsResponse = await fetch('/api/rewards/points');
      if (rewardsResponse.ok) {
        const rewardsData = await rewardsResponse.json();
        setPoints(rewardsData.points);
      }

      // Fetch health score for display
      const response = await fetch('/api/health/summary');
      if (response.ok) {
        const data = await response.json();
        setHealthScore({
          total: data.score,
          workoutScore: data.components.training,
          dietScore: data.components.diet,
          habitScore: data.components.habits,
          sleepScore: data.components.sleep,
        });
      }
    } catch (error) {
      console.error('Failed to fetch health score:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = (reward: Reward) => {
    if (points >= reward.points && !reward.redeemed) {
      if (confirm(`Redeem ${reward.name} for ${reward.points} points?`)) {
        setPoints(points - reward.points);
        setRedeemedRewards([...redeemedRewards, reward.id]);
        alert(`🎉 Success! ${reward.name} has been added to your account. Check your email for details.`);
      }
    }
  };

  const rewards: Reward[] = [
    // Classes Rewards
    {
      id: 'class_10',
      name: '10% Off Classes',
      description: 'Get 10% discount on all group fitness classes for 1 month',
      points: 250,
      category: 'classes',
      icon: Dumbbell,
      discount: '10% OFF',
      color: 'from-blue-500 to-cyan-500',
      redeemed: redeemedRewards.includes('class_10')
    },
    {
      id: 'class_20',
      name: '20% Off Classes',
      description: 'Get 20% discount on all group fitness classes for 1 month',
      points: 500,
      category: 'classes',
      icon: Dumbbell,
      discount: '20% OFF',
      color: 'from-blue-600 to-cyan-600',
      redeemed: redeemedRewards.includes('class_20')
    },
    {
      id: 'class_free',
      name: '3 Free Classes',
      description: 'Get 3 complimentary group fitness classes of your choice',
      points: 750,
      category: 'classes',
      icon: Gift,
      discount: 'FREE',
      color: 'from-blue-700 to-cyan-700',
      redeemed: redeemedRewards.includes('class_free')
    },

    // Premium Trainers
    {
      id: 'trainer_bronze',
      name: 'Bronze Trainer Access',
      description: 'Unlock 1 session with premium certified trainers',
      points: 400,
      category: 'trainers',
      icon: Award,
      discount: '1 SESSION',
      color: 'from-orange-500 to-amber-500',
      redeemed: redeemedRewards.includes('trainer_bronze')
    },
    {
      id: 'trainer_silver',
      name: 'Silver Trainer Access',
      description: 'Unlock 3 sessions with elite performance coaches',
      points: 800,
      category: 'trainers',
      icon: Award,
      discount: '3 SESSIONS',
      color: 'from-gray-400 to-gray-600',
      redeemed: redeemedRewards.includes('trainer_silver')
    },
    {
      id: 'trainer_gold',
      name: 'Gold Trainer Access',
      description: 'Get unlimited access to all premium trainers for 1 month',
      points: 1500,
      category: 'trainers',
      icon: Trophy,
      discount: 'UNLIMITED',
      color: 'from-yellow-500 to-orange-500',
      redeemed: redeemedRewards.includes('trainer_gold')
    },

    // Restaurants
    {
      id: 'food_15',
      name: 'Healthy Eats - 15% Off',
      description: '15% discount at partner healthy restaurants',
      points: 300,
      category: 'restaurants',
      icon: UtensilsCrossed,
      discount: '15% OFF',
      color: 'from-green-500 to-emerald-500',
      redeemed: redeemedRewards.includes('food_15')
    },
    {
      id: 'food_25',
      name: 'Nutrition Partners - 25% Off',
      description: '25% discount at all nutrition partner locations',
      points: 600,
      category: 'restaurants',
      icon: UtensilsCrossed,
      discount: '25% OFF',
      color: 'from-green-600 to-emerald-600',
      redeemed: redeemedRewards.includes('food_25')
    },
    {
      id: 'food_meal',
      name: 'Free Meal Plan',
      description: 'Get a complimentary custom meal plan from our nutritionist',
      points: 900,
      category: 'restaurants',
      icon: Gift,
      discount: 'FREE',
      color: 'from-green-700 to-emerald-700',
      redeemed: redeemedRewards.includes('food_meal')
    },

    // Fitness Brands
    {
      id: 'brand_10',
      name: 'Fitness Gear - 10% Off',
      description: '10% discount at partner fitness equipment stores',
      points: 200,
      category: 'brands',
      icon: Star,
      discount: '10% OFF',
      color: 'from-purple-500 to-pink-500',
      redeemed: redeemedRewards.includes('brand_10')
    },
    {
      id: 'brand_20',
      name: 'Athletic Wear - 20% Off',
      description: '20% discount on athletic apparel and accessories',
      points: 450,
      category: 'brands',
      icon: Star,
      discount: '20% OFF',
      color: 'from-purple-600 to-pink-600',
      redeemed: redeemedRewards.includes('brand_20')
    },
    {
      id: 'brand_free',
      name: 'Free Fitness Bundle',
      description: 'Free fitness accessories bundle (resistance bands, yoga mat, water bottle)',
      points: 1000,
      category: 'brands',
      icon: Gift,
      discount: 'FREE',
      color: 'from-purple-700 to-pink-700',
      redeemed: redeemedRewards.includes('brand_free')
    },
  ];

  const categories = [
    { id: 'classes', name: 'Classes', icon: Dumbbell, color: 'text-blue-400' },
    { id: 'trainers', name: 'Trainers', icon: Award, color: 'text-orange-400' },
    { id: 'restaurants', name: 'Restaurants', icon: UtensilsCrossed, color: 'text-green-400' },
    { id: 'brands', name: 'Brands', icon: Star, color: 'text-purple-400' },
  ];

  const getPointsToNextTier = () => {
    if (points < 250) return 250 - points;
    if (points < 500) return 500 - points;
    if (points < 1000) return 1000 - points;
    if (points < 1500) return 1500 - points;
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="glass-effect border-b border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/member/dashboard"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Rewards</h1>
                <p className="text-sm text-gray-400">Earn points with your health score and unlock exclusive rewards</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Points */}
          <div className="dark-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-4xl font-bold text-white mb-1">{points}</div>
            <div className="text-sm text-gray-400">Available Points</div>
          </div>

          {/* Health Score */}
          <div className="dark-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-1">{healthScore?.total || 0}</div>
            <div className="text-sm text-gray-400">Today&apos;s Health Score</div>
          </div>

          {/* Next Reward */}
          <div className="dark-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Gift className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-1">{getPointsToNextTier()}</div>
            <div className="text-sm text-gray-400">Points to Next Tier</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="dark-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            How to Earn Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-blue-400 mb-2">Daily</div>
              <div className="text-gray-300 mb-2">Health Score Based</div>
              <div className="text-xs text-gray-500">
                Score 50 → 1 pt<br/>
                Score 110 → 25 pts
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-green-400 mb-2">Threshold</div>
              <div className="text-gray-300 mb-2">Score Below 50</div>
              <div className="text-xs text-gray-500">
                No points earned
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-purple-400 mb-2">Max</div>
              <div className="text-gray-300 mb-2">25 Points/Day</div>
              <div className="text-xs text-gray-500">
                At score 110
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-lg transition-all border border-gray-700/50 whitespace-nowrap flex items-center"
              >
                <Icon className={`w-4 h-4 mr-2 ${cat.color}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            const canAfford = points >= reward.points;
            const isRedeemed = reward.redeemed;

            return (
              <div
                key={reward.id}
                className={`dark-card overflow-hidden ${!canAfford && !isRedeemed ? 'opacity-60' : ''}`}
              >
                {/* Header */}
                <div className={`p-4 bg-gradient-to-r ${reward.color} relative`}>
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                      {reward.discount}
                    </div>
                  </div>
                  <Icon className="w-10 h-10 text-white mb-2" />
                  <h3 className="text-lg font-bold text-white">{reward.name}</h3>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-gray-400 mb-4">{reward.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-bold">{reward.points}</span>
                      <span className="text-xs text-gray-500 ml-1">points</span>
                    </div>
                  </div>

                  {isRedeemed ? (
                    <button
                      disabled
                      className="w-full px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Redeemed
                    </button>
                  ) : canAfford ? (
                    <button
                      onClick={() => handleRedeem(reward)}
                      className={`w-full px-4 py-2 bg-gradient-to-r ${reward.color} text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg`}
                    >
                      Redeem Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full px-4 py-2 bg-gray-800/50 text-gray-500 rounded-lg border border-gray-700/50 flex items-center justify-center cursor-not-allowed"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Need {reward.points - points} more points
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Tip */}
        <div className="dark-card p-6 mt-8 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-white mb-2">💡 Pro Tip</h3>
          <p className="text-gray-400 text-sm">
            Maintain a health score above 80 to earn bonus points! Connect your wearable for automatic tracking and bonus points.
          </p>
        </div>
      </main>
    </div>
  );
}
