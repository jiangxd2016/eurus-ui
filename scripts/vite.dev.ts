import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const config: InlineConfig = {
  mode: 'development',
  resolve: {
    alias: {
      '@/': `${resolve(resolve(), 'src')}/`,
    },
  },
  define: {
    __DEV__: true,
  },

  build: {
    watch: {},
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      input: ['packages/ui/index.ts'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          exports: 'named',
          entryFileNames: '[name].js',
          preserveModules: true,
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
    vue(),
    vueJsx()
  ],
};

export default config;
