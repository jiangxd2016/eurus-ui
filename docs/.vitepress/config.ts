
import { defineConfig } from 'vitepress'
import { docsName, docsDescription, sidebarCN, sidebarUS } from './constants'

module.exports = defineConfig({
  title: 'Eurus UI',
  description: docsDescription,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'eurus-ui' }],
    ['meta', { property: 'og:title', content: docsName }],
    ['meta', { property: 'og:image', content: docsDescription }],
    ['meta', { property: 'og:description', content: 'Vue UI Components' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        crossorigin: 'anonymous',
        href: 'https://fonts.gstatic.com',
      },
    ],
  ],
  lang: 'en-US',
  themeConfig: {
    logo: '/logo.png',
    nav: [{ text: '组件', link: '/zh-CN/components/' }],

    sidebar: {
      // '/en-US/components/': [
      //   {
      //     text: 'How to use',
      //     // collapsible: true,
      //     items: [
      //       {
      //         text: 'Changelog',
      //         link: '/en-US/components/',
      //       },
      //       {
      //         text: 'QuickStart',
      //         link: '/en-US/quick-start',
      //       },
      //     ],
      //   },
      //   {
      //     text: 'Components',
      //     items: [
      //       {
      //         text: 'Base Components',
      //         link: '/en-US/components/base',
      //       },
      //       {
      //         text: 'Common Components',
      //         link: '/en-US/components/common',
      //       }, {
      //         text: 'Form Components',
      //         link: '/en-US/components/form',
      //       },
      //       {
      //         text: 'navigation Components',
      //         link: '/en-US/components/navigation',
      //       },
      //       {
      //         text: 'Message Components',
      //         link: '/en-US/components/message',
      //       },
      //     ],
      //   },
      // ],
      '/zh-CN/components/': sidebarCN
    },
    algolia: {
      appId: 'NQCTTUSYFJ',
      apiKey: '4008ce505653f334b96e8360c7849d8c',
      indexName: 'eurus-ui',
    },
    editLink: {
      repo: 'iangxd2016/eurus-ui',
      branch: 'master',
      dir: 'docs',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/iangxd2016/eurus-ui',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present jiangxd',
    },
  },

})
