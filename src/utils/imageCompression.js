import imageCompression from 'browser-image-compression';

/**
 * Compress image to specified size
 */
export async function compressImage(file, maxSizeMB = 0.7) {
  const options = {
    maxSizeMB: maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.85,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('Original size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('Compressed size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');
    return compressedFile;
  } catch (error) {
    console.error('Compression error:', error);
    throw error;
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB before compression

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images.');
  }

  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 10MB.');
  }

  return true;
}

/**
 * Create image preview URL
 */
export function createPreviewURL(file) {
  return URL.createObjectURL(file);
}

/**
 * Revoke preview URL to free memory
 */
export function revokePreviewURL(url) {
  URL.revokeObjectURL(url);
}
