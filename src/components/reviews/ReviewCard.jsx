import { Star } from 'lucide-react';
import { formatDate } from '@utils/formatters';

export default function ReviewCard({ review }) {
  return (
    <div className="glass-card p-6 space-y-2">
      <div className="flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill={i < review.rating ? 'currentColor' : 'none'}
          />
        ))}
        <span className="ml-2 text-xs text-gray-400 font-mono">{formatDate(review.createdAt)}</span>
      </div>
      <div className="font-medium mb-1">{review.userName}</div>
      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{review.text}</div>
    </div>
  );
}
