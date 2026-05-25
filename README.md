# OB Senior Concierge — Website

Single-page Astro brochure site for **OB Senior Concierge**, a premium non-medical
senior support service in North County San Diego.

**Live site:** https://halliday2026.github.io/obsenior_website/ *(after deployment)*

---

## Local Development

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:4321/obsenior_website/

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

---

## Deployment

The site deploys automatically to GitHub Pages when you push to `main`.

**First-time setup (do this once):**
1. Go to the GitHub repo → **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"**
3. Push to `main` — the Actions workflow will run and publish the site

The workflow is at [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

---

## Before Going Live — Placeholder Checklist

Complete these steps before sharing the site publicly:

- [ ] **1. Formspree form ID** — Sign up at https://formspree.io, create a form pointing to
  `obpmservices@gmail.com`, and replace `REPLACE_FORM_ID` in
  `src/components/Contact.astro` (line ~6)

- [ ] **2. Founder photo** — Add a 400×500px portrait as `public/founder.jpg`, then in
  `src/components/About.astro`: uncomment the `<img>` block and remove the
  `.photo-placeholder` div

- [ ] **3. Founder bio** — Update the placeholder text in `src/components/About.astro`
  with your personal story, background, and North County connection

- [ ] **4. Hero photography** — Replace the `.hero-placeholder` div in
  `src/components/Hero.astro` with a real `<img>` (warm, light-filled lifestyle photo)

- [ ] **5. OG / social image** — Add a 1200×630px image as `public/og-image.jpg`
  (used when the site is shared on social media)

- [ ] **6. Confirm pricing** — Verify all dollar amounts in `src/components/Pricing.astro`
  before the site goes live

- [ ] **7. GitHub Pages source** — Set to "GitHub Actions" in repo Settings → Pages
  *(see Deployment section above)*

---

## Changing the Base Path (if repo is renamed or custom domain added)

Edit `astro.config.mjs`:

```js
// For a custom domain (e.g. obsenior.com) — remove base entirely:
site: 'https://obsenior.com',
// base: '/obsenior_website',   <- remove this line

// For a renamed repo (e.g. ob-senior-concierge):
base: '/ob-senior-concierge',
```

Also update the `Sitemap:` line in `public/robots.txt` to match.

---

## Tech Stack

- [Astro](https://astro.build) — static site generator
- Plain CSS with custom properties (no framework, no preprocessor)
- Google Fonts: Cormorant Garamond + Inter
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap generation
- [Formspree](https://formspree.io) — contact form backend (no server required)
- GitHub Actions + GitHub Pages — CI/CD and hosting
