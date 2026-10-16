# AGENTS.md

## Project purpose

This is a **personal website** — a single, static page describing who the author is (bio, role, contact) and linking out to their projects with one-line descriptions. The projects themselves are **not** part of this repo.

## Stack

- **SvelteKit** (Svelte 5) with **`@sveltejs/adapter-static`** — prerenders the root route to static HTML.
- **Bun** is the runtime, package manager, and test runner — `bun.lock` is the source of truth (no npm/pnpm/yarn lockfiles exist). `bunfig.toml` sets `run.bun = true` so Vite, svelte-kit, svelte-check, and Prettier run on Bun instead of Node. Tests use `bun test` with a happy-dom preload (`src/test-setup.ts`). The workflows use `oven-sh/setup-bun`, pinned via `packageManager` in `package.json`.
- **Vite** remains the bundler (running on Bun): SvelteKit's build and prerender pipeline is Vite plugins, which `Bun.build` can't replace.
- Content lives in JSON: `src/lib/about.json`, `src/lib/projects.json`. Edit those to update the site — no component changes needed.
- Build helpers live in `src/lib/utils.ts` (e.g. `externalLink`).

## Commands

- `bun install` — install dependencies
- `bun run dev` — local dev server
- `bun run build` — static build (outputs `build/`)
- `bun run preview` — preview the production build locally
- `bun run test` — run `bun test`
- `bun run format:check` — Prettier check (also run in CI)

## Deployment

Deploys to **GitHub Pages** via `.github/workflows/pages-deploy.yml`. It runs `bun install` → `bun run build` and uploads the **`build/` directory**. Because we use `adapter-static`, the existing pipeline needs **no changes**.

> **Note:** You don't need to run a live server for development. The build creates static files that can be served by any existing server. The README already shows how to run the server with `bun run preview` if needed.

## Conventions

- No semicolons, single quotes, trailing commas (see `.prettierrc`).
- Keep the design clean and minimal. Dark mode is a **manual toggle**: a button in `src/routes/+layout.svelte` flips an attribute on `<html data-theme>` (see `src/lib/theme.ts`), seeded to `dark` in `src/app.html` so the page is never briefly un-themed on load. There is no automatic `prefers-color-scheme` detection.
- Outbound links always use `externalLink()` for safe `rel`.
- Do not make commits yourself
