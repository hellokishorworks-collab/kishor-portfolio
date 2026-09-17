import { supabase } from '@/lib/supabase';
import { projects as staticProjects } from '@/data/projects';
import { Project, BlogPost, SiteSettings, AboutContent, Experience, Tool } from '@/types';

export const staticBlogs: BlogPost[] = [

  {
    id: '1',
    slug: 'ga4-server-side-tracking-guide',
    title: 'Server-Side Tracking with GA4 & Meta CAPI: A Complete Guide',
    excerpt: 'How server-side tagging restores lost conversion signals, improves data accuracy, and bypasses client-side ad blockers.',
    content: `Server-side tracking has evolved from a nice-to-have to a critical necessity for modern performance marketers and analytics specialists.

## Why Client-Side Tracking Is Losing Accuracy

Browser restrictions such as ITP (Intelligent Tracking Prevention), ad blockers, and cookie expiration limits mean that traditional client-side JavaScript pixels miss 15% to 30% of conversion events.

## Enter Server-Side Tagging & Meta CAPI

By routing event data through a server container (like Google Tag Manager Server Container), data is processed server-to-server:

1. **First-Party Cookies**: Extends cookie lifetime under your primary domain.
2. **Meta Conversions API (CAPI)**: Sends conversion events directly to Meta servers with high Match Quality.
3. **Data Control**: Redacts PII before sending data to third parties.

## Key Setup Steps

- Deploy a Server GTM container on Google Cloud Platform or Stape.
- Configure Web GTM to send GA4 events to the Server GTM endpoint.
- Add Meta CAPI Client & Tag in Server GTM.
- Deduplicate web and server events using a shared \`event_id\`.

## Measurable Results

Implementing server-side tracking typically recovers 20-30% of lost conversion data, boosting ad account attribution and algorithm optimization.`,
    coverImage: '/tracking.webp',
    tags: ['GA4', 'GTM', 'CAPI', 'Server-Side Tracking'],
    readingTime: '5 min read',
    published: true,
    publishedAt: '2026-08-10T00:00:00.000Z',
  },
  {
    id: '2',
    slug: 'building-actionable-looker-studio-dashboards',
    title: 'Designing Looker Studio Dashboards That Drive Action',
    excerpt: 'Stop building clutter. Learn how to structure marketing analytics dashboards around decision hierarchies and funnel metrics.',
    content: `Many analytics dashboards end up as unused charts. The problem isn't the data — it's the structure.

## The Rule of 3 Dashboard Hierarchy

1. **Executive Overview**: High-level ROAS, revenue, CPA, and MoM growth.
2. **Channel Performance**: Breakdown by Google Ads, Meta Ads, Organic, and Email.
3. **Diagnostic Funnel**: Micro-conversions, drop-off rates, and page performance.

## Best Practices in Looker Studio

- **Color Discipline**: Use accent colors only for key metrics and alerts.
- **Blended Data**: Connect GA4 and Google Ads carefully on date & campaign IDs.
- **Automated Refresh**: Keep stakeholders looking at live performance data.`,
    coverImage: '/dashboard.webp',
    tags: ['Looker Studio', 'GA4', 'Business Intelligence', 'Dashboards'],
    readingTime: '4 min read',
    published: true,
    publishedAt: '2026-08-25T00:00:00.000Z',
  },
];

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return staticProjects;
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      image: item.image,
      summary: item.summary,
      tags: item.tags || [],
      result: item.result,
      overview: item.overview,
      problem: item.problem,
      approach: item.approach,
      toolsUsed: item.tools_used || [],
      insight: item.insight,
      published: item.published,
      display_order: item.display_order,
      created_at: item.created_at,
    }));
  } catch {
    return staticProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error || !data) {
      const found = staticProjects.find((p) => p.slug === slug);
      return found || null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      image: data.image,
      summary: data.summary,
      tags: data.tags || [],
      result: data.result,
      overview: data.overview,
      problem: data.problem,
      approach: data.approach,
      toolsUsed: data.tools_used || [],
      insight: data.insight,
      published: data.published,
      display_order: data.display_order,
      created_at: data.created_at,
    };
  } catch {
    const found = staticProjects.find((p) => p.slug === slug);
    return found || null;
  }
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return staticBlogs;
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      coverImage: item.cover_image,
      cover_image: item.cover_image,
      excerpt: item.excerpt,
      content: item.content,
      tags: item.tags || [],
      readingTime: item.reading_time,
      reading_time: item.reading_time,
      published: item.published,
      publishedAt: item.published_at,
      published_at: item.published_at,
      created_at: item.created_at,
    }));
  } catch {
    return staticBlogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error || !data) {
      const found = staticBlogs.find((b) => b.slug === slug);
      return found || null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      coverImage: data.cover_image,
      cover_image: data.cover_image,
      excerpt: data.excerpt,
      content: data.content,
      tags: data.tags || [],
      readingTime: data.reading_time,
      reading_time: data.reading_time,
      published: data.published,
      publishedAt: data.published_at,
      published_at: data.published_at,
      created_at: data.created_at,
    };
  } catch {
    const found = staticBlogs.find((b) => b.slug === slug);
    return found || null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const defaultSettings: SiteSettings = {
    id: 'default',
    site_name: 'Kishor Hamal',
    professional_name: 'Kishor Hamal',
    site_description:
      'Marketing Analytics & Growth Specialist with 4+ years of experience in data-driven marketing, performance marketing, and business intelligence.',
    contact_email: 'hello.kishorworks@gmail.com',
    whatsapp_number: '+9779800000000',
    linkedin_url: 'https://linkedin.com/in/kishorhamal',
    booking_url: 'https://cal.com/kishor-hamal-9pejf1/15min',
    github_url: '',
    twitter_url: '',
    default_seo_title: 'Kishor Hamal — Marketing Analytics & Growth Specialist',
    default_seo_description:
      'Marketing Analytics & Growth Specialist with 4+ years of experience in data-driven marketing, performance marketing, and business intelligence.',
    default_og_image: '/tracking.webp',
    canonical_base_url: 'https://kishorhamal.com',
  };

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error || !data) return defaultSettings;
    return { ...defaultSettings, ...data };
  } catch {
    return defaultSettings;
  }
}

