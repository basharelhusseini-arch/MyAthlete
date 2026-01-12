'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar />
      <main className="lg:ml-64 p-4 lg:p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
