import { describe, it, expect } from 'vitest'
import { externalLink } from './utils'

describe('externalLink', () => {
  it('opens links in a new tab with safe rel attributes', () => {
    expect(externalLink('https://example.com')).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
    })
  })
})
