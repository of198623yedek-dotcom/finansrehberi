'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

/**
 * Hook: Protected sayfalar için
 * Giriş yapmayan kullanıcıyı /auth'a yönlendir
 */
export function useProtectedRoute() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  return { isAuthorized: !!user, loading };
}

export default useProtectedRoute;
