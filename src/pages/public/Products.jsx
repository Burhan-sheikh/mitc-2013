import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useProducts } from '@hooks/useProducts';
import ProductCard from '@components/common/ProductCard';
import ProductFilters from '@components/products/ProductFilters';
import { useState } from 'react';

export default function Products() {
  const [filters, setFilters] = useState({});
  const { products, loading } = useProducts(filters);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div>
          <ProductFilters onFilterChange={setFilters} />
        </div>
        <div className="flex-1">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full p-8 text-center text-gray-400">Loading...</div>
            ) : products.length === 0 ? (
              <div className="col-span-full p-8 text-gray-400 text-center">No products found.</div>
            ) : (
              products.map(product => <ProductCard key={product.id} product={product} />)
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
