-- Enable Row Level Security on check-in and health score tables
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_scores ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can insert their own check-ins" ON daily_checkins;
DROP POLICY IF EXISTS "Users can view their own check-ins" ON daily_checkins;
DROP POLICY IF EXISTS "Users can update their own check-ins" ON daily_checkins;

DROP POLICY IF EXISTS "Users can insert their own health scores" ON health_scores;
DROP POLICY IF EXISTS "Users can view their own health scores" ON health_scores;
DROP POLICY IF EXISTS "Users can update their own health scores" ON health_scores;

-- Check-in policies
CREATE POLICY "Users can insert their own check-ins"
ON daily_checkins
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own check-ins"
ON daily_checkins
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own check-ins"
ON daily_checkins
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Health score policies
CREATE POLICY "Users can insert their own health scores"
ON health_scores
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own health scores"
ON health_scores
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own health scores"
ON health_scores
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Verify constraints are correct
-- daily_checkins should have unique constraint on (user_id, date)
-- health_scores should have unique constraint on (user_id, date)
-- These allow upsert operations

-- Success! RLS policies configured for authenticated user access.
