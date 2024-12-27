// components/withProductPage.tsx
'use client';

import { ComponentType } from 'react';
import ProductReviews from './product-review';
import { useProductReviews } from '../../../hooks/use-product-reviews';
import { getProductBySlug } from '../../../lib/product/product';
import { ReviewData } from '../../../types/product';

interface WithProductPageProps {
  params: {
    product: string;
  };
}

export function withProductPage<P extends WithProductPageProps>(
  WrappedComponent: ComponentType<P>
) {
  return function WithProductPageWrapper(props: P) {
    const product = getProductBySlug(props.params.product);
    const { reviews, isLoading, submitReview } = useProductReviews({
      productSlug: props.params.product,
      initialReviews: []
    });

    if (!product) return null;

    // Create a wrapper function that returns void instead of the review
    const handleSubmitReview = async (
      reviewData: Omit<ReviewData, 'id' | 'createdAt' | 'isVerified'>
    ) => {
      await submitReview(reviewData);
    };

    return (
      <>
        <WrappedComponent {...props} />
        <ProductReviews
          productId={product.file}
          productName={product.title}
          productUrl={product.url}
          reviews={reviews}
          onSubmitReview={handleSubmitReview}
          isLoading={isLoading}
        />
      </>
    );
  };
}