// apps/landing/app/(marketing)/compare/[competitor]/page.tsx

import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonTableSkeleton } from '../_components/compare-skeleton';
import { ComparisonTable } from '../_components/compare-table';
import { Heading } from '../../../_components/heading';
import { Testimonials } from '../../../_components/testimonials';
import FAQs from '../../../_components/faq-section';
import { competitors } from '../../../../data/competitors';
import { ReviewsSection } from '../../../_components/reviews/reviews-section';
import HybridPricing from '../../../_components/infloq-pricing';
import { ComparisonStructuredData } from './StructuredData';
import { generateFAQsFromFeatures, generateReviews, getFeatureHighlights } from './utils';

interface PageProps {
  params: Promise<{
    competitor: string;
  }>
}

export async function generateStaticParams() {
  return Object.keys(competitors).map(slug => ({
    competitor: slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const competitor = competitors[resolvedParams.competitor];
  
  if (!competitor) return {};

  const title = `Infloq.com vs ${competitor.name} Comparison`;
  const description = `Compare Infloq.com with ${competitor.name}. See how these ${competitor.category} tools stack up in features, pricing, and capabilities.`;
  const keywords = [competitor.name, 'infloq.com', `${competitor.name} alternatives`, `free ${competitor.name} alternatives`, `influencer marketing platforms`, 'comparison', 'features', 'pricing', 'capabilities'];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{
        url: competitor.comparisonImage,
        width: 1200,
        height: 630,
        alt: `infloq.com vs ${competitor.name} comparison`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [competitor.comparisonImage]
    },
    alternates: {
      canonical: `https://www.infloq.com/compare/${resolvedParams.competitor}`
    }
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const resolvedParams = await params;
  const competitor = competitors[resolvedParams.competitor];
  
  if (!competitor) {
    notFound();
  }

  const faqs = generateFAQsFromFeatures(competitor);
  const reviews = generateReviews(competitor);
  const featureHighlights = getFeatureHighlights(competitor);

  return (
    <>
      <ComparisonStructuredData
        competitor={competitor}
        faqs={faqs}
        reviews={reviews}
        featureHighlights={featureHighlights}
      />
      
      <Heading
        title={`Infloq.com vs ${competitor.name}`}
        subtitle={`Compare features, pricing, and capabilities between Infloq.com and ${competitor.name}`}
        image={competitor.comparisonImage}
      />
      
      <div className="container py-8">
        <Suspense fallback={<ComparisonTableSkeleton />}>
          <ComparisonTable competitor={competitor} />
        </Suspense>
        
        <Testimonials />
        <ReviewsSection />
        <HybridPricing />
        <FAQs faqs={faqs} />
      </div>
    </>
  );
}