import { motion } from 'framer-motion';
import { Heart, Eye, TrendingUp } from 'lucide-react';
import { formatCurrency, formatStockStatus } from '@utils/formatters';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCard({ product, onLike, isLiked = false }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const stockStatus = formatStockStatus(product.stock);

  return (
    <motion.div
      className="glass-card overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={product.featuredImage?.url || '/placeholder-product.png'}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Like Button */}
        {onLike && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(product.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-lg hover:scale-110 transition-transform"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
              }`}
            />
          </button>
        )}

        {/* Stock Badge */}
        <span className={`badge badge-${stockStatus.color} absolute bottom-3 left-3 shadow-lg`}>
          {stockStatus.label}
        </span>

        {/* Bulk Available Badge */}
        {product.bulkAvailable && (
          <span className="badge badge-info absolute top-3 left-3 shadow-lg">
            Bulk Available
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">{product.title}</h3>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {product.brand}
        </p>

        {/* Specs Preview */}
        {product.specs && (
          <div className="flex flex-wrap gap-2 mb-3">
            {product.specs.ram && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {product.specs.ram}
              </span>
            )}
            {product.specs.storage && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {product.specs.storage}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {formatCurrency(product.priceRange.low)}
            </span>
            {product.priceRange.high && product.priceRange.high !== product.priceRange.low && (
              <span className="text-sm text-gray-500 ml-1">
                - {formatCurrency(product.priceRange.high)}
              </span>
            )}
          </div>
          
          {/* View Count */}
          {product.views > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Eye className="h-3 w-3" />
              <span>{product.views}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
