-- Andragogy expert course tables
CREATE TABLE IF NOT EXISTS andragogy_day_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week INTEGER NOT NULL CHECK (week BETWEEN 1 AND 16),
  day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 5),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE (user_id, week, day)
);

CREATE TABLE IF NOT EXISTS andragogy_day_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week INTEGER NOT NULL CHECK (week BETWEEN 1 AND 16),
  day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 5),
  body TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, week, day)
);

CREATE TABLE IF NOT EXISTS andragogy_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scope TEXT NOT NULL,
  score_pct DOUBLE PRECISION NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS andragogy_gate_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 4),
  item_key TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, phase, item_key)
);

CREATE TABLE IF NOT EXISTS andragogy_diagnostic_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 4),
  attempt_kind TEXT NOT NULL CHECK (attempt_kind IN ('baseline', 'reassessment')),
  score_pct DOUBLE PRECISION NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  skill_scores JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS andragogy_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_ref TEXT,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_andr_progress_user ON andragogy_day_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_andr_notes_user ON andragogy_day_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_andr_quiz_user ON andragogy_quiz_attempts(user_id, scope);
CREATE INDEX IF NOT EXISTS idx_andr_diag_user ON andragogy_diagnostic_attempts(user_id, phase);
