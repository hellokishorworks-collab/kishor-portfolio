import { Tool } from '@/types';

export const tools: Tool[] = [
  { id: 'google-ads', name: 'Google Ads', category: 'Advertising' },
  { id: 'meta-ads', name: 'Meta Ads', category: 'Advertising' },
  { id: 'linkedin-ads', name: 'LinkedIn Ads', category: 'Advertising' },
  { id: 'tiktok-ads', name: 'TikTok Ads Manager', category: 'Advertising' },

  { id: 'ga4', name: 'GA4', category: 'Analytics' },
  { id: 'gtm', name: 'GTM (Client + Server)', category: 'Analytics' },
  { id: 'conversion-api', name: 'Conversion APIs (Meta CAPI / EC)', category: 'Analytics' },
  { id: 'bigquery', name: 'BigQuery', category: 'Data' },
  { id: 'clarity', name: 'Microsoft Clarity', category: 'Analytics' },

  { id: 'sql', name: 'SQL', category: 'Data' },
  { id: 'python', name: 'Python', category: 'Data' },

  { id: 'looker-studio', name: 'Looker Studio', category: 'Visualization' },
  { id: 'power-bi', name: 'Power BI', category: 'Visualization' },

  { id: 'zapier', name: 'Zapier', category: 'Automation' },
  { id: 'make', name: 'Make', category: 'Automation' },

  { id: 'premiere-pro', name: 'Adobe Premiere Pro', category: 'Creative' },
  { id: 'after-effects', name: 'After Effects', category: 'Creative' },
  { id: 'davinci-resolve', name: 'DaVinci Resolve', category: 'Creative' },

  { id: 'ab-testing', name: 'A/B Testing', category: 'Experimentation' },
];