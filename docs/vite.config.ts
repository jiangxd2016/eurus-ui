import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  server: {
    fs: {
      allow: ['..']
    }
  },
  plugins: [
    VitePWA({
      manifest: {},
      workbox: { skipWaiting: true, clientsClaim: true }
    })
  ]
});
