import fs from 'fs';
import { resolve } from 'path';
import type { Plugin, ResolvedConfig } from 'vite';
import sass from 'sass'

const dirname = resolve();

let viteConfig: ResolvedConfig;
const injectPath = resolve(dirname, './src/stylus/inject.scss');
const InjectCss: string = fs.readFileSync(injectPath, 'utf-8');

const fileRegex = /.(scss|less|css)(\?used)?$/;
const replaceReg = /import(.*).(scss|less|css)('|")/;
const injectPathReg = /(?<=\s("|')).*?(?=("|'))/
const pathReg = /(?<=src).*/

const compileToCSS = async function (css: string, path: string) {
  try {
    const res = sass.renderSync({ includePaths: [injectPath], data: InjectCss + css });

    const outputDir = viteConfig.inlineConfig.build.rollupOptions.output as any[]
    const resolvePath = resolve(path, '../')

    outputDir.forEach((item) => {
      const output = dirname + '/' + item.dir + resolvePath.match(pathReg)[0]
      if (!fs.existsSync(output)) {
        fs.mkdirSync(output, { recursive: true })
      }
      fs.writeFileSync(output + '/style.css', res.css.toString())

    })

  } catch (e) {
    console.log(e)
  }
}

export default function viteCssPlugin(): Plugin {
  return {
    name: 'vite-css-plugin',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(code, id) {
      if (id.endsWith('.tsx') && replaceReg.test(code)) {
        const stylePath = code.match(replaceReg)[0].match(injectPathReg)[0];
        const path = resolve(id, '../', stylePath);
        const css = fs.readFileSync(path, 'utf-8');
        compileToCSS(css, path)
        return {
          code: code.replace(replaceReg, ''),
          map: null // 如果可行将提供 source map
        }
      }
      return
    },
  };
}
