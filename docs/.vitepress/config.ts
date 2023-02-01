import type MarkdownIt from 'markdown-it';
import { defineConfig } from 'vitepress';
import { mdPlugin } from './utils/demo';
import locales from './locales';

const DOCS_NAME = 'Eurus UI';
const DOCSDESCRIPTION = 'A Vue3 component library';

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = defineConfig({
  title: '',
  description: DOCSDESCRIPTION,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'eurus-ui' }],
    ['meta', { property: 'og:title', content: DOCS_NAME }],
    ['meta', { property: 'og:image', content: DOCSDESCRIPTION }],
    ['meta', { property: 'og:description', content: 'Vue UI Components' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
  ],
  lastUpdated: true,
  lang: 'zh-CN',
  locales: locales.vitepressConfig,
  themeConfig: {
    repo: 'jiangxd2016/eurus-u',
    logo: '/logo.png',
    locales: locales.themeConfig,
    docsDir: 'docs',
    editLinks: true,
    algolia: {
      appId: '50TTAEFR5V',
      apiKey: 'c0c3101b6a4ea819d26f3200382646a7',
      indexName: 'eurus-ui',
    },
    editLink: {
      pattern: 'iangxd2016/eurus-ui',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/jiangxd2016/eurus-ui',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present jiangxd',
    },
  },
  markdown: {
    config: (md: MarkdownIt) => mdPlugin(md),
  },
});
