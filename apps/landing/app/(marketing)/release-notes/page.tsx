import React from 'react'
import { Metadata } from 'next'
import ReleaseNoteTimeline from './_components/notes'

export const metadata: Metadata = {
  title: 'Release Notes | ExplainX - AI Agents Development Platform',
  description: 'Track ExplainX\'s AI development platform evolution. Stay informed about new agent capabilities, automation features, and improvements in LangChain integration, CrewAI implementation, and AI solutions.',
  alternates: {
    canonical: '/release-notes'
  },
  keywords: [
    'ai agents updates',
    'langchain integration features',
    'crewai implementation',
    'custom ai development',
    'ai automation improvements',
    'free ai agents updates',
    'ai agents for seo updates',
    'ai agents for marketing',
    'ai platform enhancements',
    'business automation tools',
    'openai integration updates',
    'enterprise ai features',
    'ai development tools',
    'automation platform updates'
  ].join(', '),
  openGraph: {
    title: 'Platform Updates | ExplainX - AI Agents Development Innovation',
    description: 'Stay updated with ExplainX\'s latest AI agent features and improvements. Discover new capabilities in custom AI development and automation solutions.',
    url: 'https://explainx.ai/release-notes',
    siteName: 'ExplainX',
    images: [
      {
        url: '/images/main/landing.png',
        width: 1200,
        height: 630,
        alt: 'ExplainX AI Platform Updates',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Updates from ExplainX - AI Agents Development Platform',
    description: 'Explore new features and improvements in ExplainX\'s AI agent development and automation platform.',
    images: ['/images/main/landing-og.png'],
    site: '@ExplainX',
    creator: '@ExplainX'
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
      name: 'ExplainX AI Development Team',
      url: 'https://explainx.ai/team',
    },
  ],
  category: 'AI Development Updates',
};

const ReleasePage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Platform Updates</h1>
          <p className="text-xl text-gray-600">
            Track our journey in revolutionizing business automation with AI agents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Update Categories</h2>
            <ul className="space-y-2">
              <li>• AI Agent Capabilities</li>
              <li>• LangChain Integration</li>
              <li>• Automation Features</li>
              <li>• Platform Performance</li>
              <li>• Security Updates</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Stay Updated</h2>
            <ul className="space-y-2">
              <li>• Subscribe to technical updates</li>
              <li>• Join our developer webinars</li>
              <li>• Access API documentation</li>
              <li>• Read our tech blog</li>
            </ul>
          </div>
        </div>

        <ReleaseNoteTimeline />

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">Have feedback on our AI platform?</p>
          <p className="font-medium">Email us at developers@explainx.ai</p>
        </div>
      </div>
    </div>
  )
}

export default ReleasePage