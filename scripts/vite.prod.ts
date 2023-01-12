import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCssPlugin from './vite-css-plugin';

const config: InlineConfig = {
  mode: 'production',
  resolve: {
    alias: {
      '@/': `${resolve(resolve(), 'src')}/`,
    },
  },
  define: {
    __PROD__: true,
  },

  build: {
    sourcemap: true,
    // target: 'modules',
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      input: ['packages/ui/index.ts'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          exports: 'named',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
        {
          format: 'cjs',
          dir: 'dist/lib',
          exports: 'named',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
      ],

      external: ['vue', 'dayjs', 'async-validator', 'number-precision'],
    },
    lib: {
      entry: 'packages/ui/index.ts',
      formats: ['es'],
    },
  },
  plugins: [
    viteCssPlugin(),
    vue(),
    vueJsx()
  ],
};

export default config;
