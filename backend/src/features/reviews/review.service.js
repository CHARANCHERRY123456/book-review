const ReviewRepository = require('./review.repository');
const Review = require('./review.model');
const Book = require('../books/book.model');

class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async getReviews(filter = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const reviews = await Review.find(filter)
      .populate({ path: 'user', select: 'name avatar' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalCount = await Review.countDocuments(filter);
    return { reviews, totalCount };
  }

  async getUserReviews(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const reviews = await Review.find({ user: userId })
      .populate({ path: 'book', select: 'title author coverImage' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalCount = await Review.countDocuments({ user: userId });
    return { reviews, totalCount };
  }

  async getReviewById(id) {
    return Review.findById(id).populate({ path: 'user', select: 'name avatar' });
  }

  async createReview({ rating, content, bookId, userId, userName }) {
    const book = await Book.findById(bookId);
    if (!book) return { error: 'BOOK_NOT_FOUND' };
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) return { error: 'ALREADY_REVIEWED' };
    const review = await Review.create({ book: bookId, user: userId, rating, content });
    return { review, book };
  }

  async updateReview(id, user, updateFields) {
    let review = await Review.findById(id);
    if (!review) return { error: 'NOT_FOUND' };
    if (review.user.toString() !== user.id && user.role !== 'admin') return { error: 'NOT_AUTHORIZED' };
    review = await Review.findByIdAndUpdate(id, { ...updateFields, updatedAt: Date.now() }, { new: true, runValidators: true })
      .populate({ path: 'user', select: 'name avatar' });
    await Review.getAverageRating(review.book);
    return { review };
  }

  async deleteReview(id, user) {
    const review = await Review.findById(id);
    if (!review) return { error: 'NOT_FOUND' };
    if (review.user.toString() !== user.id && user.role !== 'admin') return { error: 'NOT_AUTHORIZED' };
    const bookId = review.book;
    await review.remove();
    await Review.getAverageRating(bookId);
    return { review };
  }
}

const ReviewRepositoryClass = require('./review.repository');
const reviewRepository = new ReviewRepositoryClass(Review);
const reviewService = new ReviewService(reviewRepository);
module.exports = reviewService;
