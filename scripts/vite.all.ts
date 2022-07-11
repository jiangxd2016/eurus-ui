import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import viteDeletePurePlugin from './vite-delete-pure';
const dirname = resolve();
/*
* esm not support minify
* @see https://github.com/vuejs/core/issues/2860
* @see https://github.com/vitejs/vite/issues/6079
*/
const config: InlineConfig = {
  mode: 'production',
  resolve: {
    alias: {
      '~/': `${resolve(dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${dirname}/src/scss/index";`,
      },
    }
  },
  build: {
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: ['vue']
    },

    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (module) => {
        return `eurus-ui.${module === 'es' ? 'm' : 'c'}js`;
      }
    },
  },
  plugins: [viteDeletePurePlugin(), vue(), vueJsx({ optimize: true })],
};

export default config;
