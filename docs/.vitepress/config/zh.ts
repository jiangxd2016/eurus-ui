import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';
import { version } from '../../../package.json';
import { CHANGELOG, DISCUSSIONS, ISSUES, META_TITLE, META_URL, RELEASES } from './shared';

export const META_DESCRIPTION = '简单易用的Vue UI组件库';

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],

  themeConfig: {
    editLink: {
      pattern: ISSUES,
      text: '对本页提出修改建议',
    },

    outline: {
      label: '本页内容',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    nav: [
      { text: '组件', link: '/zh/components/button' },
      { text: '导航', link: '/zh/guider/quick-start' },
      { text: `v${version}`, items: [{ text: 'Release Notes', link: RELEASES }] },
      {
        text: '相关链接',
        items: [
          { text: '论坛', link: DISCUSSIONS },
          { text: '更新日志', link: CHANGELOG },
        ],
      },
    ],
    sidebar: {
      '/zh': [
        {
          text: '使用',
          items: [
            {
              text: '更新日志',
              link: '/zh/guider/changelog',
            },
            {
              text: '快速开始',
              link: '/zh/guider/quick-start',
            },
          ],
        },
        {
          text: '组件',
          items: [
            {
              text: '按钮 button',
              link: '/zh/components/button',
            },
            {
              text: '按钮组 button-group',
              link: '/zh/components/button-group',
            },
            {
              text: '图标 icon',
              link: '/zh/components/icons',
            },
            {
              text: '头像 avatar',
              link: '/zh/components/avatar',
            },
            {
              text: '回到顶部  back-top',
              link: '/zh/components/back-top',
            },
            {
              text: '输入框 input',
              link: '/zh/components/input',
            },
            {
              text: '数字输入框 input-number',
              link: '/zh/components/input-number',
            },
            {
              text: '多选框 checkbox',
              link: '/zh/components/checkbox',
            },
            {
              text: '单选框 radio',
              link: '/zh/components/radio',
            },
            {
              text: '开关 switch',
              link: '/zh/components/switch',
            },
            {
              text: '通用下拉 select-down',
              link: '/zh/components/select-down',
            },
            {
              text: '下拉框 select',
              link: '/zh/components/select',
            },
            {
              text: '标签 tag',
              link: '/zh/components/tag',
            },
            {
              text: '日期选择器 date-picker',
              link: '/zh/components/date-picker',
            },
            {
              text: '文本区域 textarea',
              link: '/zh/components/textarea',
            },
            {
              text: '国际化 locale',
              link: '/zh/components/locale',
            },
            {
              text: '表单 form',
              link: '/zh/components/form',
            },
            {
              text: '配置项 config-provider',
              link: '/zh/components/config-provider',
            },
            {
              text: '分割线 divider',
              link: '/zh/components/divider',
            },

            {
              text: '面包屑 breadcrumb',
              link: '/zh/components/breadcrumb',
            },
            {
              text: '抽屉 drawer',
              link: '/zh/components/drawer',
            },
            {
              text: '间距 space',
              link: '/zh/components/space',
            },
            {
              text: '轮播图 carousel',
              link: '/zh/components/carousel',
            },
            {
              text: '对话框 dialog',
              link: '/zh/components/dialog',
            },
            {
              text: '消息提示 message',
              link: '/zh/components/message',
            },
            {
              text: '通知 notification',
              link: '/zh/components/notify',
            },
            {
              text: '提示 tooltip',
              link: '/zh/components/tooltip',
            },
            {
              text: '菜单 menu',
              link: '/zh/components/menu',
            },
            {
              text: '表格 table',
              link: '/zh/components/table',
            },
            // {
            //   text: '加载中 loading',
            //   link: '/zh/components/loading',
            // },
            // {
            //   text: '通用组件',
            //   link: '/zh/common',
            // }, {
            //   text: '表单组件',
            //   link: '/zh/components/form',
            // },
            // {®
            //   text: '导航组件',
            //   link: '/zh/components/navigation',
            // },
            // {
            //   text: '消息组件',
            //   link: '/zh/components/message',
            // },
          ],
        },
      ],
    },
  },
};
