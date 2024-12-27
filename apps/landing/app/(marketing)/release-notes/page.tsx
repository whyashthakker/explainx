import React from 'react'
import { Metadata } from 'next'
import ReleaseNoteTimeline from './_components/notes'

export const metadata: Metadata = {
  title: 'Release Notes | Infloq - AI-Powered Influencer Marketing Platform',
  description: 'Track Infloq\'s platform evolution. Stay informed about new features and improvements for both brands and creators, including AI matching enhancements, campaign tools, and analytics updates.',
  alternates: {
    canonical: '/release-notes'
  },
  keywords: [
    'Infloq updates',
    'influencer platform features',
    'creator tools updates',
    'brand campaign features',
    'AI matching improvements',
    'marketing platform updates',
    'influencer analytics tools',
    'campaign management features',
    'platform enhancements',
    'creator partnership tools'
  ].join(', '),
  openGraph: {
    title: 'Platform Updates | Infloq - Influencer Marketing Innovation',
    description: 'Stay updated with Infloq\'s latest features and improvements. Discover new tools for brands and creators in AI-powered influencer marketing.',
    url: 'https://infloq.com/release-notes',
    siteName: 'Infloq',
    images: [
      {
        url: '/images/release-notes-og.png',
        width: 1200,
        height: 630,
        alt: 'Infloq Platform Updates',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Updates from Infloq - Influencer Marketing Platform',
    description: 'Explore new features and improvements in Infloq\'s AI-powered influencer marketing platform.',
    images: ['/images/release-notes-og.png'],
    site: '@infloq',
    creator: '@infloq'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: [
    {
      name: 'Infloq Product Team',
      url: 'https://infloq.com/team',
    },
  ],
  category: 'Product Updates',
};

const ReleasePage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Platform Updates</h1>
          <p className="text-xl text-gray-600">
            Track our journey in revolutionizing influencer marketing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Update Categories</h2>
            <ul className="space-y-2">
              <li>• AI Matching Improvements</li>
              <li>• Campaign Management Tools</li>
              <li>• Analytics Enhancements</li>
              <li>• Platform Performance</li>
              <li>• Security Updates</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Stay Updated</h2>
            <ul className="space-y-2">
              <li>• Subscribe to update notifications</li>
              <li>• Join our product webinars</li>
              <li>• Follow our social channels</li>
              <li>• Read our product blog</li>
            </ul>
          </div>
        </div>

        <ReleaseNoteTimeline />

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">Have feedback on our updates?</p>
          <p className="font-medium">Email us at feedback@infloq.com</p>
        </div>
      </div>
    </div>
  )
}

export default ReleasePage