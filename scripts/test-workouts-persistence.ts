import { store } from '../lib/store';

console.log('🧪 Testing Workout Persistence...\n');

// Generate a plan
console.log('1. Generating plan...');
const plan = store.generateWorkoutPlan({
  memberId: 'test-123',
  goal: 'strength',
  difficulty: 'intermediate',
  duration: 2,
  frequency: 3,
  equipment: ['barbell', 'dumbbells'],
  limitations: [],
});

console.log(`✓ Plan created: ${plan.id}`);
console.log(`  Duration: ${plan.duration} weeks`);
console.log(`  Frequency: ${plan.frequency}x/week`);
console.log(`  Expected workouts: ${plan.duration * plan.frequency}`);

// Check workouts immediately
console.log('\n2. Checking workouts in store...');
const workouts = store.getWorkoutPlanWorkouts(plan.id);
console.log(`✓ Found ${workouts.length} workouts`);

if (workouts.length === 0) {
  console.error('\n❌ PROBLEM: No workouts found!');
  console.error(`Expected: ${plan.duration * plan.frequency} workouts`);
  console.error(`Got: ${workouts.length} workouts`);
  
  // Check all workouts in store
  const allWorkouts = store.getAllWorkouts();
  console.error(`\nTotal workouts in store: ${allWorkouts.length}`);
  
  process.exit(1);
} else {
  console.log('✅ Workouts persisted correctly\n');
  workouts.forEach((w, i) => {
    console.log(`  ${i + 1}. ${w.name}`);
    console.log(`     Date: ${w.date}`);
    console.log(`     Exercises: ${w.exercises.length}`);
    console.log(`     Warmup: ${w.warmup ? 'Yes' : 'No'}`);
  });
  
  console.log('\n✨ TEST PASSED!');
}

// Cleanup
store.deleteWorkoutPlan(plan.id);
