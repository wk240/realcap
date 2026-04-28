'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { type Locale } from '@/i18n.config';
import { type BlogCategory, type BlogFrontmatter } from '@/types/content';

interface ArticleLayoutProps {
  slug: string;
  category: BlogCategory;
  frontmatter: BlogFrontmatter;
  content: string;
}

export function ArticleLayout({ slug, category, frontmatter, content }: ArticleLayoutProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <Container size="lg" className="py-12">
      <Breadcrumb
        items={[
          { label: locale === 'en' ? 'Home' : '首页', href: `${prefix}/` },
          { label: locale === 'en' ? 'Blog' : '博客', href: `${prefix}/blog` },
          { label: category, href: `${prefix}/blog/${category}` },
          { label: frontmatter.title, href: `${prefix}/blog/${category}/${slug}` },
        ]}
      />

      <article className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-3">
          <header className="mb-8">
            <div className="text-sm text-blue-600 font-medium mb-2">
              {category.toUpperCase()} · {frontmatter.publishDate}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-lg text-gray-600">
              {frontmatter.description}
            </p>
          </header>

          {frontmatter.image && (
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="w-full rounded-lg mb-8"
            />
          )}

          <div className="prose prose-lg max-w-none">
            <p>{content}</p>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <TableOfContents />
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              {locale === 'en' ? 'Related Articles' : '相关文章'}
            </h3>
            <RelatedArticles slugs={frontmatter.relatedArticles || []} category={category} />
          </div>
        </aside>
      </article>
    </Container>
  );
}