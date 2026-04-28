# RealCap Next.js迁移设计规范

> 创建日期：2026-04-28
> 目标：将RealCap从静态HTML迁移至Next.js，实现SEO执行计划的50+页面架构

---

## 一、技术架构

### 1.1 技术栈选择

| 组件 | 选择 | 理由 |
|------|------|------|
| **框架** | Next.js 14+ | SSG静态导出支持，SEO友好，React生态 |
| **国际化** | next-intl 3+ | 自动hreflang、语言切换器、静态导出兼容 |
| **样式** | Tailwind CSS 3+ | 开发效率高，与Next.js集成良好 |
| **内容** | MDX + gray-matter | Git版本管理，frontmatter元数据支持 |
| **部署** | GitHub Pages | 免费托管，`output: 'export'`静态导出 |
| **SEO工具** | next-sitemap | 自动生成sitemap.xml、robots.txt |

### 1.2 部署模式

```javascript
// next.config.js
const withNextIntl = require('next-intl/plugin')();
const withMDX = require('@next/mdx')();

module.exports = withNextIntl(withMDX({
  output: 'export',
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}));
```

**静态导出约束**：
- 无SSR/ISR动态功能
- 所有页面预渲染为静态HTML
- 图片需`unoptimized: true`
- API路由不可用（纯前端站点）

### 1.3 多语言架构

**URL结构**：
```
/                    → 英文首页
/zh                  → 中文首页
/blog/fraud-detection/detect-bank-balance-fraud  → 英文文章
/zh/blog/fraud-detection/detect-bank-balance-fraud  → 中文文章
/solutions/lending   → 英文方案页
/zh/solutions/lending → 中文方案页
```

**hreflang自动生成**：
```html
<link rel="alternate" hreflang="en" href="https://realcap.app/blog/fraud-detection/..." />
<link rel="alternate" hreflang="zh" href="https://realcap.app/zh/blog/fraud-detection/..." />
<link rel="alternate" hreflang="x-default" href="https://realcap.app/blog/fraud-detection/..." />
```

---

## 二、项目结构

### 2.1 目录结构

