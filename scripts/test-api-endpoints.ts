/**
 * Test workout generation via actual API endpoints
 * Simulates what the UI does
 */

async function testWorkoutAPI() {
  console.log('🧪 Testing Workout API Endpoints...\n');
  
  const baseUrl = 'http://localhost:3000';
  
  try {
    // Step 1: Generate a workout plan
    console.log('1. POST /api/workout-plans/generate');
    const generateResponse = await fetch(`${baseUrl}/api/workout-plans/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberId: 'api-test-123',
        goal: 'strength',
        difficulty: 'intermediate',
        duration: 2,
        frequency: 3,
        equipment: ['barbell', 'dumbbells'],
        limitations: [],
      }),
    });
    
    if (!generateResponse.ok) {
      const error = await generateResponse.json();
      console.error('❌ Generation failed:', error);
      process.exit(1);
    }
    
    const plan = await generateResponse.json();
    console.log(`✓ Plan generated: ${plan.id}`);
    console.log(`  Name: ${plan.name}`);
    console.log(`  Duration: ${plan.duration} weeks × ${plan.frequency} days = ${plan.duration * plan.frequency} workouts expected`);
    
    // Step 2: Fetch the plan
    console.log(`\n2. GET /api/workout-plans/${plan.id}`);
    const planResponse = await fetch(`${baseUrl}/api/workout-plans/${plan.id}`);
    
    if (!planResponse.ok) {
      console.error('❌ Failed to fetch plan');
      process.exit(1);
    }
    
    const fetchedPlan = await planResponse.json();
    console.log(`✓ Plan fetched: ${fetchedPlan.name}`);
    
    // Step 3: Fetch workouts for the plan
    console.log(`\n3. GET /api/workouts?workoutPlanId=${plan.id}`);
    const workoutsResponse = await fetch(`${baseUrl}/api/workouts?workoutPlanId=${plan.id}`);
    
    if (!workoutsResponse.ok) {
      console.error('❌ Failed to fetch workouts');
      process.exit(1);
    }
    
    const workouts = await workoutsResponse.json();
    console.log(`✓ Found ${workouts.length} workouts`);
    
    if (workouts.length === 0) {
      console.error('\n❌ PROBLEM: No workouts returned!');
      console.error(`Expected: ${plan.duration * plan.frequency} workouts`);
      console.error(`Got: ${workouts.length} workouts`);
      console.error('\nThis is the bug the user is experiencing.');
      process.exit(1);
    }
    
    console.log('\n✅ Workouts found:');
    workouts.forEach((w: any, i: number) => {
      console.log(`  ${i + 1}. ${w.name} (${w.date})`);
      console.log(`     - ${w.exercises?.length || 0} exercises`);
      console.log(`     - Status: ${w.status}`);
      console.log(`     - Warmup: ${w.warmup ? 'Yes' : 'No'}`);
    });
    
    // Step 4: Cleanup
    console.log(`\n4. DELETE /api/workout-plans/${plan.id}`);
    const deleteResponse = await fetch(`${baseUrl}/api/workout-plans/${plan.id}`, {
      method: 'DELETE',
    });
    
    if (!deleteResponse.ok) {
      console.error('⚠️  Failed to delete plan (non-critical)');
    } else {
      console.log('✓ Plan deleted');
    }
    
    console.log('\n✨ ALL API TESTS PASSED!');
    console.log('The API correctly persists and returns workouts.');
    
  } catch (error) {
    console.error('\n❌ API Test Failed:', error);
    console.error('\nMake sure the dev server is running on port 3000:');
    console.error('  npm run dev');
    process.exit(1);
  }
}

testWorkoutAPI();
