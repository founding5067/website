# Resume Website

A single-page personal site built with [SvelteKit](https://svelte.dev/docs/kit), currently showing a home page that introduces who I am. More pages (resume, projects, blog) will be added later.

## Dev

```bash
npm install
npm run dev -- --open
```

## Build (static)

```bash
npm run build
npm run preview
```

The build is fully prerendered by `@sveltejs/adapter-static` into `build/`, so you can host that folder on any static host (GitHub Pages, Netlify, Vercel, a simple file server...).

## Background

The warm animated "aura" background is a basic-CSS approximation of the effect on
[seanhalpin.xyz](https://www.seanhalpin.xyz/) (soft radial-gradients in an
orange/yellow/blue palette, drifting slowly via transform, with a fade
into the cream page color).

Tweak it in `src/lib/aura.css` — the colors are CSS variables at the top of that file.
