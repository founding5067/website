import adapterStatic from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import about from './src/lib/about.json' with { type: 'json' }

const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Point Vite's public directory at `src/static` so files placed there
    // (e.g. the favicon) are copied into the build output root and served at
    // the site root (`/favicon.svg`), instead of being dropped by the build.
    // The default resolves to `<root>/static`, which is wrong for the
    // `src/static` convention, so set it explicitly.
    files: { assets: 'src/static' },
    adapter: adapterStatic({
      // GitHub Pages serves 404.html for unknown paths. Using a name other
      // than index.html keeps the prerendered root page from being
      // overwritten by the empty SPA shell.
      fallback: '404.html',
    }),
    // This is a single, static page — prerender it to HTML at build time.
    // '*' asks SvelteKit to prerender every route it can reach statically;
    // with one root route that produces the one HTML file served to GitHub Pages.
    prerender: {
      entries: ['*'],
      // The crawler follows <img> sources, so a photo listed in about.json
      // but not yet added to src/static would fail the build. Tolerate that
      // one path (the page falls back to initials) and fail on anything else.
      handleHttpError: ({ path, message }) => {
        if (path === about.photo) return
        throw new Error(message)
      },
    },
  },
}

export default config
