type StructuredDataProps = {
  headline: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl: string;
  image: string[];
  categories?: string[];
  keywords?: string[];
  description?: string;
  mainEntityOfPage?: string;
  publisher?: {
    name: string;
    logo?: string;
  };
  language?: string;
  timeToRead?: string;
  isOriginal?: boolean;
  wordCount?: number;
};

export function StructuredData(props: StructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: props.headline,
    image: props.image.length ? props.image : undefined,
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    author: [
      {
        "@type": "Person",
        name: props.authorName,
        url: props.authorUrl,
      },
    ],
    // Enhanced keywords handling
    keywords: props.categories?.join(', ') || props.keywords?.join(', '),
    articleSection: props.categories,
    description: props.description,
    mainEntityOfPage: props.mainEntityOfPage || {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : undefined
    },
    // Add publisher information
    publisher: {
      "@type": "Organization",
      name: props.publisher?.name || "Goyashy",
      ...(props.publisher?.logo && {
        logo: {
          "@type": "ImageObject",
          url: props.publisher.logo
        }
      })
    },
    // Add language support
    inLanguage: props.language || 'en',
    // Add reading time and word count
    timeRequired: props.timeToRead,
    ...(props.wordCount && { wordCount: props.wordCount }),
    // Add isOriginal as isBasedOn (inverse)
    ...(props.isOriginal === false && {
      isBasedOn: "https://goyashy.com"
    }),
    // Add additional properties for better SEO
    copyrightYear: new Date(props.datePublished).getFullYear(),
    copyrightHolder: {
      "@type": "Organization",
      name: props.publisher?.name || "Goyashy"
    },
    // Add accessibility properties
    accessMode: ["textual", "visual"],
    accessibilityControl: ["fullKeyboardControl", "fullMouseControl"],
    accessibilityFeature: ["structuredNavigation", "readingOrder"]
  };

  // Remove undefined values for cleaner JSON-LD
  const cleanJsonLd = JSON.parse(JSON.stringify(jsonLd));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }}
    />
  );
}