```
realcap/
├── content/                    # MDX内容文件
│   ├── en/
│   │   ├── blog/
│   │   │   ├── fraud-detection/
│   │   │   │   ├── detect-bank-balance-fraud.mdx
│   │   │   │   ├── detect-alipay-balance-fraud.mdx
│   │   │   │   └── ...
│   │   │   ├── cases/
│   │   │   │   ├── lending-platform-fraud-case.mdx
│   │   │   │   ├── mcn-signing-fraud-case.mdx
│   │   │   │   └── ...
│   │   │   ├── tutorials/
│   │   │   │   ├── realcap-tutorial.mdx
│   │   │   │   ├── api-integration-guide.mdx
│   │   │   │   └── ...
│   │   │   ├── reports/
│   │   │   │   ├── 2026-lending-risk-control-report.mdx
│   │   │   │   └── screenshot-verification-whitepaper.mdx
│   │   │   └── index.mdx          # 博客索引页内容
│   │   ├── solutions/
│   │   │   ├── lending.mdx
│   │   │   ├── mcn.mdx
│   │   │   ├── matchmaking.mdx
│   │   │   ├── gaming.mdx
│   │   │   ├── rental.mdx
│   │   │   └── index.mdx          # Solution索引页内容
│   │   ├── docs/
│   │   │   ├── getting-started.mdx
│   │   │   ├── api/
│   │   │   │   ├── verify.mdx
│   │   │   │   ├── batch-verify.mdx
│   │   │   │   └── callback.mdx
│   │   │   ├── integration/
│   │   │   │   ├── web.mdx
│   │   │   │   ├── mobile.mdx
│   │   │   │   └── server.mdx
│   │   │   └── index.mdx
│   │   ├── resources/
│   │   │   ├── whitepaper-download.mdx
│   │   │   ├── reports.mdx
│   │   │   ├── fraud-detection-checklist.mdx
│   │   │   ├── case-studies.mdx
│   │   │   └── index.mdx
│   │   ├── pricing/
│   │   │   └── index.mdx
│   │   ├── faq/
│   │   │   ├── screenshot-verification-basics.mdx
│   │   │   ├── integration-questions.mdx
│   │   │   ├── pricing-questions.mdx
│   │   │   └── index.mdx
│   │   ├── compare/
│   │   │   ├── background-check-services.mdx
│   │   │   ├── risk-control-platforms.mdx
│   │   │   ├── manual-vs-automated.mdx
│   │   │   └── index.mdx
│   │   ├── about/
│   │   │   └── index.mdx
│   │   ├── privacy/
│   │   │   └─ index.mdx
│   │   ├── terms/
│   │   │   └─ index.mdx
│   │   └── home.mdx               # 首页内容
│   └── zh/                        # 中文内容（同结构）
│       ├── blog/
│       ├── solutions/
│       ├── docs/
│       ├── ...
│       └── home.mdx
│
├── src/
│   ├── app/
│   │   ├── [locale]/              # next-intl动态路由
│   │   │   ├── layout.tsx         # 语言layout
│   │   │   ├── page.tsx           # 首页
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx       # 博客索引页
│   │   │   │   ├── [category]/
│   │   │   │   │   ├── page.tsx   # 博客分类页
│   │   │   │   │   └ [slug]/
│   │   │   │   │       └── page.tsx # 博客文章页
│   │   │   ├── solutions/
│   │   │   │   ├── page.tsx       # Solution索引页
│   │   │   │   ├── [industry]/
│   │   │   │   │   └── page.tsx   # 行业方案页
│   │   │   ├── docs/
│   │   │   │   ├── page.tsx       # 文档索引页
│   │   │   │   ├── [section]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └ [page]/
│   │   │   │   │       └── page.tsx
│   │   │   ├── resources/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [type]/
│   │   │   │   │   └── page.tsx
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [topic]/
│   │   │   │   │   └── page.tsx
│   │   │   ├── compare/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [topic]/
│   │   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   └── terms/
│   │   │       └── page.tsx
│   │   ├── layout.tsx             # 根layout
│   │   ├── not-found.tsx          # 404页
│   │   └── sitemap.ts             # 动态sitemap生成
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── seo/
│   │   │   ├── JsonLd.tsx         # Schema标记组件
│   │   │   ├── ArticleSchema.tsx
│   │   │   ├── ProductSchema.tsx
│   │   │   ├── BreadcrumbSchema.tsx
│   │   │   ├── FAQSchema.tsx
│   │   │   └── OrganizationSchema.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustProblemSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── TargetIndustriesSection.tsx
│   │   │   ├── CoreFeaturesSection.tsx
│   │   │   ├── UseCasesSection.tsx
│   │   │   ├── DataCaseSection.tsx
│   │   │   ├── FAQPreviewSection.tsx
│   │   │   └── BottomCTASection.tsx
│   │   ├── blog/
│   │   │   ├── ArticleLayout.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── RelatedArticles.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── CategoryNav.tsx
│   │   │   ├── BlogSidebar.tsx
│   │   │   └── AuthorCard.tsx
│   │   ├── solution/
│   │   │   ├── SolutionHero.tsx
│   │   │   ├── PainPointsSection.tsx
│   │   │   ├── SolutionIntro.tsx
│   │   │   ├── FeatureDetails.tsx
│   │   │   ├── CaseStudySection.tsx
│   │   │   ├── RelatedArticles.tsx
│   │   │   ├── IntegrationSection.tsx
│   │   │   ├── PricingInfo.tsx
│   │   │   └── SolutionFAQ.tsx
│   │   ├── docs/
│   │   │   ├── DocsLayout.tsx
│   │   │   ├── DocsSidebar.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── APITable.tsx
│   │   │   ├── DocsNav.tsx
│   │   │   └── FeedbackButton.tsx
│   │   ├── resources/
│   │   │   ├── ResourceCard.tsx
│   │   │   ├── DownloadForm.tsx
│   │   │   └── CaseStudyCard.tsx
│   │   ├── pricing/
│   │   │   ├── PricingCard.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   ├── APIDetails.tsx
│   │   │   └── PricingFAQ.tsx
│   │   ├── faq/
│   │   │   ├── FAQCategory.tsx
│   │   │   ├── FAQItem.tsx
│   │   │   └── FAQSearch.tsx
│   │   ├── compare/
│   │   │   ├── CompareTable.tsx
│   │   │   ├── CompareHero.tsx
│   │   │   └── CompareCard.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── SearchBox.tsx
│   │   │   ├── CTAButton.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Grid.tsx
│   │   │   ├── Link.tsx
│   │   │   └── Image.tsx
│   │   └── mdx/
│   │   │   ├── MDXLayout.tsx
│   │   │   ├── CustomComponents.tsx
│   │   │   └── Heading.tsx
│   │
│   ├── lib/
│   │   ├── mdx/
│   │   │   ├── getMdxContent.ts    # 获取MDX内容
│   │   │   ├── parseFrontmatter.ts # 解析frontmatter
│   │   │   ├── generateStaticParams.ts # 静态参数生成
│   │   │   └── mdxComponents.tsx   # MDX组件映射
│   │   ├── seo/
│   │   │   ├── metadata.ts        # 页面metadata生成
│   │   │   ├── sitemap.ts         # sitemap生成
│   │   │   └── hreflang.ts        # hreflang生成
│   │   ├── content/
│   │   │   ├── blog.ts            # 博客内容查询
│   │   │   ├── solutions.ts       # 方案内容查询
│   │   │   ├── docs.ts            # 文档内容查询
│   │   │   ├── resources.ts       # 资源内容查询
│   │   │   ├── faq.ts             # FAQ内容查询
│   │   │   ├── compare.ts         # 对比内容查询
│   │   │   └── navigation.ts      # 导航数据
│   │   ├── i18n/
│   │   │   ├── config.ts          # 国际化配置
│   │   │   ├── dictionaries.ts    # 翻译字典
│   │   │   └── routing.ts         # 路由配置
│   │   └── utils/
│   │   │   ├── formatDate.ts
│   │   │   ├── slugify.ts
│   │   │   ├── readingTime.ts
│   │   │   └── cn.ts              # className合并
│   │
│   ├── styles/
│   │   └── globals.css            # Tailwind入口
│   │
│   └── types/
│       ├── content.ts             # 内容类型定义
│       ├── navigation.ts          # 导航类型
│       ├── seo.ts                 # SEO类型
│       └── i18n.ts                # 国际化类型
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── og-image.png
│   │   ├── industries/
│   │   │   ├── lending.svg
│   │   │   ├── mcn.svg
│   │   │   ├── matchmaking.svg
│   │   │   ├── gaming.svg
│   │   │   └── rental.svg
│   │   ├── features/
│   │   │   ├── trusted-capture.png
│   │   │   ├── ai-detection.png
│   │   │   ├── verification-api.png
│   │   │   └── cross-platform.png
│   │   ├── blog/
│   │   │   └── ...
│   │   └── cases/
│   │   │   └── ...
│   ├── fonts/
│   │   └── ...
│   └── favicon.ico
│
├── messages/                      # next-intl翻译文件
│   ├── en.json
│   ├── zh.json
│
├── i18n.config.ts                 # next-intl配置
├── middleware.ts                  # 语言路由中间件
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── docs/                          # 原静态HTML（迁移后删除）
│   ├── index.html
│   ├── zh/index.html
│   ├── assets/
│   └── ...
│
└── .github/
    └── workflows/
        └── deploy.yml             # GitHub Actions部署配置
```

