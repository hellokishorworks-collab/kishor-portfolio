/*
  # Storage Bucket Migration for Portfolio Media

  1. Storage Bucket
    - Creates `portfolio-media` public bucket for project and blog images.

  2. Storage Policies
    - Public SELECT access.
    - Authenticated INSERT, UPDATE, DELETE access for admin users.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access policy
DROP POLICY IF EXISTS "Public read portfolio-media" ON storage.objects;
CREATE POLICY "Public read portfolio-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Authenticated admin policies
DROP POLICY IF EXISTS "Admin upload portfolio-media" ON storage.objects;
CREATE POLICY "Admin upload portfolio-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin update portfolio-media" ON storage.objects;
CREATE POLICY "Admin update portfolio-media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin delete portfolio-media" ON storage.objects;
CREATE POLICY "Admin delete portfolio-media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-media');
