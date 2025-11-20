import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useReviews } from '@hooks/useReviews';
import ReviewList from '@components/reviews/ReviewList';
import ReviewForm from '@components/reviews/ReviewForm';
import { useAuth } from '@hooks/useAuth';

export default function Reviews() {
  const { currentUser } = useAuth();
  const { reviews, loading } = useReviews({ approved: true, sortBy: 'rating', limit: 20 });

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1 container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">Store Reviews</h1>
        {currentUser && <ReviewForm onSubmitted={()=>window.location.reload()}/>}       
        <div className="mt-8">
          <ReviewList reviews={reviews} loading={loading}/>
        </div>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
