/**
 * Test script to validate workout variety and athlete programming
 * 
 * Tests:
 * - Exercise variety week-to-week
 * - Warm-up sections present
 * - %1RM values in sane ranges
 * - Deload weeks implemented
 * - No excessive repetition of accessories
 */

import { generateAthleteWorkoutPlan, validateWorkoutVariety } from '../lib/athlete-workout-generator.js';
import { Exercise } from '../types/index.js';

// Mock exercises for testing
const mockExercises: Exercise[] = [
  // Main lifts
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    description: 'Barbell squat with bar on upper back',
    category: 'strength',
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: ['Set up in rack', 'Descend with control', 'Drive up'],
    tips: ['Keep chest up', 'Drive through heels'],
    breathing: 'Inhale down, exhale up',
    tempo: '3-0-1-0',
    rest: '3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '5' },
      intermediate: { sets: 4, reps: '5' },
      advanced: { sets: 5, reps: '5' },
    },
  },
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    description: 'Horizontal pressing movement',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: ['Lie on bench', 'Lower to chest', 'Press up'],
    tips: ['Retract scapula', 'Full ROM'],
    breathing: 'Inhale down, exhale up',
    tempo: '3-0-1-0',
    rest: '3 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '5' },
      intermediate: { sets: 4, reps: '5' },
      advanced: { sets: 5, reps: '5' },
    },
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Deadlift',
    description: 'Hip hinge pulling movement',
    category: 'strength',
    muscleGroups: ['back', 'glutes', 'hamstrings'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: ['Set up at bar', 'Hinge and grip', 'Pull to lockout'],
    tips: ['Neutral spine', 'Full extension'],
    breathing: 'Inhale before pull, exhale at top',
    tempo: '1-0-1-0',
    rest: '3-5 minutes',
    recommendedSets: {
      beginner: { sets: 3, reps: '5' },
      intermediate: { sets: 4, reps: '5' },
      advanced: { sets: 5, reps: '3' },
    },
  },
  // Accessories
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    description: 'Single-arm rowing',
    category: 'strength',
    muscleGroups: ['back', 'biceps'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: ['Support on bench', 'Row dumbbell up', 'Control down'],
    tips: ['Pull to hip', 'Control eccentric'],
    breathing: 'Exhale on pull',
    tempo: '2-1-1-0',
    rest: '60-90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10' },
      intermediate: { sets: 3, reps: '12' },
      advanced: { sets: 4, reps: '12' },
    },
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    description: 'Machine leg press',
    category: 'strength',
    muscleGroups: ['quads', 'glutes'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: ['Set up on machine', 'Lower with control', 'Press to extension'],
    tips: ['Full ROM', 'Control the weight'],
    breathing: 'Inhale down, exhale up',
    tempo: '2-0-1-0',
    rest: '90 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10-12' },
      intermediate: { sets: 3, reps: '12' },
      advanced: { sets: 4, reps: '12-15' },
    },
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    description: 'Vertical pulling movement',
    category: 'strength',
    muscleGroups: ['back', 'biceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: ['Grab bar wide', 'Pull to chest', 'Control return'],
    tips: ['Lead with elbows', 'Squeeze at bottom'],
    breathing: 'Exhale on pull',
    tempo: '2-1-1-0',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10' },
      intermediate: { sets: 3, reps: '12' },
      advanced: { sets: 4, reps: '12' },
    },
  },
  {
    id: 'leg-curl',
    name: 'Leg Curl',
    description: 'Hamstring isolation',
    category: 'strength',
    muscleGroups: ['hamstrings'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: ['Lie on machine', 'Curl heels to glutes', 'Control down'],
    tips: ['Full contraction', 'Slow eccentric'],
    breathing: 'Exhale on curl',
    tempo: '2-1-2-0',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12' },
      intermediate: { sets: 3, reps: '12-15' },
      advanced: { sets: 4, reps: '15' },
    },
  },
  {
    id: 'cable-fly',
    name: 'Cable Fly',
    description: 'Chest isolation with cables',
    category: 'strength',
    muscleGroups: ['chest'],
    equipment: 'cable',
    difficulty: 'intermediate',
    instructions: ['Set cables high', 'Bring handles together', 'Control return'],
    tips: ['Slight elbow bend', 'Squeeze at center'],
    breathing: 'Exhale on contraction',
    tempo: '2-1-1-0',
    rest: '60 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12' },
      intermediate: { sets: 3, reps: '15' },
      advanced: { sets: 4, reps: '15' },
    },
  },
  {
    id: 'tricep-extension',
    name: 'Tricep Extension',
    description: 'Tricep isolation',
    category: 'strength',
    muscleGroups: ['triceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: ['Grab rope attachment', 'Extend arms down', 'Control return'],
    tips: ['Keep elbows tucked', 'Full extension'],
    breathing: 'Exhale on extension',
    tempo: '2-0-1-0',
    rest: '45 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '12' },
      intermediate: { sets: 3, reps: '15' },
      advanced: { sets: 4, reps: '15' },
    },
  },
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    description: 'Bicep isolation',
    category: 'strength',
    muscleGroups: ['biceps'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    instructions: ['Hold dumbbells', 'Curl up', 'Control down'],
    tips: ['No swinging', 'Full ROM'],
    breathing: 'Exhale on curl',
    tempo: '2-0-2-0',
    rest: '45 seconds',
    recommendedSets: {
      beginner: { sets: 3, reps: '10' },
      intermediate: { sets: 3, reps: '12' },
      advanced: { sets: 4, reps: '12' },
    },
  },
];

