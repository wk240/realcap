import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type BlogCategory, type BlogFrontmatter } from '@/types/content';

interface BlogArticle {
  slug: string;
  category: BlogCategory;
  frontmatter: BlogFrontmatter;
  locale: string;
}

interface BlogIndex {
  categories: Array<{
    slug: BlogCategory;
    name: string;
    description: string;
  }>;
}

export function getBlogIndex(locale: string): BlogIndex {
  const filePath = path.join(process.cwd(), 'content', locale, 'blog', 'index.mdx');

  if (!fs.existsSync(filePath)) {
    return { categories: [] };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return {
    categories: data.categories || [],
  };
}

export function getBlogArticles(locale: string, category?: BlogCategory): BlogArticle[] {
  const basePath = path.join(process.cwd(), 'content', locale, 'blog');

  if (!fs.existsSync(basePath)) {
    return [];
  }

  const categories: BlogCategory[] = category
    ? [category]
    : ['fraud-detection', 'cases', 'tutorials', 'reports'];

  const articles: BlogArticle[] = [];

  categories.forEach((cat) => {
    const catPath = path.join(basePath, cat);

    if (!fs.existsSync(catPath)) {
      return;
    }

    const files = fs.readdirSync(catPath).filter((f) => f.endsWith('.mdx'));

    files.forEach((file) => {
      const filePath = path.join(catPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      articles.push({
        slug: file.replace('.mdx', ''),
        category: cat,
        frontmatter: data as BlogFrontmatter,
        locale,
      });
    });
  });

  articles.sort(
    (a, b) =>
      new Date(b.frontmatter.publishDate).getTime() -
      new Date(a.frontmatter.publishDate).getTime()
  );

  return articles;
}

export function getBlogArticle(
  locale: string,
  category: BlogCategory,
  slug: string
): BlogArticle | null {
  const filePath = path.join(process.cwd(), 'content', locale, 'blog', category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return {
    slug,
    category,
    frontmatter: data as BlogFrontmatter,
    locale,
  };
}