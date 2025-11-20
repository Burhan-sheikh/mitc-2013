import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className, 
  animate = true,
  hover = true,
  onClick 
}) {
  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  const hoverProps = hover ? {
    whileHover: { scale: 1.02 },
    whileTap: onClick ? { scale: 0.98 } : undefined
  } : {};

  return (
    <Component
      className={clsx(
        'glass-card',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...animationProps}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
