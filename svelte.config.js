import adapterStatic from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapterStatic({
      fallback: 'index.html',
    }),
    // This is a single, static page — prerender it to HTML at build time.
    prerender: {
      entries: ['*'],
    },
  },
}

export default config
