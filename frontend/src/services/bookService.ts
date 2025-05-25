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

    const mappedBooks = response.data.data.map((book: any) => ({
      ...book,
      id: book._id,
    }));

    return {
      ...response.data,
      data: mappedBooks,
    };
  },

  async getBookById(id: string): Promise<Book> {
    console.log(`Fetching book with ID: ${id}` , typeof id);
    
    if (typeof id !== 'string') {
      throw new Error('getBookById expects a string id');
    }
    const response = await apiClient.get(API_ROUTES.BOOK_BY_ID(id));
    return {
      ...response.data,
      id: response.data._id,
    };
  },

  async addBook(bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> {
    const response = await apiClient.post(API_ROUTES.BOOKS, bookData);
    return {
      ...response.data,
      id: response.data._id,
    };
  },

  async getFeaturedBooks(): Promise<Book[]> {
    const response = await apiClient.get(`${API_ROUTES.BOOKS}/featured`);
    const books = Array.isArray(response.data)
      ? response.data
      : response.data.data;
    return books.map((book: any) => ({
      ...book,
      id: book._id,
    }));
  }
};