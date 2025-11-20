import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Star, Phone, User } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';
import { motion } from 'framer-motion';

export default function MobileNav() {
  const location = useLocation();
  const { currentUser } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Reviews', href: '/reviews', icon: Star },
    { name: 'Contact', href: '/contact', icon: Phone },
    { 
      name: currentUser ? 'Dashboard' : 'Sign In', 
      href: currentUser ? '/dashboard' : '/auth', 
      icon: User 
    },
  ];

  const isActive = (path) => location.pathname === path;

  // Hide on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-around h-16 px-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex flex-col items-center justify-center flex-1 relative"
            >
              <div className={`p-2 rounded-lg transition-colors ${
                active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
              }`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className={`text-xs mt-1 ${
                active ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {item.name}
              </span>
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-500 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
