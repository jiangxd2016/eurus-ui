import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const dirname = resolve();

const config: InlineConfig = {
  mode: 'production',
  resolve: {
    alias: {
      '@/': `${resolve(dirname, 'src')}/`,
    },
  },
  define: {
    __PROD__: true,
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
    vue(),
    vueJsx()
  ],
};

export default config;
