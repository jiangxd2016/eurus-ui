import fs from "fs";
import { resolve } from "path";
import { Plugin } from "vite";
import sass from "sass"
const fileRegex = /.(scss|less|css)(\?used)?$/;

const replaceReg = /import(.*).(scss|less|css)('|")/;
let viteConfig;
const injectPath = resolve(resolve(),"./src/stylus/inject.scss");

const InjectCss = fs.readFileSync(injectPath, 'utf-8');

const compileToCSS = async function (path: string,options = {}) {
  const res = sass.renderSync({includePaths:[injectPath],data:InjectCss +path });

  console.log("---------------------");

  console.log(res.css.toString());

  console.log("======================");

}

export default function libInjectCss(): Plugin {

  return {
    name: "lib-css",
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(code, id) {
      if (!viteConfig.build || !viteConfig.build.lib) {
        console.warn('[vite lib css] only works in lib mode.')
        return;
      }

      const outDir = viteConfig.build.outDir || 'dist';
      const filePath = (path) => resolve(viteConfig.root, outDir, path);

      if (fileRegex.test(id)) {
        return {
          code: null,
          map: null // 如果可行将提供 source map
        }
      }
      if (id.endsWith(".tsx") && replaceReg.test(code)) {
     const stylePath = code.match(replaceReg)[0].match(/(?<=\s("|')).*?(?=("|'))/)[0];
       const path =  resolve(id,"../",stylePath);
  const css = fs.readFileSync(path, 'utf-8');

        compileToCSS(css)
        return {
          code: code.replace(replaceReg, ""),
          map: null // 如果可行将提供 source map
        }
      }
      return
    },

  };
}
