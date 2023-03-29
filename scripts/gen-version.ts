import fs from 'node:fs';
import path from 'node:path';
import pkg from '../package.json';

(() => {
  const srcPath = path.join(path.resolve(), 'src');
  const version = pkg.version;
  fs.writeFileSync(path.resolve(srcPath, 'version.ts'), `export default '${version}';\n`);
}
)();
