import React, { useState } from 'react';

function ReviewForm({ bookId, onReviewAdded }) {
  const [student, setStudent] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to add review
    await fetch(`/api/books/${bookId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student, text, rating }),
    });
    setStudent('');
    setText('');
    setRating(5);
    if (onReviewAdded) onReviewAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={student}
        onChange={e => setStudent(e.target.value)}
        required
      />
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
