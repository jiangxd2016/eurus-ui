import fs from 'fs';
import path from 'path';
import { templateCompile, toKebabCase, toPascalCase } from '@estjs/tools';
import { genDocs } from './gen-docs';

const globaleComponentPrefix = 'E';

const resolve = (path2: string) => path.resolve(path.resolve(), path2);

const args = process.argv.splice(2);

function renderTemplate(template: string, data: object) {
  const temp = new templateCompile(template);
  temp.compile();
  return temp.render(data);
}

function createComponent(name: string, tempPath: string, outPath: string) {

  const files = fs.readdirSync(tempPath);
  files.forEach((filename) => {
    const filedir = path.join(tempPath, filename);
    const outdir = path.join(outPath, filename);
    fs.stat(filedir, (error, stats) => {
      if (error) {
        console.warn('获取文件stats失败');
      }
      const isFile = stats.isFile();
      const isDir = stats.isDirectory();
      if (isFile) {
        const file = fs.readFileSync(filedir, 'utf-8');
        const fileName = path.basename(filedir);
        const template = renderTemplate(file, { prefixName: globaleComponentPrefix + toPascalCase(name), name });
        console.log('outPath', outPath);
        fs.writeFileSync(outPath + '/' + fileName.split('.temp')[0], template);

      }
      if (isDir) {
        if (!fs.existsSync(outdir)) {
          fs.mkdirSync(outdir);
        }
        createComponent(name, filedir, outdir);
      }
    });
  });
}

function appendToComponents(name: string) {
  const compts = fs.readFileSync(resolve('./src/components.ts'), 'utf-8');
  fs.writeFileSync(resolve('./src/components.ts'), compts + '\n' + `export  * from './${name}';`);
}

(async () => {
  const [name] = args;
  if (!name) {
    console.warn('please enter component name!');
    return;
  }
  const outPath = path.resolve('src/packages', name);

  if (fs.existsSync(outPath)) {
    console.warn('dir exist!');
    return;
  }

  fs.mkdirSync(outPath);

  const comptName = toKebabCase(name);
  const tempPath = resolve('./scripts/_temp');
  const distPath = resolve(`./src/packages/${name}`);

  createComponent(comptName, tempPath, distPath);

  genDocs();
  genDocs('en');

  appendToComponents(name);

})();

