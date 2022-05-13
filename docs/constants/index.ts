export const docsName = 'eurus-ui'
export const docsDescription = 'eurus-ui'

export const sidebarUS = [

  {
    text: 'Changelog',
    link: '/en-US/changelog',
  },
  {
    text: 'QuickStart',
    link: '/en-US/quick-start',
  },

  {
    text: 'Base Components',
    link: '/en-US/components/base',
  },
  {
    text: 'Common Components',
    link: '/en-US/components/common',
  }, {
    text: 'Form Components',
    link: '/en-US/components/form',
  },
  {
    text: 'navigation Components',
    link: '/en-US/components/navigation',
  },
  {
    text: 'Message Components',
    link: '/en-US/components/message',
  },

]

export const sidebarCN = [

  {
    text: '更新日志',
    link: '/zh-CN/changelog',
  },
  {
    text: '快速开始',
    link: '/zh-CN/quick-start',
  },

  {
    text: '基础组件',
    activeMatch: '^/zh-CN/base/',
    children: [
      {
        text: '基础组件测试',
        link: '/zh-CN/base/button',
      }
    ]
  },
  {
    text: '通用组件',
    link: '/zh-CN/common',
  }, {
    text: '表单组件',
    link: '/zh-CN/components/form',
  },
  {
    text: '导航组件',
    link: '/zh-CN/components/navigation',
  },
  {
    text: '消息组件',
    link: '/zh-CN/components/message',
  },

]
