// apps/landing/app/(marketing)/compare/[competitor]/structured-data.tsx
import { Competitor } from '../../../../data/competitors';
import { FAQ, Review } from './utils';

type ComparisonStructuredDataProps = {
  competitor: Competitor;
  faqs: FAQ[];
  reviews: Review[];
  featureHighlights: string[];
};

export function ComparisonStructuredData({ competitor, faqs, reviews, featureHighlights }: ComparisonStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? window.location.href : undefined,
        name: `Infloq.com vs ${competitor.name} Comparison`,
        description: `Compare Infloq.com with ${competitor.name}. See how these ${competitor.category} tools stack up in features, pricing, and capabilities.`,
        dateModified: new Date().toISOString(),
        image: competitor.comparisonImage,
        publisher: {
          "@type": "Organization",
          name: "AISOLO Technologies Pvt. Ltd.",
          logo: {
            "@type": "ImageObject",
            url: "https://infloq.com/icons/infloq.png"
          }
        }
      },
      {
        "@type": "Product",
        name: "Infloq.com",
        description: "AI-Powered Influencer Marketing Platform",
        image: "https://infloq.com/images/main/landing.png",
        brand: {
          "@type": "Brand",
          name: "Infloq"
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Performance-based pricing - Pay per click",
          availability: "https://schema.org/InStock"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length,
          reviewCount: reviews.length,
          bestRating: "5",
          worstRating: "1"
        },
        review: reviews.map(review => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: "5",
            worstRating: "1"
          },
          author: {
            "@type": "Person",
            name: review.author
          },
          datePublished: review.date,
          reviewBody: review.content
        }))
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
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
              "@id": "https://infloq.com",
              name: "Home"
            }
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": "https://infloq.com/compare",
              name: "Comparisons"
            }
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": typeof window !== 'undefined' ? window.location.href : undefined,
              name: `vs ${competitor.name}`
            }
          }
        ]
      },
      {
        "@type": "ComparisonPage",
        "@id": typeof window !== 'undefined' ? `${window.location.href}#comparison` : undefined,
        about: [
          {
            "@type": "SoftwareApplication",
            name: "Infloq.com",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web-based",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Performance-based pricing"
            },
            featureList: featureHighlights
          },
          {
            "@type": "SoftwareApplication",
            name: competitor.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web-based",
            description: competitor.shortDescription
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