const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import models
const User = require('../src/features/users/user.model');
const Book = require('../src/features/books/book.model');
const Review = require('../src/features/reviews/review.model');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    bio: 'I am the admin of this platform.',
    favoriteGenres: ['fiction', 'mystery', 'science-fiction'],
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    bio: 'I love reading mystery novels.',
    favoriteGenres: ['mystery', 'thriller'],
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    bio: 'Science fiction enthusiast.',
    favoriteGenres: ['science-fiction', 'fantasy'],
  },
];

const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.',
    coverImage: 'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg',
    genre: ['fiction', 'classic'],
    isbn: '978-0061120084',
    publicationYear: 1960,
    publisher: 'HarperCollins',
    featured: true,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg',
    genre: ['fiction', 'classic'],
    isbn: '978-0743273565',
    publicationYear: 1925,
    publisher: 'Scribner',
    featured: true,
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    description: 'The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.',
    coverImage: 'https://images.pexels.com/photos/2363675/pexels-photo-2363675.jpeg',
    genre: ['fiction', 'science-fiction', 'young-adult'],
    isbn: '978-0439023481',
    publicationYear: 2008,
    publisher: 'Scholastic Press',
    featured: true,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'The Hobbit, or There and Back Again is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.',
    coverImage: 'https://images.pexels.com/photos/8898018/pexels-photo-8898018.jpeg',
    genre: ['fiction', 'fantasy'],
    isbn: '978-0547928227',
    publicationYear: 1937,
    publisher: 'Houghton Mifflin Harcourt',
    featured: false,
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    description: 'Gone Girl is a thriller novel by the writer Gillian Flynn. It was published by Crown Publishing Group in June 2012. The novel soon made the New York Times Best Seller list.',
    coverImage: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg',
    genre: ['fiction', 'thriller', 'mystery'],
    isbn: '978-0307588371',
    publicationYear: 2012,
    publisher: 'Crown Publishing Group',
    featured: false,
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'Sapiens: A Brief History of Humankind is a book by Yuval Noah Harari, first published in Hebrew in Israel in 2011 based on a series of lectures Harari taught at The Hebrew University of Jerusalem, and in English in 2014.',
    coverImage: 'https://images.pexels.com/photos/5546921/pexels-photo-5546921.jpeg',
    genre: ['non-fiction', 'history', 'science'],
    isbn: '978-0062316097',
    publicationYear: 2014,
    publisher: 'Harper',
    featured: true,
  },
];

// Seed data function
const seedData = async () => {
  try {
    // Clean up existing data
    await User.deleteMany();
    await Book.deleteMany();
    await Review.deleteMany();
    
    console.log('Data cleaned');
    
    // Create users
    const createdUsers = [];
    for (const user of users) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      const newUser = await User.create({
        ...user,
        password: hashedPassword,
      });
      
      createdUsers.push(newUser);
    }
    
    console.log(`${createdUsers.length} users created`);
    
    // Create books
    const createdBooks = await Book.insertMany(books);
    console.log(`${createdBooks.length} books created`);
    
    // Create reviews
    const reviews = [
      {
        book: createdBooks[0]._id,
        user: createdUsers[1]._id,
        rating: 5,
        content: 'One of the best books I have ever read. A timeless classic that everyone should read at least once.',
      },
      {
        book: createdBooks[0]._id,
        user: createdUsers[2]._id,
        rating: 4,
        content: 'Powerful story with important themes that are still relevant today.',
      },
      {
        book: createdBooks[1]._id,
        user: createdUsers[1]._id,
        rating: 4,
        content: 'A beautifully written novel that captures the essence of the Roaring Twenties.',
      },
      {
        book: createdBooks[2]._id,
        user: createdUsers[2]._id,
        rating: 5,
        content: 'Absolutely gripping from start to finish. Could not put it down!',
      },
      {
        book: createdBooks[3]._id,
        user: createdUsers[1]._id,
        rating: 5,
        content: 'A wonderful adventure story that sparked my love for fantasy literature.',
      },
      {
        book: createdBooks[4]._id,
        user: createdUsers[2]._id,
        rating: 4,
        content: 'Clever plot twists and complex characters. Kept me guessing until the end.',
      },
      {
        book: createdBooks[5]._id,
        user: createdUsers[1]._id,
        rating: 5,
        content: 'Fascinating perspective on human history. Made me rethink many of my assumptions.',
      },
    ];
    
    const createdReviews = await Review.insertMany(reviews);
    console.log(`${createdReviews.length} reviews created`);
    
    // Update book ratings
    for (const book of createdBooks) {
      await Review.getAverageRating(book._id);
    }
    
    console.log('Book ratings updated');
    
    console.log('Data seeding completed successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();