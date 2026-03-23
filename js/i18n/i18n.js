/**
 * i18n Module — Client-side translation system for MetodologIA
 * Singleton that manages language state, JSON loading, and DOM translation.
 */
(function () {
  'use strict';

  var DEFAULT_LANG = 'es';
  var STORAGE_KEY = 'lang';
  var SUPPORTED = ['es', 'en'];

  var cache = {};
  var currentLang = DEFAULT_LANG;
  var basePath = '';
  var ready = false;
  var readyCallbacks = [];

  function detectBasePath() {
    var scripts = document.querySelectorAll('script[src*="i18n/i18n.js"]');
    if (scripts.length > 0) {
      var src = scripts[scripts.length - 1].getAttribute('src');
      return src.replace(/js\/i18n\/i18n\.js$/, '').replace(/\/$/, '') || '.';
    }
    return '.';
  }

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) { /* localStorage disabled */ }
    return null;
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* localStorage disabled */ }
  }

  function detectBrowserLang() {
    var nav = navigator.language || navigator.userLanguage || '';
    return nav.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LANG;
  }

  function resolveLang() {
    return getStoredLang() || detectBrowserLang();
  }

  function getNestedValue(obj, key) {
    var parts = key.split('.');
    var current = obj;
    for (var i = 0; i < parts.length; i++) {
      if (current == null || typeof current !== 'object') return undefined;
      current = current[parts[i]];
    }
    return current;
  }

  function fetchJSONFromXHR(lang) {
    return new Promise(function (resolve, reject) {
      var url = basePath + '/js/i18n/' + lang + '.json';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var data = xhr.response || JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error('i18n: failed to load ' + url + ' (' + xhr.status + ')'));
        }
      };
      xhr.onerror = function () { reject(new Error('i18n: network error loading ' + url)); };
      xhr.send();
    });
  }

  function fetchJSON(lang) {
    if (cache[lang]) return Promise.resolve(cache[lang]);

    // Adapter pattern: use ContentService when available (CMS backend)
    if (window.ContentService && window.ContentService.isReady()) {
      return window.ContentService.getTranslations(lang).then(function (data) {
        if (data) {
          cache[lang] = data;
          return data;
        }
        // ContentService returned null — fall back to static JSON
        return fetchJSONFromXHR(lang).then(function (d) { cache[lang] = d; return d; });
      }).catch(function () {
        // Firestore unavailable — fall back to static JSON
        return fetchJSONFromXHR(lang).then(function (d) { cache[lang] = d; return d; });
      });
    }

    // No content service — use static JSON files
    return fetchJSONFromXHR(lang).then(function (d) { cache[lang] = d; return d; });
  }

  function translateElement(el, translations) {
    var key = el.getAttribute('data-i18n');
    if (key) {
      var val = getNestedValue(translations, key);
      if (val !== undefined && typeof val === 'string') {
        el.textContent = val;
      }
      // Graceful fallback: if key missing, original HTML text is retained
    }

    var htmlKey = el.getAttribute('data-i18n-html');
    if (htmlKey) {
      var htmlVal = getNestedValue(translations, htmlKey);
      if (htmlVal !== undefined) {
        el.innerHTML = htmlVal;
      }
    }

    var attrs = ['placeholder', 'title', 'content', 'aria-label'];
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var attrKey = el.getAttribute('data-i18n-' + attr);
      if (attrKey) {
        var attrVal = getNestedValue(translations, attrKey);
        if (attrVal !== undefined) {
          el.setAttribute(attr, attrVal);
        }
      }
    }
  }

  function translateDOM(root, translations) {
    if (!root || !translations) return;
    var selectors = [
      '[data-i18n]',
      '[data-i18n-html]',
      '[data-i18n-placeholder]',
      '[data-i18n-title]',
      '[data-i18n-content]',
      '[data-i18n-aria-label]'
    ];
    var elements = root.querySelectorAll(selectors.join(','));
    for (var i = 0; i < elements.length; i++) {
      translateElement(elements[i], translations);
    }
    // Also check root itself
    if (root.hasAttribute && (root.hasAttribute('data-i18n') || root.hasAttribute('data-i18n-html'))) {
      translateElement(root, translations);
    }
  }

  function updateHtmlLang(lang) {
    document.documentElement.setAttribute('lang', lang);
  }

  function updateToggleUI(lang) {
    var buttons = document.querySelectorAll('.lang-toggle__btn');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    }
  }

  function applyTranslations(lang) {
    return fetchJSON(lang).then(function (translations) {
      translateDOM(document.body, translations);
      // Also translate elements in shadow DOMs of web components
      var components = document.querySelectorAll('site-header, site-footer');
      for (var i = 0; i < components.length; i++) {
        translateDOM(components[i], translations);
      }
      updateHtmlLang(lang);
      updateToggleUI(lang);
    });
  }

  // Public API
  window.i18n = {
    get lang() { return currentLang; },

    init: function () {
      basePath = detectBasePath();
      currentLang = resolveLang();
      storeLang(currentLang);

      return applyTranslations(currentLang).then(function () {
        ready = true;
        for (var i = 0; i < readyCallbacks.length; i++) {
          readyCallbacks[i]();
        }
        readyCallbacks = [];
      }).catch(function (err) {
        console.warn(err.message);
        ready = true;
      });
    },

    setLang: function (lang) {
      if (SUPPORTED.indexOf(lang) === -1) return Promise.resolve();
      if (lang === currentLang) return Promise.resolve();
      currentLang = lang;
      storeLang(lang);
      return applyTranslations(lang).then(function () {
        document.dispatchEvent(new CustomEvent('langchange', {
          detail: { lang: lang }
        }));
      });
    },

    translate: function (element) {
      if (!element) return Promise.resolve();
      return fetchJSON(currentLang).then(function (translations) {
        translateDOM(element, translations);
      });
    },

    t: function (key) {
      var translations = cache[currentLang];
      if (!translations) return key;
      var val = getNestedValue(translations, key);
      return val !== undefined ? val : key;
    },

    onReady: function (callback) {
      if (ready) { callback(); } else { readyCallbacks.push(callback); }
    }
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.i18n.init(); });
  } else {
    window.i18n.init();
  }
})();
