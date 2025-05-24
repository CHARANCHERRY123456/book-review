export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string[];
  isbn: string;
  publicationYear: number;
  publisher: string;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookFilters {
  title?: string;
  author?: string;
  genre?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}