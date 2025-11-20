import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useAuth } from '@hooks/useAuth';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="container-custom flex-1 py-12">
        <h1 className="text-3xl font-bold mb-4">Welcome, {currentUser?.displayName || currentUser?.email}!</h1>
        <div className="glass-card p-8 grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-primary-600">💬</div>
            <div className="font-semibold">Real-time Chat</div>
            <div className="text-gray-600">Get fast support or ask about bulk orders through the chat widget.</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-yellow-500">⭐</div>
            <div className="font-semibold">Your Reviews</div>
            <div className="text-gray-600">Submit or edit reviews—and help others choose the best fit!</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-red-500">❤️</div>
            <div className="font-semibold">Favorites</div>
            <div className="text-gray-600">Keep track of products you love and access them in one click.</div>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          Use the navigation menu to manage your reviews, favorites, profile, or account settings.
        </div>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
