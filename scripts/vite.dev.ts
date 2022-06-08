import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCssPlugin from './vite-css-plugin';

const config: InlineConfig = {
  mode: 'development',
  build: {
    emptyOutDir: false,
    minify: false,
    brotliSize: false,
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
    viteCssPlugin(),
    vue(),
    vueJsx()],
};

export default config;
