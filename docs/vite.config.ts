/*
 * @Author: jiangxd
 * @Date: 2022-06-04 14:56:12
 * @LastEditTime: 2022-06-04 23:33:09
 * @LastEditors: jiangxd
 * @Description:
 * @FilePath: /eurus-ui/docs/vite.config.ts
 */
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import {presetIcons, presetUno, presetWind } from 'unocss'
import { packagesDir } from './.vitepress/constants'
import { MarkdownTransform } from './.vitepress/plugins/md-transform'
export default {
  resolve: {
    alias: {
      'eurus-ui/': `${resolve(__dirname, '../dist/es')}/`,
    },
  },

  plugins: [

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
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),

    MarkdownTransform()
  ],
}

