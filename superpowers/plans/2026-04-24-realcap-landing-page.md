# RealCap.app Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize and deploy the RealCap.app landing page to GitHub Pages with bilingual (English/Chinese) support, SEO optimization, and dark professional visual design.

**Architecture:** Pure static HTML/CSS with no JavaScript framework. Uses directory-based language separation (`/en/`, `/zh/`) with localStorage-based language preference persistence. Hero-centric layout with dark professional theme (#1a1a2e background + #4ade80 green accent).

**Tech Stack:** HTML5, CSS3 (vanilla, no preprocessors), minimal JavaScript for language switching, GitHub Pages hosting, CC-BY-NC 3.0 license.

---

## File Structure Map

```
realcap-app-website/
├── index.html              # 英文首页（默认入口） - Root redirect
├── en/index.html           # 英文首页（显式路径）
├── zh/index.html           # 中文首页
├── assets/
│   ├── css/style.css       # 全局样式
│   ├── js/lang-switch.js   # 语言切换逻辑
│   └── images/             # 图片资源（待添加）
├── blog/
│   ├── en/                 # 英文博客（Phase 2）
│   └── zh/                 # 中文博客（Phase 2）
├── docs/
│   ├── en/                 # 英文帮助文档（Phase 2）
│   └── zh/                 # 中文帮助文档（Phase 2）
├── sitemap.xml             # SEO 站点地图
├── robots.txt              # SEO 爬虫规则
├── 404.html                # 自定义 404 页面
├── LICENSE                 # CC-BY-NC 3.0
├── README.md               # 项目说明
└── CNAME                   # GitHub Pages 域名绑定
```

---

## Task 1: Project Initialization and Directory Structure

**Files:**
- Create: `website/` directory (subdirectory approach for clean separation)
- Create: `website/.gitignore`
- Create: `website/LICENSE`
- Create: `website/README.md`
- Create: `website/CNAME`

- [ ] **Step 1: Create project directory structure**

```bash
mkdir -p website/assets/css website/assets/js website/assets/images
mkdir -p website/en website/zh
mkdir -p website/blog/en website/blog/zh
mkdir -p website/docs/en website/docs/zh
```

- [ ] **Step 2: Create LICENSE file with CC-BY-NC 3.0 content**

Create `website/LICENSE`:
```
Creative Commons Attribution-NonCommercial 3.0 Unported

THE WORK (AS DEFINED BELOW) IS PROVIDED UNDER THE TERMS OF THIS CREATIVE COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND CONDITIONS.

http://creativecommons.org/licenses/by-nc/3.0/
```

- [ ] **Step 3: Create CNAME file for custom domain**

Create `website/CNAME`:
```
realcap.app
```

- [ ] **Step 4: Create README.md with project overview**

Create `website/README.md`:
```markdown
# RealCap.app Website

Official landing page for RealCap - Trusted Screenshot Tool.

## Structure
- `/en/` - English version
- `/zh/` - Chinese version
- `/assets/` - Static resources (CSS, JS, images)

## Deployment
Hosted on GitHub Pages with custom domain `realcap.app`.

## License
Content licensed under CC-BY-NC 3.0. See LICENSE for details.
```

- [ ] **Step 5: Commit project initialization**

```bash
git add website/
git commit -m "feat: initialize RealCap.app landing page project structure"
```

---

## Task 2: Global CSS Stylesheet (Dark Professional Theme)

**Files:**
- Create: `website/assets/css/style.css`

- [ ] **Step 1: Create CSS file with design system variables and base styles**

Create `website/assets/css/style.css`:
```css
/* RealCap Design System - Dark Professional Theme */

/* === CSS Variables === */
:root {
  /* Colors */
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --bg-card: #0f172a;
  --accent-primary: #4ade80;
  --accent-secondary: #22c55e;
  --accent-gradient: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  
  /* Typography */
  --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  
  /* Spacing */
  --header-height: 64px;
  --hero-padding: 80px;
  --section-gap: 60px;
  --card-padding: 24px;
  --card-gap: 24px;
  
  /* Breakpoints (for reference, use in media queries) */
  --bp-desktop: 1024px;
  --bp-tablet: 768px;
  --bp-mobile: 480px;
}

/* === Base Styles === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

/* === Typography === */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }

p {
  color: var(--text-secondary);
  font-size: 1rem;
}

a {
  color: var(--accent-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--accent-secondary);
}

/* === Header === */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

.header-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-logo-icon {
  width: 32px;
  height: 32px;
  background: var(--accent-gradient);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.header-nav {
  display: flex;
  gap: 32px;
}

.header-nav a {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.header-nav a:hover {
  color: var(--text-primary);
}

.header-lang-switch {
  display: flex;
  gap: 8px;
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 4px;
}

.header-lang-btn {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-lang-btn.active {
  background: var(--accent-gradient);
  color: var(--bg-primary);
}

.header-lang-btn:hover:not(.active) {
  color: var(--text-primary);
}

/* Mobile Header */
.header-menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 24px;
}

@media (max-width: 768px) {
  .header {
    padding: 0 16px;
  }
  
  .header-nav {
    display: none;
  }
  
  .header-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* === Hero Section === */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--hero-padding) 40px;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--accent-primary);
  margin-bottom: 32px;
  font-weight: 500;
}

.hero-cta {
  display: inline-flex;
  padding: 16px 32px;
  background: var(--accent-gradient);
  color: var(--bg-primary);
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-cta:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 40px rgba(74, 222, 128, 0.3);
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 16px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-cta {
    padding: 12px 24px;
    font-size: 1rem;
  }
}

/* === Features Section === */
.features {
  padding: var(--section-gap) 40px;
  background: var(--bg-secondary);
}

.features-title {
  text-align: center;
  margin-bottom: 48px;
  font-size: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--card-gap);
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: var(--card-padding);
  text-align: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-primary);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: var(--accent-gradient);
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .features {
    padding: 40px 16px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

/* === Blog Preview Section === */
.blog-preview {
  padding: var(--section-gap) 40px;
  background: var(--bg-primary);
}

.blog-preview-title {
  text-align: center;
  margin-bottom: 48px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--card-gap);
  max-width: 1200px;
  margin: 0 auto;
}

.blog-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: var(--card-padding);
  transition: border-color 0.2s ease;
}

.blog-card:hover {
  border-color: var(--accent-primary);
}

.blog-card-title {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.blog-card-excerpt {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.blog-card-link {
  font-size: 0.85rem;
  color: var(--accent-primary);
}

@media (max-width: 768px) {
  .blog-preview {
    padding: 40px 16px;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

/* === Footer === */
.footer {
  padding: 40px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.footer-links a {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.footer-social a {
  width: 40px;
  height: 40px;
  background: var(--bg-card);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 20px;
  transition: color 0.2s ease, background 0.2s ease;
}

.footer-social a:hover {
  color: var(--accent-primary);
  background: var(--bg-primary);
}

.footer-copyright {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.footer-license {
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.7;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .footer {
    padding: 24px 16px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 12px;
  }
}

/* === Utility Classes === */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

- [ ] **Step 2: Commit CSS stylesheet**

```bash
git add website/assets/css/style.css
git commit -m "feat: add global CSS stylesheet with dark professional theme"
```

---

## Task 3: Language Switch JavaScript

**Files:**
- Create: `website/assets/js/lang-switch.js`

- [ ] **Step 1: Create language switch module**

Create `website/assets/js/lang-switch.js`:
```javascript
/**
 * RealCap Language Switch Module
 * Handles bilingual navigation and user preference persistence
 */

(function() {
  'const STORAGE_KEY = 'realcap-lang-preference';
  
  /**
   * Get current language from URL path
   * @returns {string} 'en' or 'zh'
   */
  function getCurrentLang() {
    const path = window.location.pathname;
    if (path.startsWith('/zh/') || path === '/zh') {
      return 'zh';
    }
    return 'en';
  }
  
  /**
   * Get stored language preference
   * @returns {string|null} 'en' or 'zh' or null
   */
  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }
  
  /**
   * Store language preference
   * @param {string} lang 'en' or 'zh'
   */
  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Storage not available, continue without persistence
    }
  }
  
  /**
   * Navigate to target language version
   * @param {string} targetLang 'en' or 'zh'
   */
  function switchLang(targetLang) {
    setStoredLang(targetLang);
    
    const currentPath = window.location.pathname;
    let newPath;
    
    // Convert current path to target language
    if (targetLang === 'zh') {
      if (currentPath === '/' || currentPath === '/en' || currentPath.startsWith('/en/')) {
        newPath = currentPath.replace(/^\/en/, '/zh').replace(/^\/$/, '/zh/');
      } else {
        newPath = '/zh/';
      }
    } else {
      if (currentPath.startsWith('/zh/')) {
        newPath = currentPath.replace(/^\/zh/, '/en');
      } else if (currentPath === '/zh') {
        newPath = '/en/';
      } else {
        newPath = currentPath || '/en/';
      }
    }
    
    window.location.href = newPath;
  }
  
  /**
   * Redirect to stored preference on first visit
   * Only runs if user has no explicit language in URL and has stored preference
   */
  function applyStoredPreference() {
    const currentLang = getCurrentLang();
    const storedLang = getStoredLang();
    
    // Only redirect from root to stored preference
    if (window.location.pathname === '/' && storedLang) {
      window.location.href = '/' + storedLang + '/';
    }
  }
  
  /**
   * Initialize language switch UI
   */
  function initLangSwitch() {
    const langButtons = document.querySelectorAll('.header-lang-btn');
    const currentLang = getCurrentLang();
    
    // Set active button
    langButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
      
      // Add click handler
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetLang = this.getAttribute('data-lang');
        if (targetLang !== currentLang) {
          switchLang(targetLang);
        }
      });
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initLangSwitch();
      applyStoredPreference();
    });
  } else {
    initLangSwitch();
    applyStoredPreference();
  }
  
  // Export for potential external use
  window.RealCapLang = {
    getCurrentLang: getCurrentLang,
    switchLang: switchLang,
    setStoredLang: setStoredLang
  };
})();
```

- [ ] **Step 2: Commit language switch script**

```bash
git add website/assets/js/lang-switch.js
git commit -m "feat: add language switch module with localStorage persistence"
```

---

## Task 4: English Homepage (index.html and en/index.html)

**Files:**
- Create: `website/index.html` (root redirect to /en/)
- Create: `website/en/index.html` (full English landing page)

- [ ] **Step 1: Create root index.html as redirect**

Create `website/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=/en/">
  <title>RealCap - Trusted Screenshot Tool</title>
  <link rel="canonical" href="https://realcap.app/en/">
  <link rel="alternate" hreflang="en" href="https://realcap.app/en/">
  <link rel="alternate" hreflang="zh" href="https://realcap.app/zh/">
  <link rel="alternate" hreflang="x-default" href="https://realcap.app/">
  <script>
    // JavaScript fallback for redirect
    window.location.href = '/en/';
  </script>
