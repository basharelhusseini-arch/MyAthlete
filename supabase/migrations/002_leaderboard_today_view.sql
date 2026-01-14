-- Migration: Create leaderboard_today view
-- Purpose: Efficiently query today's health score rankings
-- Date: 2026-01-14

-- Drop existing view if it exists (safe for re-running migration)
DROP VIEW IF EXISTS leaderboard_today;

-- Create the leaderboard view for today's scores
-- This view ranks users by their health score for the current date (UTC)
-- Uses DENSE_RANK so tied scores get the same rank without gaps
CREATE VIEW leaderboard_today AS
SELECT 
  hs.user_id AS id,
  u.first_name,
  u.last_name,
  hs.score,
  DENSE_RANK() OVER (ORDER BY hs.score DESC) AS rank
FROM health_scores hs
INNER JOIN users u ON hs.user_id = u.id
WHERE hs.date = CURRENT_DATE
ORDER BY hs.score DESC;

-- Grant read access to authenticated users
-- Note: If RLS (Row Level Security) is enabled on the underlying tables,
-- the view will respect those policies via security_invoker mode
ALTER VIEW leaderboard_today SET (security_invoker = true);

-- Optional: Create an index on health_scores.date if not already present
-- This improves view performance significantly
-- The index was already created in 001_initial_schema.sql so this is redundant
-- but included as a comment for documentation purposes.
-- CREATE INDEX IF NOT EXISTS idx_scores_date ON health_scores(date DESC);

-- Success! View created for today's leaderboard queries.
