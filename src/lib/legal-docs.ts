// Kept apart from projects.ts, which reads files with node:fs and so must
// never reach the browser bundle; the route param matcher needs this list.
// Maps a URL segment (/projects/<slug>/privacy/) to the page heading.
// (Named "legal" for the route param; Support is the App Store support URL.)
export const LEGAL_DOCS = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
  support: 'Support',
} as const

export type LegalDoc = keyof typeof LEGAL_DOCS