export async function getAboutContent(): Promise<AboutContent> {
  const defaultAbout: AboutContent = {
    id: 'default',
    profile_intro:
      "I'm a Marketing Analytics & Growth Specialist working at the intersection of data, marketing, and business intelligence. My focus is on turning complex data into clear, actionable decisions that drive business growth.",
    bio_paragraphs: [
      "With 4+ years of experience managing paid media campaigns, implementing tracking infrastructure, and building analytics dashboards, I help organizations make smarter, data-informed decisions. I've worked across e-commerce, SaaS, and agency environments, supporting markets in the USA, UK, Australia, and Nepal.",
      "I'm particularly interested in how marketing data, user behavior signals, and business intelligence tools can work together to create a complete picture of performance — from first click to conversion.",
      "I'm currently exploring opportunities for international remote roles and preparing for master's programs in MSBA / data analytics to deepen my technical expertise.",
    ],
    experiences: [
      {
        id: '1',
        role: 'Marketing Analytics & Growth Specialist',
        company: 'Performance Marketing Agency / Freelance',
        period: '2022 - Present',
        location: 'Kathmandu, Nepal (Remote)',
        focus:
          'Managing paid media campaigns across Google Ads and Meta Ads, setting up GA4/GTM tracking infrastructure, and building custom Looker Studio dashboards for international clients.',
      },
      {
        id: '2',
        role: 'Paid Media & Data Specialist',
        company: 'E-Commerce & SaaS Clients',
        period: '2020 - 2022',
        location: 'Kathmandu, Nepal',
        focus:
          'Optimized conversion funnels, conducted A/B testing on landing pages, and implemented server-side tracking (Meta CAPI) to improve attribution accuracy.',
      },
    ],
    tools: [
      { id: '1', name: 'Google Ads', category: 'Paid Media' },
      { id: '2', name: 'Meta Ads', category: 'Paid Media' },
      { id: '3', name: 'GA4', category: 'Analytics' },
      { id: '4', name: 'Google Tag Manager', category: 'Tracking' },
      { id: '5', name: 'Looker Studio', category: 'Reporting' },
      { id: '6', name: 'Microsoft Clarity', category: 'CRO & UX' },
      { id: '7', name: 'Meta CAPI', category: 'Tracking' },
      { id: '8', name: 'Excel / SQL', category: 'Data Analysis' },
    ],
    profile_image: '/kishor.jpg',
  };

  try {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error || !data) return defaultAbout;
    return { ...defaultAbout, ...data };
  } catch {
    return defaultAbout;
  }
}


