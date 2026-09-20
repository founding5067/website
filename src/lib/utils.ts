// Helpers for the personal site. Kept small so they're easy to edit and test.

// Build the anchor attributes for an outbound link: always opens in a new tab
// with the recommended rel attributes to avoid tab-nabbing and CSRF issues.
// Note: pass `href` explicitly on the element (don't spread href here).
export function externalLink(url: string) {
  return {
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
  }
}
