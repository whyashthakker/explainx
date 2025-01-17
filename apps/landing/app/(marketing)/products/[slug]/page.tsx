// app/products/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ReviewsSection } from "../../../_components/reviews/reviews-section";
import { ReviewSkeleton } from "../../../_components/reviews/review-skeleton";
import { HeadingDynamic } from "../_components/heading";
import { TestimonialsDynamic } from "../_components/testimonial";
import { FeaturesDynamic } from "../_components/features";
import { UseCasesDynamic } from "../_components/use-cases";
import { TargetAudienceDynamic } from "../_components/target-audience";
import { Testimonials } from "../../../_components/testimonials";
import { productPageData } from "../../../../data/productPageData";
import HybridPricing from "../../../_components/explainx-pricing";
import { ProductStructuredData } from "./structured-data";

// Mock reviews data - replace with your actual reviews data
const getProductReviews = (productSlug: string) => {
  return [
    {
      author: "John Smith",
      rating: 5,
      content: "This platform has transformed how we handle influencer marketing.",
      date: "2025-01-15"
    },
    {
      author: "Sarah Johnson",
      rating: 4,
      content: "Great features and excellent support team.",
      date: "2024-02-01"
    }
  ];
};

// Mock pricing data - replace with your actual pricing data
const getProductPricing = (productSlug: string) => {
  return {
    amount: 0,
    currency: "USD",
    billingPeriod: "monthly"
  };
};

export async function generateStaticParams() {
  return productPageData.map((product) => ({
    slug: product.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productPageData.find((p) => p.slug === slug);
  
  if (!product) {
    return {
      title: "Product Not Found | ExplainX",
      description: "This product doesn't exist",
    };
  }

  return {
    title: product.metadata.title,
    description: product.metadata.description,
    alternates: product.metadata.alternates,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productPageData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const reviews = getProductReviews(slug);
  const pricing = getProductPricing(slug);

  return (
    <>
      <ProductStructuredData 
        product={product}
        reviews={reviews}
        pricing={pricing}
      />

      {product.heading && (
        <HeadingDynamic
          title={product.heading.title}
          subtitle={product.heading.subtitle}
          image={product.heading.image}
        />
      )}

      <Testimonials />

      {product.features && product.features.length > 0 && (
        <FeaturesDynamic features={product.features} />
      )}

      {product.useCases && product.useCases.length > 0 && (
        <UseCasesDynamic useCases={product.useCases} />
      )}

      {product.targetAudience && product.targetAudience.length > 0 && (
        <TargetAudienceDynamic targetAudience={product.targetAudience} />
      )}

      <Suspense>
        <HybridPricing />
      </Suspense>

      <Suspense fallback={<ReviewSkeleton />}>
        <ReviewsSection />
      </Suspense>
    </>
  );
}