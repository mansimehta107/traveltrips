# Travel Trips — Website

Static marketing site for Travel Trips, an Erasmus services business operating in Dublin and Budapest.

Pure HTML / CSS / vanilla JS. No build step. CDN-loaded animations (Lenis + GSAP). Drop the folder onto any static host and it works.

Live site: https://traveltrips.ie/

## Local preview

Just open `index.html` in a browser. That's it.

If you want a local server (some browsers handle relative paths better through one):

```
npx serve .
```

Then open the URL it prints (usually http://localhost:3000).

## File map

Pages use clean URLs (no `.html` extension) — each page lives at `<folder>/index.html`.

```
index.html                                       →  /
about/index.html                                 →  /about/
contact/index.html                               →  /contact/  (Formspree-wired form)
services/<name>/index.html                       →  /services/<name>/  (9 service pages)
assets/css/styles.css                            All styles
assets/js/main.js                                Lenis smooth scroll, GSAP reveals, counters, nav
assets/js/i18n.js                                Client-side translation runtime (7 languages)
assets/i18n.json                                 Translation dictionary
assets/img/                                      All photography (WebP, ~2MB total)
sitemap.xml / robots.txt                         SEO
```

## Deploy

The site is currently deployed via **GitHub Pages** from the `main` branch root. Any push to `main` rebuilds automatically (~1 min).

To deploy elsewhere: it's a flat static site, so any host works — Netlify, Vercel, Cloudflare Pages, an S3 bucket. No build step required.

## Contact form

The form on `contact/index.html` POSTs to [Formspree](https://formspree.io) (endpoint `xrejdoke`) via AJAX. Submissions are emailed to `anthony.traveltrips@gmail.com`.

- Free tier: 50 submissions/month
- Spam filtering: Formspree's built-in Akismet
- If JS is disabled, the form falls back to a native POST + Formspree's thank-you redirect

To change the endpoint, edit the `action` attribute on the `<form>` in `contact/index.html`.

## Images

All photos are WebP, served from `assets/img/`. Total weight is ~2MB across 15 files (down from ~24MB as JPGs).

To add a new image: drop the file in `assets/img/`, then reference it with `<img src="/assets/img/your-file.webp">` (absolute paths work from any depth).

## How to update navigation across pages

The nav and footer are duplicated on each page. Copy the snippets in `partials.md` if you add a new page, or use find-and-replace across the folder when you need to update a link.

## Customising colors

All design tokens live at the top of `assets/css/styles.css` inside `:root { ... }`. Change `--accent` to swap the accent colour.
