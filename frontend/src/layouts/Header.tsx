import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            <BookOpen className="mr-2" />
            <span>BookReview</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium ${
                location.pathname === '/'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`font-medium ${
                location.pathname === '/books'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Books
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600">
                  <User size={18} />
                  <span>{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`font-medium p-2 ${
                  location.pathname === '/'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/books"
                className={`font-medium p-2 ${
                  location.pathname === '/books'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                Books
              </Link>
              
              <div className="border-t my-2"></div>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center font-medium p-2 text-gray-700"
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center font-medium p-2 text-gray-700 w-full text-left"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login">
                    <Button variant="outline" fullWidth>
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;