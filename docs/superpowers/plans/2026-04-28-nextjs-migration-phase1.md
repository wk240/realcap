# RealCap Next.js Migration - Phase 1: Project Setup

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize Next.js project with next-intl, Tailwind CSS, and MDX support configured for static export to GitHub Pages.

**Architecture:** Next.js 14+ with App Router, next-intl for i18n with prefix routing (en: `/`, zh: `/zh`), Tailwind CSS for styling, MDX for content management. Static export via `output: 'export'` for GitHub Pages deployment.

**Tech Stack:** Next.js 14+, next-intl 3+, Tailwind CSS 3+, @next/mdx, gray-matter, next-sitemap

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`

- [ ] **Step 1: Create Next.js project with TypeScript**

Run: `npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-import-alias --eslint`

Expected: Project initialized with TypeScript, Tailwind, App Router, ESLint, src directory

- [ ] **Step 2: Verify project structure created**

Run: `ls -la src/app/`

Expected: `layout.tsx`, `page.tsx`, `globals.css` present

- [ ] **Step 3: Install additional dependencies**

Run: `npm install next-intl@latest @next/mdx gray-matter next-sitemap`

Expected: Dependencies installed successfully

- [ ] **Step 4: Install MDX dependencies**

Run: `npm install @mdx-js/loader @mdx-js/react`

Expected: MDX loader and react installed

- [ ] **Step 5: Commit initial project setup**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.mjs src/
git commit -m "feat: initialize Next.js project with TypeScript and Tailwind"
```

---

## Task 2: Configure next.config.js for Static Export

**Files:**
- Modify: `next.config.ts` → `next.config.js`

- [ ] **Step 1: Replace next.config.ts with static export config**

Create `next.config.js`:

```javascript
const withNextIntl = require('next-intl/plugin')(
  './i18n.config.ts'
);
const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
};

module.exports = withNextIntl(withMDX(nextConfig));
```

- [ ] **Step 2: Delete original next.config.ts**

Run: `rm next.config.ts`

Expected: TypeScript config removed, JS config active

- [ ] **Step 3: Test build configuration**

Run: `npm run build`

Expected: Build succeeds, `out/` directory created with static files

- [ ] **Step 4: Commit config changes**

```bash
git add next.config.js
git rm next.config.ts
git commit -m "feat: configure Next.js for static export with next-intl and MDX"
```

---

## Task 3: Configure i18n (next-intl)

**Files:**
- Create: `i18n.config.ts`
- Create: `middleware.ts`
- Create: `messages/en.json`
- Create: `messages/zh.json`
- Modify: `src/app/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Modify: `src/app/page.tsx` → `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create i18n configuration**

Create `i18n.config.ts`:

```typescript
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};

export const localePrefixes: Record<Locale, string> = {
  en: '',
  zh: 'zh',
};
```

- [ ] **Step 2: Create middleware for locale routing**

