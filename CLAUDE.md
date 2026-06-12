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
npm run dev        # Start dev server (http://localhost:4321/)
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
    OBMonogram.astro    # SVG "OB" monogram (kept for reference; Nav/Footer now use ob-logo.png)
    Nav.astro           # Sticky navigation, mobile hamburger
    Hero.astro          # Hero section
    Reassurance.astro   # Dark empathy band
    Services.astro      # 5 service cards with inline SVG icons
    HowItWorks.astro    # 3-step process flow
    Pricing.astro       # 3 pricing plan cards
    FAQ.astro           # FAQ section (6 Q&As) + FAQPage JSON-LD schema
    About.astro         # Founder section (Donna O'Brien)
    Contact.astro       # Formspree contact form (ID: mzdqzkqj) + phone/email fallback
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

## Deployment — GitHub Pages + Custom Domain

The site deploys to **`https://obhelp.com`** via GitHub Actions (push to `main`).

**Current config in `astro.config.mjs`:**
```js
site: 'https://obhelp.com',
// No 'base' — custom domain serves from root /
```

**`public/CNAME`** contains `obhelp.com` — this preserves the custom domain across deploys.
Do not delete this file.

**If the domain ever changes:**
1. Update `site` in `astro.config.mjs`
2. Update `public/CNAME`
3. Update the sitemap URL in `public/robots.txt`
4. Update the `url` field in the `jsonLd` object in `src/layouts/Layout.astro`

---

## Remaining Placeholders

| # | What | Where | Status |
|---|------|-------|--------|
| 1 | **OG image** | `src/layouts/Layout.astro` | Add `public/og-image.jpg` (1200×630px) — auto-loads from `Astro.site` |
| 2 | **Founder bio** | `src/components/About.astro` | Replace placeholder paragraphs with Donna's story |
| 3 | **Pricing confirmation** | `src/components/Pricing.astro` | Verify all dollar amounts before launch |

*Already completed:* Formspree ID (mzdqzkqj), founder photo (public/founder.jpg), hero photo (public/hero-photo.jpg), GitHub Pages source set, custom domain configured.

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
errands, and coordination. If in doubt, lean on words like "support," "assistance,"
"coordination," and "concierge."

**Red-light words (do not use):** companion, companionship, caregiver, home care,
home help, patient (as noun), sitting, care plan, activities of daily living, ADLs.

---

## SEO & AEO Strategy

**Live URL:** https://obhelp.com
**Validate schemas:** https://search.google.com/test/rich-results

### Target Keywords
All paired with "San Diego" or "North County San Diego":
- Senior Concierge *(primary)*
- Personal Assistant for Seniors *(primary)*
- Senior Assistant
- Senior Transportation
- Senior Lifestyle Management
- Errand Service for Seniors

### Structured Data in Place (`src/layouts/Layout.astro`)
- **LocalBusiness + ProfessionalService** — dual `@type`, includes `founder` (Donna O'Brien),
  `serviceType` array, `hasOfferCatalog` with all 5 services, expanded `areaServed`
- **FAQPage** — in `src/components/FAQ.astro` via inline `<script type="application/ld+json">`

### Service Area (areaServed in JSON-LD)
Carmel Valley, Rancho Bernardo, Del Mar, Solana Beach, Poway, 4S Ranch, Scripps Ranch,
North County San Diego, San Diego.
*Update the `areaServed` array in `Layout.astro` if the service area expands.*

### FAQ Component (`src/components/FAQ.astro`)
Contains 6 targeted Q&As — the primary AEO asset. If pricing, services, or service area
changes, update both the visible answer text in the `faqs` array AND the `faqSchema`
object in the same file — they must stay in sync.

### Approved Vocabulary
lifestyle management, personal assistant, errand runner, home organizer,
vendor coordinator, tech tutoring, administrative support, social visits.
