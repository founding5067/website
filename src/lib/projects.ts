import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Marked } from 'marked'
import projectData from './projects.json'
import { externalLink } from './utils.ts'

// Shape of an entry in projects.json. `icon` and `banner` are optional image
// paths served from src/static (e.g. "/projects/ev-calculator/icon.png").
export type Project = {
  slug: string
  title: string
  description: string
  url: string
  type: string
  tags: string[]
  why: string
  stack: string
  skills: string[]
  icon?: string
  banner?: string
}

export const projects = projectData as Project[]

// Legal pages a project can have, keyed by the Markdown file name and the
// URL segment (/projects/<slug>/privacy/). The value is the page heading.
export const LEGAL_DOCS = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
} as const

export type LegalDoc = keyof typeof LEGAL_DOCS

// Long-form project text lives in src/lib/projects/<slug>/<name>.md. Files are
// read from disk rather than imported so a missing file just means "no page";
// this runs at build time (every page is prerendered) and under `bun test`,
// both from the repo root.
export const DOCS_DIR = join(process.cwd(), 'src/lib/projects')

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

// Returns the Markdown for a project's doc, or null when the file is absent.
export function readDoc(slug: string, name: string) {
  const file = join(DOCS_DIR, slug, `${name}.md`)
  return existsSync(file) ? readFileSync(file, 'utf8') : null
}

// Legal docs that exist for a project, in LEGAL_DOCS order.
export function legalDocs(slug: string) {
  return (Object.keys(LEGAL_DOCS) as LegalDoc[]).filter(
    (name) => readDoc(slug, name) !== null,
  )
}

// Markdown renderer whose outbound http(s) links get the same new-tab, safe
// rel attributes as every other outbound link on the site.
const markdown = new Marked({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const titleAttr = title ? ` title="${title}"` : ''
      if (!/^https?:/.test(href)) {
        return `<a href="${href}"${titleAttr}>${text}</a>`
      }
      const { target, rel } = externalLink(href)
      return `<a href="${href}"${titleAttr} target="${target}" rel="${rel}">${text}</a>`
    },
  },
})

// Content is written by the site author, so the HTML is trusted.
export function renderMarkdown(source: string) {
  return markdown.parse(source, { async: false })
}
