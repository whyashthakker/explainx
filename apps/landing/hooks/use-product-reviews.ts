'use client';

import { useState, useEffect } from 'react';
import { ReviewData } from '../types/product';

interface UseProductReviewsProps {
  productSlug: string;
  initialReviews: ReviewData[];
}

export function useProductReviews({ productSlug, initialReviews = [] }: UseProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewData[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  const submitReview = async (reviewData: Omit<ReviewData, 'id' | 'createdAt' | 'isVerified'>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/reviews/${productSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const data = await response.json();
      
      const newReview: ReviewData = {
        id: data.id,
        authorName: data.authorName,
        rating: data.rating,
        reviewBody: data.reviewBody,
        createdAt: new Date(data.createdAt).toISOString(),
        isVerified: data.isVerified
      };

      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit review');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { reviews, isLoading, error, submitReview };
}