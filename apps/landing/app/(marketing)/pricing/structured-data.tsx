import React from 'react';

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  platforms: string;
  buttonText: string;
  buttonVariant?: "outline" | "default" | "secondary" | "destructive";
  buttonLink: string;
  tag?: {
    text: string;
    variant: "outline" | "default" | "secondary" | "destructive"
  };
  highlight?: boolean;
}

interface InfluencerTier {
  name: string;
  minCPC: number;
  maxCPC: number;
  averageEngagement: number;
}

interface PricingStructuredDataProps {
  plans: PricingPlan[];
  influencerTiers: InfluencerTier[];
  faqs: Array<{ question: string; answer: string; }>;
  baseUrl?: string;
}

export function PricingStructuredData({ 
  plans, 
  influencerTiers,
  faqs,
  baseUrl = 'https://explainx.ai' 
}: PricingStructuredDataProps) {
  // Convert price string to number (e.g., "$49" -> 49)
  const getPriceValue = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/pricing#webpage`,
        "url": `${baseUrl}/pricing`,
        "name": "ExplainX Pricing - Performance-Based Influencer Marketing Plans",
        "description": "Choose the right plan for your influencer marketing needs. Pay only for performance with our flexible pricing options.",
        "isPartOf": { "@id": baseUrl },
        "breadcrumb": {
          "@id": `${baseUrl}/pricing#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/pricing#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": baseUrl,
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": `${baseUrl}/pricing`,
              "name": "Pricing"
            }
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/pricing#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      ...plans.map((plan, index) => ({
        "@type": "Product",
        "@id": `${baseUrl}/pricing#${plan.name.toLowerCase()}`,
        "name": `ExplainX ${plan.name} Plan`,
        "description": plan.description,
        "offers": {
          "@type": "Offer",
          "price": getPriceValue(plan.price),
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "itemCondition": "https://schema.org/NewCondition"
        },
        "identifier": `plan-${index}`,
        "image": "https://explainx.ai/images/main/landing.png",
        "brand": {
          "@type": "Brand",
          "name": "ExplainX"
        }
      })),
      {
        "@type": "PriceSpecification",
        "@id": `${baseUrl}/pricing#influencer-tiers`,
        "name": "Influencer Tier Pricing",
        "description": "Performance-based pricing tiers for different influencer categories",
        "priceType": "https://schema.org/CPC",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "unitText": "clicks"
        },
        "priceSpecification": influencerTiers.map(tier => ({
          "@type": "PriceSpecification",
          "name": tier.name,
          "price": {
            "@type": "MonetaryAmount",
            "minValue": tier.minCPC,
            "maxValue": tier.maxCPC,
            "currency": "USD"
          },
          "description": `Average engagement rate: ${(tier.averageEngagement * 100).toFixed(1)}%`
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}