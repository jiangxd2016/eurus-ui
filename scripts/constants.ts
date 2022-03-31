import process, { cwd } from 'process'

import path, { resolve } from 'path'
import type { OutputOptions } from 'rollup'
import klawSync from 'klaw-sync'

export const name = 'eurus-ui'

export const file = (type: string): string => `dist/${name}.${type}.js`

export const defaultInput = 'src/index.ts'
export const defaultOutput: OutputOptions = {
  name,
  file: file('esm'),
  format: 'es',
}

export const dirname = path.resolve()
export const projectPath = path.join(__dirname, '..')
export const compRoot = resolve(projectPath, 'src/packages')
export const srcPath = path.join(projectPath, 'src')

export const isEsm = process.env.MODULE_ENV !== 'cjs'

export const outDir = isEsm ? 'dist/es' : 'dist/lib'
export const tsModuleConfig = `./src/${isEsm ? 'tsconfig.esm.json' : 'tsconfig.cjs.json'}`

export const filePaths = klawSync(path.resolve(cwd(), 'src'), {
  nodir: true,
})
  .map((item) => item.path)
  .filter((file) => {
    return file.endsWith('.ts') && !file.includes('packages')
  })