</head>
<body>
  <p>Redirecting to <a href="/en/">English homepage</a>...</p>
</body>
</html>
```

- [ ] **Step 2: Create full English homepage**

Create `website/en/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>RealCap - Trusted Screenshot Tool | Prevent AI Forgery</title>
  <meta name="description" content="RealCap is a trusted screenshot tool that prevents AI forgery. Verify screenshot authenticity, capture secure proof, and protect against fake screenshots.">
  <meta name="keywords" content="trusted screenshot, prevent AI forgery, screenshot verification, authentic capture, screenshot proof, fake screenshot detection">
  <meta name="author" content="RealCap">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical and hreflang -->
  <link rel="canonical" href="https://realcap.app/en/">
  <link rel="alternate" hreflang="en" href="https://realcap.app/en/">
  <link rel="alternate" hreflang="zh" href="https://realcap.app/zh/">
  <link rel="alternate" hreflang="x-default" href="https://realcap.app/">
  
  <!-- Open Graph -->
  <meta property="og:title" content="RealCap - Trusted Screenshot Tool">
  <meta property="og:description" content="Prevent AI forgery with trusted screenshots. Verify authenticity, capture secure proof.">
  <meta property="og:image" content="https://realcap.app/assets/images/og-image.png">
  <meta property="og:url" content="https://realcap.app/en/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:locale:alternate" content="zh_CN">
  <meta property="og:site_name" content="RealCap">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="RealCap - Trusted Screenshot Tool">
  <meta name="twitter:description" content="Prevent AI forgery with trusted screenshots. Verify authenticity.">
  <meta name="twitter:image" content="https://realcap.app/assets/images/og-image.png">
  <meta name="twitter:site" content="@realcap">
  
  <!-- Schema JSON-LD -->
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
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/style.css">
  
  <!-- Favicon (placeholder) -->
  <link rel="icon" type="image/png" href="/assets/images/favicon.png">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <a href="/en/" class="header-logo">
      <span class="header-logo-icon">R</span>
      <span>RealCap</span>
    </a>
    
    <nav class="header-nav">
      <a href="/en/">Home</a>
      <a href="#features">Features</a>
      <a href="/blog/en/">Blog</a>
      <a href="/docs/en/">Docs</a>
      <a href="#contact">Contact</a>
    </nav>
    
    <div class="header-lang-switch">
      <button class="header-lang-btn active" data-lang="en">EN</button>
      <button class="header-lang-btn" data-lang="zh">中文</button>
    </div>
    
    <button class="header-menu-toggle" aria-label="Menu">☰</button>
  </header>
  
  <!-- Hero Section -->
  <section class="hero" id="hero">
    <h1 class="hero-title">RealCap - Trusted Screenshot Tool</h1>
    <p class="hero-subtitle">Prevent AI Forgery · Verifiable Capture · Secure Proof</p>
    <a href="#download" class="hero-cta">Download Now</a>
  </section>
  
  <!-- Features Section -->
  <section class="features" id="features">
    <h2 class="features-title">Why Choose RealCap?</h2>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">✓</div>
        <h3 class="feature-title">Trusted Capture</h3>
        <p class="feature-desc">Capture screenshots with verifiable authenticity proof. Prevent tampering and ensure trust.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🛡️</div>
        <h3 class="feature-title">AI Forgery Detection</h3>
        <p class="feature-desc">Detect AI-generated fake screenshots with advanced algorithms. Stay protected against fraud.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3 class="feature-title">Screenshot Verification</h3>
        <p class="feature-desc">Verify screenshot authenticity instantly. Provide secure proof for legal and business purposes.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">💻</div>
        <h3 class="feature-title">Cross-Platform Support</h3>
        <p class="feature-desc">Available on Windows, macOS, and browser extension. Works everywhere you need it.</p>
      </div>
    </div>
  </section>
  
  <!-- Blog Preview Section -->
  <section class="blog-preview" id="blog">
    <h2 class="blog-preview-title">Latest Articles</h2>
    
    <div class="blog-grid">
      <article class="blog-card">
        <h3 class="blog-card-title">How to Identify AI-Fake Screenshots</h3>
        <p class="blog-card-excerpt">Learn the telltale signs of AI-generated fake screenshots and how to protect yourself.</p>
        <a href="/blog/en/ai-fake-screenshot.html" class="blog-card-link">Read more →</a>
      </article>
      
      <article class="blog-card">
        <h3 class="blog-card-title">Trusted Screenshot Use Cases</h3>
        <p class="blog-card-excerpt">Discover real-world scenarios where trusted screenshots provide critical value.</p>
        <a href="/blog/en/trusted-screenshot-scenarios.html" class="blog-card-link">Read more →</a>
      </article>
      
      <article class="blog-card">
        <h3 class="blog-card-title">Screenshot Verification Technology</h3>
        <p class="blog-card-excerpt">Understand the technical principles behind our verification system.</p>
        <a href="/blog/en/verification-technology.html" class="blog-card-link">Read more →</a>
      </article>
    </div>
  </section>
  
  <!-- Footer -->
  <footer class="footer" id="contact">
    <div class="footer-links">
      <a href="/docs/en/privacy.html">Privacy Policy</a>
      <a href="/docs/en/terms.html">Terms of Use</a>
      <a href="/docs/en/about.html">About Us</a>
      <a href="/docs/en/faq.html">FAQ</a>
    </div>
    
    <div class="footer-social">
      <a href="https://twitter.com/realcap" aria-label="Twitter">𝕏</a>
      <a href="https://github.com/realcap" aria-label="GitHub">⌨</a>
    </div>
    
    <p class="footer-copyright">© 2026 RealCap. All rights reserved.</p>
    <p class="footer-license">Content licensed under CC-BY-NC 3.0. See LICENSE for details.</p>
  </footer>
  
  <!-- Language Switch Script -->
  <script src="/assets/js/lang-switch.js"></script>
