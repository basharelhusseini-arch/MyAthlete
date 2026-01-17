-- Migration: Add reward points system to users table
-- Reward points are earned daily based on Health Score

-- Add reward_points column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS reward_points NUMERIC DEFAULT 0 CHECK (reward_points >= 0);

-- Add index for faster reward queries
CREATE INDEX IF NOT EXISTS idx_users_reward_points ON users(reward_points DESC);

-- Add a table to track daily reward points history
CREATE TABLE IF NOT EXISTS reward_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  health_score INT NOT NULL,
  points_earned NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Index for reward history queries
CREATE INDEX IF NOT EXISTS idx_reward_history_user_id ON reward_history(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_history_date ON reward_history(date DESC);
CREATE INDEX IF NOT EXISTS idx_reward_history_user_date ON reward_history(user_id, date DESC);

-- Success! Reward points system schema created.
