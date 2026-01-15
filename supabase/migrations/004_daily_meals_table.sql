-- Create daily_meals table for nutrition tracking
-- Stores user's logged meals from recipes

CREATE TABLE IF NOT EXISTS daily_meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL, -- Using TEXT to support app's memberId
  date DATE NOT NULL,
  recipe_id TEXT NOT NULL,
  servings INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX idx_daily_meals_member_id ON daily_meals(member_id);
CREATE INDEX idx_daily_meals_date ON daily_meals(date);
CREATE INDEX idx_daily_meals_member_date ON daily_meals(member_id, date);

-- Prevent duplicate recipe entries per day
CREATE UNIQUE INDEX idx_daily_meals_unique_recipe_per_day 
  ON daily_meals(member_id, date, recipe_id);

-- RLS Policies (if using Supabase Auth, uncomment and adjust)
-- ALTER TABLE daily_meals ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own meals
-- CREATE POLICY "Users can view own meals"
--   ON daily_meals FOR SELECT
--   USING (auth.uid()::text = member_id);

-- Policy: Users can insert their own meals
-- CREATE POLICY "Users can insert own meals"
--   ON daily_meals FOR INSERT
--   WITH CHECK (auth.uid()::text = member_id);

-- Policy: Users can update their own meals
-- CREATE POLICY "Users can update own meals"
--   ON daily_meals FOR UPDATE
--   USING (auth.uid()::text = member_id);

-- Policy: Users can delete their own meals
-- CREATE POLICY "Users can delete own meals"
--   ON daily_meals FOR DELETE
--   USING (auth.uid()::text = member_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_daily_meals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER daily_meals_updated_at
  BEFORE UPDATE ON daily_meals
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_meals_updated_at();

-- Comments for documentation
COMMENT ON TABLE daily_meals IS 'Daily nutrition log tracking meals from recipes';
COMMENT ON COLUMN daily_meals.member_id IS 'Member ID from app (TEXT format for flexibility)';
COMMENT ON COLUMN daily_meals.recipe_id IS 'Reference to recipe ID from recipes data';
COMMENT ON COLUMN daily_meals.servings IS 'Number of servings consumed (default 1)';
