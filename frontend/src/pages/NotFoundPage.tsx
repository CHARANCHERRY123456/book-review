import React from 'react';
import { Link } from 'react-router-dom';
import { BookX } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <BookX size={80} className="text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => window.history.back()}>
          Go Back
        </Button>
        <Link to="/">
          <Button variant="outline">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;