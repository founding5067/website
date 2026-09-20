# AGENTS.md

## Project purpose

This is a **personal website** — a single, static page describing who the author is (bio, role, contact) and linking out to their projects with one-line descriptions. The projects themselves are **not** part of this repo.

## Stack

- **SvelteKit** (Svelte 5) with **`@sveltejs/adapter-static`** — prerenders the root route to static HTML.
- **Bun** is the package manager (`packageManager: bun@latest`).
- Content lives in JSON: `src/lib/about.json`, `src/lib/projects.json`. Edit those to update the site — no component changes needed.
- Build helpers live in `src/lib/utils.js` (e.g. `externalLink`).

## Commands

- `bun install` — install dependencies
- `bun run dev` — local dev server
- `bun run build` — static build (outputs `build/`)
- `bun run preview` — preview the production build locally
- `bun run test` — run Vitest
- `bun run format:check` — Prettier check (also run in CI)

## Deployment

Deploys to **GitHub Pages** via `.github/workflows/pages-deploy.yml`. It runs `bun install` → `bun run build` and uploads the **`build/` directory**. Because we use `adapter-static`, the existing pipeline needs **no changes**.

## Conventions

- No semicolons, single quotes, trailing commas (see `.prettierrc`).
- Keep the design clean and minimal; auto-adapt to the user's color scheme (`prefers-color-scheme`).
- Outbound links always use `externalLink()` for safe `rel`.
- Do not make commits yourself