### 2.2 MDX Frontmatter规范

**博客文章**：
```yaml
---
title: "银行余额截图造假：5种常见手法及检测方法"
description: "深入分析银行余额截图造假的5种常见手法，提供专业检测方法和预防建议。"
category: "fraud-detection"
industry: ["lending"]
keywords: ["银行余额截图造假", "截图验证", "网贷风控"]
author: "RealCap Team"
publishDate: "2026-04-28"
lastModified: "2026-04-28"
readingTime: 8
featured: true
image: "/images/blog/detect-bank-balance-fraud.png"
tags: ["网贷风控", "截图造假检测", "银行流水验证"]
relatedArticles:
  - "detect-alipay-balance-fraud"
  - "lending-platform-fraud-case"
  - "lending-risk-control-tech"
cta:
  text: "了解网贷平台截图验证方案"
  link: "/solutions/lending"
---
```

**Solution页**：
```yaml
---
title: "网贷平台截图验证方案"
description: "RealCap为网贷平台提供专业截图验证方案，有效识别余额截图造假，降低坏账风险。"
industry: "lending"
keywords: ["网贷截图验证", "余额造假检测", "网贷风控"]
targetAudience: "网贷平台风控部门"
painPoints:
  - "借款人伪造余额截图骗取贷款"
  - "收入证明造假难以识别"
  - "AI生成截图越来越逼真"
features:
  - "银行流水验证"
  - "支付宝余额验证"
  - "收入证明真实性检测"
  - "批量验证API"
caseStudy: "lending-platform-case"
relatedArticles:
  - "detect-bank-balance-fraud"
  - "detect-alipay-balance-fraud"
  - "lending-platform-fraud-case"
  - "lending-risk-control-tech"
pricingLink: "/pricing"
apiDocsLink: "/docs/api/verify"
---
```

