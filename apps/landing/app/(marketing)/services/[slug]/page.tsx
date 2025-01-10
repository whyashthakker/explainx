// app/features/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FeatureDetail } from "../_components/feature-detail";
import { featuresData } from "../../../../data/features";
import FeaturesStructuredData from "../structured-data";

interface FeaturePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = featuresData.categories.find(cat => cat.slug === slug);
  
  if (!feature) {
    return {
      title: 'Feature Not Found',
      description: 'The requested feature could not be found.'
    };
  }

  return {
    title: `${feature.title} - ExplainX Features`,
    description: feature.description,
    openGraph: {
      title: `${feature.title} - ExplainX Features`,
      description: feature.description,
      type: 'website',
      url: `https://www.explainx.ai/services/${slug}`,
    }
  };
}

export async function generateStaticParams() {
  return featuresData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = featuresData.categories.find(cat => cat.slug === slug);
  
  if (!feature) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <FeaturesStructuredData feature={feature} />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeatureDetail feature={feature} />
        </div>
      </div>
    </div>
  );
}