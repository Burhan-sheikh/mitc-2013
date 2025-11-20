import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import ThemeToggle from '@components/common/ThemeToggle';
import { Menu, X, ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { currentUser, userRole, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass-card sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              MITC Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {currentUser ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to={userRole === 'admin' ? '/admin' : '/dashboard'}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-ghost flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:flex btn btn-primary">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                
                {currentUser ? (
                  <>
                    <Link
                      to={userRole === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
