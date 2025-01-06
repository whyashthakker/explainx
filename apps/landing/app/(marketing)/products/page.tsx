import { Metadata } from 'next'
import Image from 'next/image'
import SearchProducts from './_components/search-products'
import productData from '../../../data/product-data'


export const metadata: Metadata = {
  title: 'AI Social Media Tools & Products | Infloq.com',
  description: 'Explore Infloq.coms suite of AI-powered tools for social media management, including comment generators, virality calculators, and automation tools.',
  openGraph: {
    title: 'AI Social Media Tools & Products | Infloq.com',
    description: 'Discover our AI-powered social media tools',
    images: ['/og-products.jpg']
  }
}

export default function ProductsHome() {
    return (
      <div className="container">
        <div className="flex flex-col items-center text-center py-16 md:py-24 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
            Supercharge Your Social Media with AI Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our suite of AI-powered tools designed to enhance your social media presence and engagement
          </p>
        </div>
  
        <SearchProducts products={productData} />
      </div>
    )
  }