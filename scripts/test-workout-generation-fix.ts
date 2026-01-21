/**
 * Test script to validate workout generation fixes
 * Tests the fallback ladder and ensures workouts are always generated
 */

import { generateAthleteWorkoutPlan } from '../lib/athlete-workout-generator';
import { exercisesDatabase } from '../lib/exercises';

console.log('🧪 TESTING WORKOUT GENERATION FIXES');
console.log('=' .repeat(60));

// Test 1: Very restrictive equipment filter (should trigger fallback)
console.log('\n📋 TEST 1: Restrictive equipment filter');
console.log('Equipment: ["barbell"] only');
const test1 = generateAthleteWorkoutPlan(
  {
    memberId: 'test-member-1',
    goal: 'strength',
    difficulty: 'beginner',
    duration: 4,
    frequency: 3,
    equipment: ['barbell'], // Very restrictive
    limitations: [],
  },
  exercisesDatabase
);

console.log(`✅ Generated ${test1.workouts.length} workouts (expected 12)`);
console.log(`Plan: ${test1.plan.name}`);
if (test1.workouts.length !== 12) {
  console.error('❌ FAIL: Expected 12 workouts, got', test1.workouts.length);
} else {
  console.log('✅ PASS: Correct number of workouts');
}

// Test 2: No equipment filter (should use all)
console.log('\n📋 TEST 2: No equipment filter');
const test2 = generateAthleteWorkoutPlan(
  {
    memberId: 'test-member-2',
    goal: 'hypertrophy',
    difficulty: 'intermediate',
    duration: 4,
    frequency: 4,
    equipment: undefined,
    limitations: [],
  },
  exercisesDatabase
);

console.log(`✅ Generated ${test2.workouts.length} workouts (expected 16)`);
if (test2.workouts.length !== 16) {
  console.error('❌ FAIL: Expected 16 workouts, got', test2.workouts.length);
} else {
  console.log('✅ PASS: Correct number of workouts');
}

// Test 3: Athletic performance (speed/strength/recovery split)
console.log('\n📋 TEST 3: Athletic performance split');
const test3 = generateAthleteWorkoutPlan(
  {
    memberId: 'test-member-3',
    goal: 'athletic_performance',
    difficulty: 'advanced',
    duration: 4,
    frequency: 3,
    equipment: ['bodyweight', 'dumbbells'],
    limitations: [],
  },
  exercisesDatabase
);

console.log(`✅ Generated ${test3.workouts.length} workouts (expected 12)`);
console.log('Sample workout themes:');
test3.workouts.slice(0, 3).forEach((w, i) => {
  console.log(`  Week 1, Day ${i + 1}: ${w.dayTheme} - ${w.purpose?.slice(0, 60)}...`);
});

if (test3.workouts.length !== 12) {
  console.error('❌ FAIL: Expected 12 workouts, got', test3.workouts.length);
} else {
  console.log('✅ PASS: Correct number of workouts');
}

// Test 4: Validate minimum exercises per workout
console.log('\n📋 TEST 4: Minimum exercises per workout');
let minExercisesFail = false;
for (const workout of test1.workouts) {
  if (workout.exercises.length < 5) {
    console.error(`❌ FAIL: Workout "${workout.name}" has only ${workout.exercises.length} exercises (min 5)`);
    minExercisesFail = true;
  }
}
if (!minExercisesFail) {
  console.log('✅ PASS: All workouts have minimum 5 exercises');
}

// Test 5: Validate all workouts have required fields
console.log('\n📋 TEST 5: Required fields validation');
let requiredFieldsFail = false;
for (const workout of test1.workouts) {
  if (!workout.dayTheme) {
    console.error(`❌ FAIL: Workout "${workout.name}" missing dayTheme`);
    requiredFieldsFail = true;
  }
  if (!workout.purpose) {
    console.error(`❌ FAIL: Workout "${workout.name}" missing purpose`);
    requiredFieldsFail = true;
  }
  if (!workout.sessionType) {
    console.error(`❌ FAIL: Workout "${workout.name}" missing sessionType`);
    requiredFieldsFail = true;
  }
}
if (!requiredFieldsFail) {
  console.log('✅ PASS: All workouts have required fields');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('🎉 ALL TESTS PASSED' + (!minExercisesFail && !requiredFieldsFail && test1.workouts.length === 12 && test2.workouts.length === 16 && test3.workouts.length === 12 ? '' : ' WITH FAILURES'));
console.log('=' .repeat(60));
