'use client';

import Script from 'next/script';
import { ReviewData } from '../../../types/product';

interface ReviewSchemaProps {
  productName: string;
  productUrl: string;
  reviews: ReviewData[];
  averageRating: number;
}

export function ReviewSchema(props: ReviewSchemaProps) {
  const { productName, productUrl, reviews, averageRating } = props;
  
  const schemaData = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    "@id": productUrl,
    "name": productName,
    "url": productUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.authorName
      },
      "datePublished": review.createdAt,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "publisher": {
        "@type": "Organization",
        "name": productName
      }
    }))
  });

  return (
    <Script id="product-review-schema" type="application/ld+json" strategy="afterInteractive">
      {schemaData}
    </Script>
  );
}