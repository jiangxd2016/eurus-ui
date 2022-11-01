import fs from 'fs';
import { resolve } from 'path';
import type { Plugin, ResolvedConfig } from 'vite';
import sass from 'sass';

const dirname = resolve();

let viteConfig: ResolvedConfig;

// TODO: 目前只支持sass。
const importCssReg = /import(.*).(scss|less|css)('|")/;
const injectPathReg = /(?<=\s("|')).*?(?=("|'))/;
const pathReg = /(?<=src).*/;

const compileToCSS = async function (path: string) {
  try {
    const res = sass.compile(path, {
      loadPaths: [dirname + '/src/scss/*'],
    });

    const outputDir = viteConfig.inlineConfig?.build?.rollupOptions?.output as any[];
    const resolvePath = resolve(path, '../');
    outputDir.forEach((item) => {
      const output = dirname + '/' + item.dir + resolvePath.match(pathReg)![0];
      if (!fs.existsSync(output)) {
        fs.mkdirSync(output, { recursive: true });
      }
      fs.writeFileSync(output + '/style.css', res.css.toString());

    });

  } catch (e) {
    console.log(e);
  }
};

export default function viteCssPlugin(): Plugin {
  return {
    name: 'vite:css-plugin',
    enforce: 'post',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(code, id) {
      if (id.endsWith('.tsx') && importCssReg.test(code)) {
        const stylePath = code.match(importCssReg)![0].match(injectPathReg)![0];
        const path = resolve(id, '../', stylePath);
        compileToCSS(path);
        return {
          code: code.replace(importCssReg, ''),
          map: null // 如果可行将提供 source map
        };
      }
      return;
    },
  };
}
