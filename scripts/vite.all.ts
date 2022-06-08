import { resolve } from 'path';
import type { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
const dirname = resolve()
const config: InlineConfig = {
  mode: 'production',
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "${dirname}/src/stylus/inject";`,
      },
    }
  },
  build: {
    minify: true,
    emptyOutDir: false,
    brotliSize: false,
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
        return `eurus-ui.${module === 'es' ? 'm' : 'c'}js`

      }
    },
  },

  plugins: [vue(), vueJsx()],
};

export default config;
