import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Custom domain configuration.
// Site is served from obhelp.com — no 'base' needed (assets live at root /).
//
// TO REVERT to GitHub Pages project URL:
//   - Set site back to 'https://halliday2026.github.io'
//   - Add base: '/obsenior_website'
//   - Remove public/CNAME

export default defineConfig({
  site: 'https://obhelp.com',
  output: 'static',
  integrations: [
    sitemap(),
  ],
});
