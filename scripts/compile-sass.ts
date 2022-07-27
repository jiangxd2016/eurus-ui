import { resolve, basename } from 'path';
import fs from 'fs';
import sass from 'sass';

import klawSync from 'klaw-sync';
const dirname = resolve();

export default function complieSass() {

  const outDir = 'dist/css';
  const inputPath = 'src/scss';
  const scssOutPath = 'dist/scss';
  const base = sass.compile('src/scss/base.scss');
  const atomic = sass.compile('src/scss/atomic.scss', {
    loadPaths: [dirname + '/src/scss/*'],
  });
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const styleCss = fs.readFileSync('dist/style.css', 'utf8');

  fs.writeFileSync(outDir + '/base.css', base.css.toString());
  fs.writeFileSync(outDir + '/atomic.css', atomic.css.toString());

  // base.css和vite生产的style.css合并
  fs.writeFileSync('dist/style.css', base.css.toString() + '\n' + atomic.css.toString() + '\n' + styleCss);

  // 复制scss 文件
  klawSync(inputPath, { nodir: true }).forEach((item) => {
    if (!fs.existsSync(scssOutPath)) {
      fs.mkdirSync(scssOutPath, { recursive: true });
    }
    const name = basename(item.path);
    const file = fs.readFileSync(item.path);
    fs.writeFileSync(scssOutPath + '/' + name, file);
  });
}

