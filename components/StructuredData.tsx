/**
 * StructuredData — Server component.
 * Injects JSON-LD (Person + WebSite) into the document <head> via <script> tags.
 * Must remain a Server Component (no 'use client') so it renders during SSR and is
 * visible to crawlers without JavaScript.
 */

const BASE_URL = 'https://rushik-portfolio.vercel.app';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rushik Sutariya',
  url: BASE_URL,
  jobTitle: 'Frontend Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Vivansh Infotech Pvt Ltd',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  email: 'rushiks.work@gmail.com',
  telephone: '+917043234063',
  sameAs: [
    'https://www.linkedin.com/in/rushik-sutariya',
  ],
  knowsAbout: [
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Socket.io',
    'TanStack Query',
    'Framer Motion',
    'REST APIs',
    'AI/RAG Development',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Rushik Sutariya Portfolio',
  url: BASE_URL,
  description:
    'Portfolio of Rushik Sutariya, a Frontend Developer with 3+ years of experience building production apps in React, Next.js, TypeScript & AI-powered interfaces. Based in Ahmedabad, India.',
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
