import { resolve } from 'path'
import type { UserConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import ViteRestart from 'vite-plugin-restart'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, presetWind } from 'unocss'
import { packagesDir } from './constants'
import { MarkdownTransform } from './.vitepress/plugins/md-transform'

const config: UserConfig = {
  resolve: {
    alias: {
      'eurus-ui/': `${resolve(__dirname, '../dist/es')}/`,
      // 配置所需的目录文件
      'packages': `${resolve(__dirname, packagesDir)}/`,
    },
  },
  optimizeDeps: {
    exclude: ['@vueuse/shared', '@vueuse/core', 'vue-running', 'comment-parser'],
  },
  publicDir: resolve(__dirname, './assets'),
  server: {
    hmr: {
      overlay: false,
    },
    fs: {
      allow: ['../dist', '../src'],
    },
  },
  plugins: [
    Components({
      dirs: ['.vitepress/theme/components', '.vitepress/components'],
      extensions: ['vue', 'ts'],
      include: [/\.vue/, /\.md/],
      dts: true,
    }),
    Inspect(),
    Unocss({
      shortcuts: [
        ['btn', 'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
      ],
      presets: [
        presetUno({
          dark: 'media',
        }),
        presetWind(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),
    ViteRestart({
      restart: ['.vitepress/config/*.*', '../dist/**/*.*', './zh-CN/**/*.*', './en-US/**/*.*'],
    }),
    {
      name: 'code-block-escape',
      enforce: 'post',
      transform(code, id) {
        if (!id.endsWith('.md')) { return }
        return code.replace(/\/\/```/gm, '```')
      },
    },
    MarkdownTransform()
  ],
}

