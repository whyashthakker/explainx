// page.tsx
import React from 'react'
import { Metadata } from 'next'
import ProductRoadmap from './_components/roadmap'

export const metadata: Metadata = {
  title: 'AI Development Roadmap | ExplainX',
  description: 'Explore the future of AI agent development with ExplainX. See our planned features including enhanced LangChain integration, new AI agent capabilities, and advanced automation tools.',
  alternates: {
    canonical: "/product-roadmap",
  },
  keywords: [
    'ai agents roadmap',
    'langchain development',
    'crewai features',
    'ai automation roadmap',
    'custom ai development',
    'ai agents for seo',
    'ai agents for marketing',
    'business automation features',
    'enterprise ai roadmap',
    'openai integration plans',
    'free ai agents roadmap'
  ].join(', '),
  openGraph: {
    title: 'AI Development Roadmap | ExplainX',
    description: 'Discover our vision for the future of AI agent development and automation solutions. See upcoming features, integrations, and technical improvements.',
    url: 'https://explainx.ai/product-roadmap',
    siteName: 'ExplainX - AI Agents Development Agency',
    images: [
      {
        url: '/product-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'ExplainX AI Development Roadmap',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Development Roadmap | ExplainX',
    description: 'Explore the future of AI agent development with ExplainX. See our upcoming features and technical innovations.',
    images: ['/product-roadmap.png'],
    site: '@ExplainX',
    creator: '@ExplainX'
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
  authors: [
    {
      name: 'ExplainX AI Development Team',
      url: 'https://explainx.ai/team',
    },
  ],
  category: 'AI Development'
}

const ProductRoadmapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Development Roadmap</h1>
          <p className="text-xl text-gray-600">
            Discover the future of AI agent development and automation solutions at ExplainX
          </p>
        </div>
        <ProductRoadmap />
      </div>
    </div>
  )
}

export default ProductRoadmapPage