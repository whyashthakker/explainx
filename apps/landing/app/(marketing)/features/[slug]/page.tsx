// app/features/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FeatureDetail } from "../_components/feature-detail";
import { featuresData } from "../../../../data/features";
import FeaturesStructuredData from "../structured-data";

interface FeaturePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const feature = featuresData.categories.find(cat => cat.slug === params.slug);
  
  if (!feature) {
    return {
      title: 'Feature Not Found',
      description: 'The requested feature could not be found.'
    };
  }

  return {
    title: `${feature.title} - Infloq Features`,
    description: feature.description,
    openGraph: {
      title: `${feature.title} - Infloq Features`,
      description: feature.description,
      type: 'website',
      url: `https://infloq.com/features/${params.slug}`,
    }
  };
}

export async function generateStaticParams() {
  return featuresData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function FeaturePage({ params }: FeaturePageProps) {
  const feature = featuresData.categories.find(cat => cat.slug === params.slug);
  
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