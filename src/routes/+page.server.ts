import { existsSync } from 'node:fs'
import { join } from 'node:path'
import about from '#lib/about.json'

// Decide at build time whether the photo exists. The page is prerendered, so
// an <img> pointing at a missing file would fail to load before the page's
// script runs and could swap in the initials.
export const load = () => ({
  hasPhoto:
    !!about.photo && existsSync(join(process.cwd(), 'src/static', about.photo)),
})
