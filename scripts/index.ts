import fs from "fs";
import { resolve } from "path";
import { Plugin } from "vite";

const fileRegex = /.(scss|less|css)(\?used)?$/;

const replaceReg = /import(.*).(scss|less|css)('|")/;
let viteConfig;

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
        console.log(id);

        return {
          code: null,
          map: null // 如果可行将提供 source map
        }
      }
      if (id.endsWith(".tsx") && replaceReg.test(code)) {
        // console.log(code.match(replaceReg)[0].match(/(?<=\s("|')).*?(?=("|'))/)[0]);
        // return {
        //   code: code.replace(replaceReg, ""),
        //   map: null // 如果可行将提供 source map
        // }
      }
      return
    },
    async writeBundle(_, bundle) {
      for (const file of Object.entries(bundle)) {
        const { root } = viteConfig;
        const outDir = viteConfig.build.outDir || "dist";
        const fileName = file[0];
        const filePath = resolve(root, outDir, fileName);
        console.log({ filePath, fileName ,root});


      }
    },
  };
}
