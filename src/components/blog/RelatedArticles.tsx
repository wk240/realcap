'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { type BlogCategory } from '@/types/content';

interface RelatedArticlesProps {
  slugs: string[];
  category: BlogCategory;
}

export function RelatedArticles({ slugs, category }: RelatedArticlesProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  if (slugs.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-2">
      {slugs.map((slug) => (
        <li key={slug}>
          <Link
            href={`${prefix}/blog/${category}/${slug}`}
            className="text-sm hover:underline"
          >
            {slug}
          </Link>
        </li>
      ))}
    </ul>
  );
}