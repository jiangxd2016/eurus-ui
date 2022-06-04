import path from 'path'
import klawSync from 'klaw-sync'

import type { Plugin } from 'vite'
import { packagesDir } from '../../constants';

const PACKAGES_PATH = path.resolve(__dirname, '../../', packagesDir)
console.log(PACKAGES_PATH);

const components = klawSync(PACKAGES_PATH, {
  nofile: true,
  depthLimit: 0,
}).map(dir => path.basename(dir.path))

export function MarkdownTransform(): Plugin {
  return {
    name: 'element-plus-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) { return }

      const componentId = path.basename(id, '.md')

      if (!components.includes(componentId)) { return }

      const append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.globEager('../../../src/packages/${componentId}/demo/demo*.vue')`,
        ],
      }

      code += `
<script setup>
${append.scriptSetups}
</script>
`

      return {
        code,
      }
    },
  }
}
