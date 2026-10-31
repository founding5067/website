import { describe, it, expect } from 'bun:test'
import { createRawSnippet } from 'svelte'
import { render } from 'svelte/server'
import about from '$lib/about.json'
import projects from '$lib/projects.json'
import Page from './+page.svelte'
import Layout from './+layout.svelte'

// Renders the page to HTML the same way the static build prerenders it.
const { head, body } = render(Page)

describe('+page.svelte', () => {
  // Verifies the name and intro paragraphs show, and the role and bio reach <head>.
  it('renders the about details', () => {
    expect(body).toContain(about.name)
    for (const paragraph of about.paragraphs) {
      expect(body).toContain(paragraph)
    }
    expect(head).toContain(about.role)
    expect(head).toContain(about.bio)
  })

  // Verifies every project in projects.json gets a card linking to its page.
  it('renders a card for every project', () => {
    const cards = body.match(/class="project-card/g) ?? []
    expect(cards.length).toBe(projects.length)
    for (const project of projects) {
      expect(body).toContain(project.title)
      expect(body).toContain(`href="/projects/${project.slug}/"`)
    }
  })

  // Verifies every contact link from about.json is rendered.
  it('renders every contact link', () => {
    for (const link of about.links) {
      expect(body).toContain(`href="${link.url}"`)
      expect(body).toContain(link.label)
    }
  })

  // Verifies every outbound link opens in a new tab with a safe rel.
  it('spreads externalLink attributes onto every outbound link', () => {
    const links = body.match(/<a\b[^>]*href="https?:[^>]*>/g) ?? []
    // Project cards link to on-site pages, so only contact links go out.
    expect(links.length).toBe(about.links.length)
    for (const link of links) {
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer nofollow"')
    }
  })

  // Verifies the optional "What I used" line only appears for projects with a stack.
  it('renders the stack line only when a project has one', () => {
    const withStack = projects.filter((project) => project.stack).length
    const stackLines = body.match(/What I used:/g) ?? []
    expect(stackLines.length).toBe(withStack)
  })

  // Verifies the footer copyright uses the current year and name.
  it('renders the copyright with the current year', () => {
    // Collapse whitespace: the markup wraps the line after the year.
    expect(body.replace(/\s+/g, ' ')).toContain(
      `${new Date().getFullYear()} ${about.name}`,
    )
  })
})

describe('+layout.svelte', () => {
  // Verifies the decorative backdrop is hidden from assistive tech and there
  // is no theme toggle (the site has a single light theme).
  it('renders a hidden backdrop and no theme toggle', () => {
    const children = createRawSnippet(() => ({ render: () => '<div></div>' }))
    const { body } = render(Layout, { props: { children } })
    expect(body).toContain('class="backdrop" aria-hidden="true"')
    expect(body).not.toContain('theme-toggle')
  })
})
