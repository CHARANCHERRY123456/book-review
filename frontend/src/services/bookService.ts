import apiClient from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';
import { Book, BookFilters, PaginatedResponse } from '../types/Book';

export const bookService = {
  async getBooks(page = 1, limit = 10, filters?: BookFilters): Promise<PaginatedResponse<Book>> {
    let url = `${API_ROUTES.BOOKS}?page=${page}&limit=${limit}`;
    
    if (filters) {
      const { title, author, genre } = filters;
      if (title) url += `&title=${encodeURIComponent(title)}`;
      if (author) url += `&author=${encodeURIComponent(author)}`;
      if (genre) url += `&genre=${encodeURIComponent(genre)}`;
    }
    
    const response = await apiClient.get(url);
    return response.data;
  },

  async getBookById(id: string): Promise<Book> {
    const response = await apiClient.get(API_ROUTES.BOOK_BY_ID(id));
    return response.data;
  },

  async addBook(bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> {
    const response = await apiClient.post(API_ROUTES.BOOKS, bookData);
    return response.data;
  },

  async getFeaturedBooks(): Promise<Book[]> {
    const response = await apiClient.get(`${API_ROUTES.BOOKS}/featured`);
    return response.data;
  }
};