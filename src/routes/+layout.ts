// Prerender every route to static HTML at build time. `prerender.entries` in
// svelte.config.ts only lists where crawling starts; each route still has to
// opt in, otherwise only the empty SPA fallback is emitted.
export const prerender = true

// Emit every page as <path>/index.html (e.g. projects/ev-calculator/index.html)
// so clean URLs work on GitHub Pages and any other static server.
export const trailingSlash = 'always'
