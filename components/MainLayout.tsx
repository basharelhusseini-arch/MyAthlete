'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication state
  useEffect(() => {
    const checkAuth = () => {
      // Check localStorage for auth (client-side only)
      if (typeof window !== 'undefined') {
        const memberId = localStorage.getItem('memberId');
        setIsAuthenticated(!!memberId);
      }
      setIsLoading(false);
    };

    checkAuth();
    
    // Re-check on pathname change (in case user logs in/out)
    checkAuth();
  }, [pathname]);

  // Public pages that should NEVER show sidebar (even if logged in)
  const isPublicAuthPage = 
    pathname === '/member/login' ||
    pathname === '/member/signup' ||
    pathname === '/';

  // Protected routes that require authentication
  const isProtectedRoute = 
    pathname?.startsWith('/member') ||
    pathname?.startsWith('/members') ||
    pathname?.startsWith('/workouts') ||
    pathname?.startsWith('/nutrition') ||
    pathname?.startsWith('/classes') ||
    pathname?.startsWith('/trainers') ||
    pathname?.startsWith('/memberships') ||
    pathname?.startsWith('/exercises') ||
    pathname?.startsWith('/recipes') ||
    pathname?.startsWith('/habits') ||
    pathname?.startsWith('/health');

  // Show sidebar only if:
  // 1. User is authenticated AND
  // 2. Not on a public auth page (login/signup/landing) AND
  // 3. On a protected route
  const showSidebar = isAuthenticated && !isPublicAuthPage && isProtectedRoute;

  // Show loading state briefly to prevent flash
  if (isLoading) {
    return (
      <div className="min-h-screen bg-thrivv-bg-dark flex items-center justify-center">
        <div className="animate-pulse text-thrivv-gold-500">Loading...</div>
      </div>
    );
  }

  // Public pages or unauthenticated - no sidebar, no padding
  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-thrivv-bg-dark">
        {children}
      </div>
    );
  }

  // Authenticated pages - show sidebar with padding
  return (
    <div className="min-h-screen bg-thrivv-bg-dark">
      <Sidebar />
      <main className="lg:ml-24 p-6 lg:p-12 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
