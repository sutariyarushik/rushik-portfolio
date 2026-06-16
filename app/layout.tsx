import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rushik Sutariya — Software Developer',
  description:
    'Portfolio of Rushik Sutariya, Software Developer with 3+ years of experience building fast, accessible, and modern web applications with React.js and Next.js for international clients.',
  keywords: [
    'Rushik Sutariya',
    'Software Developer',
    'React Developer',
    'Next.js Developer',
    'Frontend Engineer',
    'Ahmedabad',
    'Portfolio',
  ],
  authors: [{ name: 'Rushik Sutariya' }],
  openGraph: {
    title: 'Rushik Sutariya — Software Developer',
    description:
      'Building fast, accessible, and modern web applications for international clients.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
