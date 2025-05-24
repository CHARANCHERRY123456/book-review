import { UserRole } from '../constants/roles';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserProfile extends User {
  bio?: string;
  avatar?: string;
  favoriteGenres?: string[];
  reviewCount: number;
}