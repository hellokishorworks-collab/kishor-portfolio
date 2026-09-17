export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  image: string;
  summary: string;
  tags: string[];
  result: string;
  overview: string;
  problem: string;
  approach: string;
  toolsUsed: string[];
  insight: string;
  published?: boolean;
  display_order?: number;
  created_at?: string;
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  coverImage?: string | null;
  cover_image?: string | null;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime?: string | null;
  reading_time?: string | null;
  published: boolean;
  publishedAt?: string | null;
  published_at?: string | null;
  created_at?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  focus: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  interest: string;
  message: string;
  budget: string | null;
  notification_email_sent: boolean;
  thank_you_email_sent: boolean;
  notification_error?: string | null;
  thank_you_error?: string | null;
  email_sent_at?: string | null;
  created_at: string;
}

export interface SiteSettings {
  id?: string;
  site_name: string;
  professional_name: string;
  site_description: string;
  contact_email: string;
  whatsapp_number: string;
  linkedin_url: string;
  booking_url: string;
  github_url?: string;
  twitter_url?: string;
  default_seo_title: string;
  default_seo_description: string;
  default_og_image: string;
  canonical_base_url: string;
  updated_at?: string;
}

export interface AboutContent {
  id?: string;
  profile_intro: string;
  bio_paragraphs: string[];
  experiences: Experience[];
  tools: Tool[];
  profile_image: string;
  updated_at?: string;
}