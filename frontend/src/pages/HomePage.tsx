import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BookGrid from '../components/books/BookGrid';
import Button from '../components/ui/Button';
import { Book } from '../types/Book';
import { bookService } from '../services/bookService';
import { logger } from '../logger';
import { useAuth } from '../hooks/useAuth'; // adjust path if needed

const HomePage: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // user object should have a 'role' property

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const featuredBooks = await bookService.getFeaturedBooks();
        setFeaturedBooks(featuredBooks);

        console.log('Featured Books:', featuredBooks);

        const recentResponse = await bookService.getBooks(1, 5);
        setRecentBooks(recentResponse.data);
        console.log('Recent Books:', recentResponse);

        logger.info('Home page data loaded');
      } catch (error) {
        logger.error('Failed to load home page data', { error });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 rounded-xl mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Join our community of book lovers to find, review, and share the best reads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user && user.role === 'admin' ? (
              <Link to="/admin/books/add">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                  Add Book
                </Button>
              </Link>
            ) : (
              <Link to="/books">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                  Explore Books
                </Button>
              </Link>
            )}
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Books</h2>
          <Link to="/books" className="text-blue-600 hover:text-blue-800 flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <BookGrid books={featuredBooks} loading={loading} />
      </section>

      {/* Recent Books Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Additions</h2>
          <Link to="/books" className="text-blue-600 hover:text-blue-800 flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <BookGrid books={recentBooks} loading={loading} />
      </section>

      {/* Join Community Section */}
      <section className="bg-gray-100 rounded-xl p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Connect with fellow readers, share your thoughts, and discover books that match your interests. Create your account today and start your reading journey.
        </p>
        <Link to="/register">
          <Button size="lg">Get Started</Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;