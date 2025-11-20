const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cloudinary = require('cloudinary').v2;

admin.initializeApp();

// Configure Cloudinary from Firebase config
cloudinary.config({
  cloud_name: functions.config().cloudinary?.name,
  api_key: functions.config().cloudinary?.key,
  api_secret: functions.config().cloudinary?.secret,
});

const db = admin.firestore();
const rtdb = admin.database();

/**
 * Helper function to batch delete documents
 */
async function deleteQueryBatch(query, batchSize = 500) {
  const snapshot = await query.get();
  if (snapshot.size === 0) return 0;

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  return snapshot.size;
}

/**
 * Upload image to Cloudinary
 * Only admins can upload images
 */
exports.uploadImageToCloudinary = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated',
    );
  }

  // Verify admin role
  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists || userDoc.data().role !== 'admin') {
    throw new functions.https.HttpsError(
        'permission-denied',
        'Only admins can upload images',
    );
  }

  // Validate input
  const {base64, folder = 'mitc/products'} = data;
  if (!base64) {
    throw new functions.https.HttpsError(
        'invalid-argument',
        'No image provided',
    );
  }

  try {
    // Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(base64, {
      folder: folder,
      transformation: [
        {quality: 'auto'},
        {fetch_format: 'auto'},
      ],
    });

    // Save metadata to Firestore
    const imageDoc = await db.collection('images').add({
      url: upload.secure_url,
      provider: 'cloudinary',
      uploaderId: context.auth.uid,
      sizeBytes: upload.bytes,
      width: upload.width,
      height: upload.height,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      url: upload.secure_url,
      imageId: imageDoc.id,
      bytes: upload.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Request account deletion
 * User can choose to delete all their data
 */
exports.requestAccountDeletion = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated',
    );
  }

  const uid = context.auth.uid;
  const {deleteAllData = false, deleteAuthUser = false} = data;

  try {
    if (deleteAllData) {
      // Delete reviews
      let query = db.collection('reviews').where('userId', '==', uid);
      while (await deleteQueryBatch(query) > 0) {}

      // Remove from RTDB chats
      const chatsSnapshot = await rtdb.ref('chats')
          .orderByChild(`participants/${uid}`)
          .equalTo(true)
          .once('value');

      const updates = {};
      chatsSnapshot.forEach((chatSnap) => {
        const chatId = chatSnap.key;
        updates[`/chats/${chatId}/participants/${uid}`] = null;

        // Mark user's messages as deleted
        chatSnap.child('messages').forEach((msgSnap) => {
          if (msgSnap.val().senderId === uid) {
            updates[`/chats/${chatId}/messages/${msgSnap.key}/deleted`] = true;
            updates[`/chats/${chatId}/messages/${msgSnap.key}/text`] = '[Message deleted]';
          }
        });
      });

      if (Object.keys(updates).length > 0) {
        await rtdb.ref().update(updates);
      }
    }

    // Delete user document
    await db.collection('users').doc(uid).delete();

    // Delete auth user if requested
    if (deleteAuthUser) {
      await admin.auth().deleteUser(uid);
    }

    return {
      success: true,
      message: 'Account deletion processed successfully',
    };
  } catch (error) {
    console.error('Account deletion error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Auth cleanup trigger
 * Automatically clean up user data when auth user is deleted
 */
exports.onUserDeleteCleanup = functions.auth.user().onDelete(async (user) => {
  const uid = user.uid;

  try {
    // Clean up user document
    await db.collection('users').doc(uid).delete().catch(() => {});

    // Clean up reviews
    const reviews = await db.collection('reviews').where('userId', '==', uid).get();
    const batch = db.batch();
    reviews.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // Clean up RTDB chat participation
    const chatsSnapshot = await rtdb.ref('chats')
        .orderByChild(`participants/${uid}`)
        .equalTo(true)
        .once('value');

    const updates = {};
    chatsSnapshot.forEach((chatSnap) => {
      updates[`/chats/${chatSnap.key}/participants/${uid}`] = null;
    });

    if (Object.keys(updates).length > 0) {
      await rtdb.ref().update(updates);
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
});

/**
 * Track product view
 * Increment view count for a product
 */
exports.trackProductView = functions.https.onCall(async (data, context) => {
  const {productId} = data;

  if (!productId) {
    throw new functions.https.HttpsError(
        'invalid-argument',
        'Product ID required',
    );
  }

  try {
    await db.collection('products').doc(productId).update({
      views: admin.firestore.FieldValue.increment(1),
    });

    return {success: true};
  } catch (error) {
    console.error('View tracking error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Create initial admin user
 * Helper function to set first admin
 */
exports.setInitialAdmin = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated',
    );
  }

  const adminEmail = functions.config().admin?.email || 'admin@mitcstore.com';

  // Check if user's email matches admin email
  if (context.auth.token.email !== adminEmail) {
    throw new functions.https.HttpsError(
        'permission-denied',
        'Not authorized to set admin role',
    );
  }

  try {
    await db.collection('users').doc(context.auth.uid).set({
      role: 'admin',
      email: context.auth.token.email,
      name: context.auth.token.name || 'Admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, {merge: true});

    return {
      success: true,
      message: 'Admin role set successfully',
    };
  } catch (error) {
    console.error('Set admin error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
