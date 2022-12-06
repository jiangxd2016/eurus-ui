import fs from 'fs';
import * as path from 'path';
import sass from 'sass';

const OUT_PATH = 'dist/css';
const INPUT_PATH = 'src/scss';
const SCSS_OUT_PATH = 'dist/scss';
const DIST_STYLE_PATH = 'dist/style.css';
export const compileToCSS = function (nodeEnv: string) {

  if (!fs.existsSync(SCSS_OUT_PATH)) {
    fs.mkdirSync(SCSS_OUT_PATH, { recursive: true });
  }
  if (!fs.existsSync(OUT_PATH)) {
    fs.mkdirSync(OUT_PATH, { recursive: true });
  }

  const css = sass.compile(INPUT_PATH + '/index.scss',);
  fs.writeFileSync(OUT_PATH + '/index.css', css.css.toString());

  if (nodeEnv === 'all') {
    const styleCss = fs.readFileSync(DIST_STYLE_PATH, 'utf8');
    // base.css和vite生产的style.css合并
    fs.writeFileSync('dist/style.css', css.css.toString() + '\n' + styleCss);
    copyDir(INPUT_PATH, SCSS_OUT_PATH);

    fs.writeFileSync('dist/es/style.css', css.css.toString() + '\n' + styleCss);

  }
};

// 递归复制目录
function copyDir(source: string, destination: string): void {
  // 读取源目录
  fs.readdir(source, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // 创建目标目录
    fs.mkdir(destination, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      // 遍历源目录中的文件
      files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const destinationPath = path.join(destination, file);

        // 如果当前文件是一个目录，则递归复制
        fs.stat(sourcePath, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          if (stats.isDirectory()) {
            copyDir(sourcePath, destinationPath);
          } else {
            // 否则，复制文件
            fs.copyFile(sourcePath, destinationPath, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });
          }
        });
      });
    });
  });
}
