import React, { useEffect, useState } from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

function BookDetail({ match }) {
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    const res = await fetch(`/api/books/${match.params.id}`);
    const data = await res.json();
    console.log(data , "this is loading data");
    
    setBook(data);
  };

  useEffect(() => {
    fetchBook();
    // eslint-disable-next-line
  }, []);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <div>
        <strong>Average Rating:</strong>{" "}
        {book.averageRating !== undefined && book.averageRating !== null
          ? book.averageRating.toFixed(1)
          : 'N/A'}
      </div>
      {/* ...existing code for book details... */}
      <h3>Reviews</h3>
      <ReviewList reviews={book.reviews} />
      <ReviewForm bookId={book._id} onReviewAdded={fetchBook} />
    </div>
  );
}

export default BookDetail;
