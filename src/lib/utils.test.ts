import { describe, it, expect } from 'vitest'
import { externalLink, projectSlug } from './utils'

// Verifies the attributes spread onto every outbound link.
describe('externalLink', () => {
  // Verifies the link opens in a new tab.
  it('opens links in a new tab', () => {
    expect(externalLink('https://example.com')).toMatchObject({
      target: '_blank',
    })
  })

  // Verifies the rel attributes that prevent tab-nabbing and CSRF.
  it('adds safe rel attributes to avoid tab-nabbing and CSRF', () => {
    expect(externalLink('https://example.com')).toMatchObject({
      rel: 'noopener noreferrer nofollow',
    })
  })

  // Verifies the attributes do not depend on the URL passed in.
  it('returns the same attributes regardless of the URL', () => {
    expect(externalLink('https://example.com')).toEqual(
      externalLink('https://other.example/path'),
    )
  })
})

// Verifies how projectSlug derives a URL's final path segment.
describe('projectSlug', () => {
  // Verifies the last meaningful path segment is extracted from a full URL.
  it('extracts the final path segment from a full URL', () => {
    expect(
      projectSlug('https://github.com/handle/electric-vehicle-calculator'),
    ).toBe('electric-vehicle-calculator')
  })

  // Verifies a trailing slash is stripped before taking the last segment.
  it('handles a trailing slash', () => {
    expect(projectSlug('https://example.com/projects/')).toBe('projects')
  })

  // Verifies the query string and fragment are ignored.
  it('ignores query strings and fragments', () => {
    expect(projectSlug('https://example.com/path/page?ref=share#section')).toBe(
      'page',
    )
  })

  // Verifies the original URL is returned when the path has no segments.
  it('returns the original URL when there is no path segment', () => {
    expect(projectSlug('https://example.com')).toBe('https://example.com')
  })
})
