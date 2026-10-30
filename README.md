# Personal Website

A clean, minimal personal website built with **SvelteKit** and
[`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static). It describes who I am and links out to my projects — the projects themselves are not hosted here.

## Features

- Single, fast static page (prerendered to HTML at build time).
- Content is data-driven: edit `src/lib/about.json` and `src/lib/projects.json` to update the site. In `about.json`, `paragraphs` is the intro text, `photo` points at an image in `src/static/` (e.g. `src/static/me.jpg` → `"/me.jpg"`; initials show until it exists), and each link's optional `icon` is a key from `src/lib/icons.ts`.
- Safe outbound links (opens in a new tab with `rel="noopener noreferrer nofollow"`).
- Deployed to GitHub Pages automatically on push to `main`.

## Getting started

```bash
bun install
bun run dev
```

## Build & deploy

```bash
bun run build   # outputs a static site to ./build
bun run preview # local preview of the build
```

The GitHub Pages workflow builds and deploys `./build` automatically.

## Scripts

| Command                | Purpose                      |
| ---------------------- | ---------------------------- |
| `bun run dev`          | Start the dev server         |
| `bun run build`        | Static production build      |
| `bun run preview`      | Preview the production build |
| `bun run test`         | Run tests (Bun)              |
| `bun run typecheck`    | Type-check (svelte-check)    |
| `bun run format:check` | Check formatting (Prettier)  |
