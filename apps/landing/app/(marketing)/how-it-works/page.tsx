import { Metadata } from 'next';
import { HowItWorks } from './_components/how-it-works';

export const metadata: Metadata = {
  title: 'Demo - ExplainX AI Agents Development Platform',
  description: 'See how ExplainX helps businesses develop custom AI agents for automation, SEO, and marketing using LangChain and advanced AI technologies.',
  keywords: [
    'ai agents demo',
    'custom ai development',
    'langchain integration',
    'crewai solutions',
    'ai automation demo',
    'ai agents for seo',
    'ai agents for marketing',
    'business automation demo',
    'enterprise ai solutions',
    'free ai agents',
    'ai platform demo'
  ].join(', '),
  openGraph: {
    title: 'Demo - ExplainX AI Development Platform',
    description: 'Discover how ExplainX revolutionizes business operations with custom AI agents',
    type: 'website',
    url: 'https://www.explainx.ai/how-it-works',
    siteName: 'ExplainX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ExplainX AI Platform Demo'
      }
    ],
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demo - ExplainX AI Development Platform',
    description: 'See how ExplainX helps businesses build and implement custom AI solutions',
    images: ['/og-image.png'],
    creator: '@ExplainX',
    site: '@ExplainX'
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
  alternates: {
    canonical: 'https://www.explainx.ai/how-it-works'
  },
  category: 'Technology'
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="pt-20 pb-6">
        <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </div>
    </div>
  );
}