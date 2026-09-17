-- Complete Database Schema and Storage Setup for Kishor Hamal Portfolio CMS

-- 1. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  interest text NOT NULL,
  message text NOT NULL,
  budget text,
  notification_email_sent boolean DEFAULT false NOT NULL,
  thank_you_email_sent boolean DEFAULT false NOT NULL,
  notification_email_error text,
  thank_you_email_error text,
  email_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON public.contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_contact_submissions" ON public.contact_submissions;
CREATE POLICY "admin_read_contact_submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated USING (true);

-- Function for tracking email delivery updates
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


-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  image text NOT NULL,
  summary text NOT NULL,
  tags text[] DEFAULT '{}'::text[] NOT NULL,
  result text NOT NULL,
  overview text NOT NULL,
  problem text NOT NULL,
  approach text NOT NULL,
  tools_used text[] DEFAULT '{}'::text[] NOT NULL,
  insight text NOT NULL,
  published boolean DEFAULT true NOT NULL,
  display_order integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admin read all projects" ON public.projects;
CREATE POLICY "Admin read all projects" ON public.projects FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin insert projects" ON public.projects;
CREATE POLICY "Admin insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admin update projects" ON public.projects;
CREATE POLICY "Admin update projects" ON public.projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin delete projects" ON public.projects;
CREATE POLICY "Admin delete projects" ON public.projects FOR DELETE TO authenticated USING (true);


-- 3. Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  cover_image text,
  excerpt text NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}'::text[] NOT NULL,
  reading_time text,
  published boolean DEFAULT false NOT NULL,
  published_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published blogs" ON public.blogs;
CREATE POLICY "Public read published blogs" ON public.blogs FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admin read all blogs" ON public.blogs;
CREATE POLICY "Admin read all blogs" ON public.blogs FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin insert blogs" ON public.blogs;
CREATE POLICY "Admin insert blogs" ON public.blogs FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admin update blogs" ON public.blogs;
CREATE POLICY "Admin update blogs" ON public.blogs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin delete blogs" ON public.blogs;
CREATE POLICY "Admin delete blogs" ON public.blogs FOR DELETE TO authenticated USING (true);


-- 4. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id text PRIMARY KEY DEFAULT 'default',
  site_name text NOT NULL DEFAULT 'Kishor Hamal',
  professional_name text NOT NULL DEFAULT 'Kishor Hamal',
  site_description text NOT NULL DEFAULT 'Marketing Analytics & Growth Specialist with 4+ years of experience in data-driven marketing, performance marketing, and business intelligence.',
  contact_email text NOT NULL DEFAULT 'hello.kishorworks@gmail.com',
  whatsapp_number text NOT NULL DEFAULT '+9779800000000',
  linkedin_url text NOT NULL DEFAULT 'https://linkedin.com/in/kishorhamal',
  booking_url text NOT NULL DEFAULT 'https://cal.com/kishor-hamal-9pejf1/15min',
  github_url text DEFAULT '',
  twitter_url text DEFAULT '',
  default_seo_title text NOT NULL DEFAULT 'Kishor Hamal — Marketing Analytics & Growth Specialist',
  default_seo_description text NOT NULL DEFAULT 'Marketing Analytics & Growth Specialist with 4+ years of experience in data-driven marketing, performance marketing, and business intelligence.',
  default_og_image text DEFAULT '/tracking.webp',
  canonical_base_url text NOT NULL DEFAULT 'https://kishorhamal.com',
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write site_settings" ON public.site_settings;
CREATE POLICY "Admin write site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;


