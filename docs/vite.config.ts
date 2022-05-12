import { resolve } from 'path'
import type { UserConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import WindiCSS from 'vite-plugin-windicss'
import ViteRestart from 'vite-plugin-restart'
import Inspect from 'vite-plugin-inspect'


const config: UserConfig = {
  resolve: {
    alias: {
      'eurus-ui/': `${resolve(__dirname, '../dist/es')}/`,
      "packages":`${resolve(__dirname, '../src/packages')}/`
    },
  },
  optimizeDeps: {
    exclude: ['@vueuse/shared', '@vueuse/core'],
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
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      dts: true,
    }),
    Inspect(),
    Icons(),
    WindiCSS({
      preflight: false,
    }),
    ViteRestart({
      restart: ['.vitepress/config/*.*', '../dist/**/*.*'],
    }),
    {
      name: 'code-block-escape',
      enforce: 'post',
      transform(code, id) {
        if (!id.endsWith('.md')) return
        return code.replace(/\/\/```/gm, '```')
      },
    },
  ],
}

export default config
