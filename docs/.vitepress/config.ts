import { defineConfig } from 'vitepress'
import { docsName, docsDescription, sidebarCN, sidebarUS } from '../constants'

module.exports = defineConfig({
  title: 'eurus-ui docs',
  description: docsDescription,
  head: [
    // ['link', { rel: 'icon', type: 'image/png', href: 'ogo.png' }],
    ['meta', { name: 'author', content: 'eurus-ui' }],
    ['meta', { property: 'og:title', content: docsName }],
    ['meta', { property: 'og:image', content: docsDescription }],
    ['meta', { property: 'og:description', content: '' }],
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
  themeConfig: {
    repo: 'https://github.com/jiangxd2016/eurus-ui', // replace the repo link
    logo: 'logo.png',
    docsBranch: 'release',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
    nav: [
      {
        text: 'components',
        items: [{
          text: 'Getting Started',
          link: '/en-US/components',
        }]
      }
    ],
    sidebar: {
      '/zh-CN/': sidebarCN,
      '/en-US/': sidebarUS,
    },
  }
})
