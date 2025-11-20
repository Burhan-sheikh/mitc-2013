import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '@components/common/Button';

export default function ProductFilters({ onFilterChange, onClear, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    brand: initialFilters.brand || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    stock: initialFilters.stock || 'all',
    sortBy: initialFilters.sortBy || 'newest'
  });

  const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'MSI', 'Samsung', 'LG'];

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClear = () => {
    const cleared = {
      brand: '',
      minPrice: '',
      maxPrice: '',
      stock: 'all',
      sortBy: 'newest'
    };
    setFilters(cleared);
    onClear?.(cleared);
  };

  return (
    <div className="glass-card p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h3>
        <button 
          onClick={handleClear} 
          className="text-sm text-primary-600 hover:underline flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="label">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => handleChange('brand', e.target.value)}
          className="input"
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="label">Price Range (₹)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="input text-sm"
            min="0"
          />
          <span className="self-center text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="input text-sm"
            min="0"
          />
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <label className="label">Availability</label>
        <select
          value={filters.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
          className="input"
        >
          <option value="all">All Products</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="label">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="input"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="views">Most Viewed</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
}
