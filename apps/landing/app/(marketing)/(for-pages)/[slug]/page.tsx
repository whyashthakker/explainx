import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { influencerPagesData } from "../../../../data/for-pages";
import { PageStructuredData } from "./structured-data";
import { HeadingSection } from "../_components/heading";
import { FeaturesSection } from "../_components/features-section";
import { TestimonialsSection } from "../_components/testimonials-section";
import { FAQSection } from "../_components/faq-section";
import { ResourcesSection } from "../_components/resources-section";
import { CTASection } from "../_components/cta-section";
import { BenefitsSection } from "../_components/benefits-section";
import { StatsSection } from "../_components/stats-section";

export async function generateStaticParams() {
  return influencerPagesData.map((page) => ({
    slug: page.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = influencerPagesData.find((p) => p.slug === slug);
  
  if (!pageData) {
    return {
      title: "Page Not Found | ExplainX",
      description: "The requested page doesn't exist",
    };
  }

  return {
    title: pageData.metadata.title,
    description: pageData.metadata.description,
    keywords: pageData.metadata.keywords,
    alternates: pageData.metadata.alternates,
  };
}

export default async function InfluencerPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = influencerPagesData.find((p) => p.slug === slug);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <PageStructuredData pageData={pageData} />

      <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] text-white dark:text-white">
        {pageData.heading && (
          <HeadingSection
            title={pageData.heading.title}
            subtitle={pageData.heading.subtitle}
            image={pageData.heading.image}
          />
        )}

        <div className="space-y-24 py-12">
          {pageData.features && pageData.features.length > 0 && (
            <Suspense>
              <FeaturesSection features={pageData.features} />
            </Suspense>
          )}

          {pageData.benefits && pageData.benefits.length > 0 && (
            <Suspense>
              <BenefitsSection benefits={pageData.benefits} />
            </Suspense>
          )}

          {pageData.stats && pageData.stats.length > 0 && (
            <Suspense>
              <StatsSection stats={pageData.stats} />
            </Suspense>
          )}

          {pageData.testimonials && pageData.testimonials.length > 0 && (
            <Suspense>
              <TestimonialsSection testimonials={pageData.testimonials} />
            </Suspense>
          )}

          {pageData.faq && pageData.faq.length > 0 && (
            <Suspense>
              <FAQSection faq={pageData.faq} />
            </Suspense>
          )}

          {pageData.resources && pageData.resources.length > 0 && (
            <Suspense>
              <ResourcesSection resources={pageData.resources} />
            </Suspense>
          )}

          {pageData.cta && (
            <CTASection
              title={pageData.cta.title}
              description={pageData.cta.description}
              primaryButton={pageData.cta.primaryButton}
              secondaryButton={pageData.cta.secondaryButton}
            />
          )}
        </div>
      </div>
    </>
  );
}