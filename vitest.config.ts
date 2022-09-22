/*
 * @Author: jiangxd
 * @Date: 2022-09-08 13:44:54
 * @LastEditTime: 2022-09-22 17:15:53
 * @LastEditors: jiangxd
 * @Description:
 * @FilePath: /eurus-ui/vitest.config.ts
 */
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
  plugins: [Vue(), Jsx()],
  test: {
    include: ['**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      provider: 'c8',
      exclude: ['index.ts'],
      reporter: ['text', 'json', 'html'],
    },
    globals: true,
    environment: 'happy-dom',
    watch: false
  },
});
