'use client';

import dynamic from 'next/dynamic';
import { ReviewSkeleton } from "./review-skeleton";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import productData from '../../../data/product-data';
import { ReviewData } from '../../../types/product';

const DynamicReviewWrapper = dynamic(
  () => import('./client-wrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-4xl mx-auto p-8 text-center">
        <ReviewSkeleton />
      </div>
    ),
  }
);

async function fetchReviews(slug: string) {
  try {
    const response = await fetch(`/api/reviews/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export function ReviewsSection() {
  const pathname = usePathname();
  const productSlug = pathname?.split('/').pop() || '';
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const product = productData.find(p => p.file === productSlug);
  
  useEffect(() => {
    if (productSlug) {
      fetchReviews(productSlug).then(data => {
        setReviews(data);
        setIsLoading(false);
      });
    }
  }, [productSlug]);

  if (!product) return null;
  if (isLoading) return <ReviewSkeleton />;

  return (
    <div className="w-full py-12">
      <DynamicReviewWrapper
      productId={productSlug}
      productName={product?.title?.split('|')[0]?.trim() || ''}
      productUrl={product?.url ?? ''}
      initialReviews={reviews}
      />
    </div>
  );
}