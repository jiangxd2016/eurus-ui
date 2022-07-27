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
