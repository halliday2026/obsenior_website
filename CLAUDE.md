# OB Senior Concierge — Project Guide

## Project Overview
Single-page Astro brochure site for **OB Senior Concierge**, a premium non-medical senior
support service based in San Diego (North County: Carmel Valley, Rancho Bernardo).

**Audience:** Independent seniors + adult children arranging support for aging parents.
**Tone:** Trusted, steady, discreet, capable, warm, unhurried, professional.
**Never:** medical claims, clinical language, discount/budget framing.

---

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:4321/obsenior_website/)
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run check      # TypeScript / Astro type checking
```

---

## Architecture

```
src/
  layouts/
    Layout.astro        # Base HTML shell — SEO, fonts, JSON-LD, skip link
  components/
    OBMonogram.astro    # Reusable SVG "OB" monogram (used in Nav + Footer)
    Nav.astro           # Sticky navigation, mobile hamburger
    Hero.astro          # Hero section (photo placeholder)
    Reassurance.astro   # Dark empathy band
    Services.astro      # 5 service cards with inline SVG icons
    HowItWorks.astro    # 3-step process flow
    Pricing.astro       # 3 pricing plan cards
    About.astro         # Founder section (photo + bio placeholder)
    Contact.astro       # Formspree contact form + phone/email fallback
    Footer.astro        # Footer with nav, contact, copyright
  pages/
    index.astro         # Assembles all components; scroll-reveal JS
  styles/
    global.css          # Design tokens (:root), reset, base styles, utilities
public/
  favicon.svg           # SVG monogram favicon (hardcoded hex, no CSS vars)
  .nojekyll             # Prevents Jekyll processing on GitHub Pages
  robots.txt            # Search engine crawl config + sitemap pointer
.github/workflows/
  deploy.yml            # GitHub Actions: build → deploy to Pages
```

**Content/copy lives in the individual component files** — each is self-contained with
its data at the top of the frontmatter. Edit content by opening the relevant component.

---

## Design System

All design tokens are defined as CSS custom properties in `src/styles/global.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--ink` | `#1f3a52` | Primary navy — headings, nav, dark UI |
| `--cream` | `#f7f3ec` | Warm neutral — section backgrounds |
| `--surface` | `#ffffff` | Card / section white |
| `--accent` | `#b08d4f` | Gold — use sparingly (dividers, badges, buttons) |
| `--sage` | `#8aa090` | Soft sage — icons, secondary accents |
| `--text` | `#2b2b2b` | Body copy |
| `--muted` | `#5e6b73` | Secondary text, captions |

**Typography:**
- Headings: Cormorant Garamond (serif) — loaded via Google Fonts in `Layout.astro`
- Body: Inter (sans) — same Google Fonts request
- Base size: 18px (generous for older audience); line-height ~1.65

**Principle:** Gold is "fine, not flashy" — restrict to dividers, the monogram ring,
featured-plan badge, and primary buttons. Never use it for large fills or backgrounds.

---

## Deployment — GitHub Pages

The site deploys to `https://halliday2026.github.io/obsenior_website/` via GitHub Actions.

**Base path:** Configured in `astro.config.mjs`:
```js
site: 'https://halliday2026.github.io',
base: '/obsenior_website',   // matches repo name — change if repo is renamed
```

**First-time setup (one-time manual step):**
1. In the GitHub repo → Settings → Pages → Source → select **"GitHub Actions"**
2. Push to `main` — the workflow runs automatically

**Custom domain:** If Donna adds `obsenior.com` (or similar):
1. Remove `base` from `astro.config.mjs`
2. Update `site` to `'https://obsenior.com'`
3. Add a `CNAME` file to `public/` containing just the domain name

---

## Placeholders — Must Fill Before Launch

| # | What | Where | Action |
|---|------|-------|--------|
| 1 | **Formspree form ID** | `src/components/Contact.astro` line ~6 | Replace `REPLACE_FORM_ID` with real ID from formspree.io |
| 2 | **Founder photo** | `src/components/About.astro` | Add `public/founder.jpg` (400×500px), uncomment `<img>`, remove `.photo-placeholder` div |
| 3 | **Founder bio** | `src/components/About.astro` | Replace placeholder paragraphs with Donna's actual story |
| 4 | **Hero photography** | `src/components/Hero.astro` | Add real photo, replace `.hero-placeholder` div with `<img>` |
| 5 | **OG image** | `src/layouts/Layout.astro` | Add `public/og-image.jpg` (1200×630px); it auto-loads from `Astro.site` |
| 6 | **Pricing confirmation** | `src/components/Pricing.astro` | Verify all dollar amounts before going live |
| 7 | **GH Pages source** | GitHub repo Settings → Pages | Set to "GitHub Actions" before first push |

---

## Adding a New Section

1. Create `src/components/NewSection.astro`
2. Give it `id="new-section"` on the `<section>` element and `aria-labelledby`
3. Import and add it in `src/pages/index.astro` in the correct order
4. Add a nav link in `src/components/Nav.astro` (both desktop and mobile lists)

---

## Accessibility Notes (preserve for older audience)

- Every section has `aria-labelledby` pointing to its `<h2>`
- All form fields have real `<label>` elements and `aria-required`
- Touch targets are ≥ 44px (buttons, inputs, links)
- Skip-to-content link is the first focusable element in `Layout.astro`
- Scroll animations are disabled under `prefers-reduced-motion`
- Maintain minimum 4.5:1 contrast for all body text

---

## Non-Medical Guardrail

The site must **never** imply medical, clinical, nursing, or caregiving services.
Keep all copy in the domain of: administrative support, scheduling, organization,
companionship, errands, and coordination. If in doubt, lean on words like
"support," "assistance," "coordination," and "concierge."
