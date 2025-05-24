import React from 'react';

function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;
  return (
    <ul>
      {reviews.map((review, idx) => (
        <li key={idx}>
          <strong>{review.student}</strong> ({review.rating}/5):<br />
          {review.text}
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
