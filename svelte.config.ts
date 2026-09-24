import adapterStatic from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapterStatic({
      // A single index.html that the browser falls back to for any route not
      // found during prerendering, so client-side navigation never shows a
      // blank page before the first load.
      fallback: 'index.html',
    }),
    // This is a single, static page — prerender it to HTML at build time.
    // '*' asks SvelteKit to prerender every route it can reach statically;
    // with one root route that produces the one HTML file served to GitHub Pages.
    prerender: {
      entries: ['*'],
    },
  },
}

export default config
