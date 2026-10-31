# AGENTS.md

## Project purpose

This is a **personal website** — a static home page describing who the author is (bio, role, contact) with a card per project. Each card opens a landing page on this site (`/projects/<slug>/`), which links out; iOS apps can also have Privacy and Terms pages (`/projects/<slug>/privacy/`, `/terms/`). The projects themselves are **not** part of this repo.

## Stack

- **SvelteKit** (Svelte 5) with **`@sveltejs/adapter-static`** — prerenders every route to static HTML (`trailingSlash = 'always'`, so pages build to `<path>/index.html`).
- **Bun** is the runtime, package manager, and test runner — `bun.lock` is the source of truth (no npm/pnpm/yarn lockfiles exist). `bunfig.toml` sets `run.bun = true` so Vite, svelte-kit, svelte-check, and Prettier run on Bun instead of Node. Tests use `bun test` with a happy-dom preload (`src/test-setup.ts`). The workflows use `oven-sh/setup-bun`, pinned via `packageManager` in `package.json`.
- **Vite** remains the bundler (running on Bun): SvelteKit's build and prerender pipeline is Vite plugins, which `Bun.build` can't replace.
- Content lives in JSON: `src/lib/about.json`, `src/lib/projects.json`. Edit those to update the site — no component changes needed. `about.json` has `paragraphs` (intro), `photo` (served from `src/static/`, initials fallback), and link `icon` keys from `src/lib/icons.ts`.
- Each project in `projects.json` has a `slug` (its URL; don't change it once published) and optional `icon` / `banner` image paths served from `src/static/projects/<slug>/`.
- Long project text is Markdown in `src/lib/projects/<slug>/`: `about.md` (landing page body, falls back to the JSON fields), `privacy.md`, `terms.md`. A legal page exists only when its file does. Rendered at build time with `marked` via `src/lib/projects.ts`.
- Build helpers live in `src/lib/utils.ts` (e.g. `externalLink`, `linkLabel`).

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
- Keep the design clean and minimal. There is a single light theme (cream background, blue accent) defined by the tokens on `:root` in `src/app.css`; there is no dark mode or theme toggle.
- Outbound links always use `externalLink()` for safe `rel`.
- Do not make commits yourself
