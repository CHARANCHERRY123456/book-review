export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewReview {
  bookId: string;
  rating: number;
  content: string;
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