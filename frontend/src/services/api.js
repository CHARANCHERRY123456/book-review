export async function addReview(review) {
  console.log("Adding review:", review);
  
  return fetch(`/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
}
