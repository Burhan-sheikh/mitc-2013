import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  BarChart3, 
  Star, 
  Users, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Chats', href: '/admin/chats', icon: MessageSquare },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="glass-card h-[calc(100vh-80px)] sticky top-20 border-r border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Collapse Button */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p className="font-medium mb-1">Admin Panel</p>
              <p>MITC Store v1.0</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
