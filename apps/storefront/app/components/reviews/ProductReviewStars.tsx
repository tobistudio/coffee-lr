import { StoreProductReviewStats } from '@lambdacurry/medusa-plugins-sdk';
import { FC } from 'react';
import { Link } from 'react-router';
import { StarRating } from './StarRating';

interface ProductReviewStarsProps {
  reviewsCount?: number;
  reviewStats?: StoreProductReviewStats;
}

export const ProductReviewStars: FC<ProductReviewStarsProps> = ({ reviewsCount, reviewStats }) => {
  if (!reviewsCount || reviewsCount < 1) return null;

  return (
    <div className="flex items-center gap-1">
      <StarRating value={reviewStats?.average_rating || 0} readOnly />

      <Link to="#reviews" className="ml-1 mt-[1px] flex text-xs">
        <div className="mr-1 hover:underline">
          {' '}
          {reviewsCount} Review{reviewsCount > 1 ? 's' : ''}
        </div>
      </Link>
    </div>
  );
};
