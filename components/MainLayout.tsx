'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  
  // Show sidebar only for authenticated routes (member portal and admin sections)
  const showSidebar = 
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

  // Public landing page - no sidebar, no padding
  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-black">
        {children}
      </div>
    );
  }

  // Authenticated pages - show sidebar with padding
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="lg:ml-64 p-4 lg:p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
