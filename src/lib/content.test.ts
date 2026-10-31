import { describe, it, expect } from 'bun:test'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import about from './about.json'
import { DOCS_DIR, LEGAL_DOCS, projects } from './projects.ts'

// The site is data-driven, so these tests catch content mistakes (missing
// fields, typos in URLs) before they reach the rendered page.

// Checks a link is an absolute https URL.
function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

describe('about.json', () => {
  // Verifies the header fields shown at the top of the page are filled in.
  it('has a name, role and bio', () => {
    expect(about.name.trim()).not.toBe('')
    expect(about.role.trim()).not.toBe('')
    expect(about.bio.trim()).not.toBe('')
  })

  // Verifies every contact link has a label and an https URL.
  it('has labelled https contact links', () => {
    expect(about.links.length).toBeGreaterThan(0)
    for (const link of about.links) {
      expect(link.label.trim()).not.toBe('')
      expect(isHttpsUrl(link.url), link.url).toBe(true)
    }
  })

  // Verifies no two contact links share a label.
  it('has unique contact link labels', () => {
    const labels = about.links.map((link) => link.label)
    expect(new Set(labels).size).toBe(labels.length)
  })
})

describe('projects.json', () => {
  // Verifies there is at least one project to show.
  it('lists at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  // Verifies each project has the fields the page always renders.
  it('gives every project a title, description and tags', () => {
    for (const project of projects) {
      expect(project.title.trim()).not.toBe('')
      expect(project.description.trim(), project.title).not.toBe('')
      expect(Array.isArray(project.tags), project.title).toBe(true)
    }
  })

  // Verifies a project URL, when set, is an absolute https link.
  // An empty URL is allowed for work in progress.
  it('uses https URLs for projects that have one', () => {
    for (const project of projects) {
      if (project.url === '') continue
      expect(isHttpsUrl(project.url), project.title).toBe(true)
    }
  })

  // Verifies no two projects share a title.
  it('has unique project titles', () => {
    const titles = projects.map((project) => project.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  // Verifies tags are non-empty and not repeated within a project.
  it('has non-empty, unique tags per project', () => {
    for (const project of projects) {
      for (const tag of project.tags) expect(tag.trim()).not.toBe('')
      expect(new Set(project.tags).size, project.title).toBe(
        project.tags.length,
      )
    }
  })

  // Verifies slugs are unique and safe to use as a URL path segment.
  it('has unique, URL-safe slugs', () => {
    const slugs = projects.map((project) => project.slug)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  // Verifies any icon or banner listed points at a file in src/static.
  it('points icon and banner paths at files in src/static', () => {
    for (const project of projects) {
      for (const image of [project.icon, project.banner]) {
        if (!image) continue
        expect(existsSync(join('src/static', image)), image).toBe(true)
      }
    }
  })
})

describe('src/lib/projects/', () => {
  // Verifies every folder matches a project slug and every Markdown file is
  // one the site renders, so a typo doesn't silently drop a page.
  it('only holds docs for known projects', () => {
    const slugs = projects.map((project) => project.slug)
    const names = ['about', ...Object.keys(LEGAL_DOCS)].map((n) => `${n}.md`)
    for (const folder of readdirSync(DOCS_DIR)) {
      expect(slugs, folder).toContain(folder)
      for (const file of readdirSync(join(DOCS_DIR, folder))) {
        expect(names, `${folder}/${file}`).toContain(file)
      }
    }
  })
})