**文档页**：
```yaml
---
title: "验证接口"
description: "RealCap验证接口API文档，包含请求参数、响应格式、示例代码。"
section: "api"
category: "api-reference"
keywords: ["验证接口", "截图验证API", "RealCap API"]
order: 1
prevPage: "getting-started"
nextPage: "batch-verify"
codeExamples:
  - language: "javascript"
  - language: "python"
  - language: "java"
---
```

---

## 三、页面设计详述

### 3.1 首页

**URL**：`/`（英文）、`/zh`（中文）

**目标字数**：2000+字

**内链数量**：≥15条

**区块结构**：

| 区块 | 组件 | 内容来源 | SEO目标 | 内链 |
|------|------|----------|---------|------|
| 1. Hero | `HeroSection.tsx` | `messages/{lang}.json` | 核心关键词 | 1个CTA |
| 2. 信任问题 | `TrustProblemSection.tsx` | `content/{lang}/home.mdx` + 数据引用 | 痛点关键词 | 3个Solution链接 |
| 3. 工作原理 | `HowItWorksSection.tsx` | 组件内置 | 技术可信度 | 1个Docs链接 |
| 4. 目标行业 | `TargetIndustriesSection.tsx` | `navigation.ts` 行业列表 | 行业关键词 | 5个Solution链接 |
| 5. 核心功能 | `CoreFeaturesSection.tsx` | 组件内置 | 产品关键词 | 4个功能详情链接 |
| 6. 使用场景 | `UseCasesSection.tsx` | `content/{lang}/home.mdx` | 场景关键词 | 3个博客链接 |
| 7. 数据/案例 | `DataCaseSection.tsx` | 组件内置 + 数据 | E-E-A-T信号 | 1个案例链接 |
| 8. FAQ预览 | `FAQPreviewSection.tsx` | `content/{lang}/faq/index.mdx` | 问题关键词 | 3个FAQ链接 |
| 9. 底部CTA | `BottomCTASection.tsx` | `messages/{lang}.json` | 转化 | 2个CTA |

**Schema标记**：
- Organization
- WebSite（含SearchAction，如果搜索功能实现）
- SoftwareApplication（移除虚假aggregateRating）

### 3.2 博客系统

**博客索引页**：`/[locale]/blog`

**博客分类页**：`/[locale]/blog/[category]`

**博客文章页**：`/[locale]/blog/[category]/[slug]`

**分类定义**：
| 分类slug | 英文名称 | 中文名称 | 文章数量目标 |
|----------|----------|----------|--------------|
| `fraud-detection` | Screenshot Fraud Detection | 截图造假检测 | 12篇 |
| `cases` | Industry Cases | 行业案例 | 8篇 |
| `tutorials` | Technical Tutorials | 技术教程 | 6篇 |
| `reports` | Industry Reports | 行业报告 | 4篇 |

**文章页组件**：
- `Breadcrumb`：首页 > Blog > [分类] > [文章]
- `TableOfContents`：右侧目录（固定）
- `ArticleSchema`：Article JSON-LD
- `BlogSidebar`：分类导航、热门文章、资源CTA
- `RelatedArticles`：底部相关文章推荐（3篇）
- `AuthorCard`：作者信息卡片

**SEO要求**：
- 字数≥1500字（痛点类）、≥2000字（解决方案类）、≥3000字（报告类）
- 内链5-8条
- 关键词密度2-5%
- 文内至少1个真实数据/案例引用
- 每篇包含CTA（"了解方案"、"下载报告"）

