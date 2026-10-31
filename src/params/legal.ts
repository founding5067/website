import type { ParamMatcher } from '@sveltejs/kit'
import { LEGAL_DOCS } from '$lib/projects.ts'

// Only /projects/<slug>/privacy/ and /projects/<slug>/terms/ are legal pages.
export const match = ((param) => param in LEGAL_DOCS) satisfies ParamMatcher