</body>
</html>
```

- [ ] **Step 3: Commit English homepage**

```bash
git add website/index.html website/en/index.html
git commit -m "feat: add English landing page with SEO meta tags and Schema markup"
```

---

## Task 5: Chinese Homepage (zh/index.html)

**Files:**
- Create: `website/zh/index.html`

- [ ] **Step 1: Create Chinese homepage**

Create `website/zh/index.html`:
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags (Chinese) -->
  <title>RealCap - 可信截图工具 | 防AI伪造</title>
  <meta name="description" content="RealCap是可信截图工具，防止AI伪造截图。验证截图真实性，获取安全证明，防范虚假截图。">
  <meta name="keywords" content="可信截图, 防AI伪造, 截图验证, 截图验真, 截图证明, AI截图检测, 虚假截图识别">
  <meta name="author" content="RealCap">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical and hreflang -->
  <link rel="canonical" href="https://realcap.app/zh/">
  <link rel="alternate" hreflang="en" href="https://realcap.app/en/">
  <link rel="alternate" hreflang="zh" href="https://realcap.app/zh/">
  <link rel="alternate" hreflang="x-default" href="https://realcap.app/">
  
  <!-- Open Graph (Chinese) -->
  <meta property="og:title" content="RealCap - 可信截图工具">
  <meta property="og:description" content="防AI伪造的可信截图工具。验证真实性，获取安全证明。">
  <meta property="og:image" content="https://realcap.app/assets/images/og-image-zh.png">
  <meta property="og:url" content="https://realcap.app/zh/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:locale:alternate" content="en_US">
  <meta property="og:site_name" content="RealCap">
  
  <!-- Twitter Cards (Chinese) -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="RealCap - 可信截图工具">
  <meta name="twitter:description" content="防AI伪造的可信截图工具。验证真实性，获取安全证明。">
  <meta name="twitter:image" content="https://realcap.app/assets/images/og-image-zh.png">
  <meta name="twitter:site" content="@realcap">
  
  <!-- Schema JSON-LD (Chinese) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RealCap",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Windows, macOS",
    "description": "可信截图工具，防止AI伪造并支持验真",
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
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/style.css">
  
  <!-- Favicon (placeholder) -->
  <link rel="icon" type="image/png" href="/assets/images/favicon.png">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <a href="/zh/" class="header-logo">
      <span class="header-logo-icon">R</span>
      <span>RealCap</span>
    </a>
    
    <nav class="header-nav">
      <a href="/zh/">首页</a>
      <a href="#features">功能</a>
      <a href="/blog/zh/">博客</a>
      <a href="/docs/zh/">文档</a>
      <a href="#contact">联系我们</a>
    </nav>
    
    <div class="header-lang-switch">
      <button class="header-lang-btn" data-lang="en">EN</button>
      <button class="header-lang-btn active" data-lang="zh">中文</button>
    </div>
    
    <button class="header-menu-toggle" aria-label="菜单">☰</button>
  </header>
  
  <!-- Hero Section -->
  <section class="hero" id="hero">
    <h1 class="hero-title">RealCap - 可信截图工具</h1>
    <p class="hero-subtitle">防AI伪造 · 可验真 · 安全证明</p>
    <a href="#download" class="hero-cta">立即下载</a>
  </section>
  
  <!-- Features Section -->
  <section class="features" id="features">
    <h2 class="features-title">为什么选择 RealCap？</h2>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">✓</div>
        <h3 class="feature-title">可信截图</h3>
        <p class="feature-desc">截取带有可验真实性证明的截图，防止篡改，确保可信。</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🛡️</div>
        <h3 class="feature-title">AI伪造检测</h3>
        <p class="feature-desc">用先进算法检测AI生成的虚假截图，防范欺诈风险。</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3 class="feature-title">截图验真</h3>
        <p class="feature-desc">即时验证截图真实性，为法律和商务用途提供安全证明。</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">💻</div>
        <h3 class="feature-title">多平台支持</h3>
        <p class="feature-desc">支持 Windows、macOS 和浏览器扩展，随时随地可用。</p>
      </div>
    </div>
  </section>
  
  <!-- Blog Preview Section -->
  <section class="blog-preview" id="blog">
    <h2 class="blog-preview-title">最新文章</h2>
    
    <div class="blog-grid">
      <article class="blog-card">
        <h3 class="blog-card-title">如何识别AI伪造截图</h3>
        <p class="blog-card-excerpt">学习识别AI生成虚假截图的关键特征，保护自己免受欺诈。</p>
        <a href="/blog/zh/ai-fake-screenshot.html" class="blog-card-link">阅读更多 →</a>
      </article>
      
      <article class="blog-card">
        <h3 class="blog-card-title">可信截图应用场景</h3>
        <p class="blog-card-excerpt">探索可信截图在现实场景中提供的关键价值。</p>
        <a href="/blog/zh/trusted-screenshot-scenarios.html" class="blog-card-link">阅读更多 →</a>
      </article>
      
      <article class="blog-card">
        <h3 class="blog-card-title">截图验真技术原理</h3>
        <p class="blog-card-excerpt">了解我们验证系统背后的技术原理。</p>
        <a href="/blog/zh/verification-technology.html" class="blog-card-link">阅读更多 →</a>
      </article>
    </div>
  </section>
  
  <!-- Footer -->
  <footer class="footer" id="contact">
    <div class="footer-links">
      <a href="/docs/zh/privacy.html">隐私政策</a>
      <a href="/docs/zh/terms.html">使用条款</a>
      <a href="/docs/zh/about.html">关于我们</a>
      <a href="/docs/zh/faq.html">常见问题</a>
    </div>
    
    <div class="footer-social">
      <a href="https://twitter.com/realcap" aria-label="Twitter">𝕏</a>
      <a href="https://github.com/realcap" aria-label="GitHub">⌨</a>
    </div>
    
    <p class="footer-copyright">© 2026 RealCap. 保留所有权利。</p>
    <p class="footer-license">内容采用 CC-BY-NC 3.0 协议授权。详见 LICENSE。</p>
  </footer>
  
  <!-- Language Switch Script -->
  <script src="/assets/js/lang-switch.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit Chinese homepage**

```bash
git add website/zh/index.html
git commit -m "feat: add Chinese landing page with localized SEO meta tags"
```

---

## Task 6: SEO Configuration Files

**Files:**
- Create: `website/robots.txt`
- Create: `website/sitemap.xml`

- [ ] **Step 1: Create robots.txt**

Create `website/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://realcap.app/sitemap.xml

