// app/waitlist/page.tsx
import { Metadata } from 'next';
import WaitlistForm from './_components/waitlist-form';

export const metadata: Metadata = {
  title: 'Join Waitlist - ExplainX AI Agents Platform',
  description: 'Join the waitlist for ExplainX - The custom AI agents development platform. Be first to access our cutting-edge AI solutions for business automation, SEO, and marketing.',
  keywords: [
    'ai agents waitlist',
    'custom ai development',
    'langchain platform',
    'crewai solutions',
    'business automation',
    'ai agents for seo',
    'ai agents for marketing',
    'enterprise ai solutions',
    'free ai agents access',
    'ai automation platform',
    'early access ai agents'
  ].join(', '),
  openGraph: {
    title: 'Join Waitlist - ExplainX AI Development Platform',
    description: 'Be first to access our revolutionary AI agent development and automation platform',
    type: 'website',
    url: 'https://explainx.ai/waitlist',
    siteName: 'ExplainX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ExplainX AI Platform Waitlist'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Waitlist - ExplainX AI Development Platform',
    description: 'Get early access to our AI agent development and automation solutions',
    images: ['/og-image.png']
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
  }
};

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="pt-15 md:pt-12 pb-6 md:py-10 lg:py-20">
        <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-cal font-bold text-gray-900 mb-4">
              Join Our AI Platform Waitlist
            </h1>
            <p className="text-xs md:text-xl text-gray-500">
              Be first to access our revolutionary AI agent development platform
            </p>
            
            <div className="mt-6 space-y-4 text-sm md:text-base text-gray-600">
              <p>Get early access to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Custom AI agent development tools</li>
                <li>LangChain and CrewAI integration</li>
                <li>Advanced automation capabilities</li>
                <li>Enterprise-grade AI solutions</li>
              </ul>
            </div>
          </div>
          
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}