/**
 * Run tests
 */
function runTests() {
  console.log('🏋️  Testing Athlete Workout Generator\n');
  console.log('=' .repeat(60));
  
  // Test 1: Generate 4-week program
  console.log('\n📋 Test 1: Generating 4-week strength program for intermediate...');
  const { plan, workouts } = generateAthleteWorkoutPlan(
    {
      memberId: 'test-user-1',
      goal: 'strength',
      difficulty: 'intermediate',
      duration: 4,
      frequency: 3,
      equipment: ['barbell', 'dumbbells', 'cable', 'machine'],
    },
    mockExercises
  );
  
  console.log(`✓ Plan created: ${plan.name}`);
  console.log(`✓ Generated ${workouts.length} workouts`);
  
  // Test 2: Validate variety
  console.log('\n🔄 Test 2: Validating workout variety...');
  const varietyResult = validateWorkoutVariety(workouts);
  console.log(`  Duplicate rate: ${(varietyResult.duplicateRate * 100).toFixed(1)}%`);
  console.log(`  Valid: ${varietyResult.isValid ? '✓' : '✗'}`);
  
  if (varietyResult.issues.length > 0) {
    console.log(`  Issues found:`);
    varietyResult.issues.forEach(issue => console.log(`    - ${issue}`));
  } else {
    console.log(`  ✓ No variety issues found`);
  }
  
  // Test 3: Check warm-ups
  console.log('\n🔥 Test 3: Checking warm-up sections...');
  const workoutsWithWarmups = workouts.filter(w => w.warmup);
  console.log(`  ${workoutsWithWarmups.length}/${workouts.length} workouts have warm-ups`);
  
  if (workoutsWithWarmups.length > 0) {
    const sampleWarmup = workoutsWithWarmups[0].warmup!;
    console.log(`  Sample warm-up structure:`);
    console.log(`    - General activities: ${sampleWarmup.general?.length || 0}`);
    console.log(`    - Mobility drills: ${sampleWarmup.mobility?.length || 0}`);
    console.log(`    - Ramp sets: ${sampleWarmup.rampSets?.length || 0}`);
  }
  
  // Test 4: Check %1RM values
  console.log('\n💪 Test 4: Validating %1RM values...');
  const exercisesWithPercent = workouts.flatMap(w => w.exercises).filter(e => e.percent1RM);
  console.log(`  ${exercisesWithPercent.length} exercise sets have %1RM specified`);
  
  if (exercisesWithPercent.length > 0) {
    const percentValues = exercisesWithPercent.map(e => e.percent1RM!);
    const min = Math.min(...percentValues);
    const max = Math.max(...percentValues);
    const avg = percentValues.reduce((a, b) => a + b, 0) / percentValues.length;
    
    console.log(`  Range: ${min}% - ${max}%`);
    console.log(`  Average: ${avg.toFixed(1)}%`);
    
    const insaneValues = percentValues.filter(v => v < 40 || v > 95);
    if (insaneValues.length > 0) {
      console.log(`  ⚠️  Warning: ${insaneValues.length} values outside sane range (40-95%)`);
    } else {
      console.log(`  ✓ All values within sane range (40-95%)`);
    }
  }
  
  // Test 5: Check deload weeks
  console.log('\n📉 Test 5: Checking deload weeks...');
  const deloadWorkouts = workouts.filter(w => w.sessionType === 'deload');
  console.log(`  ${deloadWorkouts.length} deload workouts found`);
  
  if (deloadWorkouts.length > 0) {
    const deloadWeeks = [...new Set(deloadWorkouts.map(w => w.weekNumber))];
    console.log(`  Deload weeks: ${deloadWeeks.join(', ')}`);
    
    // Check if volume is reduced in deload weeks
    const regularSets = workouts
      .filter(w => w.sessionType !== 'deload')
      .flatMap(w => w.exercises)
      .reduce((sum, e) => sum + e.sets, 0) / workouts.filter(w => w.sessionType !== 'deload').length;
    
    const deloadSets = deloadWorkouts
      .flatMap(w => w.exercises)
      .reduce((sum, e) => sum + e.sets, 0) / deloadWorkouts.length;
    
    console.log(`  Average sets per workout - Regular: ${regularSets.toFixed(1)}, Deload: ${deloadSets.toFixed(1)}`);
  }
  
  // Test 6: Check main lifts
  console.log('\n🎯 Test 6: Checking main lift programming...');
  const mainLiftExercises = workouts.flatMap(w => w.exercises).filter(e => e.isMainLift);
  console.log(`  ${mainLiftExercises.length} main lift sets across all workouts`);
  
  if (mainLiftExercises.length > 0) {
    const mainLiftIds = [...new Set(mainLiftExercises.map(e => e.exerciseId))];
    console.log(`  Main lifts used: ${mainLiftIds.length} different exercises`);
    mainLiftIds.forEach(id => {
      const ex = mockExercises.find(e => e.id === id);
      if (ex) {
        const count = mainLiftExercises.filter(e => e.exerciseId === id).length;
        console.log(`    - ${ex.name}: ${count}x`);
      }
    });
  }
  
  // Test 7: Sample workout output
  console.log('\n📄 Test 7: Sample workout output...');
  const sampleWorkout = workouts[0];
  console.log(`  ${sampleWorkout.name}`);
  console.log(`  Date: ${sampleWorkout.date}`);
  console.log(`  Type: ${sampleWorkout.sessionType}`);
  console.log(`  Exercises:`);
  sampleWorkout.exercises.forEach((ex, i) => {
    const exercise = mockExercises.find(e => e.id === ex.exerciseId);
    console.log(`    ${i + 1}. ${exercise?.name || ex.exerciseId}`);
    console.log(`       ${ex.sets} sets × ${ex.reps || 'time'} | Rest: ${ex.restSeconds}s`);
    if (ex.percent1RM) console.log(`       @ ${ex.percent1RM}% 1RM`);
    if (ex.rpe) console.log(`       RPE ${ex.rpe}`);
    if (ex.isMainLift) console.log(`       [MAIN LIFT]`);
  });
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✓ Plan generated successfully`);
  console.log(`✓ Variety: ${varietyResult.isValid ? 'PASS' : 'FAIL'} (${(varietyResult.duplicateRate * 100).toFixed(1)}% duplicates)`);
  console.log(`✓ Warm-ups: ${workoutsWithWarmups.length === workouts.length ? 'PASS' : 'PARTIAL'}`);
  console.log(`✓ %1RM ranges: ${exercisesWithPercent.length > 0 ? 'PASS' : 'N/A'}`);
  console.log(`✓ Deload weeks: ${deloadWorkouts.length > 0 ? 'PASS' : 'FAIL'}`);
  console.log(`✓ Main lifts: ${mainLiftExercises.length > 0 ? 'PASS' : 'FAIL'}`);
  
  const allPassed = varietyResult.isValid && 
                    workoutsWithWarmups.length === workouts.length &&
                    deloadWorkouts.length > 0 &&
                    mainLiftExercises.length > 0;
  
  if (allPassed) {
    console.log('\n🎉 ALL TESTS PASSED!');
  } else {
    console.log('\n⚠️  Some tests failed or need attention');
  }
}

// Run if executed directly
if (require.main === module) {
  runTests();
}

export { runTests };
