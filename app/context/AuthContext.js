'use client';

/**
 * Auth Context: Global kullanıcı state yönetimi
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getCurrentUser, 
  onAuthStateChange, 
  signOut 
} from '@/lib/authService';
import { getUserWatchlist } from '@/lib/watchlistService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser?.user || null);
        setProfile(currentUser?.profile || null);

        if (currentUser?.user?.id) {
          const watchlistData = await getUserWatchlist(currentUser.user.id);
          setWatchlist(watchlistData || []);
        }
      } catch (err) {
        console.error('Auth init error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Listen to auth changes
  useEffect(() => {
    if (!onAuthStateChange) return; // Supabase configured değilse skip

    const subscription = onAuthStateChange(async (event, session) => {
      if (session) {
        const currentUser = await getCurrentUser();
        setUser(currentUser?.user || null);
        setProfile(currentUser?.profile || null);

        if (currentUser?.user?.id) {
          const watchlistData = await getUserWatchlist(currentUser.user.id);
          setWatchlist(watchlistData || []);
        }
      } else {
        setUser(null);
        setProfile(null);
        setWatchlist([]);
      }
    });

    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setProfile(null);
      setWatchlist([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const refreshWatchlist = async () => {
    if (user?.id) {
      const watchlistData = await getUserWatchlist(user.id);
      setWatchlist(watchlistData || []);
    }
  };

  const value = {
    user,
    profile,
    watchlist,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
    refreshWatchlist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
