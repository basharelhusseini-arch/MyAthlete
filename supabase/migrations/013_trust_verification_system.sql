-- ============================================================
-- TRUST & VERIFICATION SYSTEM
-- Philosophy: Additive confidence, never punitive
-- No exclusions, no penalties, no rank-based rules
-- ============================================================

-- ============================================================
-- 1) USER HEALTH PROFILE
-- Stores onboarding goals and wearable preferences
-- ============================================================

CREATE TABLE IF NOT EXISTS user_health_profile (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  goal TEXT NOT NULL CHECK (goal IN ('fat_loss', 'maintenance', 'muscle_gain', 'performance', 'general')),
  has_wearable BOOLEAN DEFAULT false,
  wearable_type TEXT NULL, -- 'whoop', 'garmin', 'apple_watch', 'fitbit', etc.
  wants_wearable_provided TEXT CHECK (wants_wearable_provided IN ('yes', 'no', 'maybe')),
  country TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_user_health_profile_user ON user_health_profile(user_id);
CREATE INDEX idx_user_health_profile_goal ON user_health_profile(goal);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_user_health_profile_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_health_profile_updated
  BEFORE UPDATE ON user_health_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_user_health_profile_timestamp();

-- RLS Policies (users can only see/edit their own)
ALTER TABLE user_health_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_health_profile FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_health_profile FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_health_profile FOR UPDATE
  USING (auth.uid() = user_id);

COMMENT ON TABLE user_health_profile IS 'User goals and wearable preferences - no punishment for lack of wearables';

-- ============================================================
-- 2) VERIFICATION EVENTS
-- Tracks how data was verified (wearable, manual, consistency)
-- Purely informational - NEVER used to exclude or penalize
-- ============================================================

CREATE TABLE IF NOT EXISTS verification_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('sleep', 'workout', 'meal', 'habit', 'health_score')),
  entity_id UUID NULL, -- Reference to specific sleep/workout/meal/habit record
  method TEXT NOT NULL CHECK (method IN ('wearable', 'manual', 'survey', 'consistency_check')),
  status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('none', 'verified', 'flagged', 'skipped')),
  confidence TEXT NOT NULL DEFAULT 'medium' CHECK (confidence IN ('low', 'medium', 'high')),
  multiplier NUMERIC(3,2) DEFAULT 1.0 CHECK (multiplier >= 1.0 AND multiplier <= 1.25), -- ONLY positive multipliers
  metadata JSONB DEFAULT '{}', -- Store check details, survey responses, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX idx_verification_events_user ON verification_events(user_id);
CREATE INDEX idx_verification_events_entity ON verification_events(entity_type, entity_id);
CREATE INDEX idx_verification_events_method ON verification_events(method);
CREATE INDEX idx_verification_events_created ON verification_events(created_at DESC);

-- RLS Policies
ALTER TABLE verification_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own verifications"
  ON verification_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert verifications"
  ON verification_events FOR INSERT
  WITH CHECK (true); -- Only backend can insert

COMMENT ON TABLE verification_events IS 'Verification history - additive confidence only, never reduces scores';
COMMENT ON COLUMN verification_events.multiplier IS 'POSITIVE ONLY: 1.0 (baseline) to 1.25 (max boost)';

-- ============================================================
-- 3) WEARABLE INTEREST LEADS
-- Capture users interested in being provided wearables
-- For future partnerships or device lending programs
-- ============================================================

CREATE TABLE IF NOT EXISTS wearable_interest_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wearable_preference TEXT NULL, -- Preferred device if they have one in mind
  country TEXT NULL,
  consent BOOLEAN DEFAULT true, -- GDPR consent for contact
  notes TEXT NULL, -- Additional context from user
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'fulfilled', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_wearable_leads_user ON wearable_interest_leads(user_id);
CREATE INDEX idx_wearable_leads_status ON wearable_interest_leads(status);
CREATE INDEX idx_wearable_leads_country ON wearable_interest_leads(country);

-- RLS Policies
ALTER TABLE wearable_interest_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own leads"
  ON wearable_interest_leads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own leads"
  ON wearable_interest_leads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

COMMENT ON TABLE wearable_interest_leads IS 'Users who want wearables provided - for partnership programs';

-- ============================================================
-- 4) HELPER FUNCTIONS
-- ============================================================

-- Get user's confidence score (0-100)
CREATE OR REPLACE FUNCTION get_user_confidence_score(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_score INTEGER := 30; -- Baseline confidence
  v_has_wearable BOOLEAN;
  v_verification_count INTEGER;
  v_consistency_passes INTEGER;
  v_days_active INTEGER;
BEGIN
  -- Check if user has wearable (+25)
  SELECT has_wearable INTO v_has_wearable
  FROM user_health_profile
  WHERE user_id = p_user_id;
  
  IF v_has_wearable THEN
    v_score := v_score + 25;
  END IF;
  
  -- Count recent verifications (+10 for consistency checks)
  SELECT COUNT(*) INTO v_consistency_passes
  FROM verification_events
  WHERE user_id = p_user_id
    AND method = 'consistency_check'
    AND status = 'verified'
    AND created_at > NOW() - INTERVAL '30 days';
  
  IF v_consistency_passes >= 3 THEN
    v_score := v_score + 10;
  END IF;
  
  -- Survey completions (+10)
  SELECT COUNT(*) INTO v_verification_count
  FROM verification_events
  WHERE user_id = p_user_id
    AND method = 'survey'
    AND status = 'verified'
    AND created_at > NOW() - INTERVAL '90 days';
  
  IF v_verification_count >= 1 THEN
    v_score := v_score + 10;
  END IF;
  
  -- Long-term consistency (+5 per 30 days active, max +25)
  SELECT EXTRACT(DAY FROM MAX(created_at) - MIN(created_at))::INTEGER / 30 INTO v_days_active
  FROM verification_events
  WHERE user_id = p_user_id;
  
  v_score := v_score + LEAST(v_days_active * 5, 25);
  
  -- Cap at 100
  RETURN LEAST(v_score, 100);
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION get_user_confidence_score IS 'Calculate 0-100 confidence score - purely additive, never reduces health score';

-- ============================================================
-- 5) SEED DATA (OPTIONAL)
-- ============================================================

-- Example: Create profile for existing test users
-- INSERT INTO user_health_profile (user_id, goal, has_wearable, wearable_type)
-- SELECT id, 'general', false, NULL
-- FROM auth.users
-- WHERE NOT EXISTS (SELECT 1 FROM user_health_profile WHERE user_id = auth.users.id)
-- LIMIT 5;

-- ============================================================
-- ROLLBACK (for testing)
-- ============================================================

-- DROP FUNCTION IF EXISTS get_user_confidence_score(UUID);
-- DROP TABLE IF EXISTS wearable_interest_leads CASCADE;
-- DROP TABLE IF EXISTS verification_events CASCADE;
-- DROP TABLE IF EXISTS user_health_profile CASCADE;
