-- ============================================
-- PRIVACY-SAFE ANTI-FRAUD SYSTEM
-- ============================================
-- Creates tables for risk scoring without storing sensitive data
-- - No raw IPs (only /24 prefix)
-- - No keystroke content (only timing features)
-- - Device IDs are first-party cookies (not fingerprints)

-- 1. Device Registry: Track devices per user
CREATE TABLE IF NOT EXISTS device_registry (
  device_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ua_family TEXT,
  os_family TEXT,
  browser_family TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_device_registry_user_id ON device_registry(user_id);
CREATE INDEX IF NOT EXISTS idx_device_registry_last_seen ON device_registry(last_seen_at);

COMMENT ON TABLE device_registry IS 'First-party device tracking (httpOnly cookie) - no fingerprinting';
COMMENT ON COLUMN device_registry.device_id IS 'UUID from httpOnly cookie (server-side)';

-- 2. Risk Events: Log security events (no raw IPs)
CREATE TABLE IF NOT EXISTS risk_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  device_id TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('login', 'signup', 'reward_redeem', 'payment', 'profile_edit', 'password_change')),
  ip_prefix TEXT, -- Only /24 prefix (e.g., "192.168.1.0/24"), never raw IP
  ua_family TEXT,
  os_family TEXT,
  browser_family TEXT,
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  action TEXT CHECK (action IN ('allow', 'step_up', 'hold', 'block')),
  reasons JSONB, -- Array of risk reasons
  typing_features JSONB, -- Optional: typing timing (no content)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_risk_events_user_id ON risk_events(user_id);
CREATE INDEX IF NOT EXISTS idx_risk_events_device_id ON risk_events(device_id);
CREATE INDEX IF NOT EXISTS idx_risk_events_created_at ON risk_events(created_at);
CREATE INDEX IF NOT EXISTS idx_risk_events_user_created ON risk_events(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_risk_events_event_type ON risk_events(event_type);

COMMENT ON TABLE risk_events IS 'Security events log - privacy-safe (no raw IPs, no keystroke content)';
COMMENT ON COLUMN risk_events.ip_prefix IS 'Coarse IP prefix (/24) - never store raw IP for privacy';
COMMENT ON COLUMN risk_events.typing_features IS 'Timing features only (dwell, flight, backspace) - NO keystroke content';

-- 3. Risk User Features: Precomputed features for faster scoring
CREATE TABLE IF NOT EXISTS risk_user_features (
  user_id TEXT PRIMARY KEY,
  account_age_days INTEGER,
  device_degree INTEGER DEFAULT 0, -- How many devices this user has used
  ip_degree INTEGER DEFAULT 0, -- How many IP prefixes seen
  avg_typing_dwell NUMERIC,
  std_typing_dwell NUMERIC,
  avg_typing_flight NUMERIC,
  std_typing_flight NUMERIC,
  typing_baseline_count INTEGER DEFAULT 0, -- How many samples in baseline
  last_computed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_risk_user_features_last_computed ON risk_user_features(last_computed_at);

COMMENT ON TABLE risk_user_features IS 'Precomputed risk features per user (updated by cron)';
COMMENT ON COLUMN risk_user_features.device_degree IS 'Number of unique devices in last 7 days';
COMMENT ON COLUMN risk_user_features.ip_degree IS 'Number of unique IP prefixes in last 7 days';
COMMENT ON COLUMN risk_user_features.typing_baseline_count IS 'Number of typing samples used for baseline';

-- 4. Enable Row Level Security (RLS)
ALTER TABLE device_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_user_features ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only service role can access (no direct client access)
-- This ensures the API route (using service role) controls all access

-- Device registry: service role only
CREATE POLICY "Service role only - device_registry" ON device_registry
  FOR ALL USING (false);

-- Risk events: service role only
CREATE POLICY "Service role only - risk_events" ON risk_events
  FOR ALL USING (false);

-- Risk user features: service role only
CREATE POLICY "Service role only - risk_user_features" ON risk_user_features
  FOR ALL USING (false);

-- Add comments
COMMENT ON POLICY "Service role only - device_registry" ON device_registry IS 'Fraud detection data - API route access only';
COMMENT ON POLICY "Service role only - risk_events" ON risk_events IS 'Security events - API route access only';
COMMENT ON POLICY "Service role only - risk_user_features" ON risk_user_features IS 'Risk features - API route access only';
