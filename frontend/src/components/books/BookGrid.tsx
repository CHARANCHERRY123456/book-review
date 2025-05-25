import React from 'react';
import BookCard from './BookCard';
import { Book } from '../../types/Book';

interface BookGridProps {
  books: Book[];
  loading?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ books, loading = false }) => {
  // Ensure books is always an array
  const safeBooks: Book[] = Array.isArray(books) ? books : [];


  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg w-full h-64"></div>
              <div className="mt-2 bg-gray-200 h-6 rounded w-3/4"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-1/2"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-1/4"></div>
            </div>
          ))}
      </div>
    );
  }

  if (safeBooks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No books found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {safeBooks
        .filter((book): book is Book => !!book)
        .map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
    </div>
  );
};

export default BookGrid;