const express = require('express');
const {
  getBooks,
  getFeaturedBooks,
  getBookById,
  createBook,
  createBooksBulk,
  updateBook,
  deleteBook
} = require('./book.controller');
const { protect, authorize } = require('../../middlewares/auth');
const { createBookValidator, updateBookValidator } = require('./book.validator');
const validate = require('../../middlewares/validate');
const { BOOKS } = require('../../constants/routes');
const ROLES = require('../../constants/roles');

const router = express.Router();

// Public routes
router.get('/', getBooks);
router.get(BOOKS.FEATURED, getFeaturedBooks);
router.get(BOOKS.BY_ID, getBookById);

// Admin only routes
router.post(
  '/',
  protect,
  authorize(ROLES?.ADMIN),
  createBookValidator,
  validate,
  createBook
);



router.post(
  BOOKS.BULK,
  protect,
  authorize(ROLES?.ADMIN),
  createBooksBulk
);

router.put(
  BOOKS.BY_ID,
  protect,
  authorize(ROLES?.ADMIN),
  updateBookValidator,
  validate,
  updateBook
);

router.post(
  BOOKS.BULK,
  protect,
  authorize(ROLES?.ADMIN),
  createBookValidator,
  validate,
  createBooksBulk
);

router.delete(
  BOOKS.BY_ID,
  protect,
  authorize(ROLES?.ADMIN),
  deleteBook
);

module.exports = router;