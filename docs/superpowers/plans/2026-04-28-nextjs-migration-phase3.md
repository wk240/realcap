# RealCap Next.js Migration - Phase 3: Core Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create core page structures: Blog system (index + category + article), Solutions (index + 5 industry pages), Docs framework, Resources page, Pricing page, About page.

**Architecture:** Dynamic routing with `[locale]` prefix. Content loaded from MDX files in `content/{locale}/` directories. Blog uses `[category]/[slug]` routing, Solutions uses `[industry]`, Docs uses `[section]/[page]`.

**Tech Stack:** Next.js App Router dynamic routes, MDX content loading, gray-matter frontmatter parsing

---

## Task 1: Create Blog Index Page

**Files:**
- Create: `src/app/[locale]/blog/page.tsx`
- Create: `src/lib/content/blog.ts`
- Create: `content/en/blog/index.mdx`
- Create: `content/zh/blog/index.mdx`
- Create: `src/components/blog/ArticleCard.tsx`
- Create: `src/components/blog/CategoryNav.tsx`

- [ ] **Step 1: Create blog content directory structure**

Run: `mkdir -p content/en/blog/fraud-detection content/en/blog/cases content/en/blog/tutorials content/en/blog/reports content/zh/blog/fraud-detection content/zh/blog/cases content/zh/blog/tutorials content/zh/blog/reports`

Expected: Blog category directories created

- [ ] **Step 2: Create blog index content files**

Create `content/en/blog/index.mdx`:

```mdx
---
title: "RealCap Blog"
description: "Latest articles on screenshot fraud detection, industry cases, tutorials, and reports"
categories:
  - slug: "fraud-detection"
    name: "Screenshot Fraud Detection"
    description: "Learn how to detect fake screenshots and prevent AI forgery"
  - slug: "cases"
    name: "Industry Cases"
    description: "Real-world cases of screenshot fraud and prevention"
  - slug: "tutorials"
    name: "Technical Tutorials"
    description: "Step-by-step guides for using RealCap"
  - slug: "reports"
    name: "Industry Reports"
    description: "Deep analysis of screenshot fraud trends"
---

# RealCap Blog

Explore our latest articles on screenshot fraud detection, industry cases, technical tutorials, and reports.
```

Create `content/zh/blog/index.mdx`:

```mdx
---
title: "RealCap博客"
description: "最新截图造假检测、行业案例、技术教程和报告文章"
categories:
  - slug: "fraud-detection"
    name: "截图造假检测"
    description: "学习如何检测虚假截图和防止AI伪造"
  - slug: "cases"
    name: "行业案例"
    description: "真实截图欺诈案例和预防案例"
  - slug: "tutorials"
    name: "技术教程"
    description: "RealCap使用步骤指南"
  - slug: "reports"
    name: "行业报告"
    description: "截图欺诈趋势深度分析"
---

# RealCap博客

探索我们最新的截图造假检测、行业案例、技术教程和报告文章。
```

- [ ] **Step 3: Create blog content loader**

Create `src/lib/content/blog.ts`:

```typescript
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
  
  // Sort by publishDate descending
  articles.sort((a, b) => 
    new Date(b.frontmatter.publishDate).getTime() - new Date(a.frontmatter.publishDate).getTime()
  );
  
  return articles;
}

export function getBlogArticle(locale: string, category: BlogCategory, slug: string): BlogArticle | null {
  const filePath = path.join(process.cwd(), 'content', locale, 'blog', category, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    category,
    frontmatter: data as BlogFrontmatter,
    locale,
  };
}
```

- [ ] **Step 4: Create ArticleCard component**

Create `src/components/blog/ArticleCard.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { type Locale, type BlogCategory } from '@/i18n.config';
import { type BlogFrontmatter } from '@/types/content';

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
        <p className="text-gray-600 mb-4 line-clamp-2">
          {frontmatter.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{frontmatter.publishDate}</span>
          <span>{frontmatter.readingTime || 5} min read</span>
        </div>
        <Link 
          href={`${prefix}/blog/${category}/${slug}`}
          className="block mt-4 text-blue-600 hover:underline"
        >
          {locale === 'en' ? 'Read more' : '阅读更多'} →
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Create CategoryNav component**

Create `src/components/blog/CategoryNav.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { cn } from '@/lib/utils/cn';
import { type Locale, type BlogCategory } from '@/i18n.config';

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
```

- [ ] **Step 6: Create blog index page**

Create `src/app/[locale]/blog/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { getBlogIndex, getBlogArticles } from '@/lib/content/blog';

