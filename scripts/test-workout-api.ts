/**
 * Quick test to verify workout generation API works end-to-end
 */

import { store } from '../lib/store';

console.log('🧪 Testing Workout Generator API...\n');

try {
  // Test 1: Generate a workout plan
  console.log('1️⃣  Generating workout plan...');
  const plan = store.generateWorkoutPlan({
    memberId: 'test-member-123',
    goal: 'strength',
    difficulty: 'intermediate',
    duration: 4,
    frequency: 3,
    equipment: ['barbell', 'dumbbells', 'cable', 'machine'],
    limitations: '',
  });
  
  console.log(`✅ Plan generated: ${plan.name} (ID: ${plan.id})`);
  console.log(`   Duration: ${plan.duration} weeks`);
  console.log(`   Frequency: ${plan.frequency}x/week`);
  
  // Test 2: Retrieve the plan
  console.log('\n2️⃣  Retrieving workout plan...');
  const retrievedPlan = store.getWorkoutPlan(plan.id);
  
  if (!retrievedPlan) {
    throw new Error('Failed to retrieve plan');
  }
  console.log(`✅ Plan retrieved: ${retrievedPlan.name}`);
  
  // Test 3: Get workouts for the plan
  console.log('\n3️⃣  Fetching workouts...');
  const workouts = store.getWorkoutPlanWorkouts(plan.id);
  console.log(`✅ Found ${workouts.length} workouts`);
  
  if (workouts.length > 0) {
    const firstWorkout = workouts[0];
    console.log(`   First workout: ${firstWorkout.name}`);
    console.log(`   Exercises: ${firstWorkout.exercises.length}`);
    console.log(`   Has warmup: ${firstWorkout.warmup ? 'Yes' : 'No'}`);
    
    if (firstWorkout.warmup) {
      console.log(`   - General warm-up items: ${firstWorkout.warmup.general?.length || 0}`);
      console.log(`   - Mobility items: ${firstWorkout.warmup.mobility?.length || 0}`);
      console.log(`   - Ramp sets: ${firstWorkout.warmup.rampSets?.length || 0}`);
    }
    
    const mainLift = firstWorkout.exercises.find(e => e.isMainLift);
    if (mainLift) {
      console.log(`   Main lift: ${mainLift.exerciseId}`);
      console.log(`   - Sets: ${mainLift.sets}, Reps: ${mainLift.reps}`);
      console.log(`   - %1RM: ${mainLift.percent1RM || 'N/A'}`);
      console.log(`   - RPE: ${mainLift.rpe || 'N/A'}`);
    }
  }
  
  // Test 4: Delete the plan
  console.log('\n4️⃣  Cleaning up...');
  const deleted = store.deleteWorkoutPlan(plan.id);
  if (!deleted) {
    throw new Error('Failed to delete plan');
  }
  console.log(`✅ Plan deleted successfully`);
  
  console.log('\n✨ ALL TESTS PASSED!\n');
  console.log('The workout generator is working correctly.');
  console.log('You can now use it from the UI at /workouts/new\n');
  
} catch (error) {
  console.error('\n❌ TEST FAILED:', error);
  console.error('\nError details:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
}
