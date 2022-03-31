// @ts-check
const path = require('path')
const fse = require("fs-extra")
const kSync = require('klaw-sync')

const { demo } = require('./markdown/demo')


const basePath = `zh-CN/components`

const componentDocs = kSync(basePath, {
  nodir: true,
})
  .map((item: { path: any }) => path.basename(item.path).replace('.md', ''))
  .filter((path: string | string[]) => !path.includes('index') && !path.includes('quick-start'))
  .map((path: string) => ({
    text: path.replace(/\w/, ($0) => $0.toUpperCase()),
    link: path,
  }))

const zhComponentDocs = componentDocs.map((item: { link: string }) => ({
  ...item,
  link: '/zh-CN/components/' + item.link,
}))

const enComponentDocs = componentDocs.map((item: { link: string }) => ({
  ...item,
  link: '/en-US/components/' + item.link,
}))

/**
 * @param lang {string}
 */
function site(lang: string) {
  const isCn = lang === 'zh'
  const sidebar = [
    {
      text: isCn ? '更新日志' : 'Changelog',
      link: `/${lang}/components/`,
    },
    {
      text: isCn ? '快速开始' : 'QuickStart',
      link: `/${lang}/components/quick-start`,
    },
    {
      text: isCn ? '组件' : 'COMPONENTS',
      children: isCn ? zhComponentDocs : enComponentDocs,
    },
  ]
  return sidebar
}

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'eurus-ui docs',
  description: "",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'ogo.png' }],
    ['meta', { name: 'author', content: 'uipress' }],
    ['meta', { property: 'og:title', content: 'Vitepress' }],
    ['meta', { property: 'og:image', content: `` }],
    ['meta', { property: 'og:description', content: "" }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        crossorigin: 'anonymous',
        href: 'https://fonts.gstatic.com',
      },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;500&family=Inter:wght@200;400;500;600',
        rel: 'stylesheet',
      },
    ],
  ],
  themeConfig: {
    repo: 'https://github.com/jiangxd2016/eurus-ui', //replace the repo link
    i18n: true,
    logo: 'logo.png',
    docsBranch: 'release',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
    sidebar: {
      '/zh-CN/': site('zh'),
      '/en-US/': site('en'),
    },
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },

    config: (md: any) => {
      // use more markdown-it plugins!
      md.use(demo)
    },
  },
}
