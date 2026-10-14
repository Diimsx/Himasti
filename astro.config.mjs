// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: Replace with actual production domain once decided (PRD.md pertanyaan terbuka no. 2)
  site: 'https://himasti.example.com',

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/styleguide') &&
        !page.includes('/404') &&
        !page.includes('/admin'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
