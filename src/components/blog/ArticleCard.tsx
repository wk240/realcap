'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { type BlogCategory, type BlogFrontmatter } from '@/types/content';

interface ArticleCardProps {
  slug: string;
  category: BlogCategory;
  frontmatter: BlogFrontmatter;
}

export function ArticleCard({ slug, category, frontmatter }: ArticleCardProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {frontmatter.image && (
        <div className="aspect-video bg-gray-100 relative">
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-sm text-blue-600 font-medium mb-2">
          {category.toUpperCase()}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {frontmatter.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{frontmatter.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{frontmatter.publishDate}</span>
          <span>{frontmatter.readingTime || 5} min read</span>
        </div>
        <Link href={`${prefix}/blog/${category}/${slug}`} className="block mt-4 text-blue-600 hover:underline">
          {locale === 'en' ? 'Read more' : '阅读更多'} →
        </Link>
      </div>
    </article>
  );
}