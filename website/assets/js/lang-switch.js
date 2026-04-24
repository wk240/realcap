/**
 * RealCap Language Switch Module
 * Handles bilingual navigation and user preference persistence
 */

(function() {
  const STORAGE_KEY = 'realcap-lang-preference';

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