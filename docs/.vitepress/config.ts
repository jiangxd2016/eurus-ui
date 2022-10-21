import { defineConfig } from 'vitepress';
import { version } from '../../package.json';
import { DOCS_NAME, DOCSDESCRIPTION, sidebarCN, sidebarUS, RELEASES } from './constants';

module.exports = defineConfig({
  title: 'Eurus UI',
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
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '组件', link: '/zh-CN/components/button' },
      { text: '导航', link: '/zh-CN/guider/quick-start' },
      { text: `v${version}`, items: [{ text: 'Release Notes', link: RELEASES, }] },
    ],
    sidebar: {
      '/en-US/guider': sidebarUS,
      '/en-US/components': sidebarUS,
      '/zh-CN/guider': sidebarCN,
      '/zh-CN/components': sidebarCN
    },
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
    localeLinks: {
      text: '',
      items: [
        { text: 'English', link: '/en-US/' },
        { text: '简体中文', link: '/zh-CN/' },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present jiangxd',
    },
  },

});
