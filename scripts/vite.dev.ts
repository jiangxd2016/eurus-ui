import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import libInjectCss from './index';
import Inspect from 'vite-plugin-inspect'

const config: InlineConfig = {
  mode: 'production',
  server: {
    port: 3000,
    },  build: {
    emptyOutDir: false,
    minify: false,
    brotliSize: false,
    watch: {},
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
      ],
      external: ['vue']
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
  plugins: [ Inspect(),libInjectCss(),vue(), vueJsx()],
};

export default config;
