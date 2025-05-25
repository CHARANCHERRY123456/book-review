const asyncHandler = require('../../utils/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const Book = require('./book.model');
const { BOOK } = require('../../constants/errorMessages');
const logger = require('../../utils/logger');
const BookRepository = require('./book.repository');
const BookService = require('./book.service');

// Instantiate repository and service
const bookRepository = new BookRepository(Book);
const bookService = new BookService(bookRepository);

/**
 * @desc    Get all books with pagination and filters
 * @route   GET /api/books
 * @access  Public
 */
exports.getBooks = asyncHandler(async (req, res, next) => {
  // Build query
  const queryObj = {};

  // Filter by title, author, or genre if provided
  if (req.query.title) {
    queryObj.title = { $regex: req.query.title, $options: 'i' };
  }

  if (req.query.author) {
    queryObj.author = { $regex: req.query.author, $options: 'i' };
  }

  if (req.query.genre) {
    queryObj.genre = { $regex: req.query.genre, $options: 'i' };
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  // Execute query
  const books = await bookService.getAllBooks(queryObj);
  const paginatedBooks = books
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(startIndex, startIndex + limit);

  // Get total count
  const totalCount = books.length;

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
    data: paginatedBooks,
  });
});

/**
 * @desc    Get featured books
 * @route   GET /api/books/featured
 * @access  Public
 */
exports.getFeaturedBooks = asyncHandler(async (req, res, next) => {
  const books = await bookService.getAllBooks({ featured: true });
  const sorted = books.sort((a, b) => b.averageRating - a.averageRating).slice(0, 10);

  res.status(200).json({
    success: true,
    data: sorted,
  });
});

/**
 * @desc    Get single book
 * @route   GET /api/books/:id
 * @access  Public
 */
exports.getBookById = asyncHandler(async (req, res, next) => {
  const book = await bookService.getBookById(req.params.id);

  if (!book) {
    return next(new ErrorResponse(BOOK.NOT_FOUND, 404));
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * @desc    Create a book
 * @route   POST /api/books
 * @access  Private/Admin
 */
exports.createBook = asyncHandler(async (req, res, next) => {
  const book = await bookService.createBook(req.body);

  logger.info(`Book created: ${book.title}`);

  res.status(201).json({
    success: true,
    data: book,
  });
});

/**
 * @desc    Create multiple books
 * @route   POST /api/books/bulk
 * @access  Private/Admin
 */
exports.createBooksBulk = asyncHandler(async (req, res, next) => {
  const booksData = req.body;

  if (!Array.isArray(booksData) || booksData.length === 0) {
    return next(new ErrorResponse('Request body must be a non-empty array of books', 400));
  }

  // Use model directly for insertMany to preserve bulk logic
  const books = await Book.insertMany(booksData);

  logger.info(`Bulk books created: ${books.length} books`);

  res.status(201).json({
    success: true,
    count: books.length,
    data: books,
  });
});

/**
 * @desc    Update a book
 * @route   PUT /api/books/:id
 * @access  Private/Admin
 */
exports.updateBook = asyncHandler(async (req, res, next) => {
  let book = await bookService.getBookById(req.params.id);

  if (!book) {
    return next(new ErrorResponse(BOOK.NOT_FOUND, 404));
  }

  // Add updatedAt timestamp
  req.body.updatedAt = Date.now();

  book = await bookService.updateBook(req.params.id, req.body);

  logger.info(`Book updated: ${book.title}`);

  res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * @desc    Delete a book
 * @route   DELETE /api/books/:id
 * @access  Private/Admin
 */
exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await bookService.getBookById(req.params.id);

  if (!book) {
    return next(new ErrorResponse(BOOK.NOT_FOUND, 404));
  }

  await bookService.deleteBook(req.params.id);

  logger.info(`Book deleted: ${book.title}`);

  res.status(200).json({
    success: true,
    data: {},
  });
});