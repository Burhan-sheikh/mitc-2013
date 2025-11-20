import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useAuth } from '@hooks/useAuth';
import { useReviews } from '@hooks/useReviews';
import ReviewList from '@components/reviews/ReviewList';

export default function MyReviews() {
  const { currentUser } = useAuth();
  const { reviews, loading } = useReviews({userId: currentUser?.uid});

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="container-custom flex-1 py-12">
        <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
        <ReviewList reviews={reviews} loading={loading}/>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
