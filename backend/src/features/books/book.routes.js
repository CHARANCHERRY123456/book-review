import express from 'express';
import {
  getBooks,
  getFeaturedBooks,
  getBookById,
  createBook,
  createBooksBulk,
  updateBook,
  deleteBook
} from './book.controller.js';
import { protect, authorize } from '../../middlewares/auth';
import { createBookValidator, updateBookValidator } from './book.validator';
import validate from '../../middlewares/validate';
import { BOOKS } from '../../constants/routes';
import ROLES from '../../constants/roles';

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

export default router;