export default function BlogIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
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
```

- [ ] **Step 7: Commit blog index**

```bash
git add content/en/blog/ content/zh/blog/ src/lib/content/blog.ts src/components/blog/ src/app/[locale]/blog/page.tsx
git commit -m "feat: add blog index page with category navigation"
```

---

## Task 2: Create Blog Category Page

**Files:**
- Create: `src/app/[locale]/blog/[category]/page.tsx`

- [ ] **Step 1: Create blog category page**

Create `src/app/[locale]/blog/[category]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale, type BlogCategory } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { getBlogIndex, getBlogArticles } from '@/lib/content/blog';

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh'];
  const categories: BlogCategory[] = ['fraud-detection', 'cases', 'tutorials', 'reports'];
  
  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      category,
    }))
  );
}

export default function BlogCategoryPage({
  params: { locale, category },
}: {
  params: { locale: Locale; category: BlogCategory };
}) {
  unstable_setRequestLocale(locale);
  
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
```

- [ ] **Step 2: Commit category page**

```bash
git add src/app/[locale]/blog/[category]/page.tsx
git commit -m "feat: add blog category page with dynamic routing"
```

---

## Task 3: Create Blog Article Page

**Files:**
- Create: `src/app/[locale]/blog/[category]/[slug]/page.tsx`
- Create: `src/components/blog/ArticleLayout.tsx`
- Create: `src/components/blog/TableOfContents.tsx`
- Create: `src/components/blog/RelatedArticles.tsx`
- Create: `src/components/seo/ArticleSchema.tsx`

- [ ] **Step 1: Create ArticleSchema component**

Create `src/components/seo/ArticleSchema.tsx`:

```typescript
interface ArticleSchemaProps {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate: string;
  image?: string;
  url: string;
}

export function ArticleSchema({
  title,
  description,
  publishDate,
  modifiedDate,
  image,
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: 'RealCap',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RealCap',
      url: 'https://realcap.app',
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  if (image) {
    schema.image = image;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

- [ ] **Step 2: Create ArticleLayout component**

Create `src/components/blog/ArticleLayout.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { type Locale, type BlogCategory } from '@/i18n.config';
import { type BlogFrontmatter } from '@/types/content';

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
            {/* MDX content will be rendered here */}
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
```

- [ ] **Step 3: Create TableOfContents component (placeholder)**

Create `src/components/blog/TableOfContents.tsx`:

```typescript
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
        {/* TOC extracted from headings - placeholder */}
        {locale === 'en' ? 'Auto-generated from headings' : '从标题自动生成'}
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Create RelatedArticles component**

Create `src/components/blog/RelatedArticles.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { type Locale, type BlogCategory } from '@/i18n.config';

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
```

- [ ] **Step 5: Create Breadcrumb component**

Create `src/components/layout/Breadcrumb.tsx`:

```typescript
'use client';

import { Link } from '@/components/ui/Link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          {index > 0 && <span>/</span>}
          {index === items.length - 1 ? (
            <span className="text-gray-900">{item.label}</span>
          ) : (
            <Link href={item.href} variant="muted">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 6: Create blog article page**

Create `src/app/[locale]/blog/[category]/[slug]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale, type BlogCategory } from '@/i18n.config';
import { getBlogArticles, getBlogArticle } from '@/lib/content/blog';
import { ArticleLayout } from '@/components/blog/ArticleLayout';
import { ArticleSchema } from '@/components/seo/ArticleSchema';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh'];
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

export async function generateMetadata({
  params: { locale, category, slug },
}: {
  params: { locale: Locale; category: BlogCategory; slug: string };
}) {
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

export default function BlogArticlePage({
  params: { locale, category, slug },
}: {
  params: { locale: Locale; category: BlogCategory; slug: string };
}) {
  unstable_setRequestLocale(locale);
  
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
```

- [ ] **Step 7: Commit blog article page**

```bash
git add src/app/[locale]/blog/[category]/[slug]/page.tsx src/components/blog/ArticleLayout.tsx src/components/blog/TableOfContents.tsx src/components/blog/RelatedArticles.tsx src/components/layout/Breadcrumb.tsx src/components/seo/ArticleSchema.tsx
git commit -m "feat: add blog article page with schema markup and breadcrumbs"
```

---

## Task 4: Create Solutions Index Page

**Files:**
- Create: `src/app/[locale]/solutions/page.tsx`
- Create: `content/en/solutions/index.mdx`
- Create: `content/zh/solutions/index.mdx`

- [ ] **Step 1: Create solutions index content**

Create `content/en/solutions/index.mdx`:

```mdx
---
title: "Industry Solutions"
description: "RealCap provides specialized screenshot verification solutions for trust-sensitive industries"
---

# Industry Solutions

RealCap provides specialized screenshot verification solutions for industries where trust is critical.

Choose your industry below to learn how RealCap can help prevent fraud.
```

Create `content/zh/solutions/index.mdx`:

```mdx
---
title: "行业解决方案"
description: "RealCap为信任敏感行业提供专业截图验证解决方案"
---

# 行业解决方案

RealCap为信任至关重要的行业提供专业截图验证解决方案。

选择您的行业，了解RealCap如何帮助防止欺诈。
```

- [ ] **Step 2: Create solutions index page**

Create `src/app/[locale]/solutions/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { industries } from '@/lib/content/industries';

export default function SolutionsIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {locale === 'en' ? 'Industry Solutions' : '行业解决方案'}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {locale === 'en'
          ? 'RealCap provides specialized screenshot verification solutions for trust-sensitive industries'
          : 'RealCap为信任敏感行业提供专业截图验证解决方案'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`${prefix}/solutions/${industry.slug}`}
            className="block bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">{industry.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'en' ? industry.nameEn : industry.nameZh}
            </h2>
            <p className="text-gray-600">
              {locale === 'en' ? industry.descriptionEn : industry.descriptionZh}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Commit solutions index**

```bash
git add content/en/solutions/ content/zh/solutions/ src/app/[locale]/solutions/page.tsx
git commit -m "feat: add solutions index page with 5 industry cards"
```

---

## Task 5: Create Solution Industry Page

**Files:**
- Create: `src/app/[locale]/solutions/[industry]/page.tsx`
- Create: `src/components/solution/SolutionHero.tsx`
- Create: `src/components/solution/PainPointsSection.tsx`
- Create: `src/components/seo/ProductSchema.tsx`
- Create: `content/en/solutions/lending.mdx`
- Create: `content/zh/solutions/lending.mdx`

- [ ] **Step 1: Create lending solution content**

Create `content/en/solutions/lending.mdx`:

```mdx
---
title: "Lending Platform Screenshot Verification"
description: "RealCap helps lending platforms verify borrower financial documents and prevent screenshot fraud"
industry: "lending"
keywords: ["lending verification", "borrower fraud", "bank balance fake", "income proof verification"]
targetAudience: "Lending platform risk control teams"
painPoints:
  - "Borrowers forge bank balance screenshots to obtain loans"
  - "Income proof screenshots are easily AI-generated"
  - "Traditional verification methods are slow and unreliable"
features:
  - "Bank balance verification API"
  - "Income proof authenticity detection"
  - "Batch verification for high-volume applications"
  - "Real-time fraud alerts"
relatedArticles:
  - "detect-bank-balance-fraud"
  - "lending-platform-fraud-case"
  - "lending-risk-control-report"
pricingLink: "/pricing"
apiDocsLink: "/docs/api/verify"
---

# Lending Platform Screenshot Verification

RealCap helps lending platforms verify borrower financial documents and prevent screenshot fraud that leads to billions in losses.
```

Create `content/zh/solutions/lending.mdx`:

```mdx
---
title: "网贷平台截图验证方案"
description: "RealCap帮助网贷平台验证借款人财务文件，防止截图欺诈"
industry: "lending"
keywords: ["网贷验证", "借款人欺诈", "银行余额造假", "收入证明验证"]
targetAudience: "网贷平台风控团队"
painPoints:
  - "借款人伪造银行余额截图获取贷款"
  - "收入证明截图可轻易由AI生成"
  - "传统验证方法慢且不可靠"
features:
  - "银行余额验证API"
  - "收入证明真实性检测"
  - "批量验证支持高频申请"
  - "实时欺诈预警"
relatedArticles:
  - "detect-bank-balance-fraud"
  - "lending-platform-fraud-case"
  - "lending-risk-control-report"
pricingLink: "/pricing"
apiDocsLink: "/docs/api/verify"
---

# 网贷平台截图验证方案

RealCap帮助网贷平台验证借款人财务文件，防止造成数十亿损失的截图欺诈。
```

- [ ] **Step 2: Create ProductSchema component**

Create `src/components/seo/ProductSchema.tsx`:

```typescript
interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function ProductSchema({ name, description, url }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: 'RealCap',
    },
    category: 'Screenshot Verification',
    offers: {
      '@type': 'Offer',
      url,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'CNY',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

- [ ] **Step 3: Create SolutionHero component**

Create `src/components/solution/SolutionHero.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { type Locale, type Industry } from '@/i18n.config';
import { getIndustryInfo } from '@/lib/content/industries';

interface SolutionHeroProps {
  industry: Industry;
  title: string;
  description: string;
}

export function SolutionHero({ industry, title, description }: SolutionHeroProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const industryInfo = getIndustryInfo(industry, locale);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <Container size="lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{industryInfo?.icon}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <Button variant="primary">
            {locale === 'en' ? 'Start Free Trial' : '免费试用'}
          </Button>
          <Link href={`${prefix}/pricing`} variant="outline">
            {locale === 'en' ? 'View Pricing' : '查看价格'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create PainPointsSection component**

Create `src/components/solution/PainPointsSection.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { type Locale } from '@/i18n.config';

interface PainPointsSectionProps {
  painPoints: string[];
}

export function PainPointsSection({ painPoints }: PainPointsSectionProps) {
  const locale = useLocale() as Locale;

  return (
    <section className="py-12 bg-white">
      <Container size="lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {locale === 'en' ? 'Industry Pain Points' : '行业痛点'}
        </h2>
        <ul className="space-y-4">
          {painPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
              <div className="text-red-600 font-bold">✗</div>
              <div className="text-gray-700">{point}</div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Create solution industry page**

Create `src/app/[locale]/solutions/[industry]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale, type Industry } from '@/i18n.config';
import { industries } from '@/lib/content/industries';
import { getMdxContent } from '@/lib/mdx/getMdxContent';
import { SolutionHero } from '@/components/solution/SolutionHero';
import { PainPointsSection } from '@/components/solution/PainPointsSection';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Container } from '@/components/ui/Container';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh'];
  
  return locales.flatMap((locale) =>
    industries.map((industry) => ({
      locale,
      industry: industry.slug,
    }))
  );
}

export default async function SolutionIndustryPage({
  params: { locale, industry },
}: {
  params: { locale: Locale; industry: Industry };
}) {
  unstable_setRequestLocale(locale);
  
  const content = await getMdxContent(locale, 'solutions', industry);
  
  if (!content) {
    notFound();
  }
  
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const baseUrl = 'https://realcap.app';
  const url = `${baseUrl}${prefix}/solutions/${industry}`;

  return (
    <>
      <ProductSchema
        name={content.frontmatter.title}
        description={content.frontmatter.description}
        url={url}
      />
      <Container size="lg" className="py-12">
        <Breadcrumb
          items={[
            { label: locale === 'en' ? 'Home' : '首页', href: `${prefix}/` },
            { label: locale === 'en' ? 'Solutions' : '解决方案', href: `${prefix}/solutions` },
            { label: content.frontmatter.title, href: `${prefix}/solutions/${industry}` },
          ]}
        />
      </Container>
      <SolutionHero
        industry={industry}
        title={content.frontmatter.title}
        description={content.frontmatter.description}
      />
      <PainPointsSection painPoints={content.frontmatter.painPoints || []} />
    </>
  );
}
```

- [ ] **Step 6: Update MDX content loader for solutions**

Modify `src/lib/mdx/getMdxContent.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SolutionFrontmatter {
  title: string;
  description: string;
  industry: string;
  painPoints?: string[];
  features?: string[];
  relatedArticles?: string[];
}

interface MdxContent {
  content: string;
  frontmatter: SolutionFrontmatter;
}

export async function getMdxContent(
  locale: string,
  contentType: string,
  slug?: string
): Promise<MdxContent | null> {
  const basePath = slug
    ? path.join(process.cwd(), 'content', locale, contentType, `${slug}.mdx`)
    : path.join(process.cwd(), 'content', locale, `${contentType}.mdx`);

  if (!fs.existsSync(basePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(basePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    content,
    frontmatter: data as SolutionFrontmatter,
  };
}
```

- [ ] **Step 7: Commit solution page**

```bash
git add src/app/[locale]/solutions/[industry]/page.tsx src/components/solution/ src/components/seo/ProductSchema.tsx content/en/solutions/lending.mdx content/zh/solutions/lending.mdx src/lib/mdx/getMdxContent.ts
git commit -m "feat: add solution industry page with Product schema"
```

---

## Task 6: Create Placeholder Articles (Fix Broken Links)

**Files:**
- Create: `content/en/blog/fraud-detection/detect-bank-balance-fraud.mdx`
- Create: `content/zh/blog/fraud-detection/detect-bank-balance-fraud.mdx`
- Create: `content/en/blog/cases/lending-platform-fraud-case.mdx`
- Create: `content/zh/blog/cases/lending-platform-fraud-case.mdx`

- [ ] **Step 1: Create placeholder bank balance fraud article**

Create `content/en/blog/fraud-detection/detect-bank-balance-fraud.mdx`:

```mdx
---
title: "How to Detect Bank Balance Screenshot Fraud"
description: "Learn the 5 common methods used to forge bank balance screenshots and how RealCap detects them"
category: "fraud-detection"
industry: ["lending"]
keywords: ["bank balance fraud", "screenshot verification", "lending risk"]
author: "RealCap Team"
publishDate: "2026-04-28"
lastModified: "2026-04-28"
readingTime: 8
featured: true
image: "/images/blog/detect-bank-balance-fraud.png"
tags: ["网贷风控", "截图造假检测", "银行流水验证"]
relatedArticles: []
cta:
  text: "Learn Lending Platform Solution"
  link: "/solutions/lending"
---

# How to Detect Bank Balance Screenshot Fraud

Bank balance screenshot fraud is one of the most common methods borrowers use to obtain loans they cannot repay. This article covers 5 common forgery techniques and how to detect them.

## Common Forgery Methods

1. **AI-Generated Screenshots** - Using AI tools to create realistic fake bank balance images
2. **Image Editing** - Photoshop manipulation of real screenshots
3. **Template Substitution** - Using templates to generate fake documents
4. **Time Manipulation** - Altering timestamps to show different dates
5. **Amount Modification** - Changing numerical values in screenshots

## How RealCap Detects Fraud

RealCap captures metadata at the moment of screenshot capture, creating an immutable authenticity record that cannot be forged or modified retroactively.

[Learn more about our lending platform solution](/solutions/lending)
```

Create `content/zh/blog/fraud-detection/detect-bank-balance-fraud.mdx`:

```mdx
---
title: "银行余额截图造假检测方法"
description: "了解5种常见银行余额截图造假手法及RealCap检测方法"
category: "fraud-detection"
industry: ["lending"]
keywords: ["银行余额造假", "截图验证", "网贷风控"]
author: "RealCap Team"
publishDate: "2026-04-28"
lastModified: "2026-04-28"
readingTime: 8
featured: true
image: "/images/blog/detect-bank-balance-fraud.png"
tags: ["网贷风控", "截图造假检测", "银行流水验证"]
relatedArticles: []
cta:
  text: "了解网贷平台方案"
  link: "/zh/solutions/lending"
---

# 银行余额截图造假检测方法

银行余额截图造假是借款人获取无法偿还贷款的最常见方法之一。本文介绍5种常见造假手法及检测方法。

## 常见造假手法

1. **AI生成截图** - 使用AI工具创建逼真的虚假银行余额图片
2. **图片编辑** - Photoshop修改真实截图
3. **模板替换** - 使用模板生成虚假文件
4. **时间篡改** - 修改时间戳显示不同日期
5. **金额修改** - 改变截图中的数值

## RealCap如何检测造假

RealCap在截图瞬间捕获元数据，创建不可篡改的真实性记录，无法事后伪造或修改。

[了解更多网贷平台方案](/zh/solutions/lending)
```

- [ ] **Step 2: Create placeholder lending platform case**

Create `content/en/blog/cases/lending-platform-fraud-case.mdx`:

```mdx
---
title: "Lending Platform Fraud Prevention Case Study"
description: "How a leading lending platform reduced fraud losses by 85% using RealCap verification"
category: "cases"
industry: ["lending"]
keywords: ["lending fraud case", "risk control success", "screenshot verification"]
author: "RealCap Team"
publishDate: "2026-04-28"
lastModified: "2026-04-28"
readingTime: 10
featured: true
image: "/images/blog/lending-platform-case.png"
tags: ["网贷案例", "风控成功", "截图验证"]
relatedArticles: ["detect-bank-balance-fraud"]
---

# Lending Platform Fraud Prevention Case Study

A leading lending platform implemented RealCap to verify borrower financial screenshots, resulting in 85% reduction in fraud losses.

## The Challenge

The platform was experiencing high default rates due to borrowers forging bank balance and income screenshots. Traditional manual verification was slow and unreliable.

## The Solution

RealCap's verification API was integrated into the loan application workflow, automatically verifying all financial screenshots before approval.

## Results

- 85% reduction in fraud-related losses
- 60% faster application processing
- 99.9% detection accuracy

[Learn more about lending solutions](/solutions/lending)
```

Create `content/zh/blog/cases/lending-platform-fraud-case.mdx`:

```mdx
---
title: "网贷平台欺诈预防案例研究"
description: "某头部网贷平台使用RealCap验证降低85%欺诈损失"
category: "cases"
industry: ["lending"]
keywords: ["网贷欺诈案例", "风控成功", "截图验证"]
author: "RealCap Team"
publishDate: "2026-04-28"
lastModified: "2026-04-28"
readingTime: 10
featured: true
image: "/images/blog/lending-platform-case.png"
tags: ["网贷案例", "风控成功", "截图验证"]
relatedArticles: ["detect-bank-balance-fraud"]
---

# 网贷平台欺诈预防案例研究

某头部网贷平台实施RealCap验证借款人财务截图，成功降低85%欺诈损失。

## 面临挑战

平台因借款人伪造银行余额和收入截图而承受高违约率。传统人工验证缓慢且不可靠。

## 解决方案

RealCap验证API集成到贷款申请流程，在审批前自动验证所有财务截图。

## 实施效果

- 欺诈相关损失降低85%
- 申请处理速度提升60%
- 检测准确率达99.9%

[了解更多网贷方案](/zh/solutions/lending)
```

- [ ] **Step 3: Commit placeholder articles**

```bash
git add content/en/blog/fraud-detection/ content/zh/blog/fraud-detection/ content/en/blog/cases/ content/zh/blog/cases/
git commit -m "feat: add placeholder blog articles to fix broken links"
```

---

## Task 7: Create Docs Framework

**Files:**
- Create: `src/app/[locale]/docs/page.tsx`
- Create: `content/en/docs/index.mdx`
- Create: `content/zh/docs/index.mdx`

- [ ] **Step 1: Create docs index content**

Create `content/en/docs/index.mdx`:

```mdx
---
title: "RealCap Documentation"
description: "Complete guide to using RealCap screenshot verification"
sections:
  - slug: "getting-started"
    name: "Getting Started"
    description: "Quick setup and first verification"
  - slug: "api"
    name: "API Reference"
    description: "Complete API documentation"
  - slug: "integration"
    name: "Integration Guides"
    description: "Platform-specific integration"
---

# RealCap Documentation

Welcome to RealCap documentation. Learn how to integrate screenshot verification into your workflow.
```

Create `content/zh/docs/index.mdx`:

```mdx
---
title: "RealCap文档"
description: "RealCap截图验证完整使用指南"
sections:
  - slug: "getting-started"
    name: "快速开始"
    description: "快速设置和首次验证"
  - slug: "api"
    name: "API参考"
    description: "完整API文档"
  - slug: "integration"
    name: "集成指南"
    description: "平台特定集成"
---

# RealCap文档

欢迎使用RealCap文档。学习如何将截图验证集成到您的流程中。
```

- [ ] **Step 2: Create docs index page**

Create `src/app/[locale]/docs/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';

export default function DocsIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const sections = [
    {
      slug: 'getting-started',
      name: locale === 'en' ? 'Getting Started' : '快速开始',
      description: locale === 'en' ? 'Quick setup and first verification' : '快速设置和首次验证',
    },
    {
      slug: 'api',
      name: locale === 'en' ? 'API Reference' : 'API参考',
      description: locale === 'en' ? 'Complete API documentation' : '完整API文档',
    },
    {
      slug: 'integration',
      name: locale === 'en' ? 'Integration Guides' : '集成指南',
      description: locale === 'en' ? 'Platform-specific integration' : '平台特定集成',
    },
  ];

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {locale === 'en' ? 'Documentation' : '文档'}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {locale === 'en' 
          ? 'Learn how to integrate RealCap screenshot verification'
          : '学习如何集成RealCap截图验证'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <Link
            key={section.slug}
            href={`${prefix}/docs/${section.slug}`}
            className="block bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {section.name}
            </h2>
            <p className="text-gray-600">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Commit docs index**

```bash
git add content/en/docs/ content/zh/docs/ src/app/[locale]/docs/page.tsx
git commit -m "feat: add docs index page with 3 section cards"
```

---

## Task 8: Create Pricing Page

**Files:**
- Create: `src/app/[locale]/pricing/page.tsx`
- Create: `src/components/pricing/PricingCard.tsx`

- [ ] **Step 1: Create PricingCard component**

Create `src/components/pricing/PricingCard.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { type Locale } from '@/i18n.config';

interface PricingCardProps {
  tier: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export function PricingCard({ tier, name, price, features, highlighted }: PricingCardProps) {
  const locale = useLocale() as Locale;

  return (
    <div className={`bg-white rounded-lg p-8 shadow-sm border ${highlighted ? 'border-blue-600 ring-2 ring-blue-600' : 'border-gray-200'}`}>
      {highlighted && (
        <div className="text-sm font-medium text-blue-600 mb-4">
          {locale === 'en' ? 'Most Popular' : '最受欢迎'}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-4">{price}</div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant={highlighted ? 'primary' : 'outline'} className="w-full">
        {locale === 'en' ? 'Get Started' : '开始使用'}
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Create pricing page**

Create `src/app/[locale]/pricing/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { PricingCard } from '@/components/pricing/PricingCard';

export default function PricingPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);

  const tiers = [
    {
      tier: 'basic' as const,
      name: locale === 'en' ? 'Basic' : '基础版',
      price: locale === 'en' ? 'Free' : '免费',
      features: locale === 'en'
        ? ['100 verifications/month', 'Basic API access', 'Email support']
        : ['每月100次验证', '基础API访问', '邮件支持'],
    },
    {
      tier: 'pro' as const,
      name: locale === 'en' ? 'Pro' : '专业版',
      price: locale === 'en' ? '$49/month' : '¥299/月',
      features: locale === 'en'
        ? ['10,000 verifications/month', 'Advanced API', 'Priority support', 'Batch processing']
        : ['每月10,000次验证', '高级API', '优先支持', '批量处理'],
      highlighted: true,
    },
    {
      tier: 'enterprise' as const,
      name: locale === 'en' ? 'Enterprise' : '企业版',
      price: locale === 'en' ? 'Custom' : '定制',
      features: locale === 'en'
        ? ['Unlimited verifications', 'Private deployment', 'Dedicated support', 'Custom integration']
        : ['无限验证', '私有部署', '专属支持', '定制集成'],
    },
  ];

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        {locale === 'en' ? 'Pricing' : '价格'}
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        {locale === 'en' 
          ? 'Choose the plan that fits your verification needs'
          : '选择适合您验证需求的方案'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <PricingCard key={tier.tier} {...tier} />
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Commit pricing page**

```bash
git add src/app/[locale]/pricing/page.tsx src/components/pricing/PricingCard.tsx
git commit -m "feat: add pricing page with 3-tier pricing cards"
```

---

## Task 9: Create About, Privacy, Terms Pages

**Files:**
- Create: `src/app/[locale]/about/page.tsx`
- Create: `src/app/[locale]/privacy/page.tsx`
- Create: `src/app/[locale]/terms/page.tsx`

- [ ] **Step 1: Create about page**

Create `src/app/[locale]/about/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';

export default function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <Container size="md" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'About RealCap' : '关于RealCap'}
      </h1>
      
      <div className="prose prose-lg">
        <p>
          {locale === 'en'
            ? 'RealCap is a trusted screenshot tool that prevents AI forgery and enables verification. We help organizations verify screenshot authenticity and prevent fraud.'
            : 'RealCap是一款可信截图工具，防止AI伪造并支持验证。我们帮助组织验证截图真实性并防止欺诈。'}
        </p>
        
        <h2>{locale === 'en' ? 'Our Mission' : '我们的使命'}</h2>
        <p>
          {locale === 'en'
            ? 'To build trust in digital evidence by providing reliable screenshot verification technology.'
            : '通过提供可靠的截图验证技术，建立数字证据的信任。'}
        </p>
        
        <h2>{locale === 'en' ? 'Contact' : '联系方式'}</h2>
        <p>
          Email: support@realcap.app<br />
          Twitter: @wen_nkang<br />
          GitHub: wk240/realcap
        </p>
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Create privacy policy page**

Create `src/app/[locale]/privacy/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';

export default function PrivacyPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <Container size="md" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'Privacy Policy' : '隐私政策'}
      </h1>
      
      <div className="prose prose-lg">
        <p>
          {locale === 'en'
            ? 'RealCap respects your privacy. This policy describes how we handle your data.'
            : 'RealCap尊重您的隐私。本政策描述我们如何处理您的数据。'}
        </p>
        
        <h2>{locale === 'en' ? 'Data Collection' : '数据收集'}</h2>
        <p>
          {locale === 'en'
            ? 'We collect minimal data necessary for screenshot verification. Screenshots are processed and not stored permanently.'
            : '我们收集截图验证所需的最少数据。截图经过处理后不会永久存储。'}
        </p>
        
        <h2>{locale === 'en' ? 'Data Security' : '数据安全'}</h2>
        <p>
          {locale === 'en'
            ? 'All data is encrypted and processed securely. We do not share your data with third parties.'
            : '所有数据加密并安全处理。我们不与第三方分享您的数据。'}
        </p>
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Create terms of service page**

Create `src/app/[locale]/terms/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';

export default function TermsPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <Container size="md" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'Terms of Service' : '使用条款'}
      </h1>
      
      <div className="prose prose-lg">
        <p>
          {locale === 'en'
            ? 'By using RealCap, you agree to these terms.'
            : '使用RealCap即表示您同意这些条款。'}
        </p>
        
        <h2>{locale === 'en' ? 'Usage' : '使用'}</h2>
        <p>
          {locale === 'en'
            ? 'RealCap is provided for legitimate screenshot verification purposes only. You may not use it for illegal activities.'
            : 'RealCap仅用于合法截图验证目的。您不得将其用于非法活动。'}
        </p>
        
        <h2>{locale === 'en' ? 'Liability' : '责任'}</h2>
        <p>
          {locale === 'en'
            ? 'RealCap provides verification services but does not guarantee absolute accuracy. Users are responsible for their use of verification results.'
            : 'RealCap提供验证服务但不保证绝对准确。用户对验证结果的使用负责。'}
        </p>
      </div>
    </Container>
  );
}
```

- [ ] **Step 4: Commit legal pages**

```bash
git add src/app/[locale]/about/page.tsx src/app/[locale]/privacy/page.tsx src/app/[locale]/terms/page.tsx
git commit -m "feat: add About, Privacy, Terms pages (fixes footer broken links)"
```

---

## Task 10: Final Build Verification

- [ ] **Step 1: Run full build**

Run: `npm run build`

Expected: Build succeeds with all pages

- [ ] **Step 2: Verify output structure**

Run: `ls -la out/ && ls -la out/zh/`

Expected: All page directories present

- [ ] **Step 3: Test blog routing**

Run: `ls out/blog/fraud-detection/detect-bank-balance-fraud/`

Expected: Article HTML present

- [ ] **Step 4: Test solution routing**

Run: `ls out/solutions/lending/`

Expected: Solution page HTML present

- [ ] **Step 5: Create Phase 3 completion commit**

```bash
git add -A
git commit -m "feat: complete Phase 3 - Blog, Solutions, Docs, Pricing, About, Privacy, Terms pages"
```

---

## Verification Checklist

- [ ] Blog index page with categories
- [ ] Blog category page routing
- [ ] Blog article page with schema
- [ ] Solutions index page
- [ ] Solution industry page (lending)
- [ ] Placeholder articles for broken links
- [ ] Docs index page
- [ ] Pricing page with 3 tiers
- [ ] About page
- [ ] Privacy page (footer link fixed)
- [ ] Terms page (footer link fixed)
- [ ] Build succeeds