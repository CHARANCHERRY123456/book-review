// ...existing code...

export async function addReview(bookId, review) {
  return fetch(`/api/books/${bookId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
}

// ...existing code...