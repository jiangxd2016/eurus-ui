import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: [
      '.vitepress/theme/**/*.{ts,vue}',
      '.vitepress/components/**/*.vue',
    ],
  },

  attributify: true,

  safelist: [
    'pb-5',
    'logo-float-xl',
    'dark:text-white',
    'opacity-85',
  ],
  shortcuts: {
    'bg-main': 'bg-white dark:bg-[#111]',
  },
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
