// apps/landing/app/(tools)/tools/[slug]/structured-data.tsx
import { Tool } from '../../../../types/tools';

type ToolStructuredDataProps = {
  tool: Tool;
};

export function ToolStructuredData({ tool }: ToolStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? window.location.href : undefined,
        name: `${tool.name} | ExplainX Tools`,
        description: tool.description,
        image: tool.image,
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
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web-based",
        offers: tool.pricing ? {
          "@type": "Offer",
          price: tool.pricing.price ? parseInt(tool.pricing.price.replace(/[^0-9]/g, '')) : 0,
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: tool.pricing.price ? parseInt(tool.pricing.price.replace(/[^0-9]/g, '')) : 0,
            priceCurrency: "USD",
            billingDuration: "P1M"
          }
        } : undefined,
        featureList: tool.features,
        abstract: tool.description,
        audience: {
          "@type": "Audience",
          audienceType: tool.targetAudience.join(', ')
        },
        category: tool.category,
        applicationSuite: "ExplainX Marketing Suite"
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faq.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
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
              "@id": "https://explainx.ai/tools",
              name: "Tools"
            }
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": typeof window !== 'undefined' ? window.location.href : undefined,
              name: tool.name
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