-- Thrivv MVP Database Schema
-- Copy this entire file and paste into Supabase SQL Editor, then click Run

-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Daily check-ins table
CREATE TABLE IF NOT EXISTS daily_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  did_workout BOOLEAN DEFAULT FALSE,
  calories INT DEFAULT 0,
  sleep_hours NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_date_checkin UNIQUE(user_id, date)
);

-- Indexes for check-ins
CREATE INDEX IF NOT EXISTS idx_checkins_user_id ON daily_checkins(user_id);
CREATE INDEX IF NOT EXISTS idx_checkins_date ON daily_checkins(date DESC);
CREATE INDEX IF NOT EXISTS idx_checkins_user_date ON daily_checkins(user_id, date DESC);

-- Health scores table
CREATE TABLE IF NOT EXISTS health_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  score INT NOT NULL CHECK (score >= 0 AND score <= 100),
  training_score INT NOT NULL CHECK (training_score >= 0 AND training_score <= 30),
  diet_score INT NOT NULL CHECK (diet_score >= 0 AND diet_score <= 40),
  sleep_score INT NOT NULL CHECK (sleep_score >= 0 AND sleep_score <= 30),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_date_score UNIQUE(user_id, date)
);

-- Indexes for scores
CREATE INDEX IF NOT EXISTS idx_scores_user_id ON health_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_scores_date ON health_scores(date DESC);
CREATE INDEX IF NOT EXISTS idx_scores_user_date ON health_scores(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_scores_score ON health_scores(score DESC);

-- Success! Tables created. Check Table Editor to verify.
