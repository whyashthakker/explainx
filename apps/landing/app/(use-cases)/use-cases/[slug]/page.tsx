// app/use-cases/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCaseHero } from "./_components/use-case-hero";
import { UseCaseFeatures } from "./_components/use-case-features";
import { UseCaseTestimonials } from "./_components/use-case-testimonials";
import { UseCaseCTA } from "./_components/use-case-cta";
import { getAllUseCaseSlugs, getUseCase } from "../../../../lib/use-cases";
import { IconType, UseCase } from "../../../../types/use-cases";
import { AvailableTools } from "./_components/available-tools";

interface UseCasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: UseCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  
  if (!useCase) {
    return {};
  }

  const { title, description, keywords } = useCase;

  return {
    title: `${title} | ExplainX - AI-Powered Influencer Marketing Platform`,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: `/use-cases/${slug}`,
    },
    openGraph: {
      title: `${title} - ExplainX Solutions`,
      description,
      url: `https://explainx.ai/use-cases/${slug}`,
      siteName: "ExplainX",
      images: [
        {
          url: `/images/main/landing-og.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - AI-Powered Influencer Marketing`,
      description,
      images: [`/images/main/landing-og.png`],
      site: "@ExplainX",
      creator: "@ExplainX"
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllUseCaseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

function validateFeatureIcon(icon: string): icon is IconType {
  return ['SearchIcon', 'LayoutIcon', 'ChartIcon', 'SettingsIcon', 'UsersIcon', 'TrendingIcon'].includes(icon);
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const rawUseCase = getUseCase(slug);

  if (!rawUseCase) {
    notFound();
  }

  // Validate and transform the features to ensure icons are correct
  const features = rawUseCase.features.map(feature => {
    if (!validateFeatureIcon(feature.icon)) {
      console.warn(`Invalid icon type found: ${feature.icon}, defaulting to SearchIcon`);
      return { ...feature, icon: 'SearchIcon' as IconType };
    }
    return { ...feature, icon: feature.icon as IconType };
  });

  const useCase: UseCase = {
    ...rawUseCase,
    features
  };

  return (
    <div className="min-h-screen">
      <UseCaseHero 
        title={useCase.title}
        subtitle={useCase.subtitle}
        description={useCase.description}
        image={useCase.heroImage}
      />
      
      <UseCaseFeatures 
        features={useCase.features}
        benefits={useCase.benefits}
      />

      <UseCaseTestimonials testimonials={useCase.testimonials} />
      
      <UseCaseCTA 
        title={useCase.ctaTitle}
        description={useCase.ctaDescription}
        buttonText={useCase.ctaButtonText}
        buttonLink={useCase.ctaButtonLink}
      />

    <AvailableTools />
    </div>
  );
}