-- 5. About Content Table
CREATE TABLE IF NOT EXISTS public.about_content (
  id text PRIMARY KEY DEFAULT 'default',
  profile_intro text NOT NULL DEFAULT 'I''m a Marketing Analytics & Growth Specialist working at the intersection of data, marketing, and business intelligence. My focus is on turning complex data into clear, actionable decisions that drive business growth.',
  bio_paragraphs text[] DEFAULT ARRAY[
    'With 4+ years of experience managing paid media campaigns, implementing tracking infrastructure, and building analytics dashboards, I help organizations make smarter, data-informed decisions. I''ve worked across e-commerce, SaaS, and agency environments, supporting markets in the USA, UK, Australia, and Nepal.',
    'I''m particularly interested in how marketing data, user behavior signals, and business intelligence tools can work together to create a complete picture of performance — from first click to conversion.',
    'I''m currently exploring opportunities for international remote roles and preparing for master''s programs in MSBA / data analytics to deepen my technical expertise.'
  ]::text[] NOT NULL,
  experiences jsonb DEFAULT '[
    {
      "id": "1",
      "role": "Marketing Analytics & Growth Specialist",
      "company": "Performance Marketing Agency / Freelance",
      "period": "2022 - Present",
      "location": "Kathmandu, Nepal (Remote)",
      "focus": "Managing paid media campaigns across Google Ads and Meta Ads, setting up GA4/GTM tracking infrastructure, and building custom Looker Studio dashboards for international clients."
    },
    {
      "id": "2",
      "role": "Paid Media & Data Specialist",
      "company": "E-Commerce & SaaS Clients",
      "period": "2020 - 2022",
      "location": "Kathmandu, Nepal",
      "focus": "Optimized conversion funnels, conducted A/B testing on landing pages, and implemented server-side tracking (Meta CAPI) to improve attribution accuracy."
    }
  ]'::jsonb NOT NULL,
  tools jsonb DEFAULT '[
    {"id": "1", "name": "Google Ads", "category": "Paid Media"},
    {"id": "2", "name": "Meta Ads", "category": "Paid Media"},
    {"id": "3", "name": "GA4", "category": "Analytics"},
    {"id": "4", "name": "Google Tag Manager", "category": "Tracking"},
    {"id": "5", "name": "Looker Studio", "category": "Reporting"},
    {"id": "6", "name": "Microsoft Clarity", "category": "CRO & UX"},
    {"id": "7", "name": "Meta CAPI", "category": "Tracking"},
    {"id": "8", "name": "Excel / SQL", "category": "Data Analysis"}
  ]'::jsonb NOT NULL,
  profile_image text DEFAULT '/kishor.jpg',
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read about_content" ON public.about_content;
CREATE POLICY "Public read about_content" ON public.about_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write about_content" ON public.about_content;
CREATE POLICY "Admin write about_content" ON public.about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.about_content (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;


-- 6. Storage Bucket Setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read portfolio-media" ON storage.objects;
CREATE POLICY "Public read portfolio-media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin upload portfolio-media" ON storage.objects;
CREATE POLICY "Admin upload portfolio-media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin update portfolio-media" ON storage.objects;
CREATE POLICY "Admin update portfolio-media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin delete portfolio-media" ON storage.objects;
CREATE POLICY "Admin delete portfolio-media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');


-- 7. Seed Initial Projects & Blogs
INSERT INTO public.projects (
  slug, title, image, summary, tags, result, overview, problem, approach, tools_used, insight, published, display_order
)
VALUES
(
  'paid-media-performance-optimization',
  'Paid Media Performance Optimization',
  '/paid-media.webp',
  'Optimized Google Ads and Meta Ads campaigns across e-commerce and SaaS environments using performance data, funnel insights, and creative testing.',
  ARRAY['Google Ads', 'Meta Ads', 'Paid Media', 'Funnel Analysis'],
  'Improved campaign visibility, CTR, and conversion-focused optimization.',
  'Managed and optimized paid media campaigns across Google Ads and Meta Ads for e-commerce and SaaS clients. Focused on data-driven budget allocation, audience targeting, and creative iteration to maximize return on ad spend.',
  'Campaigns were underperforming with low CTR and poor conversion rates. Budget allocation was not data-informed, and creative assets lacked systematic testing.',
  'Conducted a full audit of existing campaigns, restructured account architecture, implemented A/B testing for creatives and landing pages, and used funnel data to reallocate budgets toward high-performing segments.',
  ARRAY['Google Ads', 'Meta Ads', 'GA4', 'GTM', 'Looker Studio'],
  'Funnel drop-off analysis revealed that 60% of users abandoned at the consideration stage. Restructuring campaigns to target mid-funnel intent signals significantly improved conversion rates.',
  true,
  1
),
(
  'marketing-analytics-dashboard',
  'Marketing Analytics Dashboard',
  '/dashboard.webp',
  'Built dashboards using GA4, Looker Studio, and campaign data to make performance trends, ROAS, and funnel movement easier to understand.',
  ARRAY['GA4', 'Looker Studio', 'Dashboard', 'Reporting'],
  'Created clearer decision visibility across channels.',
  'Designed and built comprehensive marketing analytics dashboards that consolidated data from multiple channels into a single view for stakeholders.',
  'Performance data was scattered across platforms with no unified view. Decision-makers lacked real-time visibility into ROAS, funnel metrics, and channel performance.',
  'Connected GA4, Google Ads, and Meta Ads data into Looker Studio. Built modular dashboard sections for channel performance, funnel analysis, and ROAS tracking with automated data refresh.',
  ARRAY['GA4', 'Looker Studio', 'Google Ads', 'Excel', 'SQL'],
  'Centralized dashboards reduced reporting time by 70% and enabled weekly performance reviews instead of monthly, leading to faster optimization cycles.',
  true,
  2
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blogs (
  slug, title, cover_image, excerpt, content, tags, reading_time, published, published_at
)
VALUES
(
  'ga4-server-side-tracking-guide',
  'Server-Side Tracking with GA4 & Meta CAPI: A Complete Guide',
  '/tracking.webp',
  'How server-side tagging restores lost conversion signals, improves data accuracy, and bypasses client-side ad blockers.',
  'Server-side tracking has evolved from a nice-to-have to a critical necessity for modern performance marketers and analytics specialists.',
  ARRAY['GA4', 'GTM', 'CAPI', 'Server-Side Tracking'],
  '5 min read',
  true,
  now()
)
ON CONFLICT (slug) DO NOTHING;
