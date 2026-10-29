import { describe, it, expect } from 'vitest'
import about from './about.json'
import projects from './projects.json'

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
})
