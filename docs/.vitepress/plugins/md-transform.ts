import path from 'path'
import fs from 'fs'
import klawSync from 'klaw-sync'
import type { Plugin } from 'vite'
import { LibraryCss, LibraryJs, packagesDir } from '../constants';

const dirname = path.resolve('../')

const PACKAGES_PATH = path.resolve(dirname, packagesDir)
const DIST_PATH = path.resolve(dirname, './dist/')

const components = klawSync(PACKAGES_PATH, {
  nofile: true,
  depthLimit: 0,
}).map(dir => path.basename(dir.path))

export function MarkdownTransform(): Plugin {
  return {
    name: 'element-plus-md-transform',
    enforce: 'pre',
    async transform(code, id) {

      if (!id.endsWith('.md')) {
        return
      }

      const componentId = path.basename(id, '.md')

      if (!components.includes(componentId)) { return }
      const srcArr = code.match(/(?<=src=").*?(?=")/g)
      if (!srcArr || srcArr.length === 0) {
        return
      }

      const source = fs.readFileSync(path.resolve(PACKAGES_PATH, srcArr[0]), 'utf-8');
      const distJs = fs.readFileSync(path.resolve(DIST_PATH, LibraryJs), 'utf-8');
      const distCss = fs.readFileSync(path.resolve(DIST_PATH, LibraryCss), 'utf-8');
      const codeSplit = code.split('code-demo')

      return {
        code: codeSplit[0] + `code-demo source="${encodeURIComponent(source)}" distJs="${encodeURIComponent(distJs)}" distCss="${encodeURIComponent(distCss)}"` + codeSplit[1],
      }
    },
  }
}
