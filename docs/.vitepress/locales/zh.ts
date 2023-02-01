import { version } from '../../package.json';

export const RELEASES = 'https://github.com/jiangxd2016/eurus-ui/releases';

export default {
  vitepressConfig: {
    title: 'Eurus UI',
    lang: 'zh-CN',
    link: '/zh-CN/guider',
    description: '一个vue3组件库',
  },
  themeConfig: {
    label: '简体中文',
    selectText: '选择语言',
    editLinkText: '对本页提出修改建议',
    lastUpdated: '最后更新',

    nav: [
      { text: '组件', link: '/zh-CN/components/button' },
      { text: '导航', link: '/zh-CN/guider/quick-start' },
      { text: `v${version}`, items: [{ text: 'Release Notes', link: RELEASES, }] },
    ],

    sidebar: {
      '/zh-CN/guider/': [
        {
          text: '使用',
          collapsible: true,
          items: [

            {
              text: '更新日志',
              link: '/zh-CN/guider/changelog',
            },
            {
              text: '快速开始',
              link: '/zh-CN/guider/quick-start',
            },

          ],
        },
      ],
      '/zh-CN/components/': [
        {
          text: '组件',
          collapsible: true,
          items: [
            {
              text: '按钮 button',
              link: '/zh-CN/components/button',
            },
            {
              text: '按钮组 button-group',
              link: '/zh-CN/components/button-group',
            },
            {
              text: '图标 icon',
              link: '/zh-CN/components/icons',
            },
            {
              text: '头像 avatar',
              link: '/zh-CN/components/avatar',
            },
            {
              text: '回到顶部  back-top',
              link: '/zh-CN/components/back-top',
            },
            {
              text: '输入框 input',
              link: '/zh-CN/components/input',
            },
            {
              text: '数字输入框 input-number',
              link: '/zh-CN/components/input-number',
            },
            {
              text: '多选框 checkbox',
              link: '/zh-CN/components/checkbox',
            },
            {
              text: '单选框 radio',
              link: '/zh-CN/components/radio',
            },
            {
              text: '开关 switch',
              link: '/zh-CN/components/switch',
            },
            // {
            //   text: '加载中 loading',
            //   link: '/zh-CN/components/loading',
            // },
            // {
            //   text: '通用组件',
            //   link: '/zh-CN/common',
            // }, {
            //   text: '表单组件',
            //   link: '/zh-CN/components/form',
            // },
            // {®
            //   text: '导航组件',
            //   link: '/zh-CN/components/navigation',
            // },
            // {
            //   text: '消息组件',
            //   link: '/zh-CN/components/message',
            // },

          ]
        }
      ],
    }
  },
};
