import { describe, it, expect } from 'vitest'
import { render } from 'svelte/server'
import about from '$lib/about.json'
import projects from '$lib/projects.json'
import Page from './+page.svelte'
import Layout from './+layout.svelte'

// Renders the page to HTML the same way the static build prerenders it.
const { body } = render(Page)

describe('+page.svelte', () => {
  // Verifies the header shows the name, role and bio from about.json.
  it('renders the about details', () => {
    expect(body).toContain(about.name)
    expect(body).toContain(about.role)
    expect(body).toContain(about.bio)
  })

  // Verifies every project in projects.json gets a card.
  it('renders a card for every project', () => {
    const cards = body.match(/class="project"/g) ?? []
    expect(cards.length).toBe(projects.length)
    for (const project of projects) expect(body).toContain(project.title)
  })

  // Verifies every contact link from about.json is rendered.
  it('renders every contact link', () => {
    for (const link of about.links) {
      expect(body).toContain(`href="${link.url}"`)
      expect(body).toContain(link.label)
    }
  })

  // Verifies every outbound link opens in a new tab with a safe rel.
  it('spreads externalLink attributes onto every link', () => {
    const links = body.match(/<a\b[^>]*>/g) ?? []
    expect(links.length).toBe(projects.length + about.links.length)
    for (const link of links) {
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer nofollow"')
    }
  })

  // Verifies the optional "What I used" line only appears for projects with a stack.
  it('renders the stack line only when a project has one', () => {
    const withStack = projects.filter((project) => project.stack).length
    const stackLines = body.match(/class="stack-block"/g) ?? []
    expect(stackLines.length).toBe(withStack)
  })

  // Verifies the footer copyright uses the current year and name.
  it('renders the copyright with the current year', () => {
    expect(body).toContain(`${new Date().getFullYear()} ${about.name}`)
  })
})

describe('+layout.svelte', () => {
  // Verifies the theme toggle starts in dark mode, matching app.html.
  it('renders the theme toggle in its dark starting state', () => {
    const { body } = render(Layout)
    expect(body).toContain('aria-label="Toggle dark mode"')
    expect(body).toContain('🌙')
  })
})
