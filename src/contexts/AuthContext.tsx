import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of admin email addresses
const ADMIN_EMAILS = [
  // Add your email here
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAdmin(user ? ADMIN_EMAILS.includes(user.email || '') : false);
      setLoading(false);
    });

    // Check for redirect result
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        setUser(result.user);
        setIsAdmin(ADMIN_EMAILS.includes(result.user.email || ''));
      }
    }).catch((error) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        setError('Failed to complete sign-in process. Please try again.');
      }
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    
    try {
      // First try popup
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        try {
          // If popup blocked, try redirect
          await signInWithRedirect(auth, provider);
        } catch (redirectError: any) {
          setError('Unable to sign in. Please check your popup blocker settings.');
        }
      } else if (error.code !== 'auth/popup-closed-by-user') {
        setError('Failed to sign in with Google. Please try again.');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError('Failed to sign out. Please try again.');
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    logout,
    isAdmin,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}