import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCssPlugin from './vite-css-plugin';
import external from './vite-plugin-external';

const config: InlineConfig = {
  mode: 'production',
  resolve: {
    alias: {
      '@/': `${resolve(resolve(), 'src')}/`,
    },
  },
  build: {
    sourcemap: true,
    target: 'modules',
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
          preserveModulesRoot: 'packages',
        },
        {
          format: 'cjs',
          dir: 'dist/lib',
          exports: 'named',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'packages',
        },
      ],

      external: ['vue', 'dayjs', 'async-validator'],
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
  plugins: [
    external(),
    viteCssPlugin(),
    vue(),
    vueJsx()
  ],
};

export default config;