### 3.3 Solution页

**Solution索引页**：`/[locale]/solutions`

**行业方案页**：`/[locale]/solutions/[industry]`

**行业定义**：
| 行业slug | 英文名称 | 中文名称 | 目标博客文章 |
|----------|----------|----------|--------------|
| `lending` | Lending Platform | 网贷平台 | 4篇 |
| `mcn` | MCN Agency | MCN机构 | 4篇 |
| `matchmaking` | Matchmaking Platform | 相亲平台 | 2篇 |
| `gaming` | Gaming Trade | 游戏交易 | 3篇 |
| `rental` | Rental Agency | 租房中介 | 2篇 |

**Solution页组件**：
- `Breadcrumb`：首页 > Solutions > [行业]
- `SolutionHero`：标题 + 统计数据 + CTA
- `PainPointsSection`：行业痛点分析（数据驱动）
- `SolutionIntro`：工作原理 + 集成方式
- `FeatureDetails`：功能与需求对应
- `CaseStudySection`：客户案例
- `RelatedArticles`：Spoke链接（4篇博客 + 1报告）
- `IntegrationSection`：技术集成指南
- `PricingInfo`：定价信息
- `SolutionFAQ`：行业FAQ
- `BottomCTA`：转化CTA

**Hub-and-Spoke内链要求**：
- 每个Solution页内链≥10条
- 链接到4-5篇相关博客文章
- 链接到1个客户案例
- 链接到1个行业报告
- 链接到API文档
- 链接到Pricing页
- 链接到其他相关Solution页

**Schema标记**：
- BreadcrumbList
- Product（方案作为产品）
- FAQPage（如果包含FAQ区块）

### 3.4 Docs页

**Docs索引页**：`/[locale]/docs`

**文档页**：`/[locale]/docs/[section]/[page]`

**章节定义**：
| 章节 | slug | 页面 |
|------|------|------|
| 快速开始 | `getting-started` | 安装、配置、首次调用 |
| API参考 | `api` | verify、batch-verify、callback |
| 集成指南 | `integration` | web、mobile、server |

**Docs页组件**：
- `DocsLayout`：三栏布局（侧边栏 + 内容 + 目录）
- `DocsSidebar`：左侧固定导航
- `CodeBlock`：多语言代码示例（支持语法高亮）
- `APITable`：参数表格
- `DocsNav`：上一篇/下一篇导航
- `FeedbackButton`：文档反馈

### 3.5 Resources页

**Resources索引页**：`/[locale]/resources`

**资源类型**：
| 类型 | slug | 内容 |
|------|------|------|
| 白皮书 | `whitepaper-download` | 截图验证白皮书PDF |
| 行业报告 | `reports` | 网贷风控报告等 |
| 检测清单 | `fraud-detection-checklist` | 自查清单PDF |
| 客户案例 | `case-studies` | 客户成功案例集 |

**转化策略**：
- 下载资源需邮箱（Leads获取）
- 资源页链接到Pricing、Solution

### 3.6 Pricing页

**URL**：`/[locale]/pricing`

**定价层级**：
| 层级 | 名称 | 特点 | CTA |
|------|------|------|-----|
| 基础版 | Basic | 按量付费，基础API | 开始试用 |
| 专业版 | Pro | 月度套餐，高级API，专属客服 | 开始试用 |
| 企业版 | Enterprise | 私有部署，无限验证，定制报价 | 联系销售 |

**定价页组件**：
- `PricingCard`：定价卡片（3列）
- `PricingTable`：功能对比表格
- `APIDetails`：API定价详情
- `PricingFAQ`：定价常见问题

### 3.7 FAQ页

**FAQ索引页**：`/[locale]/faq`

**FAQ分类**：
| 分类 | slug | 问题数量 |
|------|------|----------|
| 截图验证基础 | `screenshot-verification-basics` | 5-8个 |
| 集成问题 | `integration-questions` | 5-8个 |
| 定价问题 | `pricing-questions` | 4-6个 |
| 安全与隐私 | `security-privacy` | 4-6个 |

