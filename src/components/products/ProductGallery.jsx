import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from 'lucide-react';

export default function ProductGallery({ images = [], alt = 'Product' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden glass-card group">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].url || images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm rounded-xl font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                index === currentIndex
                  ? 'border-primary-500 ring-2 ring-primary-500/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
              }`}
            >
              <img
                src={image.url || image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoomed View Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={images[currentIndex].url || images[currentIndex]}
              alt={`${alt} zoomed`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
