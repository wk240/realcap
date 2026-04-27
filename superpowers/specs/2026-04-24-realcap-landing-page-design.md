---
title: RealCap.app Landing Page Design
date: 2026-04-24
status: approved
---

# RealCap.app 落地页设计文档

## 1. 项目概述

### 1.1 目标
初始化 RealCap.app 落地页项目，部署到 GitHub Pages，实现 SEO 优化，支持英语/中文双语，为国际化冷启动奠定基础。

### 1.2 核心约束
- 技术栈：纯静态 HTML/CSS
- 托管平台：GitHub Pages
- 域名：realcap.app（已就绪）
- 开源协议：CC-BY-NC 3.0

### 1.3 成功标准
- 落地页可通过 HTTPS 正常访问
- SEO 关键词被 Google 收录
- 双语切换功能正常
- 页面加载速度 < 3秒

---

## 2. 项目架构

### 2.1 目录结构

```
realcap-app-website/
├── index.html              # 英文首页（默认入口）
├── zh/
│   └── index.html          # 中文首页
├── en/
│   └── index.html          # 英文首页（显式路径）
├── assets/
│   ├── css/
│   │   └── style.css       # 全局样式
│   ├── images/             # 图片资源（压缩优化）
│   └── js/
│   │   └── lang-switch.js  # 语言切换逻辑
├── blog/
│   ├── en/
│   │   ├── ai-fake-screenshot.html
│   │   ├── trusted-screenshot-scenarios.html
│   │   └── verification-technology.html
│   └── zh/
│   │   ├── ai-fake-screenshot.html
│   │   ├── trusted-screenshot-scenarios.html
│   │   └── verification-technology.html
├── docs/
│   ├── en/
│   │   ├── getting-started.html
│   │   ├── how-to-verify.html
│   │   ├── faq.html
│   │   ├── ai-detection.html
│   │   └── client-guide.html
│   └── zh/
│   │   ├── getting-started.html
│   │   ├── how-to-verify.html
│   │   ├── faq.html
│   │   ├── ai-detection.html
│   │   └── client-guide.html
├── sitemap.xml             # SEO 站点地图
├── robots.txt              # SEO 爬虫规则
├── 404.html                # 自定义 404 页面
├── LICENSE                 # CC-BY-NC 3.0
├── README.md
└── CNAME                   # GitHub Pages 域名绑定
```

### 2.2 多语言实现
- 采用目录结构：`/en/`（英文）、`/zh/`（中文）
- 根目录 `index.html` 作为默认英文入口
- Header 包含语言切换器，保存用户偏好到 localStorage

### 2.3 多语言 SEO 配置（hreflang）

**每个页面必须包含 hreflang 标签：**

```html
<!-- 英文页面 (index.html, /en/index.html) -->
<link rel="canonical" href="https://realcap.app/">
<link rel="alternate" hreflang="en" href="https://realcap.app/en/">
<link rel="alternate" hreflang="zh" href="https://realcap.app/zh/">
<link rel="alternate" hreflang="x-default" href="https://realcap.app/">

<!-- 中文页面 (/zh/index.html) -->
<link rel="canonical" href="https://realcap.app/zh/">
<link rel="alternate" hreflang="en" href="https://realcap.app/en/">
<link rel="alternate" hreflang="zh" href="https://realcap.app/zh/">
<link rel="alternate" hreflang="x-default" href="https://realcap.app/">
```

**说明：**
- `hreflang` 告诉搜索引擎每个页面的语言版本
- `x-default` 指定默认页面（当用户语言不匹配时）
- `canonical` 防止重复内容问题

---

## 3. 页面板块结构

### 3.1 滚动顺序

| 板块 | 内容 | SEO 作用 |
|------|------|----------|
| Header | Logo、导航（Home/Features/Blog/Docs/Contact）、语言切换 | 无 |
| Hero | 品牌标语、核心价值、CTA按钮 | 关键词布局 |
| Features | 4个功能卡片 | 关键词布局 |
| Blog Preview | 最新3篇博客摘要 | SEO 内容入口 |
| Footer | 联系方式、社交链接、版权声明 | 无 |

### 3.2 Hero 区域内容

**英文版：**
- 标题：`RealCap - Trusted Screenshot Tool`
- 副标题：`Prevent AI Forgery · Verifiable Capture · Secure Proof`
- CTA按钮：`Download Now` → 预留客户端下载链接

**中文版：**
- 标题：`RealCap - 可信截图工具`
- 副标题：`防AI伪造 · 可验真 · 安全证明`
- CTA按钮：`立即下载` → 预留客户端下载链接

