import { getFunctions, httpsCallable } from 'firebase/functions';
import app from './firebase';

const functions = getFunctions(app);

/**
 * Upload image to Cloudinary
 */
export async function uploadImageToCloudinary(base64, folder = 'mitc/products') {
  const uploadImage = httpsCallable(functions, 'uploadImageToCloudinary');
  
  try {
    const result = await uploadImage({ base64, folder });
    return result.data;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
}

/**
 * Request account deletion
 */
export async function requestAccountDeletion(deleteAllData = false, deleteAuthUser = false) {
  const deleteAccount = httpsCallable(functions, 'requestAccountDeletion');
  
  try {
    const result = await deleteAccount({ deleteAllData, deleteAuthUser });
    return result.data;
  } catch (error) {
    console.error('Account deletion error:', error);
    throw new Error(error.message || 'Failed to delete account');
  }
}

/**
 * Track product view
 */
export async function trackProductView(productId) {
  const trackView = httpsCallable(functions, 'trackProductView');
  
  try {
    const result = await trackView({ productId });
    return result.data;
  } catch (error) {
    console.error('View tracking error:', error);
    // Don't throw - this is non-critical
    return null;
  }
}

/**
 * Set initial admin (first-time setup)
 */
export async function setInitialAdmin() {
  const setAdmin = httpsCallable(functions, 'setInitialAdmin');
  
  try {
    const result = await setAdmin();
    return result.data;
  } catch (error) {
    console.error('Set admin error:', error);
    throw new Error(error.message || 'Failed to set admin role');
  }
}
