-- Create bookings table for Classes and Trainer sessions
-- Supports both Supabase Auth and app-level member IDs

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- Using TEXT to support app's memberId
  type TEXT NOT NULL CHECK (type IN ('class', 'trainer_consultation', 'trainer_session')),
  item_id TEXT NOT NULL, -- classId or trainerId
  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'cancelled', 'completed', 'no_show')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient queries
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_type ON bookings(type);

-- RLS Policies (if using Supabase Auth, uncomment and adjust)
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own bookings
-- CREATE POLICY "Users can view own bookings"
--   ON bookings FOR SELECT
--   USING (auth.uid()::text = user_id);

-- Policy: Users can create their own bookings
-- CREATE POLICY "Users can create own bookings"
--   ON bookings FOR INSERT
--   WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can update their own bookings
-- CREATE POLICY "Users can update own bookings"
--   ON bookings FOR UPDATE
--   USING (auth.uid()::text = user_id);

-- Policy: Users can delete their own bookings
-- CREATE POLICY "Users can delete own bookings"
--   ON bookings FOR DELETE
--   USING (auth.uid()::text = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_bookings_updated_at();

-- Comments for documentation
COMMENT ON TABLE bookings IS 'Unified bookings for classes and trainer sessions';
COMMENT ON COLUMN bookings.user_id IS 'Member ID from app (TEXT format for flexibility)';
COMMENT ON COLUMN bookings.type IS 'Type of booking: class, trainer_consultation, or trainer_session';
COMMENT ON COLUMN bookings.item_id IS 'Reference ID - either classId or trainerId';
