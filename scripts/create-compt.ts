import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import klawSync from 'klaw-sync';

import { templateCompile } from '@estjs/tools';

const globaleComponentPrefix = 'E';

const resolve = path2 => path.resolve(path.resolve(), path2);

const args = process.argv.splice(2);

function firstUpcase(str: string) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/^\S/, s => s.toUpperCase());
}

function renderTemplate(template, data) {
  const temp = new templateCompile(template);
  temp.compile();
  return temp.render(data);
}

async function copyDir(src, dist) {
  await child_process.spawn('cp', ['-r', src, dist]);
}
(async () => {
  const name = args[0];
  if (!name) {
    console.warn('please enter component name!');
    return;
  }
  const outPath = path.resolve('src/packages', name);

  if (fs.existsSync(outPath)) {
    console.warn('dir exist!');
    return;
  }
  const comptName = firstUpcase(name);
  const tempPath = resolve('./scripts/_temp');
  const distPath = resolve(`./src/packages/${name}`);

  await copyDir(tempPath, distPath);

  await new Promise(resolve => setTimeout(() => resolve(0), 2000));

  klawSync(distPath, { nodir: true }).forEach((item) => {
    const outPath = path.dirname(item.path);
    console.log(outPath);

    const fileName = path.basename(item.path);
    const file = fs.readFileSync(item.path, 'utf-8');

    const template = renderTemplate(file, { name: globaleComponentPrefix + comptName });

    fs.writeFileSync(outPath + '/' + fileName.split('.temp')[0], template);

    setTimeout(() => {
      fs.unlinkSync(item.path);
    });
  });
})();

