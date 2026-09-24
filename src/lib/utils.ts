export function externalLink(url: string) {
  return {
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
  }
}

export function projectSlug(url: string): string {
  return new URL(url).pathname.split('/').filter(Boolean).pop() ?? url
}
