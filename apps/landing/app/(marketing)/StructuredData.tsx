import React from 'react';

type HomePageStructuredDataProps = {
  baseUrl?: string;
};

export function HomePageStructuredData({ baseUrl = 'https://explainx.ai' }: HomePageStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": baseUrl,
        "url": baseUrl,
        "name": "explainx.ai",
        "description": "AI-Powered Influencer Marketing Platform",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        "name": "AISOLO Technologies Pvt. Ltd.",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": "https://explainx.ai/icons/explainx_ai_light.png"
        },
        "sameAs": [
          "https://twitter.com/ExplainX",
          "https://github.com/ExplainX"
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}#webpage`,
        "url": baseUrl,
        "name": "ExplainX - AI-Powered Influencer Marketing Platform",
        "description": "Find and collaborate with creators and influencers using AI-powered tools for campaign management, analytics, and automation.",
        "isPartOf": { "@id": baseUrl },
        "about": { "@id": `${baseUrl}#organization` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://explainx.ai/images/main/landing.png"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "ExplainX Influencer Marketing Platform",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web-based",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Performance-based pricing - Pay per click"
        }
      },
      {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Find Influencers",
            "url": `${baseUrl}/products/influencer-discovery`,
            "description": "Recruit the best influencers and affiliates for your campaigns"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Pricing",
            "url": `${baseUrl}/pricing`,
            "description": "Join 1000+ Brands. Transparent, performance-based pricing options"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Free Tools",
            "url": `${baseUrl}/tools`,
            "description": "Access free influencer marketing tools and calculators"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Campaign Management",
            "url": `${baseUrl}/products/campaign-management`,
            "description": "Manage your influencer campaigns effectively"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": baseUrl,
              "name": "Home"
            }
          }
        ]
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