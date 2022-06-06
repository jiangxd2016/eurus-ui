import fs from 'fs'
import path from 'path'
import pkg from '../package.json'

const srcPath = path.join(path.resolve(), 'src')

export default async function genVersion() {
  const version = pkg.version
  await fs.writeFileSync(path.resolve(srcPath, 'version.ts'), `export default '${version}'\n`)
}
