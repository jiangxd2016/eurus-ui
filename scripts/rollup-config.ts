import type { InputOption, OutputOptions, RollupOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'

import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import typescript from 'rollup-plugin-ts'

import filesize from 'rollup-plugin-filesize'

// 代码压缩
import { terser } from 'rollup-plugin-terser'

import postcss from 'rollup-plugin-postcss'
// css 引入
import postcssImport from 'postcss-import'
// css 压缩
import cssnano from 'cssnano'
// css 清理
import purgecss from '@fullhuman/postcss-purgecss'
// css icon purge
import PurgeIcons from 'rollup-plugin-purge-icons'

import { isEsm } from './constants'

export const defaultBuildConfig = (input: InputOption, output: OutputOptions): RollupOptions => {
  return {
    input,
    output,
    plugins: [
      nodeResolve(),
      typescript(),
      jsx(),
      vue({
        reactivityTransform: true,
      }),
      // isProd && terser(),
      // PurgeIcons({
      //   /* PurgeIcons Options */
      //   content: [
      //     '**/*.tsx', // scan for .vue file as well
      //   ],
      // }),
      // postcss({
      //   extensions: ['.styl', 'scss', 'css', 'sass'],
      //   extract: true,
      //   plugins: [postcssImport()],
      // }),
      postcss({
        extensions: ['.styl'],
        extract: true,
        plugins: [
          // postcssImport({
          //   path: ['src/stylus'],
          // }),
          // isProd && cssnano(),
          // purgecss({
          //   content: ['../src/packages/*.tsx', '../src/packages/**/*.tsx', '../src/packages/**/*.styl'],
          //   safelist: [/^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/],
          //   // 使用 animate.css ，置为true
          //   keyframes: true,
          // }),
        ].filter(Boolean),
      }),

      commonjs({
        include: ['node_modules/**', 'node_modules/**/*'],
      }),
      esbuild({
        sourceMap: true,
      }),
      // isProd && uglify(),
      // isProd && filesize()，
    ].filter(Boolean),
    external: ['vue'],
  }
}

export const getPath = (
  name: string,
  path: string
): {
  input: InputOption;
  output: OutputOptions;
} => {
  const input: InputOption = `${path}/index.ts`
  const output: OutputOptions = {
    name: 'index',
    file: `${path.replace('src', `dist/${isEsm ? 'es' : 'lib'}`)}/index.js`,
    format: isEsm ? 'es' : 'umd',
    globals: {
      vue: 'Vue',
    },
    exports: 'named',
  }
  return {
    input,
    output,
  }
}
