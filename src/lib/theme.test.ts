// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { toggleTheme } from './theme'

describe('toggleTheme', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to dark when there is no persisted theme', () => {
    expect(toggleTheme()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('toggles from dark to light', () => {
    document.documentElement.dataset.theme = 'dark'
    expect(toggleTheme()).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('toggles from light back to dark', () => {
    document.documentElement.dataset.theme = 'light'
    expect(toggleTheme()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('returns exactly what it wrote to the <html> dataset', () => {
    const result = toggleTheme()
    expect(result).toBe(document.documentElement.dataset.theme)
  })
})
