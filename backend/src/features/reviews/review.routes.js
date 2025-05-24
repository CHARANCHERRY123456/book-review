import express from 'express';
import { 
  getReviews, 
  getUserReviews,
  getReviewById, 
  createReview, 
  updateReview, 
  deleteReview 
} from './review.controller.js';
import { protect } from '../../middlewares/auth';
import { createReviewValidator, updateReviewValidator } from './review.validator';
import validate from '../../middlewares/validate';
import { REVIEWS } from '../../constants/routes';

const router = express.Router();

// Public routes
router.get('/', getReviews);
router.get(REVIEWS.BY_ID, getReviewById);

// Private routes
router.get(REVIEWS.BY_USER, protect, getUserReviews);

router.post(
  '/', 
  protect, 
  createReviewValidator, 
  validate, 
  createReview
);

router.put(
  REVIEWS.BY_ID, 
  protect, 
  updateReviewValidator, 
  validate, 
  updateReview
);

router.delete(
  REVIEWS.BY_ID, 
  protect, 
  deleteReview
);

export default router;