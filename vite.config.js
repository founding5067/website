/// <reference types="vitest/config" />

import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

// Enable allowImportingTsExtensions for .svelte imports in SvelteKit
// See: https://kit.svelte.dev/docs/modules/vite-plugin-svelte#files-directive

export default defineConfig({
  plugins: [sveltekit()],

  optimizeDeps: {
    include: ['@sveltejs/kit'],
    exclude: ['firebase', 'tesla', 'vercel'],
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