### 3.3 Features 卡片内容

| 卡片 | 英文标题 | 中文标题 | 描述关键词 |
|------|----------|----------|------------|
| 1 | Trusted Capture | 可信截图 | trusted screenshot, authentic |
| 2 | AI Forgery Detection | AI伪造检测 | prevent AI forgery, detection |
| 3 | Screenshot Verification | 截图验真 | screenshot verification, proof |
| 4 | Cross-Platform Support | 多平台支持 | Windows, macOS, browser extension |

---

## 4. SEO 策略

### 4.1 Meta 标签配置

**英文首页 (index.html)：**
```html
<title>RealCap - Trusted Screenshot Tool | Prevent AI Forgery</title>
<meta name="description" content="RealCap is a trusted screenshot tool that prevents AI forgery. Verify screenshot authenticity, capture secure proof, and protect against fake screenshots.">
<meta name="keywords" content="trusted screenshot, prevent AI forgery, screenshot verification, authentic capture, screenshot proof">
```

**中文首页 (zh/index.html)：**
```html
<title>RealCap - 可信截图工具 | 防AI伪造</title>
<meta name="description" content="RealCap是可信截图工具，防止AI伪造截图。验证截图真实性，获取安全证明，防范虚假截图。">
<meta name="keywords" content="可信截图, 防AI伪造, 截图验证, 截图验真, 截图证明">
```

### 4.2 技术 SEO

#### 4.2.1 robots.txt 配置

```
User-agent: *
Allow: /

Sitemap: https://realcap.app/sitemap.xml

# 可选：限制爬取频率
Crawl-delay: 1
```

#### 4.2.2 sitemap.xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- 英文首页 -->
  <url>
    <loc>https://realcap.app/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://realcap.app/en/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://realcap.app/zh/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://realcap.app/"/>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 中文首页 -->
  <url>
    <loc>https://realcap.app/zh/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://realcap.app/en/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://realcap.app/zh/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://realcap.app/"/>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 博客、文档页面后续添加 -->
</urlset>
```

#### 4.2.3 Schema JSON-LD 配置

**每个页面 `<head>` 添加：**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "RealCap",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Windows, macOS",
  "description": "Trusted screenshot tool that prevents AI forgery and enables verification",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "100"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RealCap",
  "url": "https://realcap.app",
  "logo": "https://realcap.app/assets/images/logo.png",
  "sameAs": [
    "https://twitter.com/realcap",
    "https://github.com/realcap"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RealCap",
  "url": "https://realcap.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://realcap.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 4.3 内容 SEO

**首期博客（双语）：**
1. "如何识别AI伪造截图" / "How to Identify AI-Fake Screenshots"
2. "可信截图应用场景" / "Trusted Screenshot Use Cases"
3. "截图验真技术原理" / "Screenshot Verification Technology"

**首期帮助文档（双语）：**
1. 快速入门 / Getting Started
2. 如何验证截图 / How to Verify Screenshots
3. 常见问题 / FAQ
4. AI检测功能 / AI Detection Feature
5. 客户端使用指南 / Client Guide

### 4.4 Open Graph & Twitter Cards

#### 4.4.1 Open Graph 标签

**英文页面：**
```html
<meta property="og:title" content="RealCap - Trusted Screenshot Tool">
<meta property="og:description" content="Prevent AI forgery with trusted screenshots. Verify authenticity, capture secure proof.">
<meta property="og:image" content="https://realcap.app/assets/images/og-image.png">
<meta property="og:url" content="https://realcap.app/">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="zh_CN">
<meta property="og:site_name" content="RealCap">
```

**中文页面：**
```html
<meta property="og:title" content="RealCap - 可信截图工具">
<meta property="og:description" content="防AI伪造的可信截图工具。验证真实性，获取安全证明。">
<meta property="og:image" content="https://realcap.app/assets/images/og-image-zh.png">
<meta property="og:url" content="https://realcap.app/zh/">
<meta property="og:type" content="website">
<meta property="og:locale" content="zh_CN">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:site_name" content="RealCap">
```

#### 4.4.2 Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="RealCap - Trusted Screenshot Tool">
<meta name="twitter:description" content="Prevent AI forgery with trusted screenshots. Verify authenticity.">
<meta name="twitter:image" content="https://realcap.app/assets/images/og-image.png">
<meta name="twitter:site" content="@realcap">
```

#### 4.4.3 OG 图片规范

