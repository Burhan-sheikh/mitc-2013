import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import { useReviews, approveReview, hideReview, deleteReview } from '@hooks/useReviews';
import Button from '@components/common/Button';
import ReviewCard from '@components/reviews/ReviewCard';

export default function AdminReviews() {
  const { reviews, loading } = useReviews({});
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Review Moderation</h1>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-gray-400 text-center">Loading...</div>
            ) : reviews.length === 0 ? (
              <div className="col-span-full text-gray-400">No reviews yet.</div>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="mb-2">
                  <ReviewCard review={review}/>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={()=>approveReview(review.id)}>Approve</Button>
                    <Button size="sm" variant="secondary" onClick={()=>hideReview(review.id)}>Hide</Button>
                    <Button size="sm" variant="danger" onClick={()=>{ if(window.confirm('Delete review?')) deleteReview(review.id); }}>Delete</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
