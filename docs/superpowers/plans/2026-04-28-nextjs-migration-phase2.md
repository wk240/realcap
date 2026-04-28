# RealCap Next.js Migration - Phase 2: Homepage Reconstruction

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking tracking.

**Goal:** Reconstruct homepage with 9 sections matching SEO spec: Hero, Trust Problem, How It Works, Target Industries, Core Features, Use Cases, Data/Case, FAQ Preview, Bottom CTA. Each section contributes to ≥2000 word count and ≥15 internal links.

**Architecture:** Component-based homepage with each section as separate React component. Content sourced from MDX files (content/{locale}/home.mdx) and translation files (messages/{locale}.json). SEO schema: Organization, WebSite, SoftwareApplication (NO aggregateRating).

**Tech Stack:** React components with Tailwind CSS, MDX for content, next-intl for translations, Schema.org JSON-LD

---

## Task 1: Create Hero Section Component

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `messages/en.json`
- Modify: `messages/zh.json`

- [ ] **Step 1: Create HeroSection component**

Create `src/components/home/HeroSection.tsx`:

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { type Locale } from '@/i18n.config';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
      <Container size="lg">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary">
              {t('cta')}
            </Button>
            <Button size="lg" variant="outline">
              {locale === 'en' ? 'Learn More' : '了解更多'}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update translation files with hero content**

Modify `messages/en.json`, add to root:

```json
{
  "hero": {
    "title": "RealCap - Trusted Screenshot Tool",
    "subtitle": "Prevent AI Forgery · Verifiable Capture · Secure Proof",
    "cta": "Download Now",
    "stats": {
      "users": "10,000+",
      "verifications": "1M+",
      "accuracy": "99.9%"
    }
  }
}
```

Modify `messages/zh.json`, add to root:

```json
{
  "hero": {
    "title": "RealCap - 可信截图工具",
    "subtitle": "防止AI伪造 · 可验证截图 · 安全取证",
    "cta": "立即下载",
    "stats": {
      "users": "10,000+",
      "verifications": "1M+",
      "accuracy": "99.9%"
    }
  }
}
```

- [ ] **Step 3: Update home page to use HeroSection**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  return (
    <>
      <HeroSection />
      {/* Additional sections will be added */}
    </>
  );
}
```

- [ ] **Step 4: Test hero section**

Run: `npm run dev`

Expected: Hero section displays with localized title, subtitle, CTA buttons

- [ ] **Step 5: Commit HeroSection**

```bash
git add src/components/home/HeroSection.tsx src/app/[locale]/page.tsx messages/
git commit -m "feat: add HeroSection component for homepage"
```

---

## Task 2: Create Trust Problem Section

**Files:**
- Create: `src/components/home/TrustProblemSection.tsx`
- Modify: `content/en/home.mdx`
- Modify: `content/zh/home.mdx`

- [ ] **Step 1: Create TrustProblemSection component**

Create `src/components/home/TrustProblemSection.tsx`:

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale, type Industry } from '@/i18n.config';

interface TrustProblemSectionProps {
  problems: Array<{
    industry: Industry;
    title: string;
    description: string;
    stats?: string;
  }>;
}

export function TrustProblemSection({ problems }: TrustProblemSectionProps) {
  const t = useTranslations('trustProblem');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' 
              ? 'The Growing Threat of Fake Screenshots' 
              : '虚假截图日益严重的威胁'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'AI-generated fake screenshots are causing billions in losses across industries. Traditional verification methods fail against sophisticated forgery techniques.'
              : 'AI生成的虚假截图正在给各行各业造成数十亿美元的损失。传统验证方法无法应对复杂的伪造技术。'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <article key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="text-sm font-medium text-blue-600 mb-2">
                {problem.industry.toUpperCase()}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {problem.description}
              </p>
              {problem.stats && (
                <div className="text-sm font-bold text-red-600 mb-4">
                  {problem.stats}
                </div>
              )}
              <Link href={`${prefix}/solutions/${problem.industry}`}>
                {locale === 'en' ? 'Learn More' : '了解更多'}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update English home.mdx with trust problem data**

Modify `content/en/home.mdx`:

```mdx
---
title: "RealCap - Trusted Screenshot Tool"
description: "RealCap is a trusted screenshot tool that prevents AI forgery and enables verification."
problems:
  - industry: "lending"
    title: "Lending Platform Fraud"
    description: "Borrowers forge bank balance screenshots to obtain loans they cannot repay. AI-generated fake documents are increasingly sophisticated and bypass traditional checks."
    stats: "$2B+ annual losses from screenshot fraud"
  - industry: "mcn"
    title: "MCN Talent Scams"
    description: "Fake influencers forge income screenshots to sign fraudulent contracts. Agencies lose millions signing influencers with fabricated proof of earnings."
    stats: "40% of influencer income screenshots are suspected fake"
  - industry: "matchmaking"
    title: "Dating Profile Fraud"
    description: "Users forge identity documents and financial screenshots to deceive potential partners. Fake wealth screenshots enable romance scams and blackmail."
    stats: "15% of dating profiles contain fake verification screenshots"
