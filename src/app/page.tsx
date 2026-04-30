'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const lang = navigator.language.toLowerCase();
    const locale = lang.startsWith('zh') ? 'zh' : 'en';
    router.replace(`/${locale}`);
  }, [router]);

  return null;
}