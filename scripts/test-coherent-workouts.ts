/**
 * Test script to validate coherent split-based workout generation
 * Generates 3 example plans and validates:
 * 1. Each day has clear theme and purpose
 * 2. Exercises match the day's muscle focus
 * 3. Weeks follow same split structure with progression
 * 4. No random mix sessions
 */

import { generateAthleteWorkoutPlan, validateWorkoutCoherence } from '../lib/athlete-workout-generator';
import { exercisesDatabase } from '../lib/exercises';
import { WorkoutPlan, Workout } from '../types';

console.log('🏋️ Testing Coherent Split-Based Workout Generation\n');
console.log('=' .repeat(80));

// Test cases
const testCases = [
  {
    name: 'Strength / 3x per week',
    params: {
      memberId: 'test-user-1',
      goal: 'strength' as WorkoutPlan['goal'],
      difficulty: 'intermediate' as WorkoutPlan['difficulty'],
      duration: 4,
      frequency: 3,
      equipment: ['barbell', 'dumbbells', 'machine', 'cable', 'bodyweight'],
      limitations: []
    }
  },
  {
    name: 'Hypertrophy / 4x per week',
    params: {
      memberId: 'test-user-2',
      goal: 'muscle_gain' as WorkoutPlan['goal'],
      difficulty: 'intermediate' as WorkoutPlan['difficulty'],
      duration: 4,
      frequency: 4,
      equipment: ['barbell', 'dumbbells', 'machine', 'cable', 'bodyweight'],
      limitations: []
    }
  },
  {
    name: 'Athletic Performance / 3x per week',
    params: {
      memberId: 'test-user-3',
      goal: 'athletic_performance' as WorkoutPlan['goal'],
      difficulty: 'advanced' as WorkoutPlan['difficulty'],
      duration: 4,
      frequency: 3,
      equipment: ['barbell', 'dumbbells', 'bodyweight'],
      limitations: []
    }
  }
];

// Run tests
for (const testCase of testCases) {
  console.log(`\n\n📋 TEST CASE: ${testCase.name}`);
  console.log('-'.repeat(80));
  
  const { plan, workouts } = generateAthleteWorkoutPlan(testCase.params, exercisesDatabase);
  
  console.log(`\n✅ Plan Generated: ${plan.name}`);
  console.log(`   Description: ${plan.description}`);
  console.log(`   Total Workouts: ${workouts.length}`);
  console.log(`   Expected: ${testCase.params.duration * testCase.params.frequency}`);
  
  // Group workouts by week
  const weeklyStructure: Record<number, string[]> = {};
  for (const workout of workouts) {
    const week = workout.weekNumber || 1;
    if (!weeklyStructure[week]) {
      weeklyStructure[week] = [];
    }
    weeklyStructure[week].push(workout.dayTheme || 'No theme');
  }
  
  console.log(`\n📅 Weekly Split Structure:`);
  for (const [week, themes] of Object.entries(weeklyStructure)) {
    console.log(`   Week ${week}: ${themes.join(' → ')}`);
  }
  
  // Validate coherence
  console.log(`\n🔍 Coherence Validation:`);
  const validation = validateWorkoutCoherence(workouts, exercisesDatabase);
  console.log(`   Coherence Score: ${(validation.coherenceScore * 100).toFixed(1)}% (target: >70%)`);
  console.log(`   Overall Valid: ${validation.isValid ? '✅ PASS' : '❌ FAIL'}`);
  
  if (validation.issues.length > 0) {
    console.log(`\n   ⚠️  Issues Found:`);
    validation.issues.slice(0, 5).forEach(issue => {
      console.log(`      - ${issue}`);
    });
    if (validation.issues.length > 5) {
      console.log(`      ... and ${validation.issues.length - 5} more`);
    }
  } else {
    console.log(`   ✅ No issues found!`);
  }
  
  // Show sample workout details
  console.log(`\n📝 Sample Workout (Week 1, Day 1):`);
  const sampleWorkout = workouts[0];
  console.log(`   Name: ${sampleWorkout.name}`);
  console.log(`   Theme: ${sampleWorkout.dayTheme || 'N/A'}`);
  console.log(`   Purpose: ${sampleWorkout.purpose || 'N/A'}`);
  console.log(`   Session Type: ${sampleWorkout.sessionType}`);
  console.log(`   Exercises (${sampleWorkout.exercises.length}):`);
  
  sampleWorkout.exercises.forEach((ex, idx) => {
    const exerciseData = exercisesDatabase.find(e => e.id === ex.exerciseId);
    const name = exerciseData?.name || ex.exerciseId;
    const muscles = exerciseData?.muscleGroups.join(', ') || 'unknown';
    const role = ex.sessionRole || 'unspecified';
    const intensity = ex.percent1RM ? `${ex.percent1RM}%` : ex.rpe ? `RPE ${ex.rpe}` : '';
    
    console.log(`      ${idx + 1}. [${role.toUpperCase()}] ${name}`);
    console.log(`         ${ex.sets}x${ex.reps} @ ${intensity || 'bodyweight'} | Rest: ${ex.restSeconds}s | Muscles: ${muscles}`);
  });
  
  // Check warm-up
  if (sampleWorkout.warmup) {
    console.log(`   ✅ Warm-up included (${sampleWorkout.warmup.general?.length || 0} general, ${sampleWorkout.warmup.mobility?.length || 0} mobility, ${sampleWorkout.warmup.rampSets?.length || 0} ramp sets)`);
  } else {
    console.log(`   ⚠️  No warm-up section`);
  }
  
  // Check progression across weeks
  console.log(`\n🔄 Progression Check (Same day across weeks):`);
  const week1Day1 = workouts[0];
  const week2Day1 = workouts.find(w => w.weekNumber === 2 && w.name.includes('Day 1'));
  const week3Day1 = workouts.find(w => w.weekNumber === 3 && w.name.includes('Day 1'));
  
  if (week1Day1 && week2Day1 && week3Day1) {
    console.log(`   Week 1: ${week1Day1.dayTheme} (${week1Day1.exercises.length} exercises)`);
    console.log(`   Week 2: ${week2Day1.dayTheme} (${week2Day1.exercises.length} exercises)`);
    console.log(`   Week 3: ${week3Day1.dayTheme} (${week3Day1.exercises.length} exercises)`);
    
    const sameTheme = week1Day1.dayTheme === week2Day1.dayTheme && week2Day1.dayTheme === week3Day1.dayTheme;
    console.log(`   Theme consistency: ${sameTheme ? '✅ PASS (same split)' : '❌ FAIL (themes changed)'}`);
  } else {
    console.log(`   ⚠️  Could not compare (insufficient weeks)`);
  }
}

console.log('\n\n' + '='.repeat(80));
console.log('🎯 SUMMARY:');
console.log('   All test cases completed. Check results above for coherence validation.');
console.log('   Expected outcomes:');
console.log('   ✅ Each workout has dayTheme and purpose');
console.log('   ✅ Exercises match the day\'s muscle focus (>70% coherence)');
console.log('   ✅ Same split structure repeats week-to-week');
console.log('   ✅ No random exercise mixing');
console.log('='.repeat(80));
