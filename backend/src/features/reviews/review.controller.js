const asyncHandler = require('../../utils/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const { REVIEW, BOOK } = require('../../constants/errorMessages');
const logger = require('../../utils/logger');
const reviewService = require('./review.service');

/**
 * @desc    Get reviews with pagination
 * @route   GET /api/reviews
 * @access  Public
 */
exports.getReviews = asyncHandler(async (req, res, next) => {
  // Filter by book if bookId is provided
  const filter = {};
  if (req.query.bookId) filter.book = req.query.bookId;
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const { reviews, totalCount } = await reviewService.getReviews(filter, page, limit);
  // Format reviews
  const formattedReviews = reviews.map(review => ({
    id: review._id,
    bookId: review.book,
    userId: review.user._id,
    userName: review.user.name,
    rating: review.rating,
    content: review.content,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  }));
  // Pagination result
  res.status(200).json({
    success: true,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    },
    data: formattedReviews,
  });
});

/**
 * @desc    Get reviews by current user
 * @route   GET /api/reviews/user
 * @access  Private
 */
exports.getUserReviews = asyncHandler(async (req, res, next) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const { reviews, totalCount } = await reviewService.getUserReviews(req.user.id, page, limit);
  // Format reviews
  const formattedReviews = reviews.map(review => ({
    id: review._id,
    bookId: review.book._id,
    bookTitle: review.book.title,
    bookAuthor: review.book.author,
    bookCover: review.book.coverImage,
    userId: req.user.id,
    userName: req.user.name,
    rating: review.rating,
    content: review.content,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  }));
  // Pagination result
  res.status(200).json({
    success: true,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    },
    data: formattedReviews,
  });
});

/**
 * @desc    Get single review
 * @route   GET /api/reviews/:id
 * @access  Public
 */
exports.getReviewById = asyncHandler(async (req, res, next) => {
  const review = await reviewService.getReviewById(req.params.id);
  if (!review) return next(new ErrorResponse(REVIEW.NOT_FOUND, 404));
  res.status(200).json({
    success: true,
    data: {
      id: review._id,
      bookId: review.book,
      userId: review.user._id,
      userName: review.user.name,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    },
  });
});

/**
 * @desc    Create a review
 * @route   POST /api/reviews
 * @access  Private
 */
exports.createReview = asyncHandler(async (req, res, next) => {
  const { rating, content, bookId } = req.body;
  const result = await reviewService.createReview({ rating, content, bookId, userId: req.user.id, userName: req.user.name });
  if (result.error === 'BOOK_NOT_FOUND') return next(new ErrorResponse(BOOK.NOT_FOUND, 404));
  if (result.error === 'ALREADY_REVIEWED') return next(new ErrorResponse('You have already reviewed this book', 400));
  const { review } = result;
  logger.info(`Review created: ${req.user.name} reviewed book ${bookId}`);
  res.status(201).json({
    success: true,
    data: {
      id: review._id,
      bookId: review.book,
      userId: req.user.id,
      userName: req.user.name,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    },
  });
});

/**
 * @desc    Update a review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { rating, content } = req.body;
  const updateFields = {};
  if (rating !== undefined) updateFields.rating = rating;
  if (content) updateFields.content = content;
  const result = await reviewService.updateReview(req.params.id, req.user, updateFields);
  if (result.error === 'NOT_FOUND') return next(new ErrorResponse(REVIEW.NOT_FOUND, 404));
  if (result.error === 'NOT_AUTHORIZED') return next(new ErrorResponse('Not authorized to update this review', 403));
  const { review } = result;
  logger.info(`Review updated: ${req.user.name}`);
  res.status(200).json({
    success: true,
    data: {
      id: review._id,
      bookId: review.book,
      userId: review.user._id,
      userName: review.user.name,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    },
  });
});

/**
 * @desc    Delete a review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const result = await reviewService.deleteReview(req.params.id, req.user);
  if (result.error === 'NOT_FOUND') return next(new ErrorResponse(REVIEW.NOT_FOUND, 404));
  if (result.error === 'NOT_AUTHORIZED') return next(new ErrorResponse('Not authorized to delete this review', 403));
  logger.info(`Review deleted: ${req.user.name}`);
  res.status(200).json({ success: true, data: {} });
});