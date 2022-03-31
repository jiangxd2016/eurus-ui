import fs from 'fs'
import path from 'path'
import pkg from '../package.json'
import { srcPath } from './constants'

const version = pkg.version

fs.writeFileSync(path.resolve(srcPath, 'version.ts'), `export default '${version}'\n`)
