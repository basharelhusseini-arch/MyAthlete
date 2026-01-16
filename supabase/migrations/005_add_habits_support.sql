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
