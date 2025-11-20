import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProduct } from '@hooks/useProducts';
import ProductGallery from '@components/products/ProductGallery';
import Button from '@components/common/Button';
import LoadingSpinner from '@components/common/LoadingSpinner';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProduct(id).then(p => {
      setProduct(p);
      setLoading(false);
    }).catch(()=>setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner size="lg" text="Loading product..."/>;
  if (!product) return <div className="min-h-screen flex flex-col"><Header/><main className="flex-1 container-custom py-16 text-center text-gray-400">Product not found.</main><Footer/><MobileNav/></div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1 container-custom py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <ProductGallery images={product.gallery} alt={product.title}/>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="mb-1 text-xl text-primary-600 dark:text-primary-400">{product.brand}</div>
            <div className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">₹{product.priceRange?.low} - ₹{product.priceRange?.high}</div>
            <div className="mb-4 text-gray-600 dark:text-gray-300 whitespace-pre-line">{product.shortDescription}</div>
            {/* ...Display specs table, stock status, contact, etc. here... */}
            <Button variant="primary" className="mt-4">Contact Seller</Button>
          </div>
        </div>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
