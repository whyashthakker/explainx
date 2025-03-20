"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@repo/ui/components/ui/card'
import { competitors } from '../../../../data/competitors'
import { Badge } from '@repo/ui/components/ui/badge'

export default function CompareHome() {
  return (
    <div className="container space-y-12 bg-background dark:bg-[#0A0A0A] py-16">
      <div className="relative w-full h-72 mb-12 rounded-xl overflow-hidden">
        <Image
          src="/images/main/landing.png"
          alt="explainx.ai Platform"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 dark:from-[#0A0A0A]/90 to-background/50 dark:to-[#0A0A0A]/50 flex items-center">
          <div className="p-8">
            <Badge 
              variant="outline" 
              className="mb-4 bg-yellow-400/10 text-yellow-500 border-yellow-400/20"
            >
              Comparison
            </Badge>
            <h1 className="font-cal text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground dark:text-white">
              Compare <span className="italic">explainx.ai</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              See how ExplainX stacks up against other platforms across features, pricing, and capabilities
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(competitors).map(([slug, competitor]) => (
          <Link key={slug} href={`/compare/${slug}`} className="group">
            <Card className="h-full transition-all duration-300 
              bg-background dark:bg-[#1A1A1A] 
              border border-border dark:border-gray-800 
              hover:border-yellow-400 dark:hover:border-yellow-500 
              hover:shadow-2xl group">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <CardTitle className="text-xl text-foreground dark:text-white group-hover:text-yellow-600 transition-colors">
                    {competitor.name}
                  </CardTitle>
                  <Badge 
                    variant="outline" 
                    className="bg-yellow-400/10 text-yellow-500 border-yellow-400/20"
                  >
                    {competitor.category}
                  </Badge>
                </div>
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={'/images/main/landing.png'}
                    alt={`${competitor.name} interface`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardDescription className="text-muted-foreground">
                  {competitor.shortDescription}
                </CardDescription>
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
                                <CheckCircle2 className="h-4 w-4 text-yellow-500" /> : 
                                <XCircle className="h-4 w-4 text-red-500" />
                            ) : null}
                            <span className="text-foreground dark:text-gray-300">{feature.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <div className="w-full flex items-center justify-between text-yellow-500">
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