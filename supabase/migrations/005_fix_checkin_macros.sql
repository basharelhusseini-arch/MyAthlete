-- Fix Check-in and Health Score Issues
-- 1. Update health_scores constraint to allow up to 110 points (training 30 + diet 40 + sleep 30 + habits 10)
-- 2. Add macro tracking fields to daily_checkins

-- Drop old constraint and add new one
ALTER TABLE health_scores DROP CONSTRAINT IF EXISTS health_scores_score_check;
ALTER TABLE health_scores ADD CONSTRAINT health_scores_score_check CHECK (score >= 0 AND score <= 110);

-- Add macro tracking columns to daily_checkins
ALTER TABLE daily_checkins ADD COLUMN IF NOT EXISTS protein_g NUMERIC DEFAULT 0;
ALTER TABLE daily_checkins ADD COLUMN IF NOT EXISTS carbs_g NUMERIC DEFAULT 0;
ALTER TABLE daily_checkins ADD COLUMN IF NOT EXISTS fat_g NUMERIC DEFAULT 0;

-- Add habit_score column to health_scores (was missing)
ALTER TABLE health_scores ADD COLUMN IF NOT EXISTS habit_score INT DEFAULT 0 CHECK (habit_score >= 0 AND habit_score <= 10);

-- Success! Check-in now supports macro tracking and health scores can go up to 110.
