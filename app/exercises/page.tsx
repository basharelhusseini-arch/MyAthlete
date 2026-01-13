'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, Dumbbell, Target, TrendingUp } from 'lucide-react';
import { Exercise } from '@/types';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('all');

  useEffect(() => {
    fetchExercises();
  }, []);

  const filterExercises = useCallback(() => {
    let filtered = [...exercises];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.muscleGroups.some(mg => mg.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(ex => ex.category === categoryFilter);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty === difficultyFilter);
    }

    // Equipment filter
    if (equipmentFilter !== 'all') {
      filtered = filtered.filter(ex => ex.equipment === equipmentFilter);
    }

    setFilteredExercises(filtered);
  }, [exercises, searchTerm, categoryFilter, difficultyFilter, equipmentFilter]);

  useEffect(() => {
    filterExercises();
  }, [filterExercises]);

  const fetchExercises = async () => {
    try {
      const response = await fetch('/api/exercises');
      if (response.ok) {
        const data = await response.json();
        setExercises(data);
        setFilteredExercises(data);
      }
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'strength', 'cardio', 'hybrid', 'flexibility', 'balance', 'plyometric', 'endurance'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const equipmentTypes = ['all', 'bodyweight', 'dumbbells', 'barbell', 'machine', 'cable', 'cardio_machine', 'kettlebell', 'resistance_bands', 'other'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cardio': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'hybrid': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'flexibility': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'endurance': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading exercises...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Exercise Library</h1>
          <p className="mt-2 text-gray-400">Browse our comprehensive exercise database with {exercises.length}+ exercises</p>
        </div>
      </div>

      {/* Filters */}
      <div className="dark-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Search Exercises
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, description, or muscle group..."
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Equipment Filter */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Equipment
          </label>
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
          >
            {equipmentTypes.map(eq => (
              <option key={eq} value={eq}>
                {eq.charAt(0).toUpperCase() + eq.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing <span className="text-white font-semibold">{filteredExercises.length}</span> of <span className="text-white font-semibold">{exercises.length}</span> exercises
      </div>

      {/* Exercises Grid */}
      {filteredExercises.length === 0 ? (
        <div className="dark-card p-12 text-center">
          <Dumbbell className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300 text-lg">No exercises found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="dark-card p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white flex-1">{exercise.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4">{exercise.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Target className="w-4 h-4 mr-2" />
                  <span className="font-medium">Category:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded border ${getCategoryColor(exercise.category)}`}>
                    {exercise.category}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Dumbbell className="w-4 h-4 mr-2" />
                  <span className="font-medium">Equipment:</span>
                  <span className="ml-2 text-gray-300 capitalize">{exercise.equipment.replace('_', ' ')}</span>
                </div>
                {exercise.muscleGroups.length > 0 && (
                  <div className="flex items-start text-sm text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Muscle Groups:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {exercise.muscleGroups.map((mg, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-800/50 text-gray-300 rounded text-xs capitalize border border-gray-700/50">
                            {mg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Cardio-specific metrics */}
                {(exercise.category === 'cardio' || exercise.category === 'hybrid') && exercise.mets && (
                  <div className="border-t border-gray-800/50 pt-3 mt-3 space-y-2">
                    <div className="text-xs font-semibold text-gray-400 mb-2">Cardio Metrics:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-800/30 rounded px-2 py-1.5 border border-gray-700/50">
                        <div className="text-gray-500">METs</div>
                        <div className="text-blue-400 font-bold">{exercise.mets}</div>
                      </div>
                      <div className="bg-gray-800/30 rounded px-2 py-1.5 border border-gray-700/50">
                        <div className="text-gray-500">Cal/min</div>
                        <div className="text-red-400 font-bold">{exercise.caloriesPerMinute}</div>
                      </div>
                    </div>
                    {(exercise.supportsDistance || exercise.supportsTime) && (
                      <div className="flex gap-2 text-xs">
                        {exercise.supportsDistance && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                            📏 Distance Tracking
                          </span>
                        )}
                        {exercise.supportsTime && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                            ⏱️ Time Tracking
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Instructions */}
              {exercise.instructions && exercise.instructions.length > 0 && (
                <div className="border-t border-gray-800/50 pt-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400">
                    {exercise.instructions.slice(0, 3).map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                    {exercise.instructions.length > 3 && (
                      <li className="text-blue-400">...and {exercise.instructions.length - 3} more steps</li>
                    )}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
