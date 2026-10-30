// Prerender every route to static HTML at build time. `prerender.entries` in
// svelte.config.ts only lists where crawling starts; each route still has to
// opt in, otherwise only the empty SPA fallback is emitted.
export const prerender = true
