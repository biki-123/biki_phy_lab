/*
# Physics Lab & Tutor — Core Schema (single-tenant, no auth)

1. Purpose
   Stores the student's quiz attempts, progress tracking, and weak-area analysis
   for the interactive Physics Lab & Tutor app. Single-tenant: no sign-in screen,
   all data is intentionally shared/public for the app instance.

2. New Tables
   - `quiz_attempts` — one row per quiz/exam attempt.
   - `progress` — aggregated progress per topic.
   - `weak_areas` — topics where the student struggles.

3. Security
   - RLS enabled on all three tables.
   - Policies: anon + authenticated full CRUD (single-tenant, no auth screen).
*/

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mode text NOT NULL DEFAULT 'exam',
  topic text NOT NULL DEFAULT 'general',
  level text NOT NULL DEFAULT 'class11_12',
  score int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  time_seconds int NOT NULL DEFAULT 0,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_select_quiz_attempts" ON quiz_attempts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_insert_quiz_attempts" ON quiz_attempts FOR INSERT
  TO anon, authenticated WITH CHECK (id IS NOT NULL);

DROP POLICY IF EXISTS "anon_update_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_update_quiz_attempts" ON quiz_attempts FOR UPDATE
  TO anon, authenticated USING (id IS NOT NULL) WITH CHECK (id IS NOT NULL);

DROP POLICY IF EXISTS "anon_delete_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_delete_quiz_attempts" ON quiz_attempts FOR DELETE
  TO anon, authenticated USING (id IS NOT NULL);

CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text UNIQUE NOT NULL,
  sessions int NOT NULL DEFAULT 0,
  correct int NOT NULL DEFAULT 0,
  attempted int NOT NULL DEFAULT 0,
  mastery int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_progress" ON progress;
CREATE POLICY "anon_select_progress" ON progress FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_progress" ON progress;
CREATE POLICY "anon_insert_progress" ON progress FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_progress" ON progress;
CREATE POLICY "anon_update_progress" ON progress FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_progress" ON progress;
CREATE POLICY "anon_delete_progress" ON progress FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS weak_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  miss_count int NOT NULL DEFAULT 0,
  last_missed_at timestamptz NOT NULL DEFAULT now(),
  suggestion text NOT NULL DEFAULT ''
);

ALTER TABLE weak_areas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_weak_areas" ON weak_areas;
CREATE POLICY "anon_select_weak_areas" ON weak_areas FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_weak_areas" ON weak_areas;
CREATE POLICY "anon_insert_weak_areas" ON weak_areas FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_weak_areas" ON weak_areas;
CREATE POLICY "anon_update_weak_areas" ON weak_areas FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_weak_areas" ON weak_areas;
CREATE POLICY "anon_delete_weak_areas" ON weak_areas FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_topic ON quiz_attempts(topic);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created ON quiz_attempts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_weak_areas_topic ON weak_areas(topic);
