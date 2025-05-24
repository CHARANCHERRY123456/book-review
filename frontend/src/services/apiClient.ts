import axios, { AxiosInstance } from 'axios';
import { authService } from './authService';
import { logger } from '../logger';

export const setupInterceptors = (): AxiosInstance => {
  const apiClient = axios.create();

  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      const token = authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      logger.error('API request error', { error });
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        
        // Log the error
        logger.error('API response error', { 
          status, 
          message: data.message || 'Unknown error',
          url: error.config?.url
        });

        // Handle authentication errors
        if (status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } else {
        logger.error('Network error', { error });
      }
      
      return Promise.reject(error);
    }
  );

  return apiClient;
};

// Export a default instance
export default setupInterceptors();