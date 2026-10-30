import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { plugin } from 'bun'
import { compile } from 'svelte/compiler'

GlobalRegistrator.register()

// Lets tests import .svelte components: each file is compiled to its
// server-render form, matching how the static build prerenders the page.
plugin({
  name: 'svelte',
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      const source = await Bun.file(path).text()
      const { js } = compile(source, { filename: path, generate: 'server' })
      return { contents: js.code, loader: 'js' }
    })
  },
})
