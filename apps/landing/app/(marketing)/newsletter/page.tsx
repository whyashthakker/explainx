// app/newsletter/page.tsx
import { Metadata } from 'next';
import NewsletterForm from './_components/newsletter-form';

export const metadata: Metadata = {
  title: 'AI Newsletter - ExplainX',
  description: 'Stay updated with the latest in AI agents, automation, and industry insights. Join our newsletter for weekly updates on AI development, best practices, and ExplainX news.',
  openGraph: {
    title: 'AI Newsletter - ExplainX',
    description: 'Get weekly insights on AI agents, automation, and industry trends',
    type: 'website',
    url: 'https://explainx.ai/newsletter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Newsletter - ExplainX',
    description: 'Weekly insights on AI agents and automation trends',
  },
  keywords: [
    'ai agents newsletter',
    'ai agents news',
    'ai automation updates',
    'langchain ai agents',
    'crewai agents',
    'ai agents for businesses',
    'ai development news',
    'ai agents marketplace updates'
  ]
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-15 md:pt-12 pb-6 md:py-10 lg:py-20 mt-16">
        <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-cal font-bold text-white mb-4">
              Stay Ahead in AI
            </h1>
            <p className="text-xs md:text-xl text-gray-500">
              Weekly insights on AI agents, automation trends, and industry best practices
            </p>
          </div>
          
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}