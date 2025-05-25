import apiClient from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';
import { Review, NewReview, PaginatedResponse } from '../types/Review';

export const reviewService = {
  async getReviewsByBookId(bookId: string, page = 1, limit = 10): Promise<PaginatedResponse<Review>> {
    const response = await apiClient.get(`${API_ROUTES.REVIEWS_BY_BOOK(bookId)}&page=${page}&limit=${limit}`);
    return response.data;
  },

  async addReview(reviewData: NewReview): Promise<Review> {
    console.log("Adding review data:", reviewData);
    
    const response = await apiClient.post(API_ROUTES.REVIEWS, reviewData);
    return response.data;
  },

  async getUserReviews(page = 1, limit = 10): Promise<PaginatedResponse<Review>> {
    const response = await apiClient.get(`${API_ROUTES.REVIEWS}?page=${page}&limit=${limit}`);
    return response.data;
  },

  async deleteReview(reviewId: string): Promise<void> {
    await apiClient.delete(API_ROUTES.REVIEW_BY_ID(reviewId));
  }
};