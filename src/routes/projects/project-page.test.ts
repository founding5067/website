import { describe, it, expect } from 'bun:test'
import { render } from 'svelte/server'
import { legalDocs, projects, renderMarkdown } from '#lib/projects.ts'
import ProjectPage from './[slug]/+page.svelte'
import LegalPage from './[slug]/[doc=legal]/+page.svelte'
import { load as loadProject } from './[slug]/+page.server.ts'
import { load as loadLegal } from './[slug]/[doc=legal]/+page.server.ts'

// Runs a route's load with just the params it reads, as the prerenderer would.
function callLoad(load: Function, params: Record<string, string>) {
  return load({ params })
}

describe('projects/[slug]', () => {
  for (const project of projects) {
    const data = callLoad(loadProject, { slug: project.slug })
    const { head, body } = render(ProjectPage, { props: { data } })

    // Verifies the title reaches the page and <head>.
    it(`renders ${project.title}`, () => {
      expect(body).toContain(project.title)
      expect(head).toContain(project.title)
    })

    // Verifies the outbound link, when set, opens safely in a new tab.
    it(`links ${project.title} out safely`, () => {
      if (!project.url) {
        expect(body).not.toContain('class="link-button"')
        return
      }
      expect(body).toContain(`href="${project.url}"`)
      expect(body).toContain('rel="noopener noreferrer nofollow"')
    })

    // Verifies legal links appear exactly for the docs that exist.
    it(`links ${project.title}'s legal pages`, () => {
      const links = body.match(
        /href="\/projects\/[^"]+\/(privacy|terms|support)\/"/g,
      )
      expect(links?.length ?? 0).toBe(legalDocs(project.slug).length)
    })
  }

  // Verifies an unknown slug is a 404 rather than an empty page.
  it('rejects an unknown slug', () => {
    expect(() => callLoad(loadProject, { slug: 'nope' })).toThrow()
  })
})

describe('projects/[slug]/[doc]', () => {
  const pages = projects.flatMap(({ slug }) =>
    legalDocs(slug).map((doc) => ({ slug, doc })),
  )

  // Verifies each legal page renders a heading and its Markdown.
  it('renders every legal page', () => {
    expect(pages.length).toBeGreaterThan(0)
    for (const params of pages) {
      const data = callLoad(loadLegal, params)
      const { body } = render(LegalPage, { props: { data } })
      expect(body).toContain(`${data.project.title} ${data.title}`)
      expect(body).toContain('<h2>')
    }
  })

  // Verifies a doc without a Markdown file is a 404.
  it('rejects a missing doc', () => {
    expect(() =>
      callLoad(loadLegal, { slug: 'timelabels', doc: 'privacy' }),
    ).toThrow()
  })
})

describe('renderMarkdown', () => {
  // Verifies outbound Markdown links get the safe new-tab attributes and
  // other links are left alone.
  it('adds safe attributes to external links only', () => {
    const html = renderMarkdown('[a](https://example.com) [b](mailto:x@y.z)')
    expect(html).toContain(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">a</a>',
    )
    expect(html).toContain('<a href="mailto:x@y.z">b</a>')
  })
})
