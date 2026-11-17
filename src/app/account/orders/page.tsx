'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrdersRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account?tab=orders');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF4F4]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14cda8]"></div>
    </div>
  );
}
