import apiClient from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';
import { Review, NewReview, PaginatedResponse } from '../types/Review';

export const reviewService = {
  async getReviewsByBookId(bookId: string, page = 1, limit = 10): Promise<PaginatedResponse<Review>> {
    const response = await apiClient.get(`${API_ROUTES.REVIEWS_BY_BOOK(bookId)}&page=${page}&limit=${limit}`);
    return response.data;
  },

  async addReview(reviewData: NewReview): Promise<Review> {
    
    const response = await apiClient.post(API_ROUTES.REVIEWS, reviewData);
    console.log(response.data.data , "is the response from addReview");
    return response.data.data;
  },

  async getUserReviews(page = 1, limit = 10): Promise<PaginatedResponse<Review>> {

    const response = await apiClient.get(`${API_ROUTES.REVIEWS}/user/?page=${page}&limit=${limit}`);
    return response.data;
  },

  async deleteReview(reviewId: string): Promise<void> {
    await apiClient.delete(API_ROUTES.REVIEW_BY_ID(reviewId));
  }
};