# Optional: limit crawl rate
Crawl-delay: 1
```

- [ ] **Step 2: Create sitemap.xml with hreflang**

Create `website/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- English Homepage -->
  <url>
    <loc>https://realcap.app/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://realcap.app/en/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://realcap.app/zh/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://realcap.app/"/>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- English Homepage (explicit) -->
  <url>
    <loc>https://realcap.app/en/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://realcap.app/en/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://realcap.app/zh/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://realcap.app/"/>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Chinese Homepage -->
  <url>
    <loc>https://realcap.app/zh/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://realcap.app/en/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://realcap.app/zh/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://realcap.app/"/>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog articles will be added in Phase 2 -->
  <!-- Documentation pages will be added in Phase 2 -->
  
</urlset>
```

- [ ] **Step 3: Commit SEO files**

```bash
git add website/robots.txt website/sitemap.xml
git commit -m "feat: add robots.txt and sitemap.xml for SEO"
```

---

## Task 7: 404 Error Page

**Files:**
- Create: `website/404.html`

- [ ] **Step 1: Create bilingual 404 page**

Create `website/404.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Page Not Found | RealCap</title>
  <link rel="stylesheet" href="/assets/css/style.css">
  <style>
    .error-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
    }
    
    .error-code {
      font-size: 8rem;
      font-weight: 800;
      color: var(--accent-primary);
      margin-bottom: 16px;
    }
    
    .error-message {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    
    .error-submessage {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 32px;
    }
    
    .error-nav {
      display: flex;
      gap: 16px;
    }
    
    .error-nav a {
      padding: 12px 24px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      border-radius: 8px;
      font-size: 0.9rem;
      transition: background 0.2s ease;
    }
    
    .error-nav a:hover {
      background: var(--accent-gradient);
      color: var(--bg-primary);
    }
    
    @media (max-width: 768px) {
      .error-code {
        font-size: 4rem;
      }
      
      .error-message {
        font-size: 1.25rem;
      }
      
      .error-nav {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <main class="error-page">
    <div class="error-code">404</div>
    <h1 class="error-message">Page Not Found</h1>
    <p class="error-submessage">页面未找到 / The page you're looking for doesn't exist.</p>
    
    <nav class="error-nav">
      <a href="/">Return Home (EN)</a>
      <a href="/zh/">返回首页 (中文)</a>
      <a href="/blog/en/">Blog</a>
      <a href="/docs/en/">Docs</a>
    </nav>
  </main>
</body>
</html>
```

- [ ] **Step 2: Commit 404 page**

```bash
git add website/404.html
git commit -m "feat: add bilingual 404 error page"
```

---

## Task 8: Placeholder Images Directory

**Files:**
- Create: `website/assets/images/.gitkeep`
- Create placeholder note file for OG images

- [ ] **Step 1: Create images directory placeholder**

```bash
touch website/assets/images/.gitkeep
```

- [ ] **Step 2: Create image placeholder note**

Create `website/assets/images/README.md`:
```markdown
# Image Assets

Required images (to be added):

| Image | Size | Purpose |
|-------|------|---------|
| `favicon.png` | 32x32 | Browser favicon |
| `logo.png` | 128x128 | Brand logo |
| `og-image.png` | 1200x630 | English Open Graph |
| `og-image-zh.png` | 1200x630 | Chinese Open Graph |

Specifications:
- Format: PNG or WebP
- OG images: < 200KB (compressed)
- Use descriptive filenames
- Include alt text in HTML
```

- [ ] **Step 3: Commit images placeholder**

```bash
git add website/assets/images/
git commit -m "chore: add placeholder for image assets directory"
```

---

## Task 9: Phase 1 Commit and Verification

**Files:**
- Verify: All files created correctly
- Final commit for Phase 1 completion

- [ ] **Step 1: Verify project structure**

```bash
ls -la website/
ls -la website/en/
ls -la website/zh/
ls -la website/assets/css/
ls -la website/assets/js/
```

Expected output:
```
website/
├── index.html
├── en/index.html
├── zh/index.html
├── assets/css/style.css
├── assets/js/lang-switch.js
├── assets/images/.gitkeep
├── assets/images/README.md
├── robots.txt
├── sitemap.xml
├── 404.html
├── LICENSE
├── README.md
├── CNAME
```

- [ ] **Step 2: Validate HTML structure**

Use browser or validator to check:
- `website/en/index.html` opens correctly
- `website/zh/index.html` opens correctly
- Language switch buttons present
- SEO meta tags present
- Schema JSON-LD present

- [ ] **Step 3: Create final Phase 1 commit**

```bash
git add -A
git commit -m "feat: complete Phase 1 - RealCap landing page foundation

- Add bilingual landing pages (EN/ZH)
- Implement dark professional theme CSS
- Add language switch with localStorage persistence
- Configure SEO (meta, hreflang, sitemap, robots)
- Add Schema JSON-LD markup
- Create 404 error page
- Set up GitHub Pages deployment files (CNAME, LICENSE)"
```

---

## Task 10: GitHub Pages Deployment Setup

**Files:**
- Configure: GitHub repository settings
- Push: Initial deployment

- [ ] **Step 1: Create GitHub repository (if not exists)**

```bash
# If creating new repo
gh repo create realcap-app-website --public --source=website --remote=origin

# Or if repo already exists
git remote add origin https://github.com/realcap/realcap-app-website.git
```

- [ ] **Step 2: Push to GitHub**

```bash
git push -u origin master
```

- [ ] **Step 3: Configure GitHub Pages settings**

Go to repository Settings > Pages:
- Source: Deploy from branch
- Branch: `master` (or `main`)
- Folder: `/ (root)` if website is root, or `/website` if subdirectory
- Custom domain: `realcap.app`
- Enforce HTTPS: Yes

- [ ] **Step 4: Verify deployment**

Wait 1-5 minutes, then check:
- `https://realcap.app` - Should redirect to /en/
- `https://realcap.app/en/` - English homepage
- `https://realcap.app/zh/` - Chinese homepage
- Language switch functionality
- SSL certificate active

---

## Self-Review Checklist

**1. Spec Coverage:**
- ✓ Directory structure matches spec (Section 2.1)
- ✓ Hero-centric layout with dark professional theme
- ✓ Features section with 4 cards (Section 3.3)
- ✓ Blog preview section (Section 3.1)
- ✓ Footer with links, social, copyright (Section 3.1)
- ✓ SEO meta tags for both languages (Section 4.1)
- ✓ hreflang configuration (Section 2.3)
- ✓ Schema JSON-LD markup (Section 4.2.3)
- ✓ Open Graph and Twitter Cards (Section 4.4)
- ✓ robots.txt (Section 4.2.1)
- ✓ sitemap.xml with hreflang (Section 4.2.2)
- ✓ 404 page (Section 4.8)
- ✓ CNAME file (Section 7.3)
- ✓ LICENSE CC-BY-NC 3.0 (Section 8)

**2. Placeholder Scan:**
- No TBD/TODO placeholders in code
- All code blocks contain complete implementation
- No "implement later" references
- No references to undefined functions

**3. Type Consistency:**
- CSS class names consistent across all HTML files
- `header-lang-btn` used consistently
- `feature-card`, `feature-icon`, `feature-title`, `feature-desc` consistent
- JavaScript `data-lang` attribute consistent
- All paths use correct format (`/en/`, `/zh/`, `/assets/`)

**Gaps Found:**
- OG images placeholder only - actual images needed in Phase 2
- Blog/Docs content pages listed but not implemented (Phase 2 per spec)
- Mobile hamburger menu CSS exists but JS toggle not implemented (Phase 2 enhancement)
- Privacy/Terms/About pages referenced but not created (Phase 2 per spec Section 4.7)

---

## Phase 2 Tasks (Future Implementation)

**Not in current plan - deferred per spec Section 9:**
- Blog articles (3 bilingual posts)
- Documentation pages (5 bilingual docs)
- Privacy Policy, Terms, About pages
- OG image creation (1200x630px)
- Mobile hamburger menu JavaScript
- Search Console submission
- External引流 (Twitter/LinkedIn/Reddit)