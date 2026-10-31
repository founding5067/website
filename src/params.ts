import { defineParams } from '@sveltejs/kit/params'
import { LEGAL_DOCS } from '#lib/projects.ts'

// Only /projects/<slug>/privacy/, /terms/ and /support/ are doc pages.
export const params = defineParams({
  legal: (param) => (param in LEGAL_DOCS ? param : undefined),
})
