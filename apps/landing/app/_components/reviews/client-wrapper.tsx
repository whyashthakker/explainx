'use client';

import dynamic from 'next/dynamic';
import { ReviewSkeleton } from './review-skeleton';
import { ReviewData } from '../../../types/product';
import { useProductReviews } from '../../../hooks/use-product-reviews';

const ProductReviews = dynamic(() => import('./product-review'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto p-8 text-center">
      <ReviewSkeleton />
    </div>
  ),
});

interface ClientReviewWrapperProps {
  productId: string;
  productName: string;
  productUrl: string;
  initialReviews: ReviewData[];
}

export default function ClientReviewWrapper(props: ClientReviewWrapperProps) {
  const { productId, productName, productUrl, initialReviews = [] } = props;
  
  const { reviews, isLoading, submitReview } = useProductReviews({
    productSlug: productId,
    initialReviews
  });

  const handleSubmitReview = async (
    reviewData: Omit<ReviewData, 'id' | 'createdAt' | 'isVerified'>
  ) => {
    await submitReview(reviewData);
  };

  return (
    <ProductReviews
      productId={productId}
      productName={productName}
      productUrl={productUrl}
      reviews={reviews}
      onSubmitReview={handleSubmitReview}
      isLoading={isLoading}
    />
  );
}
