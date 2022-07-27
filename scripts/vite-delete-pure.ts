import fs from 'fs';
import { resolve } from 'path';
import type { Plugin, ResolvedConfig } from 'vite';

const dirname = resolve();

let viteConfig: ResolvedConfig;

export default function viteDeletePurePlugin(): Plugin {
  return {
    name: 'vite-delete-pure-plugin',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(code, id) {
      if (id.endsWith('.vue')) {
        const filePath = resolve(dirname, id);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const pureContent = fileContent.replace(/<\/?Pure[^>]*>/g, '');
        if (pureContent !== fileContent) {
          fs.writeFileSync(filePath, pureContent);
        }
      }
    },
    closeBundle() {
      // read file，reg replace，write file
      const outputDir = viteConfig.build.outDir;
      const output = dirname + '/' + outputDir + '/eurus-ui.mjs';
      const mjs = fs.readFileSync(output, 'utf-8');
      const css = mjs.replace(/(<?=\r|\n|).*(@__PURE__).*\\*(?=\\r|\n|)/g, '');
      fs.writeFileSync(output, css);
    }
  };
}
