# Running the Trust & Verification System Migration

## Migration File
`supabase/migrations/013_trust_verification_system.sql`

## Method 1: Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query" button

3. **Copy Migration SQL**
   - Open `supabase/migrations/013_trust_verification_system.sql`
   - Copy the entire contents (all 212 lines)

4. **Run Migration**
   - Paste the SQL into the SQL Editor
   - Click "Run" (or press Cmd/Ctrl + Enter)
   - Wait for success confirmation

5. **Verify Migration**
   - Check that these tables were created:
     - `user_health_profile`
     - `verification_events`
     - `wearable_interest_leads`
   - Verify the function `get_user_confidence_score` exists

## Method 2: Supabase CLI (Alternative)

If you prefer using the CLI:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

## What This Migration Does

✅ Creates 3 new tables:
- `user_health_profile` - Stores user goals and wearable preferences
- `verification_events` - Tracks verification history (additive only)
- `wearable_interest_leads` - Captures users interested in wearables

✅ Sets up Row Level Security (RLS) policies for privacy

✅ Creates helper function `get_user_confidence_score()`

✅ Adds indexes for performance

## Verification Steps

After running the migration, verify it worked:

1. **Check Tables Exist**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('user_health_profile', 'verification_events', 'wearable_interest_leads');
   ```

2. **Check Function Exists**
   ```sql
   SELECT proname 
   FROM pg_proc 
   WHERE proname = 'get_user_confidence_score';
   ```

3. **Test Function**
   ```sql
   -- Should return 30 (baseline) for a new user
   SELECT get_user_confidence_score('00000000-0000-0000-0000-000000000000');
   ```

## Rollback (If Needed)

If you need to rollback the migration:

```sql
DROP FUNCTION IF EXISTS get_user_confidence_score(UUID);
DROP TABLE IF EXISTS wearable_interest_leads CASCADE;
DROP TABLE IF EXISTS verification_events CASCADE;
DROP TABLE IF EXISTS user_health_profile CASCADE;
```

## Next Steps

Once the migration is complete:
1. ✅ Deploy the application code (already pushed to git)
2. ✅ Test the onboarding flow
3. ✅ Verify the leaderboard shows confidence badges
4. ✅ Check that health scores are calculating correctly
