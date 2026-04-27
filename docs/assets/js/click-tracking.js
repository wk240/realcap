/**
 * Click Tracking for Google Analytics 4
 * Tracks key user interactions on RealCap landing page
 */

(function() {
  'use strict';

  // Track CTA button clicks
  document.querySelectorAll('.hero-cta').forEach(function(btn) {
    btn.addEventListener('click', function() {
      gtag('event', 'cta_click', {
        'event_category': 'engagement',
        'event_label': 'download_cta',
        'language': document.documentElement.lang
      });
    });
  });

  // Track navigation clicks
  document.querySelectorAll('.header-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'nav_click', {
        'event_category': 'navigation',
        'event_label': this.textContent.trim(),
        'language': document.documentElement.lang
      });
    });
  });

  // Track language switch clicks
  document.querySelectorAll('.header-lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      gtag('event', 'language_switch', {
        'event_category': 'navigation',
        'event_label': this.dataset.lang,
        'from_language': document.documentElement.lang
      });
    });
  });

  // Track feature card clicks
  document.querySelectorAll('.feature-card').forEach(function(card) {
    card.addEventListener('click', function() {
      gtag('event', 'feature_click', {
        'event_category': 'engagement',
        'event_label': this.querySelector('.feature-title').textContent.trim(),
        'language': document.documentElement.lang
      });
    });
  });

  // Track blog card clicks
  document.querySelectorAll('.blog-card-link').forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'blog_click', {
        'event_category': 'content',
        'event_label': this.closest('.blog-card').querySelector('.blog-card-title').textContent.trim(),
        'language': document.documentElement.lang
      });
    });
  });

  // Track social link clicks
  document.querySelectorAll('.footer-social a').forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'social_click', {
        'event_category': 'engagement',
        'event_label': this.getAttribute('aria-label'),
        'language': document.documentElement.lang
      });
    });
  });

  // Track footer link clicks
  document.querySelectorAll('.footer-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'footer_click', {
        'event_category': 'navigation',
        'event_label': this.textContent.trim(),
        'language': document.documentElement.lang
      });
    });
  });
})();