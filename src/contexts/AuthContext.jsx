import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  async function signup(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile
    await updateProfile(result.user, {
      displayName: displayName,
    });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      name: displayName,
      email: email,
      role: 'user',
      likedProducts: [],
      createdAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
    });

    return result;
  }

  // Sign in with email and password
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last seen
    await setDoc(
      doc(db, 'users', result.user.uid),
      { lastSeen: serverTimestamp() },
      { merge: true }
    );

    return result;
  }

  // Sign in with Google
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: 'user',
        likedProducts: [],
        createdAt: serverTimestamp(),
        lastSeen: serverTimestamp(),
      });
    } else {
      // Update last seen
      await setDoc(
        doc(db, 'users', result.user.uid),
        { lastSeen: serverTimestamp() },
        { merge: true }
      );
    }

    return result;
  }

  // Logout
  async function logout() {
    return signOut(auth);
  }

  // Reset password
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Update user profile
  async function updateUserProfile(updates) {
    if (!currentUser) throw new Error('No user logged in');

    // Update auth profile if name changed
    if (updates.displayName) {
      await updateProfile(currentUser, {
        displayName: updates.displayName,
      });
    }

    // Update Firestore
    await setDoc(
      doc(db, 'users', currentUser.uid),
      {
        ...updates,
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role || 'user');
          } else {
            setUserRole('guest');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('guest');
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
