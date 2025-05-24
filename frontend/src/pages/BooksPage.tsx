import React, { useState, useEffect } from 'react';
import BookGrid from '../components/books/BookGrid';
import BookFilters from '../components/books/BookFilters';
import Pagination from '../components/ui/Pagination';
import { Book, BookFilters as BookFiltersType, PaginatedResponse } from '../types/Book';
import { bookService } from '../services/bookService';
import { logger } from '../logger';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  });
  const [filters, setFilters] = useState<BookFiltersType>({});

  useEffect(() => {
    fetchBooks(pagination.currentPage, pagination.limit, filters);
  }, [pagination.currentPage]);

  const fetchBooks = async (page: number, limit: number, filters: BookFiltersType) => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Book> = await bookService.getBooks(page, limit, filters);
      setBooks(response.data);
      setPagination(response.pagination);
      logger.info('Books loaded', { page, filters });
    } catch (error) {
      logger.error('Failed to load books', { error });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: BookFiltersType) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    fetchBooks(1, pagination.limit, newFilters);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Explore Books</h1>
        <BookFilters onFilterChange={handleFilterChange} initialFilters={filters} />
      </div>

      <BookGrid books={books} loading={loading} />

      {pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default BooksPage;