Create `middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefixes } from './i18n.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: {
    mode: 'prefix',
    prefixes: localePrefixes,
  },
});

export const config = {
  matcher: ['/', '/(zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 3: Create English messages file**

Create `messages/en.json`:

```json
{
  "metadata": {
    "title": "RealCap - Trusted Screenshot Tool | Prevent AI Forgery",
    "description": "RealCap is a trusted screenshot tool that prevents AI forgery. Verify screenshot authenticity, capture secure proof, and protect against fake screenshots."
  },
  "nav": {
    "home": "Home",
    "features": "Features",
    "blog": "Blog",
    "docs": "Docs",
    "contact": "Contact"
  },
  "hero": {
    "title": "RealCap - Trusted Screenshot Tool",
    "subtitle": "Prevent AI Forgery · Verifiable Capture · Secure Proof",
    "cta": "Download Now"
  },
  "footer": {
    "copyright": "© 2026 RealCap. All rights reserved.",
    "license": "Content licensed under CC-BY-NC 3.0. See LICENSE for details.",
    "privacy": "Privacy Policy",
    "terms": "Terms of Use",
    "about": "About Us",
    "faq": "FAQ"
  }
}
```

- [ ] **Step 4: Create Chinese messages file**

Create `messages/zh.json`:

```json
{
  "metadata": {
    "title": "RealCap - 可信截图工具 | 防止AI伪造",
    "description": "RealCap是一款可信截图工具，可有效防止AI伪造。验证截图真实性，安全取证，防范虚假截图。"
  },
  "nav": {
    "home": "首页",
    "features": "功能",
    "blog": "博客",
    "docs": "文档",
    "contact": "联系我们"
  },
  "hero": {
    "title": "RealCap - 可信截图工具",
    "subtitle": "防止AI伪造 · 可验证截图 · 安全取证",
    "cta": "立即下载"
  },
  "footer": {
    "copyright": "© 2026 RealCap. 保留所有权利。",
    "license": "内容采用CC-BY-NC 3.0许可。详见LICENSE文件。",
    "privacy": "隐私政策",
    "terms": "使用条款",
    "about": "关于我们",
    "faq": "常见问题"
  }
}
```

- [ ] **Step 5: Create locale-aware app layout**

Create `src/app/[locale]/layout.tsx`:

```typescript
import { locales, type Locale } from '@/i18n.config';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  
  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return (
    <html lang={locale}>
      <head>
        <meta name="description" content={t('description')} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Move page to locale directory**

Rename `src/app/page.tsx` to `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  return (
    <main className="min-h-screen">
      <h1>Welcome to RealCap</h1>
      <p>Locale: {locale}</p>
    </main>
  );
}
```

- [ ] **Step 7: Update root layout**

Modify `src/app/layout.tsx` to minimal root layout:

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 8: Delete old page and move locale layout files**

Run: `rm src/app/page.tsx && rm src/app/globals.css`

Expected: Old files removed

- [ ] **Step 9: Test locale routing**

Run: `npm run dev`

Expected: Dev server starts, `/` shows English, `/zh` shows Chinese

- [ ] **Step 10: Test build with locales**

Run: `npm run build`

Expected: `out/` contains `index.html` and `zh/index.html`

- [ ] **Step 11: Commit i18n setup**

```bash
git add i18n.config.ts middleware.ts messages/ src/app/
git commit -m "feat: configure next-intl for multilingual support"
```

---

## Task 4: Setup MDX Content Structure

**Files:**
- Create: `content/en/home.mdx`
- Create: `content/zh/home.mdx`
- Create: `src/lib/mdx/getMdxContent.ts`
- Create: `src/lib/mdx/mdxComponents.tsx`

- [ ] **Step 1: Create content directory structure**

Run: `mkdir -p content/en content/zh`

Expected: Content directories created

- [ ] **Step 2: Create English home content placeholder**

Create `content/en/home.mdx`:

```mdx
---
title: "RealCap - Trusted Screenshot Tool"
description: "RealCap is a trusted screenshot tool that prevents AI forgery."
---

# Welcome to RealCap

RealCap is a trusted screenshot tool that prevents AI forgery and enables verification.

## Features

- Trusted Capture
- AI Forgery Detection
- Screenshot Verification
- Cross-Platform Support
```

- [ ] **Step 3: Create Chinese home content placeholder**

Create `content/zh/home.mdx`:

```mdx
---
title: "RealCap - 可信截图工具"
description: "RealCap是一款可信截图工具，可有效防止AI伪造。"
---

# 欢迎使用 RealCap

RealCap是一款可信截图工具，可有效防止AI伪造并支持验证。

## 功能特点

- 可信截图
- AI伪造检测
- 截图验证
- 跨平台支持
```

- [ ] **Step 4: Create MDX content loader utility**

Create `src/lib/mdx/getMdxContent.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Frontmatter {
  title: string;
  description: string;
  [key: string]: string | string[] | number | boolean | object;
}

interface MdxContent {
  content: string;
  frontmatter: Frontmatter;
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
    frontmatter: data as Frontmatter,
  };
}

export async function getMdxSlugs(
  locale: string,
  contentType: string
): Promise<string[]> {
  const basePath = path.join(process.cwd(), 'content', locale, contentType);

  if (!fs.existsSync(basePath)) {
    return [];
  }

  const files = fs.readdirSync(basePath);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}
```

- [ ] **Step 5: Create MDX components mapping**

Create `src/lib/mdx/mdxComponents.tsx`:

```typescript
import type { MDXComponents } from 'mdx/types';

export function getMdxComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 hover:underline">{children}</a>
    ),
  };
}
```

- [ ] **Step 6: Commit MDX setup**

```bash
git add content/ src/lib/mdx/
git commit -m "feat: setup MDX content structure with loader utilities"
```

---

## Task 5: Configure next-sitemap

**Files:**
- Create: `next-sitemap.config.js`

- [ ] **Step 1: Create sitemap configuration**

Create `next-sitemap.config.js`:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://realcap.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
};
```

- [ ] **Step 2: Add sitemap build script to package.json**

In `package.json`, add to `scripts`:

```json
"postbuild": "next-sitemap"
```

- [ ] **Step 3: Test sitemap generation**

Run: `npm run build`

Expected: `out/sitemap.xml` and `out/robots.txt` generated

- [ ] **Step 4: Verify sitemap content**

Run: `cat out/sitemap.xml | head -20`

Expected: Sitemap contains URLs for both locales

- [ ] **Step 5: Commit sitemap configuration**

```bash
git add next-sitemap.config.js package.json
git commit -m "feat: configure next-sitemap for automatic sitemap generation"
```

---

## Task 6: Setup GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub Pages deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main', 'master']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'
          
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create placeholder for CNAME**

Run: `cp docs/CNAME out/.nojekyll 2>/dev/null || echo "realcap.app" > CNAME.placeholder`

Note: CNAME will be handled manually after first deployment

- [ ] **Step 3: Add .nojekyll file**

Create empty `public/.nojekyll` to prevent Jekyll processing:

Run: `touch public/.nojekyll`

- [ ] **Step 4: Commit GitHub Actions setup**

```bash
git add .github/workflows/deploy.yml public/.nojekyll
git commit -m "feat: setup GitHub Actions workflow for GitHub Pages deployment"
```

---

## Task 7: Create Type Definitions

**Files:**
- Create: `src/types/content.ts`
- Create: `src/types/i18n.ts`

- [ ] **Step 1: Create content types**

Create `src/types/content.ts`:

```typescript
export interface BlogFrontmatter {
  title: string;
  description: string;
  category: BlogCategory;
  industry: Industry[];
  keywords: string[];
  author: string;
  publishDate: string;
  lastModified: string;
  readingTime: number;
  featured: boolean;
  image: string;
  tags: string[];
  relatedArticles: string[];
  cta?: {
    text: string;
    link: string;
  };
}

