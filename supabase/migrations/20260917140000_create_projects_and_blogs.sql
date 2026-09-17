/*
  # Create Projects and Blogs Tables with Security Policies

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `slug` (text, unique, not null)
      - `title` (text, not null)
      - `image` (text, not null)
      - `summary` (text, not null)
      - `tags` (text array, default empty)
      - `result` (text, not null)
      - `overview` (text, not null)
      - `problem` (text, not null)
      - `approach` (text, not null)
      - `tools_used` (text array, default empty)
      - `insight` (text, not null)
      - `published` (boolean, default true)
      - `display_order` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `blogs`
      - `id` (uuid, primary key)
      - `slug` (text, unique, not null)
      - `title` (text, not null)
      - `cover_image` (text, nullable)
      - `excerpt` (text, not null)
      - `content` (text, not null)
      - `tags` (text array, default empty)
      - `reading_time` (text, nullable)
      - `published` (boolean, default false)
      - `published_at` (timestamptz, nullable)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security & RLS
    - Enable RLS on both tables.
    - Public read access for published items (`published = true`).
    - Full CRUD access for authenticated admin users.

  3. Seed Data
    - Populate initial projects from existing portfolio content.
*/

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Projects RLS Policies
DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
CREATE POLICY "Public read published projects"
  ON public.projects FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Admin read all projects" ON public.projects;
CREATE POLICY "Admin read all projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin insert projects" ON public.projects;
CREATE POLICY "Admin insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin update projects" ON public.projects;
CREATE POLICY "Admin update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin delete projects" ON public.projects;
CREATE POLICY "Admin delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- Blogs RLS Policies
DROP POLICY IF EXISTS "Public read published blogs" ON public.blogs;
CREATE POLICY "Public read published blogs"
  ON public.blogs FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Admin read all blogs" ON public.blogs;
CREATE POLICY "Admin read all blogs"
  ON public.blogs FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin insert blogs" ON public.blogs;
CREATE POLICY "Admin insert blogs"
  ON public.blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin update blogs" ON public.blogs;
CREATE POLICY "Admin update blogs"
  ON public.blogs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin delete blogs" ON public.blogs;
CREATE POLICY "Admin delete blogs"
  ON public.blogs FOR DELETE
  TO authenticated
  USING (true);

-- Initial Projects Seed Data
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
),
(
  'tracking-measurement-setup',
  'Tracking & Measurement Setup',
  '/tracking.webp',
  'Implemented GA4, GTM, Meta Pixel, CAPI, and event tracking to improve data accuracy and attribution across campaigns.',
  ARRAY['GA4', 'GTM', 'Meta Pixel', 'CAPI'],
  'Improved tracking reliability for optimization and reporting.',
  'Implemented a comprehensive tracking and measurement infrastructure to ensure accurate data collection, attribution, and reporting across all marketing channels.',
  'Tracking was fragmented with missing events, inconsistent naming, and no server-side backup. Attribution data was unreliable, leading to poor optimization decisions.',
  'Set up GA4 with custom events and conversions, configured GTM for centralized tag management, implemented Meta Pixel with CAPI for server-side tracking, and established a consistent event naming convention.',
  ARRAY['GA4', 'GTM', 'Meta Pixel', 'CAPI', 'Zapier'],
  'Server-side tracking via CAPI recovered 25% of conversion data lost to browser restrictions and ad blockers, significantly improving attribution accuracy.',
  true,
  3
),
(
  'funnel-user-behavior-analysis',
  'Funnel & User Behavior Analysis',
  '/clarity.webp',
  'Used Microsoft Clarity, heatmaps, session recordings, and event flow data to identify conversion friction and user drop-off points.',
  ARRAY['Microsoft Clarity', 'CRO', 'Funnel Analysis', 'UX'],
  'Improved understanding of conversion gaps and user behavior.',
  'Analyzed user behavior across key conversion funnels using session recordings, heatmaps, and event flow data to identify and address friction points.',
  'Conversion rates were declining but the root causes were unclear. Quantitative data showed drop-offs but lacked the context needed to understand why users were leaving.',
  'Implemented Microsoft Clarity for session recordings and heatmaps, mapped user journeys through key funnels, identified high-friction pages, and recommended UX improvements based on behavioral patterns.',
  ARRAY['Microsoft Clarity', 'GA4', 'GTM', 'Looker Studio'],
  'Heatmap analysis revealed that 40% of users never scrolled past the hero section on landing pages, leading to a redesign that moved key CTAs above the fold.',
  true,
  4
)
ON CONFLICT (slug) DO NOTHING;
