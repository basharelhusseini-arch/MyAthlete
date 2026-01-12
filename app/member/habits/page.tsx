'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, CheckCircle, Circle, Calendar, Target, TrendingUp } from 'lucide-react';
import { Habit, HabitEntry } from '@/types';

export default function MemberHabitsPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<HabitEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    if (!storedMemberId) {
      router.push('/member/login');
      return;
    }
    setMemberId(storedMemberId);
    fetchHabits(storedMemberId);
    fetchEntries(storedMemberId);
  }, [router]);

  const fetchHabits = async (id: string) => {
    try {
      const response = await fetch(`/api/habits?memberId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
      }
    } catch (error) {
      console.error('Failed to fetch habits:', error);
    }
  };

  const fetchEntries = async (id: string) => {
    try {
      const response = await fetch(`/api/habits/entries?memberId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabitEntry = async (habitId: string, date: string, completed: boolean) => {
    if (!memberId) return;

    try {
      // Check if entry exists
      const existingEntry = entries.find(e => e.habitId === habitId && e.date === date);
      
      if (existingEntry) {
        // Update existing entry
        const response = await fetch(`/api/habits/${habitId}/entries/${existingEntry.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed }),
        });
        if (response.ok) {
          fetchEntries(memberId);
        }
      } else {
        // Create new entry
        const response = await fetch(`/api/habits/${habitId}/entries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            memberId,
            date,
            completed,
          }),
        });
        if (response.ok) {
          fetchEntries(memberId);
        }
      }
    } catch (error) {
      console.error('Failed to toggle habit entry:', error);
    }
  };

  const getEntryForDate = (habitId: string, date: string): HabitEntry | undefined => {
    return entries.find(e => e.habitId === habitId && e.date === date);
  };

  const getStreak = (habitId: string): number => {
    const habitEntries = entries.filter(e => e.habitId === habitId && e.completed).sort((a, b) => b.date.localeCompare(a.date));
    if (habitEntries.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < habitEntries.length; i++) {
      const entryDate = new Date(habitEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - streak);
      
      if (entryDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading habits...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/member/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Habit Tracking</h1>
                <p className="text-sm text-gray-600">Track your daily habits and build consistency</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <Link
            href="/member/habits/new"
            className="flex items-center px-4 py-2 btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Habit
          </Link>
        </div>

        {habits.length === 0 ? (
          <div className="dark-card p-12 text-center">
            <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No habits yet</h3>
            <p className="text-gray-400 mb-6">Start tracking your habits to build consistency</p>
            <Link
              href="/member/habits/new"
              className="inline-flex items-center px-4 py-2 btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Habit
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => {
              const entry = getEntryForDate(habit.id, selectedDate);
              const streak = getStreak(habit.id);
              const isCompleted = entry?.completed || false;
              
              return (
                <div
                  key={habit.id}
                  className="dark-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{habit.name}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-800/50 text-gray-400 border border-gray-700/50 rounded-full capitalize">
                          {habit.category}
                        </span>
                      </div>
                      {habit.description && (
                        <p className="text-gray-400 text-sm mb-2">{habit.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {streak} day streak
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {habit.frequency === 'daily' ? 'Daily' : `${habit.frequency}`}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleHabitEntry(habit.id, selectedDate, !isCompleted)}
                      className={`ml-4 p-4 rounded-lg transition-all duration-200 ${
                        isCompleted
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800/70 border border-gray-700/50'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
