# Development Guide - MITC Store

## 🎯 Component Development Standards

### Glassmorphic Design System

All components must follow the glassmorphic design aesthetic:

```jsx
// Glass Card Example
<div className="glass-card p-6 hover:shadow-glass-lg transition-all duration-300">
  {/* Content */}
</div>
```

### Color System

```css
/* Primary Colors */
primary-50 to primary-900  /* Purple gradient */
accent-400 to accent-700   /* Pink accent */

/* Glassmorphism Variables */
var(--glass-bg)           /* Background with transparency */
var(--glass-border)       /* Border color */
var(--glass-shadow)       /* Shadow effect */
```

## 📦 Component Structure

### Common Components

#### Button Component
```jsx
// src/components/common/Button.jsx
import { forwardRef } from 'react';
import clsx from 'clsx';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-ghost': variant === 'ghost',
        },
        className
      )}
      {...props}
    >
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

export default Button;
```

#### Card Component
```jsx
// src/components/common/Card.jsx
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Card({ children, className, animate = true }) {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      className={clsx('glass-card', className)}
      {...(animate && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 }
      })}
    >
      {children}
    </Component>
  );
}
```

#### Input Component
```jsx
// src/components/common/Input.jsx
import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className,
  ...props 
}, ref) => {
  return (
    <div className="form-group">
      {label && <label className="label">{label}</label>}
      <input
        ref={ref}
        className={clsx(
          'input',
          { 'input-error': error },
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
});

export default Input;
```

#### LoadingSpinner Component
```jsx
// src/components/common/LoadingSpinner.jsx
import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
```

### Product Components

#### ProductCard
```jsx
// src/components/products/ProductCard.jsx
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { formatCurrency, formatStockStatus } from '@utils/formatters';

export default function ProductCard({ product, onLike, isLiked }) {
  const stockStatus = formatStockStatus(product.stock);

  return (
    <motion.div
      className="glass-card overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        <img
          src={product.featuredImage?.url}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike(product.id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur"
        >
          <Heart
            className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* Stock Badge */}
        <span className={`badge badge-${stockStatus.color} absolute bottom-2 left-2`}>
          {stockStatus.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {product.brand}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary-600">
            {formatCurrency(product.priceRange.low)} - {formatCurrency(product.priceRange.high)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
```

### Layout Components

#### Header
```jsx
// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import ThemeToggle from '@components/common/ThemeToggle';

export default function Header() {
  const { currentUser, userRole, logout } = useAuth();

  return (
    <header className="glass-card sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">
            MITC Store
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/products" className="hover:text-primary-600">Products</Link>
            <Link to="/reviews" className="hover:text-primary-600">Reviews</Link>
            <Link to="/about" className="hover:text-primary-600">About</Link>
            <Link to="/contact" className="hover:text-primary-600">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {currentUser ? (
              <>
                <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} className="btn btn-primary">
                  Dashboard
                </Link>
                <button onClick={logout} className="btn btn-ghost">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
```

## 🎨 Animation Guidelines

Use Framer Motion for smooth animations:

```jsx
import { motion } from 'framer-motion';

// Page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Component animations
<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

## 🔄 Data Fetching Patterns

### Using Custom Hooks

```jsx
import { useProducts } from '@hooks/useProducts';

function ProductList() {
  const { products, loading, error } = useProducts({
    brand: 'Dell',
    sortBy: 'views',
    limit: 20
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 🎯 Best Practices

1. **Always use the design system classes**
2. **Implement proper loading states**
3. **Add error boundaries**
4. **Optimize images with compression**
5. **Follow accessibility guidelines**
6. **Write clean, documented code**
7. **Test on multiple devices**
8. **Use TypeScript for type safety** (optional but recommended)

## 📱 Responsive Design

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

```jsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>
```

## 🚀 Performance Optimization

1. **Lazy load routes**
```jsx
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
```

2. **Memoize expensive computations**
```jsx
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => b.views - a.views);
}, [products]);
```

3. **Debounce search inputs**
```jsx
const debouncedSearch = useDebouncedCallback((value) => {
  searchProducts(value);
}, 300);
```

---

**Happy Coding! 🎉**
