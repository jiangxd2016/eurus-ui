import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import libInjectCss from './index';
import Inspect from 'vite-plugin-inspect'
import inlineToExtract from './toExtract';
import scss from 'rollup-plugin-scss'

const config: InlineConfig = {
  mode: 'production',
  build: {
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
  plugins: [
    // inlineToExtract(),
    // Inspect(),
     libInjectCss(),
      vue(),
       vueJsx()],
};

export default config;
