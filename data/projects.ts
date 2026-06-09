import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'paid-media-performance-optimization',
    title: 'Paid Media Performance Optimization',
    image: '/paid-media.webp',
    summary:
      'Optimized Google Ads and Meta Ads campaigns across e-commerce and SaaS environments using performance data, funnel insights, and creative testing.',
    tags: ['Google Ads', 'Meta Ads', 'Paid Media', 'Funnel Analysis'],
    result:
      'Improved campaign visibility, CTR, and conversion-focused optimization.',
    overview:
      'Managed and optimized paid media campaigns across Google Ads and Meta Ads for e-commerce and SaaS clients. Focused on data-driven budget allocation, audience targeting, and creative iteration to maximize return on ad spend.',
    problem:
      'Campaigns were underperforming with low CTR and poor conversion rates. Budget allocation was not data-informed, and creative assets lacked systematic testing.',
    approach:
      'Conducted a full audit of existing campaigns, restructured account architecture, implemented A/B testing for creatives and landing pages, and used funnel data to reallocate budgets toward high-performing segments.',
    toolsUsed: ['Google Ads', 'Meta Ads', 'GA4', 'GTM', 'Looker Studio'],
    insight:
      'Funnel drop-off analysis revealed that 60% of users abandoned at the consideration stage. Restructuring campaigns to target mid-funnel intent signals significantly improved conversion rates.',
  },
  {
    slug: 'marketing-analytics-dashboard',
    title: 'Marketing Analytics Dashboard',
    image: '/dashboard.webp',
    summary:
      'Built dashboards using GA4, Looker Studio, and campaign data to make performance trends, ROAS, and funnel movement easier to understand.',
    tags: ['GA4', 'Looker Studio', 'Dashboard', 'Reporting'],
    result: 'Created clearer decision visibility across channels.',
    overview:
      'Designed and built comprehensive marketing analytics dashboards that consolidated data from multiple channels into a single view for stakeholders.',
    problem:
      'Performance data was scattered across platforms with no unified view. Decision-makers lacked real-time visibility into ROAS, funnel metrics, and channel performance.',
    approach:
      'Connected GA4, Google Ads, and Meta Ads data into Looker Studio. Built modular dashboard sections for channel performance, funnel analysis, and ROAS tracking with automated data refresh.',
    toolsUsed: ['GA4', 'Looker Studio', 'Google Ads', 'Excel', 'SQL'],
    insight:
      'Centralized dashboards reduced reporting time by 70% and enabled weekly performance reviews instead of monthly, leading to faster optimization cycles.',
  },
  {
    slug: 'tracking-measurement-setup',
    title: 'Tracking & Measurement Setup',
    image: '/tracking.webp',
    summary:
      'Implemented GA4, GTM, Meta Pixel, CAPI, and event tracking to improve data accuracy and attribution across campaigns.',
    tags: ['GA4', 'GTM', 'Meta Pixel', 'CAPI'],
    result: 'Improved tracking reliability for optimization and reporting.',
    overview:
      'Implemented a comprehensive tracking and measurement infrastructure to ensure accurate data collection, attribution, and reporting across all marketing channels.',
    problem:
      'Tracking was fragmented with missing events, inconsistent naming, and no server-side backup. Attribution data was unreliable, leading to poor optimization decisions.',
    approach:
      'Set up GA4 with custom events and conversions, configured GTM for centralized tag management, implemented Meta Pixel with CAPI for server-side tracking, and established a consistent event naming convention.',
    toolsUsed: ['GA4', 'GTM', 'Meta Pixel', 'CAPI', 'Zapier'],
    insight:
      'Server-side tracking via CAPI recovered 25% of conversion data lost to browser restrictions and ad blockers, significantly improving attribution accuracy.',
  },
  {
    slug: 'funnel-user-behavior-analysis',
    title: 'Funnel & User Behavior Analysis',
    image: '/clarity.webp',
    summary:
      'Used Microsoft Clarity, heatmaps, session recordings, and event flow data to identify conversion friction and user drop-off points.',
    tags: ['Microsoft Clarity', 'CRO', 'Funnel Analysis', 'UX'],
    result: 'Improved understanding of conversion gaps and user behavior.',
    overview:
      'Analyzed user behavior across key conversion funnels using session recordings, heatmaps, and event flow data to identify and address friction points.',
    problem:
      'Conversion rates were declining but the root causes were unclear. Quantitative data showed drop-offs but lacked the context needed to understand why users were leaving.',
    approach:
      'Implemented Microsoft Clarity for session recordings and heatmaps, mapped user journeys through key funnels, identified high-friction pages, and recommended UX improvements based on behavioral patterns.',
    toolsUsed: ['Microsoft Clarity', 'GA4', 'GTM', 'Looker Studio'],
    insight:
      'Heatmap analysis revealed that 40% of users never scrolled past the hero section on landing pages, leading to a redesign that moved key CTAs above the fold.',
  },
];