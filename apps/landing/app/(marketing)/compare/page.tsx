import { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@repo/ui/components/ui/card'
import { competitors } from '../../../data/competitors'
import { Badge } from '@repo/ui/components/ui/badge'
import CompareHome from './_components/compare-home'

interface FeatureComparison {
  category: string
  features: {
    name: string
    ExplainX: boolean | string | string[]
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
  title: 'Compare explainx.ai with Alternatives | Feature Comparison',
  description: 'See how explainx.ai compares to other social platforms. Compare features, pricing, and capabilities with leading alternatives.',
  openGraph: {
    title: 'Compare explainx.ai with Alternatives',
    description: 'Detailed comparison of explainx.ai features with leading social platforms',
    type: 'website',
    images: [
      {
        url: '/og-compare.jpg',
        width: 1200,
        height: 630,
        alt: 'explainx.ai comparison'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare explainx.ai with Alternatives',
    description: 'Detailed comparison of explainx.ai features with leading social platforms',
    images: ['/og-compare.jpg']
  },
  alternates: {
    canonical: 'https://www.explainx.ai/compare'
  }
}

export default function Page() {
  return (
  <>
  <CompareHome />
  </>
  )
}