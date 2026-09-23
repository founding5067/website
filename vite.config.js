/// <reference types="vitest/config" />

import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekitVite],

  optimizeDeps: {
    include: ['@sveltejs/kit'],
    exclude: ['firebase', 'tesla', 'vercel'],
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
