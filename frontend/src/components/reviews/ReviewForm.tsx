import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Button from '../ui/Button';
import { NewReview } from '../../types/Review';
import { useAuth } from '../../hooks/useAuth';
import { MESSAGES } from '../../constants/messages';

interface ReviewFormProps {
  bookId: string;
  onSubmit: (review: NewReview) => Promise<void>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onSubmit }) => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (content.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        bookId,
        rating,
        content: content.trim(),
      });
      
      // Reset form on success
      setRating(0);
      setContent('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
        <p className="text-blue-700 mb-2">Please sign in to leave a review</p>
        <Button variant="primary" size="sm" onClick={() => window.location.href = '/login'}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none"
            >
              <Star
                size={24}
                className={`${
                  (hoverRating || rating) >= star
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          id="content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Share your thoughts about this book..."
          required
          minLength={10}
        ></textarea>
        <p className="text-sm text-gray-500 mt-1">
          Minimum 10 characters required
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;