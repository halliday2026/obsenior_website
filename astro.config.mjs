import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project-site configuration.
// The 'base' must match the GitHub repository name exactly.
// Current repo: halliday2026/obsenior_website → base: '/obsenior_website'
//
// TO CHANGE: If the repo is renamed or a custom domain is added:
//   - Custom domain (e.g. obsenior.com): remove 'base' entirely, set site to 'https://obsenior.com'
//   - Renamed repo (e.g. ob-senior-concierge): change base to '/ob-senior-concierge'

export default defineConfig({
  site: 'https://halliday2026.github.io',
  base: '/obsenior_website',
  output: 'static',
  integrations: [
    sitemap(),
  ],
});
