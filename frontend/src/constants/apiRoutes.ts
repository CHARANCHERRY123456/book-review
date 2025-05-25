const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ROUTES = {
  // Auth routes
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // Book routes
  BOOKS: `${API_BASE_URL}/books`,
  BOOK_BY_ID: (id: string) => `${API_BASE_URL}/books/${id}`,
  
  // Review routes
  REVIEWS: `${API_BASE_URL}/reviews/`,
  REVIEWS_BY_BOOK: (bookId: string) => `${API_BASE_URL}/reviews?bookId=${bookId}`,
  REVIEW_BY_ID: (id: string) => `${API_BASE_URL}/reviews/${id}`,
  
  // User routes
  USERS: `${API_BASE_URL}/users`,
  USER_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
  USER_PROFILE: `${API_BASE_URL}/users/profile`,
};