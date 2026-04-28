import { setRequestLocale } from 'next-intl/server';
import { type Locale, locales } from '@/i18n.config';
import { type BlogCategory } from '@/types/content';
import { Container } from '@/components/ui/Container';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { getBlogIndex, getBlogArticles } from '@/lib/content/blog';

interface BlogCategoryPageProps {
  params: Promise<{ locale: Locale; category: BlogCategory }>;
}

export function generateStaticParams() {
  const categories: BlogCategory[] = ['fraud-detection', 'cases', 'tutorials', 'reports'];

  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      category,
    }))
  );
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const blogIndex = getBlogIndex(locale);
  const articles = getBlogArticles(locale, category);
  const categoryInfo = blogIndex.categories.find((c) => c.slug === category);

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {categoryInfo?.name || category}
      </h1>
      <p className="text-gray-600 mb-8">
        {categoryInfo?.description}
      </p>
      <CategoryNav categories={blogIndex.categories} activeCategory={category} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            category={article.category}
            frontmatter={article.frontmatter}
          />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {locale === 'en' ? 'No articles in this category' : '该分类暂无文章'}
        </div>
      )}
    </Container>
  );
}