---

# Welcome to RealCap

RealCap is a trusted screenshot tool that prevents AI forgery and enables verification.
```

- [ ] **Step 3: Update Chinese home.mdx with trust problem data**

Modify `content/zh/home.mdx`:

```mdx
---
title: "RealCap - 可信截图工具"
description: "RealCap是一款可信截图工具，可有效防止AI伪造并支持验证。"
problems:
  - industry: "lending"
    title: "网贷平台欺诈"
    description: "借款人伪造银行余额截图获取无法偿还的贷款。AI生成的虚假文件越来越复杂，可绕过传统审核。"
    stats: "每年因截图欺诈损失超过20亿美元"
  - industry: "mcn"
    title: "MCN网红签约欺诈"
    description: "虚假网红伪造收入截图签署欺诈合同。机构花费数百万签约伪造收入证明的网红。"
    stats: "40%网红收入截图疑似造假"
  - industry: "matchmaking"
    title: "相亲平台身份欺诈"
    description: "用户伪造身份文件和财务截图欺骗潜在伴侣。虚假财富截图导致情感诈骗和敲诈。"
    stats: "15%相亲资料包含虚假验证截图"
---

# 欢迎使用 RealCap

RealCap是一款可信截图工具，可有效防止AI伪造并支持验证。
```

- [ ] **Step 4: Create content loader for home page**

Create `src/lib/content/home.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type Industry } from '@/types/content';

interface HomeContent {
  frontmatter: {
    title: string;
    description: string;
    problems: Array<{
      industry: Industry;
      title: string;
      description: string;
      stats: string;
    }>;
  };
}

export function getHomeContent(locale: string): HomeContent {
  const filePath = path.join(process.cwd(), 'content', locale, 'home.mdx');
  
  if (!fs.existsSync(filePath)) {
    return {
      frontmatter: {
        title: 'RealCap',
        description: 'Trusted screenshot tool',
        problems: [],
      },
    };
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);
  
  return {
    frontmatter: data as HomeContent['frontmatter'],
  };
}
```

- [ ] **Step 5: Update homepage to use TrustProblemSection**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { getHomeContent } from '@/lib/content/home';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
    </>
  );
}
```

- [ ] **Step 6: Commit TrustProblemSection**

```bash
git add src/components/home/TrustProblemSection.tsx src/lib/content/home.ts content/ src/app/[locale]/page.tsx
git commit -m "feat: add TrustProblemSection with industry-specific fraud data"
```

---

## Task 3: Create How It Works Section

**Files:**
- Create: `src/components/home/HowItWorksSection.tsx`
- Modify: `messages/en.json`
- Modify: `messages/zh.json`

- [ ] **Step 1: Create HowItWorksSection component**

