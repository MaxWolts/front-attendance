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
  site: 'https://front-attendance.vercel.app',
  base: '', // << vacío para Vercel
});