**FAQ页组件**：
- `FAQSearch`：问题搜索框
- `FAQCategory`：分类折叠
- `FAQItem`：问答项
- `FAQSchema`：FAQPage JSON-LD

### 3.8 Compare页

**Compare索引页**：`/[locale]/compare`

**对比页面**：
| 页面 | slug | 对比内容 |
|------|------|----------|
| vs背调公司 | `background-check-services` | RealCap与传统背调对比 |
| vs风控平台 | `risk-control-platforms` | RealCap与综合风控平台对比 |
| 人工vs自动 | `manual-vs-automated` | 人工审核与自动化验证对比 |

**Compare页组件**：
- `CompareHero`：对比主题介绍
- `CompareTable`：对比表格（功能、定价、效率等）
- `CompareCard`：竞品卡片

### 3.9 About页

**URL**：`/[locale]/about`

**内容结构**：
- 公司介绍 + 使命愿景
- 技术团队介绍
- 联系方式（邮箱、社交媒体链接）

**Schema标记**：
- Organization（详细版）

### 3.10 Legal页

**隐私政策**：`/[locale]/privacy`

**服务条款**：`/[locale]/terms`

**特点**：
- 标准法律文本
- 简洁排版
- 多语言版本

---

## 四、SEO集成方案

### 4.1 自动生成SEO元素

**Metadata自动生成**（`lib/seo/metadata.ts`）：
```typescript
interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    image: string;
    type: 'website' | 'article';
  };
  hreflang?: {
    en: string;
    zh: string;
    xDefault: string;
  };
}

export function generateMetadata(data: PageMetadata, locale: string): Metadata {
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: data.canonical,
      languages: {
        en: data.hreflang?.en,
        zh: data.hreflang?.zh,
        'x-default': data.hreflang?.xDefault,
      },
    },
    openGraph: data.openGraph,
  };
}
```

### 4.2 Schema标记库

**文章页Schema**（`ArticleSchema.tsx`）：
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[文章标题]",
  "description": "[文章描述]",
  "author": {
    "@type": "Organization",
    "name": "RealCap"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RealCap",
    "url": "https://realcap.app"
  },
  "datePublished": "[发布日期]",
  "dateModified": "[修改日期]",
  "image": "[文章图片]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[文章URL]"
  }
}
```

**Solution页Schema**（`ProductSchema.tsx`）：
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[行业]截图验证方案",
  "description": "[方案描述]",
  "brand": {
    "@type": "Brand",
    "name": "RealCap"
  },
  "category": "Screenshot Verification",
  "offers": {
    "@type": "Offer",
    "url": "[方案页URL]",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "CNY"
    }
  }
}
```

### 4.3 Sitemap生成

