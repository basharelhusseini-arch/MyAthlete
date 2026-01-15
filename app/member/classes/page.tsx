'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MemberClassesRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/member/bookings');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-thrivv-bg-dark">
      <p className="text-thrivv-text-secondary">Redirecting to Bookings...</p>
    </div>
  );
}
