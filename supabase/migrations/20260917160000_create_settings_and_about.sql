/*
  # Create Site Settings and About Content Tables with Security Policies

  1. New Tables
    - `site_settings`
      - `id` (text, primary key, default 'default')
      - `site_name` (text)
      - `professional_name` (text)
      - `site_description` (text)
      - `contact_email` (text)
      - `whatsapp_number` (text)
      - `linkedin_url` (text)
      - `booking_url` (text)
      - `github_url` (text)
      - `twitter_url` (text)
      - `default_seo_title` (text)
      - `default_seo_description` (text)
      - `default_og_image` (text)
      - `canonical_base_url` (text)
      - `updated_at` (timestamptz)

    - `about_content`
      - `id` (text, primary key, default 'default')
      - `profile_intro` (text)
      - `bio_paragraphs` (text array)
      - `experiences` (jsonb array)
      - `tools` (jsonb array)
      - `profile_image` (text)
      - `updated_at` (timestamptz)

  2. Security & RLS
    - Enable RLS on both tables.
    - Public read access (`USING (true)`).
    - Full CRUD access for authenticated admin users.
*/

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

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write site_settings" ON public.site_settings;
CREATE POLICY "Admin write site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read about_content" ON public.about_content;
CREATE POLICY "Public read about_content" ON public.about_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write about_content" ON public.about_content;
CREATE POLICY "Admin write about_content" ON public.about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Initial default records
INSERT INTO public.site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.about_content (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
