'use client';

import { 
  Dumbbell, 
  Utensils, 
  Calendar, 
  Trophy, 
  Activity, 
  Sparkles, 
  ArrowRight,
  Zap,
  Target,
  Users,
  Heart,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import BackgroundWordmark from '@/components/BackgroundWordmark';
import Logo from '@/components/Logo';

export default function LandingPage() {
  const features = [
    {
      icon: Dumbbell,
      title: 'AI-Powered Workouts',
      description: 'Generate personalized workout plans tailored to your goals, experience level, and available equipment.',
      color: 'bg-thrivv-gold-500',
      delay: 'delay-100',
    },
    {
      icon: Utensils,
      title: 'Smart Nutrition Plans',
      description: 'AI-driven meal plans optimized for your macros, dietary preferences, and fitness objectives.',
      color: 'bg-thrivv-gold-500',
      delay: 'delay-200',
    },
    {
      icon: Activity,
      title: 'Health Score Tracking',
      description: 'Comprehensive health & lifestyle score analyzing diet, training, sleep, and habits out of 100.',
      color: 'bg-thrivv-gold-500',
      delay: 'delay-300',
    },
    {
      icon: Calendar,
      title: 'Live Classes',
      description: 'Book and attend fitness classes led by expert trainers. Track attendance and progress.',
      color: 'bg-thrivv-gold-500',
      delay: 'delay-[400ms]',
    },
    {
      icon: Trophy,
      title: 'Rewards System',
      description: 'Unlock points based on your health score for discounts on classes, trainers, and partner brands.',
      color: 'bg-thrivv-gold-500',
      delay: 'delay-[500ms]',
    },
    {
      icon: Heart,
      title: 'Wearable Integration',
      description: 'Connect Whoop, Garmin, or Apple Health to sync your biometric data automatically.',
      color: 'bg-thrivv-gold-500',
      delay: 'delay-[600ms]',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Members', icon: Users },
    { value: '95%', label: 'Goal Achievement', icon: Target },
    { value: '24/7', label: 'AI Support', icon: Zap },
    { value: '4.9★', label: 'User Rating', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Layer A: Base background glow (z-index: 0) - THRIVV gold only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-thrivv-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-thrivv-gold-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 glass-effect border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo variant="gold" size="md" linkTo="/" />
            <div className="flex items-center space-x-4">
              <Link
                href="/member/login"
                className="px-6 py-2.5 text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/member/signup"
                className="px-6 py-2.5 btn-primary group"
              >
                Sign Up Free
                <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Isolated Stacking Context */}
      <section className="relative z-20 pt-20 pb-32 px-4 sm:px-6 lg:px-8" style={{ isolation: 'isolate' }}>
        {/* SVG Background Wordmark - z-10, above overlays, below content */}
        <BackgroundWordmark />

        <div className="max-w-7xl mx-auto text-center relative z-20">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <Logo variant="gold" size="hero" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="text-white">Welcome to Your Transformation</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              The all-in-one fitness platform that unites AI-powered workouts, intelligent nutrition planning, 
              and comprehensive health tracking in one seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/member/signup"
                className="px-8 py-4 btn-primary text-lg group w-full sm:w-auto"
              >
                Start Your Journey
                <Zap className="w-5 h-5 ml-2 inline-block group-hover:rotate-12 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 glass-effect text-white text-lg rounded-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                Explore Features
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything You Need to <span className="text-gradient">Thrivv</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to transform your fitness journey and help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`dark-card card-hover p-8 group animate-fade-in-up ${feature.delay}`}
                >
                  <div className="relative mb-6">
                    <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-12 text-center border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-500">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of members already achieving their goals with Thrivv.
            </p>
            <Link
              href="/member/signup"
              className="inline-block px-10 py-4 btn-primary text-lg group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-yellow-500/20 py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Thrivv. All rights reserved. Transform your fitness journey today.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
