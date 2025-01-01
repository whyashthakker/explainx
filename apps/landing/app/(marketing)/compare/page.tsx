import { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@repo/ui/components/ui/card'
import { competitors } from '../../../data/competitors'
import { Badge } from '@repo/ui/components/ui/badge'

interface FeatureComparison {
  category: string
  features: {
    name: string
    olly: boolean | string | string[]
    competitor: boolean | string | string[]
    description?: string
  }[]
}

interface Competitor {
  name: string
  shortDescription: string
  category: string
  comparisonImage: string
  features: FeatureComparison[]
}

export const metadata: Metadata = {
  title: 'Compare infloq.com with Alternatives | Feature Comparison',
  description: 'See how infloq.com compares to other social platforms. Compare features, pricing, and capabilities with leading alternatives.',
  openGraph: {
    title: 'Compare infloq.com with Alternatives',
    description: 'Detailed comparison of infloq.com features with leading social platforms',
    type: 'website',
    images: [
      {
        url: '/og-compare.jpg',
        width: 1200,
        height: 630,
        alt: 'infloq.com comparison'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare infloq.com with Alternatives',
    description: 'Detailed comparison of infloq.com features with leading social platforms',
    images: ['/og-compare.jpg']
  },
  alternates: {
    canonical: 'https://infloq.com/compare'
  }
}

export default function CompareHome() {
  return (
    <div className="container space-y-12">
      <div className="relative w-full h-64 mb-12 rounded-xl overflow-hidden">
        <Image
          src="/images/main/landing.png"
          alt="infloq.com Platform"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 flex items-center">
          <div className="p-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Compare infloq.com</h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              See how Olly stacks up against other platforms across features, pricing, and capabilities
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(competitors).map(([slug, competitor]) => (
          <Link key={slug} href={`/compare/${slug}`} className="group">
            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <CardTitle className="text-xl">{competitor.name}</CardTitle>
                  <Badge variant="outline">{competitor.category}</Badge>
                </div>
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={'/images/main/landing.png'}
                    alt={`${competitor.name} interface`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardDescription>{competitor.shortDescription}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {competitor.features.slice(0, 2).map((category, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {category.category}
                      </h3>
                      <div className="space-y-1">
                        {category.features.slice(0, 3).map((feature, fidx) => (
                          <div key={fidx} className="flex items-center gap-2 text-sm">
                            {typeof feature.competitor === 'boolean' ? (
                              feature.competitor ? 
                                <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                                <XCircle className="h-4 w-4 text-red-500" />
                            ) : null}
                            <span>{feature.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <div className="w-full flex items-center justify-between text-primary">
                  <span className="text-sm font-medium">View full comparison</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}