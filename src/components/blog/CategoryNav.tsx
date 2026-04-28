'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { cn } from '@/lib/utils/cn';
import { type Locale } from '@/i18n.config';
import { type BlogCategory } from '@/types/content';

interface CategoryNavProps {
  categories: Array<{
    slug: BlogCategory;
    name: string;
    description: string;
  }>;
  activeCategory?: BlogCategory;
}

export function CategoryNav({ categories, activeCategory }: CategoryNavProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <nav className="flex flex-wrap gap-4 mb-8">
      <Link
        href={`${prefix}/blog`}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          !activeCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        {locale === 'en' ? 'All' : '全部'}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`${prefix}/blog/${cat.slug}`}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            activeCategory === cat.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}