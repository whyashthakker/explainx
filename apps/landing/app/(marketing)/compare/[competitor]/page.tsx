import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonTableSkeleton } from '../_components/compare-skeleton';
import { ComparisonTable } from '../_components/compare-table';
import { Heading } from '../../../_components/heading';
import { Testimonials } from '../../../_components/testimonials';
import { Pricing } from '../../../_components/pricing-2';
import FAQs from '../../../_components/faq-section';
import { competitors } from '../../../../data/competitors';
import { ReviewsSection } from '../../../_components/reviews/reviews-section';

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{
        url: '/olly_home.png',
        width: 1200,
        height: 630,
        alt: `infloq.com vs ${competitor.name} comparison`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/olly_home.png']
    },
    alternates: {
      canonical: `https://infloq.com/compare/${resolvedParams.competitor}`
    }
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const resolvedParams = await params;
  const competitor = competitors[resolvedParams.competitor];
  
  if (!competitor) {
    notFound();
  }

  return (
    <>
      <Heading
        title={`Infloq.com vs ${competitor.name}`}
        subtitle={`Compare features, pricing, and capabilities between Infloq.com and ${competitor.name}`}
        image="/olly_home.png"
      />
      
      <div className="container py-8">
        <Suspense fallback={<ComparisonTableSkeleton />}>
          <ComparisonTable competitor={competitor} />
        </Suspense>
        
        <Testimonials />
        <ReviewsSection />
        <Pricing />
        <FAQs />
      </div>
    </>
  );
}