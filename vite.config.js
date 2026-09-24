/// <reference types="vitest/config" />

import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],

  optimizeDeps: {
    include: ['@sveltejs/kit'],
    // These packages are excluded from Vite's pre-bundle step because they
    // are not imported by this site (they were used by projects that are no
    // longer here). Bundling them would slow down dev server startup for no
    // benefit and would force them to be rebuilt on every change.
    exclude: ['firebase', 'tesla', 'vercel'],
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
