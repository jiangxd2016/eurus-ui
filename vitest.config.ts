import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import Jsx from '@vitejs/plugin-vue-jsx';
const dirname = resolve();
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(dirname, 'src')}/`,
    },
  },
  define: {
    __DEV__: true,
  },
  plugins: [Vue(), Jsx()],
  test: {
    include: ['**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      provider: 'c8',
      exclude: ['docs/**/*', 'script/**/*'],
      reporter: ['text', 'json', 'html'],
    },
    globals: true,
    environment: 'happy-dom',
    watch: false
  },
});
