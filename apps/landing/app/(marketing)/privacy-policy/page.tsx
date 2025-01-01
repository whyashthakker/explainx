import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicy from '../../_components/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Infloq',
  description: 'Learn about how Infloq collects, uses, and protects your personal information. Our comprehensive privacy policy outlines our commitment to data security and privacy in influencer marketing.',
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: 'Privacy Policy | Infloq - Influencer Marketing Platform',
    description: 'Understand how Infloq protects your data while connecting brands with creators. Our privacy policy details our commitment to secure, transparent, and ethical data practices in influencer marketing.',
    url: 'https://infloq.com/privacy-policy',
    siteName: 'Infloq',
    type: 'website',
    images: [
      {
        url: "/images/main/landing.png",
        width: 1200,
        height: 630,
        alt: 'Infloq Privacy Policy',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Infloq - Influencer Marketing Platform',
    description: 'Discover how Infloq safeguards your data while revolutionizing influencer marketing. Our privacy policy ensures transparent and secure data handling.',
    site: '@infloq',
    creator: '@infloq',
    images: ["/images/main/landing.png"],
  },
  keywords: [
    'Infloq privacy policy',
    'influencer marketing privacy',
    'creator data protection',
    'brand collaboration privacy',
    'data security influencer platform',
    'AI matchmaking privacy',
    'secure influencer marketing'
  ],
  authors: [
    {
      name: 'Infloq Team',
      url: 'https://infloq.com/team',
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
}

const PrivacyPage: React.FC = () => {
    return <PrivacyPolicy />;
};

export default PrivacyPage;