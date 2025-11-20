import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews, loading }) {
  if (loading) return <div className="p-8 text-center text-gray-400">Loading reviews...</div>;
  if (!reviews.length) return <div className="p-8 text-center text-gray-400">No reviews yet.</div>;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
    </div>
  );
}
