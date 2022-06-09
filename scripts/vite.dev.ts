import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCssPlugin from './vite-css-plugin';

const config: InlineConfig = {
  mode: 'development',
  resolve: {
    alias: {
      '~/': `${resolve(resolve(), 'src')}/`,
    },
  },
  build: {
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          exports: 'named',
          entryFileNames: '[name].js',
          preserveModules: true,
        },
      ],
      external: ['vue']
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
  plugins: [
    viteCssPlugin(),
    vue(),
    vueJsx()],
};

export default config;
