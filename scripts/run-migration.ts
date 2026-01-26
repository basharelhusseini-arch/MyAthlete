/**
 * Database Migration Runner
 * Runs SQL migrations against Supabase
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease set these in your .env.local file');
  process.exit(1);
}

// Create Supabase client with service role (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration(migrationFile: string) {
  console.log(`\n🔄 Running migration: ${migrationFile}`);
  
  // Read the migration file
  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', migrationFile);
  
  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ Migration file not found: ${migrationPath}`);
    process.exit(1);
  }
  
  const sql = fs.readFileSync(migrationPath, 'utf-8');
  
  console.log(`📄 Migration file loaded (${sql.length} characters)`);
  console.log('⏳ Executing SQL...\n');
  
  try {
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      // If the exec_sql function doesn't exist, try direct execution
      // Note: Supabase doesn't allow arbitrary SQL execution via the client
      // We need to use the REST API or Supabase CLI
      console.error('❌ Migration failed:');
      console.error(error);
      console.log('\n⚠️  Supabase client cannot run migrations directly.');
      console.log('Please use one of these methods instead:\n');
      console.log('1. Supabase Dashboard:');
      console.log('   - Go to https://app.supabase.com/project/_/sql/new');
      console.log('   - Copy the contents of: supabase/migrations/' + migrationFile);
      console.log('   - Paste and run in the SQL Editor\n');
      console.log('2. Supabase CLI:');
      console.log('   - Install: npm install -g supabase');
      console.log('   - Link project: supabase link --project-ref YOUR_PROJECT_REF');
      console.log('   - Run: supabase db push\n');
      process.exit(1);
    }
    
    console.log('✅ Migration completed successfully!');
    console.log(data);
  } catch (err) {
    console.error('❌ Error running migration:', err);
    console.log('\n⚠️  Please run this migration manually via Supabase Dashboard:');
    console.log('   1. Go to https://app.supabase.com/project/_/sql/new');
    console.log('   2. Copy the contents of: supabase/migrations/' + migrationFile);
    console.log('   3. Paste and run in the SQL Editor');
    process.exit(1);
  }
}

// Main execution
const migrationFile = process.argv[2] || '013_trust_verification_system.sql';

runMigration(migrationFile)
  .then(() => {
    console.log('\n✅ All migrations completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Migration failed:', err);
    process.exit(1);
  });
