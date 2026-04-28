'use client';

import { useLocale } from 'next-intl';

export function TableOfContents() {
  const locale = useLocale();

  return (
    <nav className="sticky top-24">
      <h3 className="font-semibold mb-4">
        {locale === 'en' ? 'Table of Contents' : '目录'}
      </h3>
      <div className="text-sm text-gray-600">
        {locale === 'en' ? 'Auto-generated from headings' : '从标题自动生成'}
      </div>
    </nav>
  );
}