export interface SolutionFrontmatter {
  title: string;
  description: string;
  industry: Industry;
  keywords: string[];
  targetAudience: string;
  painPoints: string[];
  features: string[];
  caseStudy?: string;
  relatedArticles: string[];
  pricingLink: string;
  apiDocsLink: string;
}

export interface DocFrontmatter {
  title: string;
  description: string;
  section: DocSection;
  category: string;
  keywords: string[];
  order: number;
  prevPage?: string;
  nextPage?: string;
  codeExamples?: string[];
}

export type BlogCategory = 'fraud-detection' | 'cases' | 'tutorials' | 'reports';
export type Industry = 'lending' | 'mcn' | 'matchmaking' | 'gaming' | 'rental';
export type DocSection = 'getting-started' | 'api' | 'integration';

export interface Article {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  locale: string;
}

export interface Solution {
  industry: Industry;
  frontmatter: SolutionFrontmatter;
  content: string;
  locale: string;
}

export interface DocPage {
  section: DocSection;
  slug: string;
  frontmatter: DocFrontmatter;
  content: string;
  locale: string;
}
```

- [ ] **Step 2: Create i18n types**

Create `src/types/i18n.ts`:

```typescript
import type { locales } from '@/i18n.config';

export type Locale = (typeof locales)[number];

export interface LocaleConfig {
  code: Locale;
  name: string;
  prefix: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  locale: Locale;
}

export interface Translations {
  metadata: {
    title: string;
    description: string;
  };
  nav: Record<string, string>;
  hero: Record<string, string>;
  footer: Record<string, string>;
}
```

- [ ] **Step 3: Commit type definitions**

```bash
git add src/types/
git commit -m "feat: add TypeScript type definitions for content and i18n"
```

---

## Task 8: Create Basic UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Link.tsx`
- Create: `src/lib/utils/cn.ts`

- [ ] **Step 1: Create className utility**

Create `src/lib/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Install clsx and tailwind-merge**

Run: `npm install clsx tailwind-merge`

Expected: Utilities installed

- [ ] **Step 3: Create Button component**

Create `src/components/ui/Button.tsx`:

```typescript
import { cn } from '@/lib/utils/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
            'border-2 border-blue-600 text-blue-600 hover:bg-blue-50': variant === 'outline',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

- [ ] **Step 4: Create Container component**

Create `src/components/ui/Container.tsx`:

```typescript
import { cn } from '@/lib/utils/cn';
import { type HTMLAttributes, forwardRef } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          {
            'max-w-2xl': size === 'sm',
            'max-w-4xl': size === 'md',
            'max-w-6xl': size === 'lg',
            'max-w-7xl': size === 'xl',
            'max-w-none': size === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
```

- [ ] **Step 5: Create Link component**

