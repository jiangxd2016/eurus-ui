import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, presetWind } from 'unocss';
import ViteRestart from 'vite-plugin-restart';
import Inspect from 'vite-plugin-inspect';
import { MarkdownTransform } from './.vitepress/plugins/md-transform';
export default defineConfig({
  resolve: {
    alias: {
      'eurus-ui/': `${resolve(__dirname, '../dist/es')}/`,
      'eurus/': `${resolve(__dirname, '../dist')}/`,
    },
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  plugins: [
    VitePWA({
      manifest: {},
      workbox: { skipWaiting: true, clientsClaim: true }
    }),
    Unocss({
      shortcuts: [
        ['btn', 'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
      ],
      presets: [
        presetUno({
          dark: 'media',
        }),
        presetAttributify(),
        presetWind(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
    }),
    ViteRestart({
      restart: [
        '../dist/*',
        '../src/packages/**/*.vue'
      ],
    }),
    Inspect(),
    MarkdownTransform()
  ]
});
