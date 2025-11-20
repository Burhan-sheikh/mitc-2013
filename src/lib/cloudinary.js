import { compressImage } from '@utils/imageCompression';
import { uploadImageToCloudinary } from './api';

/**
 * Upload image with compression
 */
export async function uploadImage(file, folder = 'mitc/products') {
  try {
    // Compress image
    const compressed = await compressImage(file, 0.7);
    
    // Convert to base64
    const base64 = await fileToBase64(compressed);
    
    // Upload to Cloudinary via Cloud Function
    const result = await uploadImageToCloudinary(base64, folder);
    
    return result;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

/**
 * Convert file to base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Upload multiple images
 */
export async function uploadMultipleImages(files, folder = 'mitc/products') {
  const uploadPromises = files.map(file => uploadImage(file, folder));
  return Promise.all(uploadPromises);
}
