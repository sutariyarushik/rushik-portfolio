import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import StructuredData from '@/components/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://rushik-portfolio.vercel.app'),

  title: {
    default:
      'Rushik Sutariya | Senior Frontend Developer — React, Next.js & TypeScript',
    template: '%s | Rushik Sutariya',
  },

  description:
    'Rushik Sutariya is a Frontend Developer with 3+ years building production apps in React, Next.js, TypeScript & AI-powered interfaces. Based in Ahmedabad, India.',

  keywords: [
    'Rushik Sutariya',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Senior Frontend Engineer',
    'Ahmedabad Developer',
    'React.js Portfolio',
    'AI RAG Developer',
    'Software Developer India',
  ],

  authors: [{ name: 'Rushik Sutariya', url: 'https://rushik-portfolio.vercel.app' }],
  creator: 'Rushik Sutariya',
  publisher: 'Rushik Sutariya',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: 'https://rushik-portfolio.vercel.app',
    title:
      'Rushik Sutariya | Senior Frontend Developer — React, Next.js & TypeScript',
    description:
      'Rushik Sutariya is a Frontend Developer with 3+ years building production apps in React, Next.js, TypeScript & AI-powered interfaces. Based in Ahmedabad, India.',
    siteName: 'Rushik Sutariya Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Rushik Sutariya — Frontend Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Rushik Sutariya | Senior Frontend Developer — React, Next.js & TypeScript',
    description:
      'Rushik Sutariya is a Frontend Developer with 3+ years building production apps in React, Next.js, TypeScript & AI-powered interfaces. Based in Ahmedabad, India.',
    images: ['/opengraph-image'],
  },

  icons: {
    icon: '/favicon.ico',
  },

  verification: {
    google: 'googlef42cd972b6717a28',
  },

  category: 'technology',
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
