-- Security Definer function to update email tracking columns on a contact submission.
-- Allows the anon role (public contact form) to update tracking columns without
-- exposing a general UPDATE policy on the table.

CREATE OR REPLACE FUNCTION public.update_contact_email_tracking(
  p_id uuid,
  p_notification_sent boolean,
  p_thank_you_sent boolean,
  p_notification_error text,
  p_thank_you_error text,
  p_email_sent_at timestamptz
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE contact_submissions
  SET
    notification_email_sent = p_notification_sent,
    thank_you_email_sent = p_thank_you_sent,
    notification_email_error = p_notification_error,
    thank_you_email_error = p_thank_you_error,
    email_sent_at = p_email_sent_at
  WHERE id = p_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_contact_email_tracking(
  uuid, boolean, boolean, text, text, timestamptz
) TO anon, authenticated;
