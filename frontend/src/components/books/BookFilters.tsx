import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Search } from 'lucide-react';
import { BookFilters as BookFiltersType } from '../../types/Book';

interface BookFiltersProps {
  onFilterChange: (filters: BookFiltersType) => void;
  initialFilters?: BookFiltersType;
}

const BookFilters: React.FC<BookFiltersProps> = ({
  onFilterChange,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<BookFiltersType>(initialFilters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const emptyFilters = { title: '', author: '', genre: '' };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="title"
            placeholder="Search by title"
            value={filters.title || ''}
            onChange={handleChange}
            fullWidth
          />
          <Input
            name="author"
            placeholder="Search by author"
            value={filters.author || ''}
            onChange={handleChange}
            fullWidth
          />
          <select
            name="genre"
            value={filters.genre || ''}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full"
          >
            <option value="">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="mystery">Mystery</option>
            <option value="thriller">Thriller</option>
            <option value="romance">Romance</option>
            <option value="biography">Biography</option>
          </select>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={clearFilters}
          >
            Clear
          </Button>
          <Button 
            type="submit"
            leftIcon={<Search size={16} />}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookFilters;