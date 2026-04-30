'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function RedirectChinese() {
  const router = useRouter();

  useEffect(() => {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith('zh')) {
      router.replace('/zh');
    }
  }, [router]);

  return null;
}