**动态sitemap**（`app/sitemap.ts`）：
```typescript
import { getBlogArticles } from '@/lib/content/blog';
import { getSolutions } from '@/lib/content/solutions';
import { getDocsPages } from '@/lib/content/docs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://realcap.app';
  const locales = ['en', 'zh'];
  
  const pages: MetadataRoute.Sitemap = [];
  
  // 首页
  locales.forEach(locale => {
    pages.push({
      url: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  });
  
  // 博客文章
  const articles = await getBlogArticles();
  articles.forEach(article => {
    locales.forEach(locale => {
      pages.push({
        url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/blog/${article.category}/${article.slug}`,
        lastModified: article.lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });
  
  // Solution页
  const solutions = await getSolutions();
  solutions.forEach(solution => {
    locales.forEach(locale => {
      pages.push({
        url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/solutions/${solution.industry}`,
        lastModified: solution.lastModified,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });
  
  // ... 其他页面
  
  return pages;
}
```

### 4.4 内链自动化

**内链策略实现**（`lib/content/navigation.ts`）：
```typescript
interface InternalLink {
  text: string;
  href: string;
  category?: string;
}

// 博客文章自动获取相关链接
export function getRelatedLinks(article: Article): InternalLink[] {
  const links: InternalLink[] = [];
  
  // 1. 对应Solution页链接
  article.industry.forEach(ind => {
    links.push({
      text: `了解${getIndustryName(ind)}截图验证方案`,
      href: `/solutions/${ind}`,
    });
  });
  
  // 2. 相关文章链接
  article.relatedArticles.forEach(slug => {
    const related = getArticleBySlug(slug);
    if (related) {
      links.push({
        text: related.title,
        href: `/blog/${related.category}/${slug}`,
        category: related.category,
      });
    }
  });
  
  // 3. 资源下载链接
  links.push({
    text: '下载截图验证白皮书',
    href: '/resources/whitepaper-download',
  });
  
  return links;
}
```

---

## 五、迁移计划

### 5.1 迁移阶段

**Phase 1：项目搭建**（第1周）
- 初始化Next.js项目
- 配置next-intl、Tailwind、MDX
- 创建基础目录结构
- 配置静态导出、GitHub Actions部署

**Phase 2：首页重构**（第2周）
- 创建首页9个区块组件
- 编写首页MDX内容（英文+中文）
- 实现SEO schema标记
- 测试静态导出

**Phase 3：核心页面**（第3-4周）
- 博客系统（索引页、分类页、文章页）
- Solution页（索引页、5个行业页）
- Docs框架（索引页、API文档）
- 资源页、定价页

**Phase 4：SEO修复**（第5-6周）
- 移除虚假aggregateRating schema
- 实现FAQ页、Compare页
- 创建隐私政策、服务条款页
- 修复首页失效链接
- 发布首批4篇博客文章（按SEO计划）
- 更新sitemap.xml

**Phase 5：内容填充**（后续）
- 持续产出博客文章（4篇/月）
- 完善Solution页内容
- 补充Docs文档
- 发布行业报告

### 5.2 迁移优先级

**P1-严重问题（立即修复）**：
1. 移除虚假aggregateRating schema
2. 创建隐私政策、服务条款页（Footer链接失效）
3. 创建FAQ页（Footer链接失效）
4. 修复首页Blog Preview区块失效链接（创建占位文章）

**P2-高影响（第2周完成）**：
1. 首页重构（增加内容深度至2000+字）
2. 创建博客索引页和分类页结构
3. 创建Solution索引页和5个行业页骨架

**P3-中影响（第3-4周完成）**：
1. Docs框架
2. Resources页
3. Pricing页
4. Compare页

### 5.3 迁移后删除

迁移完成后删除以下文件：
```
docs/
├── index.html        → 迁移到 content/en/home.mdx
├── zh/index.html     → 迁移到 content/zh/home.mdx
├── robots.txt        → next-sitemap自动生成
├── sitemap.xml       → app/sitemap.ts自动生成
├── assets/css/       → Tailwind CSS替代
├── assets/js/        → Next.js组件替代
├── CNAME             → GitHub Pages配置保留
├── 404.html          → app/not-found.tsx替代
└── LICENSE           → 保留（项目根目录）
```

---

## 六、内容生产规范

### 6.1 内容工作流

```
选题确认 → SEO审核（关键词匹配度）
    ↓
初稿撰写 → 编辑（遵循写作规范）
    ↓
SEO优化 → SEO专员（关键词密度、内链、schema）
    ↓
技术审核 → 编辑（质量标准、AI检测）
    ↓
发布上线 → 技术（MDX生成、sitemap更新）
    ↓
效果追踪 → SEO专员（收录、排名、流量）
```

### 6.2 内容质量清单

**博客文章发布前检查**：
- [ ] 字数达标（痛点类≥1500，解决方案≥2000，报告≥3000）
- [ ] 标题层级清晰（H2/H3）
- [ ] 关键词密度2-5%
- [ ] 内链5-8条
- [ ] 包含至少1个真实数据/案例引用
- [ ] 包含CTA（"了解方案"或"下载报告")
- [ ] frontmatter完整（title、description、keywords、author、date）
- [ ] 图片有alt文本
- [ ] Article schema标记完整

**Solution页发布前检查**：
- [ ] 字数≥2000
- [ ] 内链≥10条
- [ ] Hub-and-Spoke集群链接完整（4-5篇博客 + 1案例 + 1报告）
- [ ] 包含行业痛点数据
- [ ] 包含客户案例
- [ ] 包含CTA（"开始试用"或"联系销售")
- [ ] Product schema标记完整
- [ ] FAQ区块（如有）

### 6.3 AI内容政策

**允许**：
- 大纲生成、关键词研究、标题优化建议
- AI生成内容比例不超过30%

**限制**：
- 正文内容需人工编辑
- 事实核查必须人工完成
- 观点提炼、案例补充必须人工

**禁止**：
- 完全AI生成内容直接发布

---

## 七、技术实现细节

### 7.1 next-intl配置

**i18n.config.ts**：
```typescript
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};

export const localePaths: Record<Locale, string> = {
  en: '',
  zh: 'zh',
};
```

**middleware.ts**：
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: {
    mode: 'prefix',
    prefixes: {
      en: '',
      zh: 'zh',
    },
  },
});

export const config = {
  matcher: ['/', '/(zh|en)/:path*'],
};
```

### 7.2 静态参数生成

**博客文章页**（`app/[locale]/blog/[category]/[slug]/page.tsx`）：
```typescript
import { getBlogArticles } from '@/lib/content/blog';

export async function generateStaticParams() {
  const articles = await getBlogArticles();
  const locales = ['en', 'zh'];
  
  return articles.flatMap(article => 
    locales.map(locale => ({
      locale,
      category: article.category,
      slug: article.slug,
    }))
  );
}
```

### 7.3 GitHub Actions部署

**`.github/workflows/deploy.yml`**：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
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

---

## 八、验收标准

### 8.1 技术验收

- [ ] Next.js项目可本地运行（`npm run dev`）
- [ ] 静态导出成功（`npm run build`生成`out`目录）
- [ ] GitHub Actions部署成功
- [ ] 网站可通过realcap.app访问
- [ ] 多语言切换正常（英文`/`、中文`/zh`）
- [ ] hreflang标记正确
- [ ] sitemap.xml自动生成并包含所有页面
- [ ] robots.txt正确配置

### 8.2 SEO验收

- [ ] 首页字数≥2000
- [ ] 首页内链≥15条
- [ ] 所有页面有正确的title、meta description
- [ ] 所有页面有canonical URL
- [ ] 博客文章有Article schema
- [ ] Solution页有Product schema
- [ ] FAQ页有FAQPage schema
- [ ] 所有页面有BreadcrumbList schema
- [ ] 虚假aggregateRating已移除

### 8.3 内容验收

- [ ] 首页英文内容完整
- [ ] 首页中文内容完整
- [ ] 至少4篇博客文章发布
- [ ] 5个Solution页骨架创建
- [ ] 隐私政策页创建
- [ ] 服务条款页创建
- [ ] FAQ页创建
- [ ] Docs框架创建

### 8.4 功能验收

- [ ] 语言切换器正常工作
- [ ] 面包屑导航正确显示
- [ ] 博客目录导航正常
- [ ] 博客分类筛选正常
- [ ] 资源下载表单工作
- [ ] 所有CTA按钮链接正确
- [ ] 404页面正确显示
- [ ] 移动端响应式正常

---

## 九、风险评估

| 风险 | 可能性 | 影响 | 应对措施 |
|------|--------|------|----------|
| 静态导出兼容性问题 | 中 | 高 | 提前测试关键功能（next-intl静态导出支持） |
| MDX内容解析错误 | 低 | 中 | 编写测试用例验证frontmatter格式 |
| 部署流程配置错误 | 中 | 中 | 使用官方GitHub Pages模板，逐步验证 |
| 迁移期间网站不可访问 | 低 | 高 | 保持原docs目录，迁移完成后再删除 |
| SEO排名波动 | 中 | 中 | 保持URL结构一致，提交sitemap尽快收录 |
| 内容产出延误 | 高 | 高 | 建立内容工作流，制定每周产出目标 |

---

## 十、后续优化

**短期（迁移完成后1个月内）**：
- 发布剩余4篇博客文章（完成M1目标）
- 完善Solution页内容深度
- 配置Google Search Console
- 配置百度站长平台

**中期（迁移完成后3个月内）**：
- 持续产出博客内容（4篇/月）
- 发布行业报告
- 开始外链建设（知乎、技术社区）
- 监控SEO排名进展

**长期（迁移完成后6个月内）**：
- 完整实现SEO执行计划M1-M6目标
- 达成8000UV/月流量目标
- 建立稳定的客户转化流程

---

**设计状态**：完成
**下一步**：编写实施计划（调用superpowers:writing-plans技能）