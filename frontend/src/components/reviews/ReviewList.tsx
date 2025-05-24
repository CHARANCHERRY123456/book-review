import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Review } from '../../types/Review';
import Card, { CardBody } from '../ui/Card';

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="animate-pulse">
              <Card>
                <CardBody>
                  <div className="flex justify-between">
                    <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
                  </div>
                  <div className="mt-4 bg-gray-200 h-4 rounded w-full"></div>
                  <div className="mt-2 bg-gray-200 h-4 rounded w-full"></div>
                  <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
                </CardBody>
              </Card>
            </div>
          ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardBody>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="font-medium">{review.userName}</div>
                {renderStars(review.rating)}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.content}</p>
            <div className="flex mt-4 space-x-4 text-sm text-gray-500">
              <button className="flex items-center hover:text-gray-700">
                <ThumbsUp size={14} className="mr-1" />
                Helpful
              </button>
              <button className="flex items-center hover:text-gray-700">
                <Flag size={14} className="mr-1" />
                Report
              </button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;