| 属性 | 规格 |
|------|------|
| 尺寸 | 1200 x 630 px |
| 格式 | PNG 或 WebP |
| 内容 | Hero 区域视觉 + 产品名称 + 核心卖点 |
| 文件大小 | < 200KB（压缩优化） |

### 4.5 图片 SEO 规范

| 规范项 | 要求 |
|--------|------|
| 文件命名 | 描述性命名，如 `trusted-screenshot-hero.webp` |
| Alt 文本 | 每个图片必须有描述性 alt，如 `RealCap trusted screenshot verification interface` |
| 格式 | 优先 WebP，fallback PNG/JPG |
| Lazy loading | `loading="lazy"` 属性 |
| 响应式 | 使用 `<picture>` 元素或 `srcset` |

### 4.6 外部引流
- Twitter/LinkedIn/Reddit 发布内容链接
- 提交网站到 Google Search Console、Bing Webmaster

### 4.7 E-E-A-T 信任信号

| 信号类型 | 实现方式 |
|----------|----------|
| **Experience** | 博客文章展示真实使用案例、技术原理截图 |
| **Expertise** | 技术原理详解、AI 检测算法说明 |
| **Authoritativeness** | GitHub 开源仓库链接、技术博客引用 |
| **Trustworthiness** | Privacy Policy、Terms of Use、联系方式明确 |

**必须添加的信任页面：**
- `docs/en/privacy.html` / `docs/zh/privacy.html` — Privacy Policy
- `docs/en/terms.html` / `docs/zh/terms.html` — Terms of Use
- `docs/en/about.html` / `docs/zh/about.html` — About Us（团队介绍）

### 4.8 404 页面配置

**404.html 内容规范：**
- 友好错误信息："Page Not Found"
- 导航链接：返回首页、Blog、Docs
- 语言自动检测：根据 URL 路径判断语言版本
- 设计风格：与主页面一致的深色主题

---

## 5. 视觉设计规范

### 5.1 配色方案

| 用途 | 颜色值 | CSS 变量 |
|------|--------|----------|
| 背景主色 | `#1a1a2e` | `--bg-primary` |
| 背景辅色 | `#16213e` | `--bg-secondary` |
| 强调色 | `#4ade80` | `--accent-primary` |
| 强调色渐变终点 | `#22c55e` | `--accent-secondary` |
| 文字主色 | `#ffffff` | `--text-primary` |
| 文字辅色 | `#94a3b8` | `--text-secondary` |
| 卡片背景 | `#0f172a` | `--card-bg` |
| 边框色 | `#334155` | `--border-color` |

### 5.2 字体

```css
--font-primary: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### 5.3 间距规范

| 元素 | 值 |
|------|-----|
| Hero 内边距 | 80px 上下 |
| 板块间距 | 60px |
| 卡片内边距 | 24px |
| 卡片间距 | 24px |
| Header 高度 | 64px |

### 5.4 响应式断点

| 断点 | 宽度 | 适用 |
|------|------|------|
| Desktop | ≥1024px | 默认布局 |
| Tablet | 768px-1023px | 两列卡片 |
| Mobile | <768px | 单列布局 |

---

## 6. 功能实现

### 6.1 语言切换
- Header 右侧显示语言选择器（EN / 中文）
- 点击切换跳转到对应语言目录
- localStorage 保存用户偏好，下次访问自动应用

### 6.2 导航结构
- Desktop：水平导航栏
- Mobile：汉堡菜单 + 下拉导航

### 6.3 CTA 按钮
- 主按钮：绿色渐变背景，白色文字
- 悬停效果：轻微放大 + 亮度提升
- 预留链接：`#download`（待客户端上线后更新）

---

## 7. 部署配置

### 7.1 GitHub Pages 设置
- Source：主分支根目录
- Custom domain：realcap.app
- HTTPS：强制启用

### 7.2 DNS 配置
- A 记录指向 GitHub Pages IPs
- CNAME 记录（如需要）

### 7.3 CNAME 文件内容
```
realcap.app
```

---

## 8. 开源协议

### 8.1 LICENSE 文件
采用 CC-BY-NC 3.0 协议，禁止商用。

### 8.2 页面声明
Footer 添加协议链接：
```
Content licensed under CC-BY-NC 3.0. See LICENSE for details.
```

---

## 9. 实施阶段

### Phase 1（当前）：基础落地页
- 首页双语版本
- 基础 SEO 配置
- GitHub Pages 部署

### Phase 2（后续）：内容扩展
- 博客/帮助文档完整版
- sitemap.xml 提交
- 外部引流启动

### Phase 3（后续）：客户端集成
- 更新 CTA 下载链接
- 添加客户端使用指南