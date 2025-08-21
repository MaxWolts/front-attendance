// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    build: {
      rollupOptions: {},
    },
  },
  site: 'https://maxwolts.github.io/front-attendance',
  base: 'https://github.com/MaxWolts/front-attendance'
});