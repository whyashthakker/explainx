import { FeatureCategory } from "../../../data/features";

interface FeaturesStructuredDataProps {
  feature: FeatureCategory;
}

export default function FeaturesStructuredData({ feature }: FeaturesStructuredDataProps) {
  const baseUrl = 'https://www.infloq.com';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/features/${feature.slug}#webpage`,
        "url": `${baseUrl}/features/${feature.slug}`,
        "name": `${feature.title} - Infloq Features`,
        "description": feature.description,
        "isPartOf": { "@id": baseUrl },
        "breadcrumb": {
          "@id": `${baseUrl}/features/${feature.slug}#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/features/${feature.slug}#breadcrumb`,
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
              "@id": `${baseUrl}/features`,
              "name": "Features"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@id": `${baseUrl}/features/${feature.slug}`,
              "name": feature.title
            }
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": feature.title,
        "description": feature.description,
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        },
        "featureList": feature.features.map(f => f.title).join(", "),
        ...(feature.image && { "image": `${baseUrl}${feature.image}` })
      },
      {
        "@type": "ItemList",
        "itemListElement": feature.features.map((subFeature, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": subFeature.title,
            "description": subFeature.description
          }
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