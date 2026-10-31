import { error } from '@sveltejs/kit'
import {
  getProject,
  legalDocs,
  projects,
  readDoc,
  renderMarkdown,
  LEGAL_DOCS,
  type LegalDoc,
} from '#lib/projects.ts'
import type { EntryGenerator, PageServerLoad } from './$types'

// Only prerender the legal pages whose Markdown file exists.
export const entries: EntryGenerator = () =>
  projects.flatMap(({ slug }) => legalDocs(slug).map((doc) => ({ slug, doc })))

export const load: PageServerLoad = ({ params }) => {
  const project = getProject(params.slug)
  const doc = params.doc as LegalDoc
  const source = project && readDoc(project.slug, doc)
  if (!project || !source) error(404, 'Page not found')

  return {
    project,
    title: LEGAL_DOCS[doc],
    html: renderMarkdown(source),
  }
}
