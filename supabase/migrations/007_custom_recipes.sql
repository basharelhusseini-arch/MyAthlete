-- Create custom_recipes table for user-created recipes
CREATE TABLE IF NOT EXISTS custom_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  servings DECIMAL NOT NULL DEFAULT 1,
  ingredients JSONB NOT NULL, -- Array of {ingredient, grams}
  
  -- Calculated nutrition (total)
  calories INTEGER NOT NULL,
  protein_g DECIMAL NOT NULL,
  carbs_g DECIMAL NOT NULL,
  fat_g DECIMAL NOT NULL,
  fiber_g DECIMAL DEFAULT 0,
  sugar_g DECIMAL DEFAULT 0,
  
  -- Per-serving nutrition
  calories_per_serving INTEGER NOT NULL,
  protein_per_serving DECIMAL NOT NULL,
  carbs_per_serving DECIMAL NOT NULL,
  fat_per_serving DECIMAL NOT NULL,
  
  -- Metadata
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_custom_recipes_user_id ON custom_recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_recipes_public ON custom_recipes(is_public) WHERE is_public = true;

-- Note: No RLS policies since app uses custom JWT authentication
-- Authorization is handled in API routes

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_custom_recipes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER custom_recipes_updated_at
  BEFORE UPDATE ON custom_recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_custom_recipes_updated_at();
