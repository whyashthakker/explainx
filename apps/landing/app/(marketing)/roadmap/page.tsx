// page.tsx
import React from 'react'
import { Metadata } from 'next'
import ProductRoadmap from './_components/roadmap'

export const metadata: Metadata = {
  title: 'Product Roadmap | Infloq',
  description: 'Explore the future of Infloq with our product roadmap. See what features and improvements we\'re planning to deliver.',
  alternates: {
    canonical: "/product-roadmap",
  },
  openGraph: {
    title: 'Product Roadmap | Infloq',
    description: 'Discover the exciting future plans for Infloq',
    images: [
      {
        url: '/product-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Infloq Product Roadmap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Roadmap | Infloq',
    description: 'Discover the exciting future plans for Infloq',
    images: ['/product-roadmap.png'],
  },
}

const ProductRoadmapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ProductRoadmap />
    </div>
  )
}

export default ProductRoadmapPage