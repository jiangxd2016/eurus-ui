import { defineConfig } from 'unocss'

export default defineConfig({
  include: [
    '.vitepress/theme/**/*.{ts,vue}',
    '.vitepress/components/**/*.vue',
  ],

  safelist: [
    'pb-5',
    'logo-float-xl',
    'dark:text-white',
    'opacity-85',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#424242',
          deep: '#242424',
        },
      },
    },
  },
})
