// apps/landing/app/products/[slug]/structured-data.tsx

import { ProductData } from "../../../../data/productPageData";

type ProductStructuredDataProps = {
  product: ProductData;
  reviews?: Array<{
    author: string;
    rating: number;
    content: string;
    date: string;
  }>;
  pricing?: {
    amount: number;
    currency: string;
    billingPeriod?: string;
  };
};

export function ProductStructuredData({ product, reviews, pricing }: ProductStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? window.location.href : undefined,
        name: product.metadata.title,
        description: product.metadata.description,
        keywords: product.metadata.keywords?.join(', '),
        image: product.metadata.alternates?.openGraph?.images?.[0],
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
        "@type": "Product",
        name: product.heading?.title || product.metadata.title,
        description: product.metadata.description,
        image: product.heading?.image || product.metadata.alternates?.openGraph?.images?.[0],
        brand: {
          "@type": "Brand",
          name: "ExplainX"
        },
        ...(pricing && {
          offers: {
            "@type": "Offer",
            price: pricing.amount,
            priceCurrency: pricing.currency,
            ...(pricing.billingPeriod && {
              priceSpecification: {
                "@type": "PriceSpecification",
                price: pricing.amount,
                priceCurrency: pricing.currency,
                billingDuration: pricing.billingPeriod
              }
            })
          }
        }),
        ...(reviews && reviews.length > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
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
        })
      },
      {
        "@type": "SoftwareApplication",
        name: product.heading?.title || product.metadata.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web-based",
        offers: pricing ? {
          "@type": "Offer",
          price: pricing.amount,
          priceCurrency: pricing.currency
        } : undefined,
        featureList: product.features?.map(f => f.title),
        abstract: product.metadata.description
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
              "@id": "https://explainx.ai/products",
              name: "Products"
            }
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": typeof window !== 'undefined' ? window.location.href : undefined,
              name: product.metadata.title
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