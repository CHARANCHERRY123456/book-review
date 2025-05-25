import React from 'react';
import { Star, Clock, BookOpen, Calendar, Building } from 'lucide-react';
import { Book } from '../../types/Book';
import Card, { CardBody } from '../ui/Card';

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="rounded-lg overflow-hidden shadow-md mb-4">
          <img
            src={book.coverImage || 'https://via.placeholder.com/500x750?text=No+Cover'}
            alt={`${book.title} cover`}
            className="w-full h-auto object-cover"
          />
        </div>
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Star className="text-yellow-500 fill-current mr-1" size={20} />
                <span className="font-bold text-lg">{book.averageRating?.toFixed(1) || 'N/A'}</span>
              </div>
              <span className="text-gray-600 text-sm">{book.reviewCount} reviews</span>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-start">
                <BookOpen size={18} className="text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-medium">{book.isbn}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar size={18} className="text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-medium">{book.publicationYear}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Building size={18} className="text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Publisher</p>
                  <p className="font-medium">{book.publisher}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock size={18} className="text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Added</p>
                  <p className="font-medium">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {book.genre && book.genre.map((genre, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed">
            {book.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;