import { defineConfig } from 'vitest/config'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vueJsx()],
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    globals: true,
    environment: 'happy-dom',

  },
})
