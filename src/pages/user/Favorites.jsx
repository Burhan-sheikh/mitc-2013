import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useAuth } from '@hooks/useAuth';
import { useProducts } from '@hooks/useProducts';
import ProductCard from '@components/common/ProductCard';

export default function Favorites() {
  const { currentUser } = useAuth();
  const likedIds = currentUser?.likedProducts || [];
  const { products, loading } = useProducts({});
  const likedProducts = products.filter(p => likedIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="container-custom flex-1 py-12">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full p-8 text-center text-gray-400">Loading...</div>
          ) : likedProducts.length === 0 ? (
            <div className="col-span-full text-gray-400">No favorites yet. Like products to add them here!</div>
          ) : (
            likedProducts.map(product => <ProductCard key={product.id} product={product} isLiked/>)
          )}
        </div>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
