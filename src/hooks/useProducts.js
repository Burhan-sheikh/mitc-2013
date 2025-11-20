import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  startAfter,
} from 'firebase/firestore';
import { db } from '@lib/firebase';

/**
 * Fetch all products with filters
 */
export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        let q = query(
          collection(db, 'products'),
          where('status', '==', 'published')
        );

        // Apply filters
        if (filters.brand) {
          q = query(q, where('brand', '==', filters.brand));
        }

        // Apply sorting
        if (filters.sortBy === 'price-asc') {
          q = query(q, orderBy('priceRange.low', 'asc'));
        } else if (filters.sortBy === 'price-desc') {
          q = query(q, orderBy('priceRange.low', 'desc'));
        } else if (filters.sortBy === 'views') {
          q = query(q, orderBy('views', 'desc'));
        } else {
          q = query(q, orderBy('createdAt', 'desc'));
        }

        // Apply limit
        if (filters.limit) {
          q = query(q, limit(filters.limit));
        }

        const snapshot = await getDocs(q);
        const productList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productList);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters.brand, filters.sortBy, filters.limit]);

  return { products, loading, error };
}

/**
 * Fetch single product
 */
export async function getProduct(productId) {
  const productDoc = await getDoc(doc(db, 'products', productId));
  
  if (!productDoc.exists()) {
    throw new Error('Product not found');
  }

  return {
    id: productDoc.id,
    ...productDoc.data()
  };
}

/**
 * Create new product (admin only)
 */
export async function createProduct(productData) {
  const docRef = await addDoc(collection(db, 'products'), {
    ...productData,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Update product (admin only)
 */
export async function updateProduct(productId, updates) {
  await updateDoc(doc(db, 'products', productId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete product (admin only)
 */
export async function deleteProduct(productId) {
  await deleteDoc(doc(db, 'products', productId));
}

/**
 * Search products
 */
export async function searchProducts(searchTerm) {
  // Note: This is a basic implementation
  // For better search, consider using Algolia or similar
  const q = query(
    collection(db, 'products'),
    where('status', '==', 'published')
  );

  const snapshot = await getDocs(q);
  const allProducts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Client-side filtering
  const searchLower = searchTerm.toLowerCase();
  return allProducts.filter(product => 
    product.title.toLowerCase().includes(searchLower) ||
    product.brand.toLowerCase().includes(searchLower) ||
    product.specs?.model?.toLowerCase().includes(searchLower)
  );
}
