import React from 'react';
import { Metadata } from 'next';
import TermsOfService from '../../_components/terms-content';

export const metadata: Metadata = {
  title: 'Terms of Service | Infloq - AI-Powered Influencer Marketing Platform',
  description: 'Read and understand the Terms of Service for Infloq. Learn about your rights, responsibilities, and our platform policies for both brands and creators using our AI-powered influencer marketing platform.',
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: 'Terms of Service | Infloq - Influencer Marketing Platform',
    description: 'Understand your rights and obligations when using Infloq\'s AI-powered influencer marketing platform. Clear terms for brands and creators ensuring transparent collaboration.',
    url: 'https://infloq.com/terms',
    siteName: 'Infloq',
    type: 'website',
    images: [
      {
        url: "/images/terms-og.png",
        width: 1200,
        height: 630,
        alt: 'Infloq Terms of Service',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Infloq - Influencer Marketing Platform',
    description: 'Clear, comprehensive terms governing the use of Infloq\'s influencer marketing platform. Understanding your rights and responsibilities.',
    site: '@infloq',
    creator: '@infloq',
    images: ["/images/terms-og.png"],
  },
  keywords: [
    'Infloq terms of service',
    'influencer marketing terms',
    'creator platform agreement',
    'brand collaboration terms',
    'AI matchmaking platform terms',
    'influencer marketing policies',
    'content creator agreement',
    'brand partnership terms'
  ],
  authors: [
    {
      name: 'Infloq Legal Team',
      url: 'https://infloq.com/legal',
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Legal',
}

const TermsPage: React.FC = () => {
    return <TermsOfService />;
};

export default TermsPage;