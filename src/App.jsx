import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/common/LoadingSpinner';

// Public Pages
import Home from './pages/public/Home';
import Products from './pages/public/Products';
import ProductDetails from './pages/public/ProductDetails';
import Reviews from './pages/public/Reviews';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Auth from './pages/public/Auth';

// User Dashboard
import UserDashboard from './pages/user/Dashboard';
import Favorites from './pages/user/Favorites';
import MyReviews from './pages/user/MyReviews';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';

// Admin Dashboard
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminChats from './pages/admin/Chats';
import AdminAnalytics from './pages/admin/Analytics';
import AdminReviews from './pages/admin/Reviews';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';

// Protected Route Components
function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          currentUser && userRole === 'admin' ? 
            <Navigate to="/admin" replace /> : 
            <Home />
        } 
      />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<Auth />} />

      {/* User Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reviews"
        element={
          <ProtectedRoute>
            <MyReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute adminOnly>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/chats"
        element={
          <ProtectedRoute adminOnly>
            <AdminChats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute adminOnly>
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute adminOnly>
            <AdminReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute adminOnly>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute adminOnly>
            <AdminSettings />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
