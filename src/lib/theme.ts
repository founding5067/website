export function toggleTheme(): string {
  if (typeof document === 'undefined') return 'dark'
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  return document.documentElement.dataset.theme
}
