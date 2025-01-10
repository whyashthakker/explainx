import { InfluencerPageData } from "../../../../data/for-pages";

type PageStructuredDataProps = {
  pageData: InfluencerPageData;
  stats?: {
    totalViews: number;
    totalEngagements: number;
    avgEngagementRate: number;
  };
};

export function PageStructuredData({ pageData, stats }: PageStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? window.location.href : undefined,
        name: pageData.metadata.title,
        description: pageData.metadata.description,
        keywords: pageData.metadata.keywords?.join(', '),
        image: pageData.metadata.alternates?.openGraph?.images?.[0],
        dateModified: new Date().toISOString(),
        publisher: {
          "@type": "Organization",
          name: "AISOLO Technologies Pvt. Ltd.",
          logo: {
            "@type": "ImageObject",
            url: "https://explainx.ai/icons/explainx_ai_light.png"
          }
        }
      },
      {
        "@type": "Course",
        name: pageData.heading?.title,
        description: pageData.metadata.description,
        provider: {
          "@type": "Organization",
          name: "ExplainX Creator Academy",
          sameAs: "https://explainx.ai"
        },
        ...(pageData.features && {
          hasCourseInstance: pageData.features.map(feature => ({
            "@type": "CourseInstance",
            name: feature.title,
            description: feature.description
          }))
        })
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": "https://explainx.ai",
              name: "Home"
            }
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": "https://explainx.ai/influencers",
              name: "For Creators"
            }
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": typeof window !== 'undefined' ? window.location.href : undefined,
              name: pageData.metadata.title
            }
          }
        ]
      }
    ]
  };

  // Remove undefined values
  const cleanJsonLd = JSON.parse(JSON.stringify(jsonLd));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }}
    />
  );
}