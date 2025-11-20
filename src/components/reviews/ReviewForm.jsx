import { useState } from 'react';
import Button from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
import { submitReview } from '@hooks/useReviews';

export default function ReviewForm({ onSubmitted }) {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) return setError('Select a rating.');
    if (!text.trim()) return setError('Write your review.');
    setError(null); setSubmitting(true);
    try {
      await submitReview({
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email,
        rating,
        text,
      });
      setRating(0); setText('');
      onSubmitted?.();
    } catch (err) {
      setError('Failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-3">
      <label className="label">Your Rating</label>
      <div className="flex gap-1 mb-2">
        {[1,2,3,4,5].map((star) => (
          <button type="button" key={star} onClick={() => setRating(star)} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            <svg fill={star <= rating ? 'currentColor':'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="h-8 w-8"><polygon points="12 2 15 8.7 22 9.3 17 14 18.3 21 12 17.7 5.7 21 7 14 2 9.3 9 8.7 12 2" /></svg>
          </button>
        ))}
      </div>
      <label className="label">Review</label>
      <textarea required className="input" rows="3" maxLength="512" placeholder="Share your experience..." value={text} onChange={e=>setText(e.target.value)} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="pt-2 flex justify-end"><Button loading={submitting}>Submit Review</Button></div>
      <div className="text-xs text-gray-400">Reviews are published after admin approval.</div>
    </form>
  );
}
