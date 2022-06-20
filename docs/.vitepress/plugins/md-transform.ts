import path from 'path'
import fs from 'fs'
import klawSync from 'klaw-sync'
import type { Plugin } from 'vite'
import { packagesDir } from '../constants';

const dirname = path.resolve('../')

const PACKAGES_PATH = path.resolve(dirname, packagesDir)

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
      const src = code.match(/(?<=src=").*?(?=")/g)![0];

      const source = fs.readFileSync( path.resolve(PACKAGES_PATH, src), 'utf-8');
      const codeSplit = code.split('code-demo')
      const distPath = dirname + '/dist/'

      return {
        code: codeSplit[0] + `code-demo source="${encodeURIComponent(source)}" distPath="${distPath}"` + codeSplit[1],
      }
    },
  }
}
