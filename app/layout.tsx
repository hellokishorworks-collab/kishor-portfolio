import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
  title: 'Kishor Hamal | Marketing Analytics & Growth Specialist',
  description:
    'Kishor Hamal helps businesses grow through marketing analytics, data analytics, business intelligence, performance marketing, automation, and AI-powered decision making.',
  keywords: [
    'Marketing Analytics',
    'Growth Specialist',
    'Performance Marketing',
    'GA4',
    'GTM',
    'Data Visualization',
    'Business Intelligence',
    'Kishor Hamal',
  ],
  authors: [{ name: 'Kishor Hamal' }],
  openGraph: {
    title: 'Kishor Hamal | Marketing Analytics & Growth Specialist',
    description:
      'Kishor Hamal helps businesses grow through marketing analytics, data analytics, business intelligence, performance marketing, automation, and AI-powered decision making.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kishor Hamal | Marketing Analytics & Growth Specialist',
    description:
      'Kishor Hamal helps businesses grow through marketing analytics, data analytics, business intelligence, performance marketing, automation, and AI-powered decision making.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} dark`}>
      <body className="font-inter bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
