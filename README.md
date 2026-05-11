# Travel Trips — Website

Static marketing site for Travel Trips, an Erasmus services business operating in Dublin and Budapest.

Pure HTML / CSS / vanilla JS. No build step. CDN-loaded animations (Lenis + GSAP). Drop the folder onto any static host and it works.

## Local preview

Just open `index.html` in a browser. That's it.

If you want a local server (some browsers handle relative paths better through one):

```
npx serve .
```

Then open the URL it prints (usually http://localhost:3000).

## File map

```
index.html              Home
about.html              About
contact.html            Contact (placeholder form, no backend wired)
services/               9 service pages
assets/css/styles.css   All styles
assets/js/main.js       Lenis smooth scroll, GSAP reveals, counters, nav
partials.md             Nav + footer HTML snippets to reuse if you add new pages
```

All placeholder images come from `picsum.photos` — they'll always load. Swap them for real photos by replacing the `src` attribute on each `<img>` tag.

## Deploy to GitHub Pages (free)

1. Create a new GitHub repo (e.g. `traveltrips-site`).
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: `Settings → Pages`.
4. Source: `Deploy from a branch`. Branch: `main`. Folder: `/ (root)`.
5. Save. After a minute or two the site is live at:
   `https://<your-username>.github.io/<repo>/`

## Deploy to Vercel (free)

Easiest option — no CLI, no build config needed.

1. Push the folder to GitHub (steps 1–2 above).
2. Go to https://vercel.com → "Add New… → Project".
3. Import the repo.
4. Framework Preset: **Other** (Vercel auto-detects static).
5. Build command: leave blank. Output directory: leave blank (or `.`).
6. Deploy.

Or with the CLI from this folder:
```
npx vercel
```
Follow the prompts and pick "Other" / no build command.

## What's a placeholder right now

- All photos (using picsum.photos seeded images)
- Phone numbers and emails on the contact page
- Social media links in the footer (all point to `#`)
- The contact form has no backend wired — it just shows an alert. To wire it up later, the simplest paths are [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com).

## How to swap placeholder photos

Find any `<img src="https://picsum.photos/...">` in the HTML files. Replace the `src` with either:

- A path to a local file you've added under `assets/img/`, e.g. `src="assets/img/dublin-hero.jpg"` (or `../assets/img/...` from inside `services/`)
- A full URL to a hosted image

## How to update navigation across pages

The nav and footer are duplicated on each page. Copy the snippets in `partials.md` if you add a new page, or use find-and-replace across the folder when you need to update a link.

## Customising colors

All design tokens live at the top of `assets/css/styles.css` inside `:root { ... }`. Change `--accent` to swap the lime green for any other accent colour (e.g. `#4ADE80` for Irish green, `#FF6B35` for orange).
