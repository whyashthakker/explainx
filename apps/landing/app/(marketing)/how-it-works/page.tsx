import { Metadata } from 'next';
import { HowItWorks } from './_components/how-it-works';

export const metadata: Metadata = {
  title: 'Demo - Infloq',
  description: 'See how Infloq connects creators with brands using AI-powered matching and performance-based pricing.',
  openGraph: {
    title: 'Demo - Infloq',
    description: 'Discover how Infloq revolutionizes creator-brand partnerships',
    type: 'website',
    url: 'https://infloq.com/how-it-works',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demo - Infloq',
    description: 'See how Infloq connects creators with brands through AI',
  },
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