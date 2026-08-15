/*
# Create contact_submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — full name of the person contacting
  - `email` (text, not null) — email address for replies
  - `company` (text, nullable) — optional company/organization
  - `interest` (text, not null) — type of inquiry (Remote Role, Freelance Project, Consulting, Collaboration, Other)
  - `message` (text, not null) — the message body
  - `budget` (text, nullable) — optional project/budget info
  - `created_at` (timestamptz, defaults to now()) — submission timestamp

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated to INSERT (public contact form must be able to submit).
- No SELECT/UPDATE/DELETE policies — visitors cannot read, modify, or delete submissions.
- Only the service-role key (server-side, never exposed to frontend) can read submissions.

3. Important Notes
- This is a no-auth public contact form, so the anon role must be able to insert.
- Submissions are NOT readable by the public — only the service role can access them.
- created_at is automatically set by the database default.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  interest text NOT NULL,
  message text NOT NULL,
  budget text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);