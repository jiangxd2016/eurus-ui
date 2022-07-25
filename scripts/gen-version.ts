import fs from 'fs';
import path from 'path';
import pkg from '../package.json';

export default function genVersion() {
  const srcPath = path.join(path.resolve(), 'src');
  const version = pkg.version;
  fs.writeFileSync(path.resolve(srcPath, 'version.ts'), `export default '${version}';\n`);
}
