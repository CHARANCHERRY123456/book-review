import React, { useState } from 'react';
import { addReview } from '../services/api';

function ReviewForm({ bookId, onReviewAdded }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview( { bookId, text, rating });
    setText('');
    setRating(5);
    if (onReviewAdded) onReviewAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        placeholder="Your Name"
        value={student}
        onChange={e => setStudent(e.target.value)}
        required
      /> */}
      <textarea
        placeholder="Write your review"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
