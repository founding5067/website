import { defineParams } from '@sveltejs/kit/params'
import { LEGAL_DOCS } from '#lib/projects.ts'

// Only /projects/<slug>/privacy/ and /projects/<slug>/terms/ are legal pages.
export const params = defineParams({
  legal: (param) => (param in LEGAL_DOCS ? param : undefined),
})
