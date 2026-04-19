'use client';

import { AuthProvider } from '@/app/context/AuthContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AIAdvisor from '@/app/components/AIAdvisor';

export function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Header />
      {children}
      <Footer />
      <AIAdvisor />
    </AuthProvider>
  );
}

export default ClientLayout;
