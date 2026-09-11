# Resume Website

A single-page personal site built with [SvelteKit](https://svelte.dev/docs/kit), showcasing who I am and highlighting projects I've built. The home page features an interactive greeting with audio, while the Projects page lists available tools like the Electric Vehicle Charging Calculator.

## Stack

- **[Svelte 5](https://svelte.dev)** - Next-generation web framework with runes (`$state`, `$derived`)
- **[SvelteKit](https://svelte.dev/docs/kit)** - Full-stack framework for building SSR/static sites
- **[Vite](https://vitejs.dev)** - Fast HMR and dev server (v8+)
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS with new syntax and plugin system
- **[Bun](https://bun.sh)** - JS runtime used for development and production builds

## Features

- **Interactive Home Page** - Animated greeting audio, warm "aura" background, personalized bio
- **Projects Gallery** - Card-based layout that auto-adapts (1, 2, or 3 cards side-by-side)
- **Electric Vehicle Charging Calculator** - Calculate charging time, cost, and gasoline equivalent
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Accessibility** - ARIA labels, focus-visible states, reduced motion support

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server
bun run dev -- --open

# Build for production (static site)
bun run build
bun run preview
```

## Project Structure

```
src/
├── routes/               # SvelteKit page routes
│   ├── +layout.svelte    # Root layout with navigation (Home, Projects links)
│   ├── +page.svelte      # Home page with greeting audio and bio
│   └── projects/         # Projects listing page
│       ├── +page.svelte  # Card grid for all projects
│       └── electricVehicleCalculator/
│           └── +page.svelte  # EV calculator tool
├── lib/
│   ├── assets/          # Favicon and audio files
│   ├── aura.css         # Warm background gradients
│   └── components/      # Svelte component library (empty, ready for growth)
└── app.css              # Tailwind v4 imports and color tokens
```

## Testing

Tests are organized by feature using Vitest + Testing Library:

- `test/pages/` - Page component tests (`+page.spec.ts`, calculator, layout, projects)
- Test each page separately with function cases in their own `describe` blocks

```bash
# Run all tests
bun run test

# Format and check (required after changes)
bun run format:check
bun run format
```

## Code Style

- TypeScript strict mode
- Single quotes, trailing commas everywhere
- Prettier with Svelte plugin for formatting

## CI/CD

GitHub Actions workflows:
- `pr-check.yml` - Runs on PRs (build + test)
- `static.yml` - Deploys to Netlify/Vercel from main branch

## Going Further

The site is extensible. Add new pages under `src/routes/` or new projects by appending to the `projects` array in `/projects/+page.svelte`. Each project gets its own route at `src/routes/projects/<name>/+page.svelte`.
