import fs from 'fs';
import path from 'path';
import { templateCompile } from '@estjs/tools';

const globaleComponentPrefix = 'E';

const resolve = (path2: string) => path.resolve(path.resolve(), path2);

const args = process.argv.splice(2);

function firstUpcase(str: string) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/^\S/, s => s?.toUpperCase());
}

function renderTemplate(template: string, data: object) {
  const temp = new templateCompile(template);
  temp.compile();
  return temp.render(data);
}

async function createComponent(name: string, tempPath: string, outPath: string) {
  fs.readdir(tempPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
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
          const template = renderTemplate(file, { name: globaleComponentPrefix + name });

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
  });
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

  fs.mkdirSync(outPath);

  const comptName = firstUpcase(name);
  const tempPath = resolve('./scripts/_temp');
  const distPath = resolve(`./src/packages/${name}`);

  createComponent(comptName, tempPath, distPath);

})();

