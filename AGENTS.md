# AGENTS.md

## Stack

- **Svelte 5** — runes mode is ON by default (`$state`, `$derived`, `$props`); no legacy reactivity.
- **SvelteKit** — full-stack framework for this static site.
- **Vite v8** — dev server and build, run through the `vite` scripts below.
- **Tailwind CSS v4** — utility-first styling via the `@tailwindcss/vite` plugin.
- **Bun** — runtime used by the convenience scripts in `package.json`.

The commands below work with either Bun or Node: `bun install`/`npm install`, and every script is also runnable directly from `package.json` (`vite dev`, `vitest run`, etc.). Prefer Bun for local dev, as the README does.

## Commands

- Install deps: `bun install` (or `npm install`)
- Start dev server: `vite dev`
- Build static site: `vite build`, then preview with `vite preview`
- Run tests: `vitest run`
- Format / check: `prettier --write .` and `prettier --check .`

## Architecture & conventions

- **Static export.** The site ships as a static build via `@sveltejs/adapter-static`. Every page exports `prerender = true` from its companion `.ts` file (e.g. `src/routes/+page.ts`).
- **Runes throughout.** Use Svelte 5 runes; avoid legacy reactivity (`$store`, `$bindable`) unless intentional.
- **Pages come in pairs.** Each page has a `<name>.svelte` for markup/logic and a sibling `<name>.ts` for route options/exports (e.g. `+page.svelte` + `+page.ts`). Layouts (`+layout.svelte`) may have no companion `.ts`.
- **Asset imports are typed in `src/app.d.ts`.** Declare modules like `*.svg` and `*.mp3` there so Vite resolves them as string URLs.

## Testing

- Vitest + `@testing-library/svelte`, jsdom environment. `vite.config.ts` resolves with the `browser` condition so Svelte picks its client build (the server build's `mount()` throws).
- **One spec per page** under `test/pages/`, named `<page>.spec.ts`. Each page is tested in its own file, with cases grouped in their own `describe` block.
- Cover the prerender flag, headings/roles, accessibility (`aria-*` labels), and interactive behavior; use `afterEach` to unstub globals (e.g. `Audio`).

## Code style

- **TypeScript.** Type checking isn't configured as a separate step here — no `tsc`/`svelte-check` script; rely on the editor and Prettier for correctness.
- Prettier with `prettier-plugin-svelte`; `.prettierrc` uses single quotes and `trailingComma: "all"`. Run prettier after every change — CI runs `format:check`.
- Accessible by default: meaningful roles/labels, `focus-visible` styles, and honor `prefers-reduced-motion`.
- Comment non-obvious logic (e.g. the EV calculator's W/kW storage) so future readers don't have to reverse-engineer it.

## Housekeeping

- Never make a commit yourself.