Create `src/components/ui/Link.tsx`:

```typescript
import { cn } from '@/lib/utils/cn';
import { type AnchorHTMLAttributes, forwardRef } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted' | 'button';
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', children, href, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'transition-colors',
          {
            'text-blue-600 hover:text-blue-800 hover:underline': variant === 'default',
            'text-gray-600 hover:text-gray-900': variant === 'muted',
            'inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700': variant === 'button',
          },
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
```

- [ ] **Step 6: Commit UI components**

```bash
git add src/components/ui/ src/lib/utils/cn.ts package.json package-lock.json
git commit -m "feat: add basic UI components (Button, Container, Link)"
```

---

## Task 9: Create Layout Components (Header & Footer)

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/LanguageSwitcher.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create LanguageSwitcher component**

Create `src/components/layout/LanguageSwitcher.tsx`:

```typescript
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { localeNames, locales, type Locale } from '@/i18n.config';
import { cn } from '@/lib/utils/cn';

export function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    const newPath = newLocale === 'en' ? currentPath : `/${newLocale}${currentPath}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            'px-2 py-1 rounded text-sm font-medium transition-colors',
            locale === loc
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
          aria-label={`Switch to ${localeNames[loc]}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create Header component**

Create `src/components/layout/Header.tsx`:

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { type Locale } from '@/i18n.config';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`${prefix}/`} className="flex items-center gap-2" variant="muted">
            <span className="text-2xl font-bold text-blue-600">R</span>
            <span className="font-semibold">RealCap</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href={`${prefix}/`}>{t('home')}</Link>
            <Link href={`${prefix}/#features`}>{t('features')}</Link>
            <Link href={`${prefix}/blog`}>{t('blog')}</Link>
            <Link href={`${prefix}/docs`}>{t('docs')}</Link>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create Footer component**

Create `src/components/layout/Footer.tsx`:

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <Link href={`${prefix}/privacy`} variant="muted">
              {t('privacy')}
            </Link>
            <Link href={`${prefix}/terms`} variant="muted">
              {t('terms')}
            </Link>
            <Link href={`${prefix}/about`} variant="muted">
              {t('about')}
            </Link>
            <Link href={`${prefix}/faq`} variant="muted">
              {t('faq')}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/wen_nkang"
              className="text-gray-600 hover:text-gray-900"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              𝕏
            </a>
            <a
              href="https://github.com/wk240/realcap"
              className="text-gray-600 hover:text-gray-900"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>{t('copyright')}</p>
          <p className="mt-2">{t('license')}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Update locale layout with Header/Footer**

Modify `src/app/[locale]/layout.tsx`:

```typescript
import { locales, type Locale } from '@/i18n.config';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'en' ? 'https://realcap.app/' : `https://realcap.app/${locale}/`,
      languages: {
        en: 'https://realcap.app/',
        zh: 'https://realcap.app/zh/',
        'x-default': 'https://realcap.app/',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: locale === 'en' ? 'https://realcap.app/' : `https://realcap.app/${locale}/`,
      siteName: 'RealCap',
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      site: '@wen_nkang',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Commit layout components**

```bash
git add src/components/layout/ src/app/[locale]/layout.tsx
git commit -m "feat: add Header, Footer, and LanguageSwitcher components"
```

---

## Task 10: Final Build Verification

- [ ] **Step 1: Run full build**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 2: Verify output structure**

Run: `ls -la out/`

Expected: `index.html`, `zh/index.html`, `sitemap.xml`, `robots.txt` present

- [ ] **Step 3: Verify hreflang tags in output**

Run: `grep -A5 "hreflang" out/index.html`

Expected: hreflang links for en, zh, x-default

- [ ] **Step 4: Test local preview**

Run: `npx serve out`

Expected: Site loads at localhost:3000, both locales accessible

- [ ] **Step 5: Create Phase 1 completion commit**

```bash
git add -A
git commit -m "feat: complete Phase 1 - Next.js project setup with i18n and static export"
```

---

## Verification Checklist

- [ ] Next.js project initialized with TypeScript
- [ ] Static export configured (`output: 'export'`)
- [ ] next-intl working (English `/`, Chinese `/zh`)
- [ ] MDX content structure created
- [ ] Basic UI components (Button, Container, Link)
- [ ] Layout components (Header, Footer, LanguageSwitcher)
- [ ] sitemap.xml and robots.txt generated
- [ ] GitHub Actions workflow configured
- [ ] hreflang tags present in HTML output
- [ ] Build succeeds, `out/` directory complete