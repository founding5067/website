import { describe, it, expect } from 'vitest'
import { externalLink, projectSlug } from './utils'

describe('externalLink', () => {
  it('opens links in a new tab', () => {
    expect(externalLink('https://example.com')).toMatchObject({
      target: '_blank',
    })
  })

  it('adds safe rel attributes to avoid tab-nabbing and CSRF', () => {
    expect(externalLink('https://example.com')).toMatchObject({
      rel: 'noopener noreferrer nofollow',
    })
  })

  it('returns the same attributes regardless of the URL', () => {
    expect(externalLink('https://example.com')).toEqual(
      externalLink('https://other.example/path'),
    )
  })
})

describe('projectSlug', () => {
  it('extracts the final path segment from a full URL', () => {
    expect(
      projectSlug('https://github.com/handle/electric-vehicle-calculator'),
    ).toBe('electric-vehicle-calculator')
  })

  it('handles a trailing slash', () => {
    expect(projectSlug('https://example.com/projects/')).toBe('projects')
  })

  it('ignores query strings and fragments', () => {
    expect(projectSlug('https://example.com/path/page?ref=share#section')).toBe(
      'page',
    )
  })

  it('returns the original URL when there is no path segment', () => {
    expect(projectSlug('https://example.com')).toBe('https://example.com')
  })
})
