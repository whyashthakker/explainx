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
        "name": "AISolo Technologies",
        "description": "AI agents for automation, training & education services, and SaaS platform development",
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
        "name": "AISolo Technologies Private Limited - AI Agents & SaaS Development",
        "description": "Building AI agents for automation, training & education services. Creators of Infloq (influencer management), Olly.social (social media toolkit), and BGBlur (privacy tools).",
        "isPartOf": { "@id": baseUrl },
        "about": { "@id": `${baseUrl}#organization` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://explainx.ai/images/main/landing.png"
        }
      },
      {
        "@type": "ItemList",
        "name": "AISolo Technologies Products",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Infloq",
            "url": "https://infloq.com",
            "description": "Influencer management platform for brands and creators"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Olly Social",
            "url": "https://olly.social",
            "description": "Social media toolkit for small and medium businesses"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "BGBlur",
            "url": "https://bgblur.com",
            "description": "Privacy tools for content creators"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "AI Training Services",
            "url": `${baseUrl}/contact`,
            "description": "AI automation training and education services"
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