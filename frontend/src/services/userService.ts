import apiClient from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';
import { User, UserProfile } from '../types/User';

export const userService = {
  async getUserProfile(): Promise<UserProfile> {
    const response = await apiClient.get(API_ROUTES.USER_PROFILE);
    return response.data;
  },

  async updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put(API_ROUTES.USER_PROFILE, profileData);
    return response.data;
  }
};