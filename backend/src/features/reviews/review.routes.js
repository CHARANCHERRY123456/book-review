const express = require('express');
const { 
  getReviews, 
  getUserReviews,
  getReviewById, 
  createReview, 
  updateReview, 
  deleteReview 
} = require('./review.controller');
const { protect } = require('../../middlewares/auth');
const { createReviewValidator, updateReviewValidator } = require('./review.validator');
const validate = require('../../middlewares/validate');
const { REVIEWS } = require('../../constants/routes');

const router = express.Router();

// Public routes
router.get('/', getReviews);

// Move this private route above REVIEWS.BY_ID to avoid conflict
router.get(REVIEWS.BY_USER, protect, getUserReviews);

router.get(REVIEWS.BY_ID, getReviewById);



router.post(
  '/', 
  protect, 
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

// Private routes

module.exports = router;