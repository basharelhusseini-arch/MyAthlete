# Fix: Daily Check-In Save Error (habit_details column missing)

## Error
```
"Could not find the 'habit_details' column of 'daily_checkins' in the schema cache [Code: PGRST204]"
```

## Root Cause
The database migration that adds the `habit_details` column has NOT been run in your Supabase database yet. The code is correct, but the database schema is missing the new columns.

## Solution: Run the Database Migration

### Step 1: Open Supabase SQL Editor
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Click "New query"

### Step 2: Copy and Run This SQL

```sql
-- Add habit tracking support to health scores and check-ins

-- 1. Update health_scores to support habits (10 points) and increase max to 110
ALTER TABLE health_scores DROP CONSTRAINT IF EXISTS health_scores_score_check;
ALTER TABLE health_scores ADD CONSTRAINT health_scores_score_check CHECK (score >= 0 AND score <= 110);

-- 2. Add habit_score column to health_scores
ALTER TABLE health_scores ADD COLUMN IF NOT EXISTS habit_score INT DEFAULT 0 CHECK (habit_score >= 0 AND habit_score <= 10);

-- 3. Add habit tracking columns to daily_checkins
ALTER TABLE daily_checkins ADD COLUMN IF NOT EXISTS habits_completed INT DEFAULT 0;
ALTER TABLE daily_checkins ADD COLUMN IF NOT EXISTS habit_details JSONB DEFAULT '{}';

-- Success! Habit tracking enabled with 10 points for 2+ habits, 5 points for 1 habit.
```

### Step 3: Click "Run" Button
- The query should execute successfully
- You'll see a success message

### Step 4: Verify the Changes
Run this query to confirm the columns exist:
```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'daily_checkins'
  AND column_name IN ('habits_completed', 'habit_details');
```

Expected output:
```
column_name       | data_type | column_default
------------------|-----------|---------------
habits_completed  | integer   | 0
habit_details     | jsonb     | '{}'::jsonb
```

### Step 5: Test Check-In
1. Go to your app: `/member/checkin`
2. Fill out the form and select some habits
3. Click "Complete Check-In"
4. ✅ Should save successfully!

## What the Migration Does

### Before (Current State)
```sql
-- daily_checkins table
user_id         UUID
date            DATE
did_workout     BOOLEAN
calories        INT
sleep_hours     NUMERIC
```

### After (With Migration)
```sql
-- daily_checkins table
user_id         UUID
date            DATE
did_workout     BOOLEAN
calories        INT
sleep_hours     NUMERIC
habits_completed INT    -- NEW: Count of habits (0-6)
habit_details   JSONB   -- NEW: { "sauna": true, "ice_bath": false, ... }
```

```sql
-- health_scores table
score           INT (0-110)  -- UPDATED: Was 0-100
habit_score     INT (0-10)   -- NEW: Habit tracking score
```

## API Payload (Already Correct)

The code is already correct and sends:
```typescript
{
  user_id: "...",
  date: "2026-01-16",
  did_workout: true,
  calories: 2200,
  sleep_hours: 8,
  habits_completed: 2,           // NEW: Calculated from habits
  habit_details: {               // NEW: The full habit object
    "sauna": true,
    "ice_bath": true,
    "meditation": false,
    "steam_room": false,
    "cold_shower": false,
    "stretching": false
  }
}
```

## Troubleshooting

### If you still get the error after running migration:

1. **Check you ran it in the correct project**
   - Verify in Supabase dashboard → Settings → Project settings
   - Make sure it matches your `.env` file

2. **Refresh Supabase cache**
   ```sql
   -- Run this to clear PostgREST cache
   NOTIFY pgrst, 'reload schema';
   ```

3. **Restart your dev server**
   ```bash
   # Stop the dev server (Ctrl+C)
   # Then restart
   npm run dev
   ```

4. **Verify environment variables**
   - Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL`
   - Make sure you're connecting to the right Supabase project

### If migration fails with "column already exists":

That's fine! It means you already ran it. The error will be gone now.

## Files Involved

### Migration File (Ready to Run)
```
📁 supabase/migrations/
   └─ 005_add_habits_support.sql ✅ (Ready - just needs to be run in Supabase)
```

### API Code (Already Correct)
```
📁 app/api/checkin/today/
   └─ route.ts ✅ (Sends habit_details correctly)
```

### Frontend Code (Already Correct)
```
📁 app/member/checkin/
   └─ page.tsx ✅ (Has habit checkboxes)
```

## Summary

✅ **Code is correct** - No code changes needed  
❌ **Database is missing columns** - Need to run migration  
🔧 **Fix**: Copy SQL above → Paste in Supabase SQL Editor → Click Run  
✅ **Then**: Check-in will save successfully with habits!  

---

**Next Step**: Run the SQL migration in Supabase → Test check-in → Habits will work! 🚀
