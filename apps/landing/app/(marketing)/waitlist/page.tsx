// app/waitlist/page.tsx
import { Metadata } from 'next';
import WaitlistForm from './_components/waitlist-form';

export const metadata: Metadata = {
  title: 'Join Waitlist - Infloq',
  description: 'Join the waitlist for Infloq - The AI-powered creator-brand matching platform. Be the first to know when we launch and connect with the perfect creators for your brand.',
  openGraph: {
    title: 'Join Waitlist - Infloq',
    description: 'Be the first to know when we launch our AI-powered creator-brand matching platform',
    type: 'website',
    url: 'https://infloq.com/waitlist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Waitlist - Infloq',
    description: 'Join the waitlist for Infloq - Connect with perfect creators for your brand',
  },
};

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="pt-15 md:pt-12 pb-6 md:py-10 lg:py-20">
        <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-cal font-bold text-gray-900 mb-4">
              Join the Waitlist
            </h1>
            <p className="text-xs md:text-xl text-gray-500">
              Be the first to know when we launch our creator-brand matching platform
            </p>
          </div>
          
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}