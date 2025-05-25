import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetails from '../components/books/BookDetails';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import { Book } from '../types/Book';
import { Review, NewReview } from '../types/Review';
import { bookService } from '../services/bookService';
import { reviewService } from '../services/reviewService';
import { logger } from '../logger';
import { MESSAGES } from '../constants/messages';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/books');
      return;
    }

    const fetchBookData = async () => {
      try {
        setLoading(true);
        logger.info('Loading book details', { bookId: id });
        logger.info(`Fetching book with ID: ${id}`, typeof id);
        const bookData = await bookService.getBookById(id);
        console.log(`Fetched book data:`, bookData);
        
        setBook(bookData.data);
        logger.info('Book details loaded', { bookId: id });
      } catch (error) {
        logger.error('Failed to load book details', { error, bookId: id });
        navigate('/books');
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await reviewService.getReviewsByBookId(id, 1, 10);
        setReviews(response.data);
        logger.info('Book reviews loaded', { bookId: id });
      } catch (error) {
        logger.error('Failed to load book reviews', { error, bookId: id });
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchBookData();
    fetchReviews();
  }, [id, navigate]);

  const handleReviewSubmit = async (review: NewReview) => {
    try {
      const newReview = await reviewService.addReview(review);
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      
      // Update book with new review count and rating
      if (book) {
        const updatedBook = { 
          ...book, 
          reviewCount: book.reviewCount + 1,
          // This is a simplified calculation, in a real app the backend would handle this
          averageRating: (book.averageRating * book.reviewCount + review.rating) / (book.reviewCount + 1)
        };
        setBook(updatedBook);
      }
      
      logger.info('Review submitted', { bookId: id });
      window.showToast(MESSAGES.REVIEW_SUBMIT_SUCCESS, 'success');
    } catch (error) {
      logger.error('Failed to submit review', { error, bookId: id });
      window.showToast('you have submitted a review already');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-200 rounded-lg w-full h-96"></div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-gray-200 h-10 rounded w-3/4 mb-4"></div>
            <div className="bg-gray-200 h-6 rounded w-1/2 mb-6"></div>
            <div className="bg-gray-200 h-4 rounded w-full mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-full mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-full mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-full mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Book not found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Book Details */}
      <BookDetails book={book} />

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        
        {/* Review Form */}
        <div className="mb-8">
          <ReviewForm bookId={book._id} onSubmit={handleReviewSubmit} />
        </div>
        
        {/* Review List */}
        <ReviewList reviews={reviews} loading={reviewsLoading} />
      </div>
    </div>
  );
};

export default BookDetailPage;