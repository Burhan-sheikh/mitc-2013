/**
 * Validate email
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone number (Indian)
 */
export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('91'));
}

/**
 * Validate password strength
 */
export function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
}

function calculatePasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
}

/**
 * Validate URL
 */
export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate required field
 */
export function validateRequired(value, fieldName = 'This field') {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
}

/**
 * Validate number range
 */
export function validateNumberRange(value, min, max, fieldName = 'Value') {
  const num = Number(value);
  
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  
  if (min !== undefined && num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  
  if (max !== undefined && num > max) {
    return `${fieldName} must be at most ${max}`;
  }
  
  return null;
}

/**
 * Validate price range
 */
export function validatePriceRange(low, high) {
  const errors = [];
  
  if (!low || low <= 0) {
    errors.push('Minimum price must be greater than 0');
  }
  
  if (!high || high <= 0) {
    errors.push('Maximum price must be greater than 0');
  }
  
  if (low && high && Number(high) < Number(low)) {
    errors.push('Maximum price must be greater than minimum price');
  }
  
  return errors;
}
