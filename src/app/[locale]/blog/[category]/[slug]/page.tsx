import { setRequestLocale } from 'next-intl/server';
import { type Locale, locales } from '@/i18n.config';
import { type BlogCategory } from '@/types/content';
import { getBlogArticles, getBlogArticle } from '@/lib/content/blog';
import { ArticleLayout } from '@/components/blog/ArticleLayout';
import { ArticleSchema } from '@/components/seo/ArticleSchema';
import { notFound } from 'next/navigation';

interface BlogArticlePageProps {
  params: Promise<{ locale: Locale; category: BlogCategory; slug: string }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: Locale; category: BlogCategory; slug: string }> = [];

  locales.forEach((locale) => {
    const articles = getBlogArticles(locale);
    articles.forEach((article) => {
      params.push({
        locale,
        category: article.category,
        slug: article.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const { locale, category, slug } = await params;
  const article = getBlogArticle(locale, category, slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  const baseUrl = 'https://realcap.app';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const url = `${baseUrl}${prefix}/blog/${category}/${slug}`;

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/blog/${category}/${slug}`,
        zh: `${baseUrl}/zh/blog/${category}/${slug}`,
        'x-default': `${baseUrl}/blog/${category}/${slug}`,
      },
    },
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: 'article',
      publishedTime: article.frontmatter.publishDate,
      modifiedTime: article.frontmatter.lastModified,
      url,
      images: article.frontmatter.image ? [article.frontmatter.image] : [],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  const article = getBlogArticle(locale, category, slug);

  if (!article) {
    notFound();
  }

  const baseUrl = 'https://realcap.app';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const url = `${baseUrl}${prefix}/blog/${category}/${slug}`;

  return (
    <>
      <ArticleSchema
        title={article.frontmatter.title}
        description={article.frontmatter.description}
        publishDate={article.frontmatter.publishDate}
        modifiedDate={article.frontmatter.lastModified}
        image={article.frontmatter.image}
        url={url}
      />
      <ArticleLayout
        slug={slug}
        category={category}
        frontmatter={article.frontmatter}
        content={article.frontmatter.description}
      />
    </>
  );
}