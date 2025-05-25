const asyncHandler = require('../../utils/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const Review = require('./review.model');
const Book = require('../books/book.model');
const { REVIEW, BOOK } = require('../../constants/errorMessages');
const logger = require('../../utils/logger');
const { default: mongoose } = require('mongoose');

/**
 * @desc    Get reviews with pagination
 * @route   GET /api/reviews
 * @access  Public
 */
exports.getReviews = asyncHandler(async (req, res, next) => {
  // Filter by book if bookId is provided
  const filter = {};
  if (req.query.bookId) {
    filter.book = req.query.bookId;
    
    // Check if book exists
    const book = await Book.findById(req.query.bookId);
    if (!book) {
      return next(new ErrorResponse(BOOK.NOT_FOUND, 404));
    }
  }
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  
  // Execute query with populate
  const reviews = await Review.find(filter)
    .populate({
      path: 'user',
      select: 'name avatar',
    })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);
  
  // Get total count
  const totalCount = await Review.countDocuments(filter);
  
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
  const pagination = {
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    limit,
  };
  
  res.status(200).json({
    success: true,
    pagination,
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
  const startIndex = (page - 1) * limit;
  
  // Execute query with populate
  const reviews = await Review.find({ user: req.user.id })
    .populate({
      path: 'book',
      select: 'title author coverImage',
    })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);
  
  // Get total count
  const totalCount = await Review.countDocuments({ user: req.user.id });
  
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
  const pagination = {
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    limit,
  };
  
  res.status(200).json({
    success: true,
    pagination,
    data: formattedReviews,
  });
});

/**
 * @desc    Get single review
 * @route   GET /api/reviews/:id
 * @access  Public
 */
exports.getReviewById = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'user',
    select: 'name avatar',
  });
  
  if (!review) {
    return next(new ErrorResponse(REVIEW.NOT_FOUND, 404));
  }
  
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
  const {  rating, content, bookId } = req.body;
  console.log("received body:", req.body);
  
  
  
  // Check if book exists
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorResponse(BOOK.NOT_FOUND, 404));
  }
  
  // Check if user already reviewed this book
  const existingReview = await Review.findOne({
    book: bookId,
    user: req.user.id,
  });
  
  if (existingReview) {
    return next(new ErrorResponse('You have already reviewed this book', 400));
  }
  
  // Create review
  const review = await Review.create({
    book: bookId,
    user: req.user.id,
    rating,
    content,
  });
  
  logger.info(`Review created: ${req.user.name} reviewed ${book.title}`);
  
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
  let review = await Review.findById(req.params.id);
  
  if (!review) {
    return next(new ErrorResponse(REVIEW.NOT_FOUND, 404));
  }
  
  // Check if user owns the review
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this review', 403));
  }
  
  // Update fields
  const { rating, content } = req.body;
  const updateFields = {};
  
  if (rating !== undefined) updateFields.rating = rating;
  if (content) updateFields.content = content;
  updateFields.updatedAt = Date.now();
  
  // Update review
  review = await Review.findByIdAndUpdate(
    req.params.id,
    updateFields,
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: 'user',
    select: 'name avatar',
  });
  
  logger.info(`Review updated: ${req.user.name}`);
  
  // Update book rating
  await Review.getAverageRating(review.book);
  
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
  const review = await Review.findById(req.params.id);
  
  if (!review) {
    return next(new ErrorResponse(REVIEW.NOT_FOUND, 404));
  }
  
  // Check if user owns the review
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this review', 403));
  }
  
  const bookId = review.book;
  
  await review.remove();
  
  logger.info(`Review deleted: ${req.user.name}`);
  
  // Update book rating
  await Review.getAverageRating(bookId);
  
  res.status(200).json({
    success: true,
    data: {},
  });
});