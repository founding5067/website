import { describe, it, expect } from 'vitest'
import { externalLink } from './utils'

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
