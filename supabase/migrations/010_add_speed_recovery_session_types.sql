-- Add 'speed' and 'recovery' session types to workouts table
-- Required for Athletic Performance programs

-- Drop the old constraint
ALTER TABLE workouts DROP CONSTRAINT IF EXISTS workouts_session_type_check;

-- Add new constraint with all session types
ALTER TABLE workouts ADD CONSTRAINT workouts_session_type_check 
  CHECK (session_type IN ('strength', 'hypertrophy', 'conditioning', 'power', 'deload', 'speed', 'recovery'));

-- Add columns for split-based programming (if they don't exist)
ALTER TABLE workouts ADD COLUMN IF NOT EXISTS day_theme TEXT;
ALTER TABLE workouts ADD COLUMN IF NOT EXISTS purpose TEXT;

-- Add comment
COMMENT ON COLUMN workouts.session_type IS 'Type of training session: strength, hypertrophy, conditioning, power, deload, speed, or recovery';
COMMENT ON COLUMN workouts.day_theme IS 'Clear label for the workout day (e.g., "Push (Chest/Shoulders/Triceps)")';
COMMENT ON COLUMN workouts.purpose IS 'Brief description of the workout''s training focus';
