// Tiny client-side i18n for the Travel Trips static site.
// Loads /assets/i18n.json once, applies translations to elements with
// data-i18n / data-i18n-attr / data-i18n-html, swaps <html lang>, and
// renders a language switcher (.lang-switcher) on every page.

(function () {
  const SUPPORTED = ['en', 'hu', 'es', 'it', 'fr', 'de', 'pt'];
  const DEFAULT = 'en';
  const STORAGE_KEY = 'tt-lang';

  const LANG_META = {
    en: { label: 'English',     short: 'EN', flag: '🇮🇪' },
    hu: { label: 'Magyar',      short: 'HU', flag: '🇭🇺' },
    es: { label: 'Español',     short: 'ES', flag: '🇪🇸' },
    it: { label: 'Italiano',    short: 'IT', flag: '🇮🇹' },
    fr: { label: 'Français',    short: 'FR', flag: '🇫🇷' },
    de: { label: 'Deutsch',     short: 'DE', flag: '🇩🇪' },
    pt: { label: 'Português',   short: 'PT', flag: '🇵🇹' },
  };

  function detectLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    const url = new URL(window.location.href);
    const q = url.searchParams.get('lang');
    if (q && SUPPORTED.includes(q)) return q;
    const nav = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(nav)) return nav;
    return DEFAULT;
  }

  // Build i18n.json URL relative to this script tag so it works from /services/* too.
  function dictUrl() {
    const s = document.currentScript || Array.from(document.scripts).find(x => x.src && x.src.includes('i18n.js'));
    if (!s) return 'assets/i18n.json';
    const base = s.src.replace(/[^/]+$/, '');
    return base.replace(/assets\/js\/$/, 'assets/') + 'i18n.json';
  }

  function pick(dict, lang, key) {
    if (!dict || !dict[key]) return null;
    return dict[key][lang] || dict[key][DEFAULT] || null;
  }

  function applyTranslations(dict, lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = pick(dict, lang, key);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = pick(dict, lang, key);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (!attr || !key) return;
        const val = pick(dict, lang, key);
        if (val != null) el.setAttribute(attr, val);
      });
    });

    // <title> and meta description via dedicated hooks
    const titleKey = document.querySelector('meta[name="i18n-title"]');
    if (titleKey) {
      const v = pick(dict, lang, titleKey.getAttribute('content'));
      if (v) document.title = v;
    }
    const descKey = document.querySelector('meta[name="i18n-description"]');
    if (descKey) {
      const v = pick(dict, lang, descKey.getAttribute('content'));
      if (v) {
        document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')
          .forEach(m => m.setAttribute('content', v));
      }
    }
  }

  function buildSwitcher(currentLang, onChange) {
    const hosts = document.querySelectorAll('.lang-switcher');
    if (!hosts.length) return;
    hosts.forEach(host => buildOne(host, currentLang, onChange));
  }

  function buildOne(host, currentLang, onChange) {
    host.innerHTML = '';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-switcher__btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Change language');
    btn.innerHTML = `<span class="lang-switcher__flag">${LANG_META[currentLang].flag}</span><span class="lang-switcher__code">${LANG_META[currentLang].short}</span><span class="lang-switcher__caret">▾</span>`;

    const list = document.createElement('ul');
    list.className = 'lang-switcher__list';
    list.setAttribute('role', 'listbox');
    SUPPORTED.forEach(code => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-lang', code);
      if (code === currentLang) li.setAttribute('aria-selected', 'true');
      li.innerHTML = `<span class="lang-switcher__flag">${LANG_META[code].flag}</span><span>${LANG_META[code].label}</span>`;
      li.addEventListener('click', () => {
        onChange(code);
        setOpen(false);
      });
      list.appendChild(li);
    });

    host.appendChild(btn);
    host.appendChild(list);

    let open = false;
    function setOpen(v) {
      open = v;
      host.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!open);
    });
    document.addEventListener('click', (e) => {
      if (!host.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Public API — used by inline scripts (e.g. contact form status messages).
  window.tt_i18n = {
    lang: DEFAULT,
    t: function (_key, fallback) { return fallback || ''; },
  };

  async function init() {
    const lang = detectLang();
    let dict = {};
    try {
      const res = await fetch(dictUrl(), { cache: 'no-cache' });
      if (res.ok) dict = await res.json();
    } catch (_) {}

    window.tt_i18n.t = function (key, fallback) {
      return pick(dict, window.tt_i18n.lang, key) || fallback || '';
    };

    function setLang(newLang) {
      window.tt_i18n.lang = newLang;
      try { localStorage.setItem(STORAGE_KEY, newLang); } catch (_) {}
      applyTranslations(dict, newLang);
      buildSwitcher(newLang, setLang);
    }

    window.tt_i18n.lang = lang;
    applyTranslations(dict, lang);
    buildSwitcher(lang, setLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