Create `src/components/home/HowItWorksSection.tsx`:

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function HowItWorksSection() {
  const t = useTranslations('howItWorks');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const steps = [
    {
      number: '01',
      title: locale === 'en' ? 'Capture' : '截图',
      description: locale === 'en' 
        ? 'User initiates screenshot through RealCap app or browser extension'
        : '用户通过RealCap应用或浏览器扩展发起截图',
    },
    {
      number: '02',
      title: locale === 'en' ? 'Process' : '处理',
      description: locale === 'en'
        ? 'Screenshot metadata is captured and encrypted at the moment of capture'
        : '截图元数据在截图瞬间被捕获并加密',
    },
    {
      number: '03',
      title: locale === 'en' ? 'Verify' : '验证',
      description: locale === 'en'
        ? 'Verification API confirms authenticity and provides tamper-proof proof'
        : '验证API确认真实性并提供防篡改证明',
    },
    {
      number: '04',
      title: locale === 'en' ? 'Share' : '分享',
      description: locale === 'en'
        ? 'Verified screenshot can be shared with confidence for any purpose'
        : '可信截图可安全分享用于任何用途',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'How RealCap Works' : 'RealCap工作原理'}
          </h2>
          <p className="text-lg text-gray-600">
            {locale === 'en' 
              ? 'Simple 4-step process ensures screenshot authenticity'
              : '简单4步确保截图真实性'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`${prefix}/docs/getting-started`} variant="button">
            {locale === 'en' ? 'Read Documentation' : '阅读文档'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update homepage to include HowItWorks**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { getHomeContent } from '@/lib/content/home';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
    </>
  );
}
```

- [ ] **Step 3: Commit HowItWorksSection**

```bash
git add src/components/home/HowItWorksSection.tsx src/app/[locale]/page.tsx
git commit -m "feat: add HowItWorksSection with 4-step verification process"
```

---

## Task 4: Create Target Industries Section

**Files:**
- Create: `src/components/home/TargetIndustriesSection.tsx`
- Create: `src/lib/content/industries.ts`

- [ ] **Step 1: Create industries data file**

Create `src/lib/content/industries.ts`:

```typescript
import { type Industry } from '@/types/content';

interface IndustryInfo {
  slug: Industry;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  icon: string;
}

export const industries: IndustryInfo[] = [
  {
    slug: 'lending',
    nameEn: 'Lending Platforms',
    nameZh: '网贷平台',
    descriptionEn: 'Verify borrower financial documents to prevent fraud and reduce default rates',
    descriptionZh: '验证借款人财务文件，防止欺诈并降低违约率',
    icon: '💰',
  },
  {
    slug: 'mcn',
    nameEn: 'MCN Agencies',
    nameZh: 'MCN机构',
    descriptionEn: 'Validate influencer income claims before signing contracts',
    descriptionZh: '签约前验证网红收入声明',
    icon: '📱',
  },
  {
    slug: 'matchmaking',
    nameEn: 'Dating Platforms',
    nameZh: '相亲平台',
    descriptionEn: 'Verify user identity and financial claims for safer dating',
    descriptionZh: '验证用户身份和财务声明，保障安全相亲',
    icon: '💕',
  },
  {
    slug: 'gaming',
    nameEn: 'Gaming Trading',
    nameZh: '游戏交易',
    descriptionEn: 'Verify in-game asset ownership and transaction screenshots',
    descriptionZh: '验证游戏资产所有权和交易截图',
    icon: '🎮',
  },
  {
    slug: 'rental',
    nameEn: 'Rental Agencies',
    nameZh: '租房中介',
    descriptionEn: 'Verify tenant financial documents and identity proofs',
    descriptionZh: '验证租户财务文件和身份证明',
    icon: '🏠',
  },
];

export function getIndustryInfo(slug: Industry, locale: string): IndustryInfo | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getIndustryName(slug: Industry, locale: string): string {
  const info = getIndustryInfo(slug, locale);
  return locale === 'en' ? info?.nameEn ?? '' : info?.nameZh ?? '';
}
```

- [ ] **Step 2: Create TargetIndustriesSection component**

Create `src/components/home/TargetIndustriesSection.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { industries } from '@/lib/content/industries';

export function TargetIndustriesSection() {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' 
              ? 'Industries We Serve' 
              : '服务行业'}
          </h2>
          <p className="text-lg text-gray-600">
            {locale === 'en'
              ? 'RealCap provides specialized screenshot verification for trust-sensitive industries'
              : 'RealCap为信任敏感行业提供专业截图验证服务'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`${prefix}/solutions/${industry.slug}`}
              className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              variant="muted"
            >
              <div className="text-3xl mb-4 text-center">{industry.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                {locale === 'en' ? industry.nameEn : industry.nameZh}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {locale === 'en' ? industry.descriptionEn : industry.descriptionZh}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {locale === 'en'
              ? 'Looking for a custom solution for your industry?'
              : '需要为您的行业定制解决方案？'}
          </p>
          <Link href={`${prefix}/contact`} variant="default">
            {locale === 'en' ? 'Contact Us' : '联系我们'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Update homepage with TargetIndustries**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { getHomeContent } from '@/lib/content/home';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <TargetIndustriesSection />
    </>
  );
}
```

- [ ] **Step 4: Commit TargetIndustriesSection**

```bash
git add src/components/home/TargetIndustriesSection.tsx src/lib/content/industries.ts src/app/[locale]/page.tsx
git commit -m "feat: add TargetIndustriesSection with 5 industry cards"
```

---

## Task 5: Create Core Features Section

**Files:**
- Create: `src/components/home/CoreFeaturesSection.tsx`

- [ ] **Step 1: Create CoreFeaturesSection component**

Create `src/components/home/CoreFeaturesSection.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function CoreFeaturesSection() {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const features = [
    {
      title: locale === 'en' ? 'Trusted Capture' : '可信截图',
      description: locale === 'en'
        ? 'Screenshot metadata is captured at the moment of capture, creating an immutable authenticity record'
        : '截图元数据在截图瞬间捕获，创建不可篡改的真实性记录',
      link: `${prefix}/docs/trusted-capture`,
      icon: '✓',
    },
    {
      title: locale === 'en' ? 'AI Detection' : 'AI检测',
      description: locale === 'en'
        ? 'Advanced algorithms detect AI-generated fake screenshots with 99.9% accuracy'
        : '先进算法以99.9%准确率检测AI生成的虚假截图',
      link: `${prefix}/docs/ai-detection`,
      icon: '🛡️',
    },
    {
      title: locale === 'en' ? 'Verification API' : '验证API',
      description: locale === 'en'
        ? 'RESTful API for instant verification, batch processing, and webhook callbacks'
        : 'RESTful API支持即时验证、批量处理和回调通知',
      link: `${prefix}/docs/api/verify`,
      icon: '🔍',
    },
    {
      title: locale === 'en' ? 'Cross-Platform' : '跨平台',
      description: locale === 'en'
        ? 'Available on Windows, macOS, browser extension, and mobile apps'
        : '支持Windows、macOS、浏览器扩展和移动应用',
      link: `${prefix}/docs/integration`,
      icon: '💻',
    },
  ];

  return (
    <section className="py-16 bg-blue-50">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Core Features' : '核心功能'}
          </h2>
          <p className="text-lg text-gray-600">
            {locale === 'en'
              ? 'RealCap provides enterprise-grade screenshot verification capabilities'
              : 'RealCap提供企业级截图验证能力'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <Link href={feature.link}>
                {locale === 'en' ? 'Learn More' : '了解更多'} →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update homepage with CoreFeatures**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { CoreFeaturesSection } from '@/components/home/CoreFeaturesSection';
import { getHomeContent } from '@/lib/content/home';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <TargetIndustriesSection />
      <CoreFeaturesSection />
    </>
  );
}
```

- [ ] **Step 3: Commit CoreFeaturesSection**

```bash
git add src/components/home/CoreFeaturesSection.tsx src/app/[locale]/page.tsx
git commit -m "feat: add CoreFeaturesSection with 4 feature cards"
```

---

## Task 6: Create Use Cases Section

**Files:**
- Create: `src/components/home/UseCasesSection.tsx`
- Modify: `content/en/home.mdx`
- Modify: `content/zh/home.mdx`

- [ ] **Step 1: Create UseCasesSection component**

Create `src/components/home/UseCasesSection.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

interface UseCase {
  title: string;
  description: string;
  articleSlug: string;
  category: string;
}

interface UseCasesSectionProps {
  useCases: UseCase[];
}

export function UseCasesSection({ useCases }: UseCasesSectionProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Real-World Use Cases' : '真实应用场景'}
          </h2>
          <p className="text-lg text-gray-600">
            {locale === 'en'
              ? 'Learn how organizations use RealCap to prevent fraud'
              : '了解组织如何使用RealCap防止欺诈'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <article key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {useCase.description}
              </p>
              <Link href={`${prefix}/blog/${useCase.category}/${useCase.articleSlug}`}>
                {locale === 'en' ? 'Read Case Study' : '阅读案例'} →
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`${prefix}/blog/cases`} variant="button">
            {locale === 'en' ? 'View All Cases' : '查看所有案例'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update home.mdx with use cases data**

Add to frontmatter in `content/en/home.mdx`:

```yaml
useCases:
  - title: "Lending Platform Risk Control"
    description: "How a leading lending platform reduced fraud losses by 85% using RealCap verification"
    articleSlug: "lending-platform-fraud-case"
    category: "cases"
  - title: "MCN Influencer Verification"
    description: "An MCN agency avoided $500K in fraudulent contract losses with RealCap"
    articleSlug: "mcn-signing-fraud-case"
    category: "cases"
  - title: "Dating Platform Trust System"
    description: "A dating platform implemented RealCap to verify user financial claims"
    articleSlug: "dating-platform-verification-case"
    category: "cases"
```

Add to frontmatter in `content/zh/home.mdx`:

```yaml
useCases:
  - title: "网贷平台风控实践"
    description: "某头部网贷平台使用RealCap验证降低85%欺诈损失"
    articleSlug: "lending-platform-fraud-case"
    category: "cases"
  - title: "MCN网红签约验证"
    description: "某MCN机构通过RealCap避免50万美元虚假签约损失"
    articleSlug: "mcn-signing-fraud-case"
    category: "cases"
  - title: "相亲平台信任体系"
    description: "某相亲平台使用RealCap验证用户财务声明"
    articleSlug: "dating-platform-verification-case"
    category: "cases"
```

- [ ] **Step 3: Update home content loader**

Modify `src/lib/content/home.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type Industry } from '@/types/content';

interface UseCase {
  title: string;
  description: string;
  articleSlug: string;
  category: string;
}

interface HomeContent {
  frontmatter: {
    title: string;
    description: string;
    problems: Array<{
      industry: Industry;
      title: string;
      description: string;
      stats: string;
    }>;
    useCases: UseCase[];
  };
}

export function getHomeContent(locale: string): HomeContent {
  const filePath = path.join(process.cwd(), 'content', locale, 'home.mdx');
  
  if (!fs.existsSync(filePath)) {
    return {
      frontmatter: {
        title: 'RealCap',
        description: 'Trusted screenshot tool',
        problems: [],
        useCases: [],
      },
    };
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);
  
  return {
    frontmatter: {
      title: data.title,
      description: data.description,
      problems: data.problems || [],
      useCases: data.useCases || [],
    },
  };
}
```

- [ ] **Step 4: Update homepage with UseCases**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { CoreFeaturesSection } from '@/components/home/CoreFeaturesSection';
import { UseCasesSection } from '@/components/home/UseCasesSection';
import { getHomeContent } from '@/lib/content/home';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <TargetIndustriesSection />
      <CoreFeaturesSection />
      <UseCasesSection useCases={homeContent.frontmatter.useCases} />
    </>
  );
}
```

- [ ] **Step 5: Commit UseCasesSection**

```bash
git add src/components/home/UseCasesSection.tsx src/lib/content/home.ts content/ src/app/[locale]/page.tsx
git commit -m "feat: add UseCasesSection with case study links"
```

---

## Task 7: Create Data/Case Section

**Files:**
- Create: `src/components/home/DataCaseSection.tsx`

- [ ] **Step 1: Create DataCaseSection component**

Create `src/components/home/DataCaseSection.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function DataCaseSection() {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const stats = [
    {
      value: '10,000+',
      label: locale === 'en' ? 'Active Users' : '活跃用户',
    },
    {
      value: '1M+',
      label: locale === 'en' ? 'Verifications' : '验证次数',
    },
    {
      value: '99.9%',
      label: locale === 'en' ? 'Detection Accuracy' : '检测准确率',
    },
    {
      value: '$50M+',
      label: locale === 'en' ? 'Fraud Prevented' : '防止欺诈金额',
    },
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'en' ? 'Real Impact, Real Results' : '真实影响，真实结果'}
          </h2>
          <p className="text-lg text-gray-400">
            {locale === 'en'
              ? 'RealCap is trusted by organizations worldwide to prevent screenshot fraud'
              : 'RealCap受到全球组织信赖，防止截图欺诈'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href={`${prefix}/blog/cases/lending-platform-fraud-case`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            {locale === 'en' ? 'Read Success Stories' : '阅读成功案例'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update homepage with DataCase**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { CoreFeaturesSection } from '@/components/home/CoreFeaturesSection';
import { UseCasesSection } from '@/components/home/UseCasesSection';
import { DataCaseSection } from '@/components/home/DataCaseSection';
import { getHomeContent } from '@/lib/content/home';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <TargetIndustriesSection />
      <CoreFeaturesSection />
      <UseCasesSection useCases={homeContent.frontmatter.useCases} />
      <DataCaseSection />
    </>
  );
}
```

- [ ] **Step 3: Commit DataCaseSection**

```bash
git add src/components/home/DataCaseSection.tsx src/app/[locale]/page.tsx
git commit -m "feat: add DataCaseSection with statistics and E-E-A-T signals"
```

---

## Task 8: Create FAQ Preview Section

**Files:**
- Create: `src/components/home/FAQPreviewSection.tsx`
- Create: `content/en/faq/index.mdx`
- Create: `content/zh/faq/index.mdx`

- [ ] **Step 1: Create FAQ content files**

Create `content/en/faq/index.mdx`:

```mdx
---
title: "Frequently Asked Questions"
description: "Common questions about RealCap screenshot verification"
questions:
  - question: "What is screenshot verification?"
    answer: "Screenshot verification confirms that a screenshot was captured authentically and has not been tampered with or generated by AI."
    slug: "screenshot-verification-basics"
  - question: "How does RealCap prevent AI forgery?"
    answer: "RealCap captures metadata at the moment of screenshot capture, creating an immutable record that proves authenticity and detects AI-generated fakes."
    slug: "screenshot-verification-basics"
  - question: "Can RealCap verify existing screenshots?"
    answer: "RealCap verifies screenshots captured through our app or API. Screenshots captured elsewhere cannot be verified retroactively."
    slug: "screenshot-verification-basics"
---

# Frequently Asked Questions

Find answers to common questions about RealCap screenshot verification.
```

Create `content/zh/faq/index.mdx`:

```mdx
---
title: "常见问题"
description: "关于RealCap截图验证的常见问题"
questions:
  - question: "什么是截图验证？"
    answer: "截图验证确认截图是真实拍摄的，未被篡改或由AI生成。"
    slug: "screenshot-verification-basics"
  - question: "RealCap如何防止AI伪造？"
    answer: "RealCap在截图瞬间捕获元数据，创建不可篡改的记录，证明真实性并检测AI生成的虚假截图。"
    slug: "screenshot-verification-basics"
  - question: "RealCap可以验证现有截图吗？"
    answer: "RealCap验证通过我们应用或API拍摄的截图。其他方式拍摄的截图无法事后验证。"
    slug: "screenshot-verification-basics"
---

# 常见问题

查找关于RealCap截图验证的常见问题答案。
```

- [ ] **Step 2: Create FAQ content loader**

Create `src/lib/content/faq.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface FAQQuestion {
  question: string;
  answer: string;
  slug: string;
}

interface FAQContent {
  frontmatter: {
    title: string;
    description: string;
    questions: FAQQuestion[];
  };
}

export function getFAQContent(locale: string): FAQContent {
  const filePath = path.join(process.cwd(), 'content', locale, 'faq', 'index.mdx');
  
  if (!fs.existsSync(filePath)) {
    return {
      frontmatter: {
        title: 'FAQ',
        description: 'Common questions',
        questions: [],
      },
    };
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);
  
  return {
    frontmatter: data as FAQContent['frontmatter'],
  };
}
```

- [ ] **Step 3: Create FAQPreviewSection component**

Create `src/components/home/FAQPreviewSection.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

interface FAQQuestion {
  question: string;
  answer: string;
  slug: string;
}

interface FAQPreviewSectionProps {
  questions: FAQQuestion[];
}

export function FAQPreviewSection({ questions }: FAQPreviewSectionProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Common Questions' : '常见问题'}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {questions.slice(0, 3).map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={`${prefix}/faq`} variant="button">
            {locale === 'en' ? 'View All FAQs' : '查看所有问题'}
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Update homepage with FAQPreview**

Modify `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { CoreFeaturesSection } from '@/components/home/CoreFeaturesSection';
import { UseCasesSection } from '@/components/home/UseCasesSection';
import { DataCaseSection } from '@/components/home/DataCaseSection';
import { FAQPreviewSection } from '@/components/home/FAQPreviewSection';
import { BottomCTASection } from '@/components/home/BottomCTASection';
import { getHomeContent } from '@/lib/content/home';
import { getFAQContent } from '@/lib/content/faq';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  const faqContent = getFAQContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <TargetIndustriesSection />
      <CoreFeaturesSection />
      <UseCasesSection useCases={homeContent.frontmatter.useCases} />
      <DataCaseSection />
      <FAQPreviewSection questions={faqContent.frontmatter.questions} />
    </>
  );
}
```

- [ ] **Step 5: Commit FAQPreviewSection**

```bash
git add src/components/home/FAQPreviewSection.tsx src/lib/content/faq.ts content/en/faq/ content/zh/faq/ src/app/[locale]/page.tsx
git commit -m "feat: add FAQPreviewSection with FAQ content structure"
```

---

## Task 9: Create Bottom CTA Section

**Files:**
- Create: `src/components/home/BottomCTASection.tsx`
- Modify: `messages/en.json`
- Modify: `messages/zh.json`

- [ ] **Step 1: Create BottomCTASection component**

Create `src/components/home/BottomCTASection.tsx`:

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function BottomCTASection() {
  const t = useTranslations('bottomCTA');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <Container size="md">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' 
              ? 'Start Preventing Screenshot Fraud Today'
              : '今天开始防止截图欺诈'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Join thousands of organizations using RealCap to verify screenshots and prevent AI forgery'
              : '加入数千家使用RealCap验证截图、防止AI伪造的组织'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary">
              {locale === 'en' ? 'Download Free' : '免费下载'}
            </Button>
            <Link href={`${prefix}/pricing`} variant="button" className="bg-gray-200 text-gray-900 hover:bg-gray-300">
              {locale === 'en' ? 'View Pricing' : '查看价格'}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update homepage with complete sections**

Final `src/app/[locale]/page.tsx`:

```typescript
import { unstable_setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { CoreFeaturesSection } from '@/components/home/CoreFeaturesSection';
import { UseCasesSection } from '@/components/home/UseCasesSection';
import { DataCaseSection } from '@/components/home/DataCaseSection';
import { FAQPreviewSection } from '@/components/home/FAQPreviewSection';
import { BottomCTASection } from '@/components/home/BottomCTASection';
import { getHomeContent } from '@/lib/content/home';
import { getFAQContent } from '@/lib/content/faq';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  
  const homeContent = getHomeContent(locale);
  const faqContent = getFAQContent(locale);
  
  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <TargetIndustriesSection />
      <CoreFeaturesSection />
      <UseCasesSection useCases={homeContent.frontmatter.useCases} />
      <DataCaseSection />
      <FAQPreviewSection questions={faqContent.frontmatter.questions} />
      <BottomCTASection />
    </>
  );
}
```

- [ ] **Step 3: Commit BottomCTASection**

```bash
git add src/components/home/BottomCTASection.tsx src/app/[locale]/page.tsx messages/
git commit -m "feat: add BottomCTASection completing homepage 9-section structure"
```

---

## Task 10: Add SEO Schema Markups

**Files:**
- Create: `src/components/seo/OrganizationSchema.tsx`
- Create: `src/components/seo/WebSiteSchema.tsx`
- Create: `src/components/seo/SoftwareApplicationSchema.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create OrganizationSchema component**

Create `src/components/seo/OrganizationSchema.tsx`:

```typescript
interface OrganizationSchemaProps {
  locale: string;
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RealCap',
    url: 'https://realcap.app',
    logo: 'https://realcap.app/assets/images/logo.png',
    sameAs: [
      'https://twitter.com/wen_nkang',
      'https://github.com/wk240/realcap',
    ],
    description: locale === 'en'
      ? 'Trusted screenshot tool that prevents AI forgery and enables verification'
      : '可信截图工具，防止AI伪造并支持验证',
    contactInfo: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@realcap.app',
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

- [ ] **Step 2: Create WebSiteSchema component**

Create `src/components/seo/WebSiteSchema.tsx`:

```typescript
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RealCap',
    url: 'https://realcap.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://realcap.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
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

- [ ] **Step 3: Create SoftwareApplicationSchema (NO aggregateRating)**

Create `src/components/seo/SoftwareApplicationSchema.tsx`:

```typescript
interface SoftwareApplicationSchemaProps {
  locale: string;
}

export function SoftwareApplicationSchema({ locale }: SoftwareApplicationSchemaProps) {
  // NOTE: No aggregateRating - removed fake reviews per SEO audit
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RealCap',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows, macOS, Web',
    description: locale === 'en'
      ? 'Trusted screenshot tool that prevents AI forgery and enables verification'
      : '可信截图工具，防止AI伪造并支持验证',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'RealCap',
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

- [ ] **Step 4: Update layout to include schemas**

Modify `src/app/[locale]/layout.tsx`, add before return:

```typescript
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { WebSiteSchema } from '@/components/seo/WebSiteSchema';
import { SoftwareApplicationSchema } from '@/components/seo/SoftwareApplicationSchema';

// Inside return statement, add to <head>:
<head>
  <meta name="description" content={t('description')} />
  <OrganizationSchema locale={locale} />
  <WebSiteSchema />
  <SoftwareApplicationSchema locale={locale} />
</head>
```

- [ ] **Step 5: Commit SEO schemas**

```bash
git add src/components/seo/ src/app/[locale]/layout.tsx
git commit -m "feat: add SEO schema markups (Organization, WebSite, SoftwareApplication)"
```

---

## Task 11: Final Build and Verification

- [ ] **Step 1: Run full build**

Run: `npm run build`

Expected: Build succeeds with all 9 homepage sections

- [ ] **Step 2: Verify schema in output**

Run: `grep -A20 "@type.*Organization" out/index.html`

Expected: Organization schema present, no aggregateRating

- [ ] **Step 3: Count internal links in homepage**

Run: `grep -c "href=" out/index.html`

Expected: ≥15 internal links present

- [ ] **Step 4: Verify hreflang for both locales**

Run: `grep "hreflang" out/index.html && grep "hreflang" out/zh/index.html`

Expected: Both files contain hreflang for en, zh, x-default

- [ ] **Step 5: Test in browser**

Run: `npx serve out`

Expected: Homepage displays with all 9 sections, language switch works

- [ ] **Step 6: Create Phase 2 completion commit**

```bash
git add -A
git commit -m "feat: complete Phase 2 - Homepage with 9 sections, SEO schemas, ≥15 internal links"
```

---

## Verification Checklist

- [ ] HeroSection with localized title/CTA
- [ ] TrustProblemSection with 3 industry problems
- [ ] HowItWorksSection with 4-step process
- [ ] TargetIndustriesSection with 5 industry cards
- [ ] CoreFeaturesSection with 4 feature cards
- [ ] UseCasesSection with 3 case links
- [ ] DataCaseSection with statistics
- [ ] FAQPreviewSection with 3 questions
- [ ] BottomCTASection with dual CTAs
- [ ] SEO schemas (Organization, WebSite, SoftwareApplication)
- [ ] No fake aggregateRating in schema
- [ ] hreflang tags for both locales
- [ ] ≥15 internal links on homepage
- [ ] Build succeeds