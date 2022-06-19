import { defineConfig } from 'vitest/config'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vueJsx()],
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      exclude: ['index.ts']
    },
    globals: true,
    environment: 'happy-dom',

  },
})
