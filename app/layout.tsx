import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kishorhamal.com'),
  title: {
    default: 'Kishor Hamal | Marketing Analytics & Growth Specialist',
    template: '%s | Kishor Hamal',
  },
  description:
    'Marketing Analytics & Growth Specialist focusing on marketing analytics, performance marketing, GA4, GTM, server-side tracking/CAPI, funnel analytics, Looker Studio, BI, and data-driven growth.',
  keywords: [
    'Kishor Hamal',
    'Raj Kishor Hamal',
    'Marketing Analytics Specialist',
    'Growth Specialist',
    'Performance Marketing',
    'GA4',
    'GTM',
    'Server-side Tracking',
    'CAPI',
    'Looker Studio',
    'Business Intelligence',
    'Funnel Analytics',
  ],
  authors: [{ name: 'Raj Kishor Hamal (Kishor Hamal)', url: 'https://kishorhamal.com' }],
  creator: 'Raj Kishor Hamal (Kishor Hamal)',
  publisher: 'Raj Kishor Hamal (Kishor Hamal)',
  alternates: {
    canonical: 'https://kishorhamal.com',
  },
  icons: {
    icon: [
      { url: '/KishorhamalPp.png', type: 'image/png' },
      { url: '/KishorhamalPp.png', sizes: 'any', type: 'image/png' },
    ],
    shortcut: [{ url: '/KishorhamalPp.png', type: 'image/png' }],
    apple: [{ url: '/KishorhamalPp.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'Kishor Hamal | Marketing Analytics & Growth Specialist',
    description:
      'Kishor Hamal helps businesses grow through marketing analytics, data analytics, business intelligence, performance marketing, automation, and AI-powered decision making.',
    url: 'https://kishorhamal.com',
    siteName: 'Kishor Hamal Portfolio',
    images: [
      {
        url: '/KishorhamalPp.png',
        width: 1200,
        height: 630,
        alt: 'Raj Kishor Hamal (Kishor Hamal)',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kishor Hamal | Marketing Analytics & Growth Specialist',
    description:
      'Kishor Hamal helps businesses grow through marketing analytics, data analytics, business intelligence, performance marketing, automation, and AI-powered decision making.',
    images: ['/KishorhamalPp.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raj Kishor Hamal',
  alternateName: 'Kishor Hamal',
  url: 'https://kishorhamal.com',
  image: 'https://kishorhamal.com/KishorhamalPp.png',
  jobTitle: 'Marketing Analytics & Growth Specialist',
  knowsAbout: [
    'Marketing Analytics',
    'Performance Marketing',
    'Google Analytics 4 (GA4)',
    'Google Tag Manager (GTM)',
    'Server-side Tracking & CAPI',
    'Looker Studio & BI',
    'Funnel Analytics',
    'Data-Driven Growth',
  ],
  sameAs: [
    'https://www.linkedin.com/in/kishorhamal-32595935a/',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-inter bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

