import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Card from '../ui/Card';
import { Book } from '../../types/Book';

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className = '' }) => {
  return (
    <Card hoverable className={`h-full flex flex-col ${className}`}>
      <Link to={`/books/${book.id}`} className="block flex-1">
        <div className="relative pb-[140%] overflow-hidden">
          <img
            src={book.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
            alt={`${book.title} cover`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {book.author}
          </p>
          <div className="flex items-center text-sm text-yellow-500">
            <Star size={16} className="fill-current" />
            <span className="ml-1 font-medium">
              {book.averageRating.toFixed(1)}
            </span>
            <span className="ml-1 text-gray-500">
              ({book.reviewCount})
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {book.genre.slice(0, 2).map((genre, index) => (
              <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 text-xs text-gray-600">
                {genre}
              </span>
            ))}
            {book.genre.length > 2 && (
              <span className="inline-block bg-gray-100 rounded px-2 py-1 text-xs text-gray-600">
                +{book.genre.length - 2}
              </span>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default BookCard;