import axios from 'axios';
import { API_ROUTES } from '../constants/apiRoutes';
import { User } from '../types/User';
import { setupInterceptors } from './apiClient';

// Initialize axios instance with interceptors
const apiClient = setupInterceptors();

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await apiClient.post(API_ROUTES.LOGIN, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  async register(name: string, email: string, password: string): Promise<void> {
    await apiClient.post(API_ROUTES.REGISTER, { name, email, password });
  },

  async logout(): Promise<void> {
    await apiClient.post(API_ROUTES.LOGOUT);
    localStorage.removeItem('token');
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      const response = await apiClient.get(API_ROUTES.USER_PROFILE);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },
};