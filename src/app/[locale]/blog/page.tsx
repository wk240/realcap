import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { getBlogIndex, getBlogArticles } from '@/lib/content/blog';

interface BlogIndexPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blogIndex = getBlogIndex(locale);
  const articles = getBlogArticles(locale);

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'RealCap Blog' : 'RealCap博客'}
      </h1>
      <CategoryNav categories={blogIndex.categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={`${article.category}-${article.slug}`}
            slug={article.slug}
            category={article.category}
            frontmatter={article.frontmatter}
          />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {locale === 'en' ? 'No articles yet' : '暂无文章'}
        </div>
      )}
    </Container>
  );
}