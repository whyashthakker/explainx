'use client';

import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { ReviewSchema } from './review-schema';
import { ReviewData } from '../../../types/product';

interface ProductReviewsProps {
  productId: string;
  productName: string;
  productUrl: string;
  reviews: ReviewData[];
  onSubmitReview: (review: Omit<ReviewData, 'id' | 'createdAt' | 'isVerified'>) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
  productUrl,
  reviews,
  onSubmitReview,
  isLoading = false,
  className = ''
}) => {
  const [newReview, setNewReview] = useState({
    authorName: '',
    rating: 5,
    reviewBody: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = {
    averageRating: reviews.length
      ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1))
      : 0,
    totalReviews: reviews.length,
    ratingDistribution: reviews.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>)
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmitReview(newReview);
      setNewReview({
        authorName: '',
        rating: 5,
        reviewBody: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-8 ${className}`}>
      <ReviewSchema 
        productName={productName}
        productUrl={productUrl}
        reviews={reviews}
        averageRating={stats.averageRating}
      />

      {/* Reviews Summary Card */}
      <Card className="bg-white">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Average Rating */}
            <div className="flex items-center gap-6">
              <div className="text-5xl font-bold text-blue-600">{stats.averageRating}</div>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={star <= stats.averageRating ? "fill-secondaccent text-secondaccent" : "text-gray-200"}
                      size={24}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 max-w-sm">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 w-16">
                    <Star size={14} className="fill-secondaccent text-secondaccent" />
                    <span className="text-sm font-medium">{rating}</span>
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondaccent rounded-full transition-all duration-300"
                      style={{
                        width: `${((stats.ratingDistribution[rating] || 0) / stats.totalReviews * 100) || 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {((stats.ratingDistribution[rating] || 0) / stats.totalReviews * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form Card */}
      <Card className="bg-white">
        <CardHeader className="border-b">
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-6 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="hover:scale-110 transition-transform"
                    onClick={() => setNewReview({...newReview, rating: star})}
                  >
                    <Star
                      className={star <= newReview.rating ? "fill-secondaccent text-secondaccent" : "text-gray-200"}
                      size={32}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                required
                placeholder="Enter your name"
                value={newReview.authorName}
                onChange={(e) => setNewReview({...newReview, authorName: e.target.value})}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Review
              </label>
              <Textarea
                required
                placeholder="Share your experience with this product..."
                rows={4}
                value={newReview.reviewBody}
                onChange={(e) => setNewReview({...newReview, reviewBody: e.target.value})}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card className="p-8 text-center text-gray-500">Loading reviews...</Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={star <= review.rating ? "fill-secondaccent text-secondaccent" : "text-gray-200"}
                        size={18}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{review.authorName}</span>
                  {review.isVerified && (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <Check size={14} />
                      Verified Purchase
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.reviewBody}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;