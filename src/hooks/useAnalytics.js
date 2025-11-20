import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  collectionGroup,
} from 'firebase/firestore';
import { db } from '@lib/firebase';

/**
 * Get analytics data
 */
export function useAnalytics(dateRange = 7) {
  const [analytics, setAnalytics] = useState({
    products: null,
    users: null,
    reviews: null,
    visitors: null,
    leads: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const now = new Date();
        const startDate = new Date(now.getTime() - dateRange * 24 * 60 * 60 * 1000);

        // Product analytics
        const productsQuery = query(collection(db, 'products'));
        const productsSnap = await getDocs(productsQuery);
        const products = productsSnap.docs.map(doc => doc.data());
        
        const productAnalytics = {
          total: products.length,
          published: products.filter(p => p.status === 'published').length,
          draft: products.filter(p => p.status === 'draft').length,
          lowStock: products.filter(p => p.stock <= 5).length,
          outOfStock: products.filter(p => p.stock === 0).length,
          topViewed: products
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 10),
        };

        // User analytics
        const usersQuery = query(collection(db, 'users'));
        const usersSnap = await getDocs(usersQuery);
        const users = usersSnap.docs.map(doc => doc.data());
        
        const userAnalytics = {
          total: users.length,
          admins: users.filter(u => u.role === 'admin').length,
          users: users.filter(u => u.role === 'user').length,
          guests: users.filter(u => u.role === 'guest').length,
          newUsers: users.filter(u => {
            const createdAt = u.createdAt?.toDate();
            return createdAt && createdAt >= startDate;
          }).length,
        };

        // Review analytics
        const reviewsQuery = query(collection(db, 'reviews'));
        const reviewsSnap = await getDocs(reviewsQuery);
        const reviews = reviewsSnap.docs.map(doc => doc.data());
        
        const reviewAnalytics = {
          total: reviews.length,
          approved: reviews.filter(r => r.approved).length,
          pending: reviews.filter(r => !r.approved).length,
          averageRating: reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0,
        };

        // Visitor analytics (last N days)
        const visitorsQuery = query(
          collectionGroup(db, 'visitors'),
          where('createdAt', '>=', Timestamp.fromDate(startDate)),
          orderBy('createdAt', 'desc')
        );
        const visitorsSnap = await getDocs(visitorsQuery);
        const visitors = visitorsSnap.docs.map(doc => doc.data());
        
        const visitorAnalytics = {
          total: visitors.length,
          uniqueIPs: new Set(visitors.map(v => v.ipHash)).size,
          mobile: visitors.filter(v => v.deviceType === 'mobile').length,
          desktop: visitors.filter(v => v.deviceType === 'desktop').length,
          tablet: visitors.filter(v => v.deviceType === 'tablet').length,
          dailyVisitors: groupByDate(visitors),
        };

        // Lead analytics
        const leadsQuery = query(
          collection(db, 'leads'),
          orderBy('createdAt', 'desc')
        );
        const leadsSnap = await getDocs(leadsQuery);
        const leads = leadsSnap.docs.map(doc => doc.data());
        
        const leadAnalytics = {
          total: leads.length,
          new: leads.filter(l => l.status === 'new').length,
          contacted: leads.filter(l => l.status === 'contacted').length,
          converted: leads.filter(l => l.status === 'converted').length,
          recent: leads.slice(0, 10),
        };

        setAnalytics({
          products: productAnalytics,
          users: userAnalytics,
          reviews: reviewAnalytics,
          visitors: visitorAnalytics,
          leads: leadAnalytics,
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [dateRange]);

  return { analytics, loading, error };
}

/**
 * Group visitors by date
 */
function groupByDate(visitors) {
  const grouped = {};
  
  visitors.forEach(visitor => {
    const date = visitor.createdAt?.toDate();
    if (date) {
      const dateKey = date.toISOString().split('T')[0];
      grouped[dateKey] = (grouped[dateKey] || 0) + 1;
    }
  });

  return grouped;
}

/**
 * Track page visit
 */
export async function trackVisit(path, userAgent, referrer) {
  try {
    const now = new Date();
    const dateKey = now.toISOString().split('T')[0];
    
    // Simple device detection
    const deviceType = /Mobile|Android|iPhone/i.test(userAgent) ? 'mobile' :
                      /Tablet|iPad/i.test(userAgent) ? 'tablet' : 'desktop';

    await addDoc(collection(db, 'visitors', dateKey, 'visits'), {
      path,
      userAgent,
      referrer,
      deviceType,
      ipHash: await hashIP(), // In production, hash the IP on server
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
    // Don't throw - this is non-critical
  }
}

/**
 * Hash IP address (placeholder - should be done server-side)
 */
async function hashIP() {
  // In production, use a server-side function to hash the user's IP
  // This is just a placeholder
  return 'hashed-ip-' + Math.random().toString(36).substring(7);
}
