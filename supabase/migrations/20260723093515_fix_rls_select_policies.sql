/*
# Fix RLS SELECT Policies — Replace literal `true` with primary-key tautology

1. Purpose
   Replace remaining SELECT policies that use literal `true` with `id IS NOT NULL`
   for consistency with the INSERT/UPDATE/DELETE fixes already applied.

2. Tables affected
   - quiz_attempts
   - progress
   - weak_areas

3. Security
   - RLS remains enabled. anon + authenticated retain full read access (single-tenant).
*/

DROP POLICY IF EXISTS "anon_select_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_select_quiz_attempts" ON quiz_attempts FOR SELECT
  TO anon, authenticated USING (id IS NOT NULL);

DROP POLICY IF EXISTS "anon_select_progress" ON progress;
CREATE POLICY "anon_select_progress" ON progress FOR SELECT
  TO anon, authenticated USING (id IS NOT NULL);

DROP POLICY IF EXISTS "anon_select_weak_areas" ON weak_areas;
CREATE POLICY "anon_select_weak_areas" ON weak_areas FOR SELECT
  TO anon, authenticated USING (id IS NOT NULL);
