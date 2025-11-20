import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@lib/firebase';

/**
 * Fetch reviews
 */
export function useReviews(filters = {}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        
        let q = query(collection(db, 'reviews'));

        // Filter by approval status
        if (filters.approved !== undefined) {
          q = query(q, where('approved', '==', filters.approved));
        }

        // Filter by user (for "My Reviews")
        if (filters.userId) {
          q = query(q, where('userId', '==', filters.userId));
        }

        // Sorting
        if (filters.sortBy === 'rating') {
          q = query(q, orderBy('rating', 'desc'));
        } else {
          q = query(q, orderBy('createdAt', 'desc'));
        }

        // Limit
        if (filters.limit) {
          q = query(q, limit(filters.limit));
        }

        const snapshot = await getDocs(q);
        const reviewList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setReviews(reviewList);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [filters.approved, filters.userId, filters.sortBy, filters.limit]);

  return { reviews, loading, error };
}

/**
 * Submit a review
 */
export async function submitReview(reviewData) {
  const docRef = await addDoc(collection(db, 'reviews'), {
    ...reviewData,
    approved: false,
    hidden: false,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Update review (admin or owner)
 */
export async function updateReview(reviewId, updates) {
  await updateDoc(doc(db, 'reviews', reviewId), updates);
}

/**
 * Delete review
 */
export async function deleteReview(reviewId) {
  await deleteDoc(doc(db, 'reviews', reviewId));
}

/**
 * Approve review (admin only)
 */
export async function approveReview(reviewId) {
  await updateDoc(doc(db, 'reviews', reviewId), {
    approved: true,
    hidden: false,
  });
}

/**
 * Hide review (admin only)
 */
export async function hideReview(reviewId) {
  await updateDoc(doc(db, 'reviews', reviewId), {
    hidden: true,
  });
}

/**
 * Get review statistics
 */
export async function getReviewStats() {
  const q = query(
    collection(db, 'reviews'),
    where('approved', '==', true)
  );

  const snapshot = await getDocs(q);
  const reviews = snapshot.docs.map(doc => doc.data());

  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  const ratingDistribution = reviews.reduce((dist, review) => {
    dist[review.rating] = (dist[review.rating] || 0) + 1;
    return dist;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  return {
    averageRating: averageRating.toFixed(1),
    totalReviews: reviews.length,
    ratingDistribution,
  };
}
