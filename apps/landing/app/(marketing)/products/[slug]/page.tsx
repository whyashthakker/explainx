// app/products/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Example of reviews and skeleton
import { ReviewsSection } from "../../../_components/reviews/reviews-section";
import { ReviewSkeleton } from "../../../_components/reviews/review-skeleton";

import { HeadingDynamic } from "../_components/heading";
import { TestimonialsDynamic } from "../_components/testimonial";
import { FeaturesDynamic } from "../_components/features";
import { UseCasesDynamic } from "../_components/use-cases";
import { TargetAudienceDynamic } from "../_components/target-audience";
import { Pricing } from "../../../_components/pricing-2";
import { Testimonials } from "../../../_components/testimonials";
import { productPageData } from "../../../../data/productPageData";

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
        title: "Product Not Found | Infloq",
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

  return (
    <>
      {/* 1. Heading Section (Dynamic) */}
      {product.heading && (
        <HeadingDynamic
          title={product.heading.title}
          subtitle={product.heading.subtitle}
          image={product.heading.image}
        />
      )}

      {/* 2. Testimonials (Dynamic) */}
      {/* {product.testimonials && product.testimonials.length > 0 && (
        <TestimonialsDynamic
        featuredTestimonial={{
            body: "We closed 3 deals in a week using this platform!",
            author: {
              name: "Anna Johnson",
              handle: "annaj_85",
              imageUrl: "/path/to/image.jpg",
            },
        }}
         testimonials={product.testimonials} />
      )} */}

      <Testimonials />

      {/* 3. Features (Dynamic) */}
      {product.features && product.features.length > 0 && (
        <FeaturesDynamic features={product.features} />
      )}

      {/* 4. Use Cases (Dynamic) */}
      {product.useCases && product.useCases.length > 0 && (
        <UseCasesDynamic useCases={product.useCases} />
      )}

      {/* 5. Target Audience (Dynamic) */}
      {product.targetAudience && product.targetAudience.length > 0 && (
        <TargetAudienceDynamic targetAudience={product.targetAudience} />
      )}

      {/* 6. Pricing (Fixed / As Is) */}
      {/* Some pages might not use dynamic pricing, so we just show a standard component */}
      <Suspense>
        <Pricing />
      </Suspense>

      {/* 7. Reviews Section (Optional Suspense Example) */}
      <Suspense fallback={<ReviewSkeleton />}>
        <ReviewsSection />
      </Suspense>
    </>
  );
}
