// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { toggleTheme } from './theme'

// beforeEach removes any stored theme so each test starts with a clean slate.
describe('toggleTheme', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  // Verifies the default (no stored theme) returns and writes 'dark'.
  it('defaults to dark when there is no persisted theme', () => {
    expect(toggleTheme()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  // Verifies a stored 'dark' value flips to 'light' and is persisted.
  it('toggles from dark to light', () => {
    document.documentElement.dataset.theme = 'dark'
    expect(toggleTheme()).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  // Verifies a stored 'light' value flips back to 'dark' and is persisted.
  it('toggles from light back to dark', () => {
    document.documentElement.dataset.theme = 'light'
    expect(toggleTheme()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  // Verifies the return value matches the value written to <html data-theme>.
  it('returns exactly what it wrote to the <html> dataset', () => {
    const result = toggleTheme()
    expect(result).toBe(document.documentElement.dataset.theme)
  })
})
