/**
 * Test Supabase connection and table existence
 * 
 * Make sure to set environment variables before running:
 * export NEXT_PUBLIC_SUPABASE_URL="your_url"
 * export SUPABASE_SERVICE_ROLE_KEY="your_key"
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Testing Supabase Connection...\n');

// Check environment variables
console.log('1. Checking environment variables:');
console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
console.log(`   SUPABASE_SERVICE_ROLE_KEY: ${supabaseKey ? '✅ Set' : '❌ Missing'}`);

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ Missing environment variables!');
  console.error('Make sure .env.local contains:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n2. Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('workout_plans').select('count').limit(0);
    
    if (error) {
      if (error.message.includes('relation "public.workout_plans" does not exist')) {
        console.error('❌ Table "workout_plans" does NOT exist');
        console.error('\n🔧 You need to run the migration!');
        console.error('   Go to Supabase Dashboard → SQL Editor');
        console.error('   Run the SQL from: supabase/migrations/009_workout_plans_and_workouts.sql');
        process.exit(1);
      }
      console.error('❌ Connection error:', error.message);
      process.exit(1);
    }
    
    console.log('✅ workout_plans table exists');
    
    // Test workouts table
    const { data: workoutsData, error: workoutsError } = await supabase
      .from('workouts')
      .select('count')
      .limit(0);
    
    if (workoutsError) {
      if (workoutsError.message.includes('relation "public.workouts" does not exist')) {
        console.error('❌ Table "workouts" does NOT exist');
        console.error('\n🔧 You need to run the migration!');
        process.exit(1);
      }
      console.error('❌ Error checking workouts table:', workoutsError.message);
      process.exit(1);
    }
    
    console.log('✅ workouts table exists');
    
    // Count existing records
    console.log('\n3. Checking existing data:');
    
    const { count: planCount } = await supabase
      .from('workout_plans')
      .select('*', { count: 'exact', head: true });
    
    const { count: workoutCount } = await supabase
      .from('workouts')
      .select('*', { count: 'exact', head: true });
    
    console.log(`   Workout Plans: ${planCount || 0}`);
    console.log(`   Workouts: ${workoutCount || 0}`);
    
    console.log('\n✅ All Supabase checks passed!');
    console.log('The database is ready. Try generating a new workout plan.');
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
  }
}

testConnection();
