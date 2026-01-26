-- ============================================================
-- ADD CONFIDENCE SCORE TRACKING TO REWARDS SYSTEM
-- Tracks how confidence multiplier affects reward points
-- ============================================================

-- Add confidence-related columns to reward_history
ALTER TABLE reward_history 
  ADD COLUMN IF NOT EXISTS confidence_score INT DEFAULT 30,
  ADD COLUMN IF NOT EXISTS total_rewards_score INT,
  ADD COLUMN IF NOT EXISTS confidence_multiplier NUMERIC(4,3) DEFAULT 1.0;

-- Add comments for clarity
COMMENT ON COLUMN reward_history.confidence_score IS 'User confidence score (0-100) at time of earning';
COMMENT ON COLUMN reward_history.total_rewards_score IS 'Health score × confidence multiplier (used for reward calculation)';
COMMENT ON COLUMN reward_history.confidence_multiplier IS 'Multiplier applied (1.0 to 1.25 based on confidence)';

-- Update existing records with baseline values (optional - can be run manually)
-- UPDATE reward_history 
--   SET confidence_score = 30,
--       total_rewards_score = health_score,
--       confidence_multiplier = 1.0
--   WHERE confidence_score IS NULL;
