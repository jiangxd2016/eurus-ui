import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import viteDeletePurePlugin from './vite-delete-pure';
const dirname = resolve();

const config: InlineConfig = {
  mode: 'production',
  resolve: {
    alias: {
      '@/': `${resolve(dirname, 'src')}/`,
    },
  },
  build: {
    sourcemap: true,
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: ['vue', 'dayjs', 'async-validator'],
    },

    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (module) => {
        return `eurus-ui.${module === 'es' ? 'm' : 'c'}js`;
      }
    },
  },
  plugins: [
    viteDeletePurePlugin(),
    vue(),
    vueJsx()
  ],
};

export default config;
