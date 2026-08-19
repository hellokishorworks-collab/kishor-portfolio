-- Add email delivery tracking columns to contact_submissions
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS notification_email_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS thank_you_email_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS notification_email_error text,
  ADD COLUMN IF NOT EXISTS thank_you_email_error text,
  ADD COLUMN IF NOT EXISTS email_sent_at timestamptz;
