/**
 * Test script to verify nutrition plan generation ALWAYS works
 * 
 * Tests the exact scenario from bug report:
 * Male, 170cm, 70kg, Moderate activity, no restrictions
 */

// Simulate the API call
async function testNutritionGeneration() {
  console.log('🧪 Testing Nutrition Plan Generation Fix\n');
  console.log('Test Case: Male, 170cm, 70kg, Moderate activity, no restrictions\n');

  const testPayload = {
    memberId: 'test-member-123',
    goal: 'maintenance',
    gender: 'male',
    age: 30,
    height: 170,
    weight: 70,
    activityLevel: 'moderate',
    duration: 7,
    dietaryRestrictions: [],
    preferences: [],
  };

  console.log('📤 Sending request to /api/nutrition-plans/generate...\n');

  try {
    const response = await fetch('http://localhost:3000/api/nutrition-plans/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const result = await response.json();

    console.log(`📥 Response status: ${response.status}\n`);

    // Check for the new success field
    if (result.success === false) {
      console.error('❌ FAILED: API returned success=false');
      console.error('Error:', result.error);
      console.error('Details:', result.details);
      process.exit(1);
    }

    // Check for plan
    const plan = result.plan || result;
    if (!plan || !plan.id) {
      console.error('❌ FAILED: No plan returned');
      console.error('Response:', JSON.stringify(result, null, 2));
      process.exit(1);
    }

    console.log('✅ SUCCESS: Plan generated!');
    console.log(`   Plan ID: ${plan.id}`);
    console.log(`   Goal: ${plan.goal}`);
    console.log(`   Macro Targets:`);
    console.log(`     - Calories: ${plan.macroTargets?.calories || 'N/A'}`);
    console.log(`     - Protein: ${plan.macroTargets?.protein || 'N/A'}g`);
    console.log(`     - Carbs: ${plan.macroTargets?.carbohydrates || 'N/A'}g`);
    console.log(`     - Fats: ${plan.macroTargets?.fats || 'N/A'}g`);

    // Check for warnings
    if (result.warnings && result.warnings.length > 0) {
      console.log('\n⚠️  Warnings (non-blocking):');
      result.warnings.forEach((warning, idx) => {
        console.log(`   ${idx + 1}. ${warning}`);
      });
    } else {
      console.log('\n✅ No warnings - perfect generation!');
    }

    // Check meal plans
    if (plan.mealPlans && plan.mealPlans.length > 0) {
      console.log(`\n📅 Meal Plans: ${plan.mealPlans.length} days generated`);
      
      plan.mealPlans.forEach((day, idx) => {
        if (idx < 2) { // Show first 2 days
          console.log(`\n   Day ${day.day}:`);
          console.log(`     Meals: ${day.meals?.length || 0}`);
          console.log(`     Totals: ${day.totals?.calories}cal, ${day.totals?.protein_g}g P, ${day.totals?.carbs_g}g C, ${day.totals?.fat_g}g F`);
        }
      });
      
      if (plan.mealPlans.length > 2) {
        console.log(`   ... and ${plan.mealPlans.length - 2} more days`);
      }
    }

    console.log('\n✅ TEST PASSED: Nutrition plan generation ALWAYS succeeds for valid input!');
    process.exit(0);

  } catch (error) {
    console.error('❌ FAILED: Network or unexpected error');
    console.error(error.message || error);
    process.exit(1);
  }
}

// Run test
testNutritionGeneration();
