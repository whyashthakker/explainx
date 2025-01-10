import React from 'react';
import { Metadata } from 'next';
import TermsOfService from '../../_components/terms-content';

export const metadata: Metadata = {
  title: 'Terms of Service | ExplainX - AI Agents Development Agency',
  description: 'Read and understand the Terms of Service for ExplainX. Learn about rights, responsibilities, and our platform policies for businesses using our custom AI agent development and automation solutions.',
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: 'Terms of Service | ExplainX - AI Development Platform',
    description: 'Understand your rights and obligations when using ExplainX\'s AI agent development platform. Clear terms ensuring secure and compliant AI implementation.',
    url: 'https://explainx.ai/terms',
    siteName: 'ExplainX',
    type: 'website',
    images: [
      {
        url: "/images/main/landing-og.png",
        width: 1200,
        height: 630,
        alt: 'ExplainX AI Platform Terms of Service',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | ExplainX - AI Development Agency',
    description: 'Clear, comprehensive terms governing the use of ExplainX\'s AI agent development platform. Understanding your rights and responsibilities.',
    site: '@ExplainX',
    creator: '@ExplainX',
    images: ["/images/main/landing-og.png"],
  },
  keywords: [
    'ai agent development terms',
    'custom ai solutions agreement',
    'langchain implementation terms',
    'crewai development terms',
    'ai automation platform terms',
    'enterprise ai policies',
    'ai development agreement',
    'business automation terms',
    'ai integration policies',
    'data processing agreement',
    'ai security compliance',
    'api usage terms',
    'ai agent marketplace terms',
    'technical service agreement',
    'automation platform policies'
  ].join(', '),
  authors: [
    {
      name: 'ExplainX Legal & Compliance Team',
      url: 'https://explainx.ai/legal',
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
  category: 'Legal'
}

const TermsPage: React.FC = () => {
    return <TermsOfService />;
};

export default TermsPage;