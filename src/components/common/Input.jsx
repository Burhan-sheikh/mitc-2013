import { forwardRef } from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  icon: Icon,
  className,
  containerClassName,
  ...props 
}, ref) => {
  return (
    <div className={clsx('form-group', containerClassName)}>
      {label && (
        <label className="label">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        <input
          ref={ref}
          className={clsx(
            'input',
            Icon && 'pl-10',
            error && 'input-error',
            className
          )}
          {...props}
        />
        
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
