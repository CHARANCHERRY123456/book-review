import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true,
    maxlength: [100, 'Author name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  coverImage: {
    type: String,
    default: '',
  },
  genre: {
    type: [String],
    required: [true, 'Please select at least one genre'],
  },
  isbn: {
    type: String,
    trim: true,
  },
  publicationYear: {
    type: Number,
    min: [1000, 'Year must be at least 1000'],
    max: [new Date().getFullYear(), 'Year cannot be in the future'],
  },
  publisher: {
    type: String,
    trim: true,
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for text search
BookSchema.index(
  { 
    title: 'text', 
    author: 'text', 
    description: 'text' 
  }
);

const Book = mongoose.model('Book', BookSchema);
export default Book;