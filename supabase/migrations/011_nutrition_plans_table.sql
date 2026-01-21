-- Create nutrition_plans table
CREATE TABLE IF NOT EXISTS nutrition_plans (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  goal TEXT NOT NULL CHECK (goal IN ('weight_loss', 'muscle_gain', 'maintenance', 'performance', 'general_health')),
  duration INTEGER NOT NULL DEFAULT 7,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  
  -- Macro targets (JSONB for flexibility)
  macro_targets JSONB NOT NULL,
  
  -- Meal plan (JSONB array of daily meals)
  meals JSONB,
  
  -- User preferences
  dietary_restrictions TEXT[],
  preferences TEXT[],
  
  -- Metadata
  created_by TEXT DEFAULT 'ai',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  start_date DATE,
  end_date DATE
);

-- Create index for member_id lookups
CREATE INDEX IF NOT EXISTS idx_nutrition_plans_member_id ON nutrition_plans(member_id);

-- Create index for status lookups
CREATE INDEX IF NOT EXISTS idx_nutrition_plans_status ON nutrition_plans(member_id, status);

-- Create index for date range lookups
CREATE INDEX IF NOT EXISTS idx_nutrition_plans_dates ON nutrition_plans(member_id, start_date, end_date);

-- Add comment
COMMENT ON TABLE nutrition_plans IS 'AI-generated personalized nutrition plans for members';
