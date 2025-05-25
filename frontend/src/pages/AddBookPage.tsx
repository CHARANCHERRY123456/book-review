import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { bookService } from '../services/bookService';
import { logger } from '../logger';
// import { MESSAGES } from '../constants/messages';

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    isbn: '',
    publicationYear: new Date().getFullYear(),
    publisher: '',
    genre: [] as string[],
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData((prev) => {
      if (checked) {
        return { ...prev, genre: [...prev.genre, value] };
      } else {
        return { ...prev, genre: prev.genre.filter((genre) => genre !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.title || !formData.author || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.genre.length === 0) {
      setError('Please select at least one genre');
      return;
    }
    
    try {
      setLoading(true);
      
      const newBook = await bookService.addBook({
        ...formData,
        // These would normally be set by the backend
        averageRating: 0,
        reviewCount: 0,
      });
      
      logger.info('Book added successfully', { bookId: newBook.id });
      // window.showToast(MESSAGES.BOOK_ADDED_SUCCESS, 'success');
      
      // Redirect to the new book page
      navigate(`/books/${newBook.id}`);
    } catch (err) {
      logger.error('Failed to add book', { error: err });
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      
      <Card>
        <CardBody>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Title *"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Author *"
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  placeholder="Enter book description"
                  required
                ></textarea>
              </div>
              
              <div>
                <Input
                  label="Cover Image URL"
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                  fullWidth
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter a URL for the book cover image
                </p>
              </div>
              
              <div>
                <Input
                  label="ISBN"
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Publication Year"
                  type="number"
                  name="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleChange}
                  min={1000}
                  max={new Date().getFullYear()}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Publisher"
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genres *
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance', 'Science Fiction', 'Fantasy', 'Biography', 'History', 'Self-Help'].map((genre) => (
                    <label
                      key={genre}
                      className={`
                        px-3 py-2 rounded-md cursor-pointer text-sm transition-colors
                        ${formData.genre.includes(genre.toLowerCase()) 
                          ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}
                      `}
                    >
                      <input
                        type="checkbox"
                        name="genre"
                        value={genre.toLowerCase()}
                        checked={formData.genre.includes(genre.toLowerCase())}
                        onChange={handleGenreChange}
                        className="sr-only"
                      />
                      {genre}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8 space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                isLoading={loading} 
                disabled={loading}
              >
                Add Book
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddBookPage;