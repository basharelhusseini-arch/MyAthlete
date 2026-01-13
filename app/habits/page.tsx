'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Target, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Habit } from '@/types';

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    if (!storedMemberId) {
      // Redirect to login if not logged in
      window.location.href = '/member/login';
      return;
    }
    setMemberId(storedMemberId);
    fetchHabits(storedMemberId);
  }, []);

  const fetchHabits = async (memberId: string) => {
    try {
      const response = await fetch(`/api/habits?memberId=${memberId}`);
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
      }
    } catch (error) {
      console.error('Failed to fetch habits:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading habits...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Habit Tracker</h1>
          <p className="mt-2 text-gray-400">Build and track healthy habits</p>
        </div>
        <Link
          href="/member/habits/new"
          className="flex items-center px-4 py-2 btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Habit
        </Link>
      </div>

      {habits.length === 0 ? (
        <div className="dark-card p-12 text-center">
          <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No habits yet</h3>
          <p className="text-gray-400 mb-6">
            Start building healthy habits by creating your first one
          </p>
          <Link
            href="/member/habits/new"
            className="inline-flex items-center px-4 py-2 btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Habit
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <Link
              key={habit.id}
              href={`/member/habits`}
              className="dark-card p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">{habit.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">{habit.frequency}</p>
                  </div>
                </div>
              </div>
              {habit.description && (
                <p className="text-sm text-gray-400 mb-4">{habit.description}</p>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Category</span>
                <span className="text-white capitalize">{habit.category}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="dark-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">About Habit Tracking</h2>
        <p className="text-gray-400 mb-4">
          Track your daily habits to build consistency and improve your health score. 
          Each completed habit contributes to your overall wellness.
        </p>
        <Link
          href="/health"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          View your health score →
        </Link>
      </div>
    </div>
  );
}
