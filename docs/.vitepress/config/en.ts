import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';
import { version } from '../../../package.json';
import { CHANGELOG, DISCUSSIONS, ISSUES, META_TITLE, META_URL, RELEASES } from './shared';

export const META_DESCRIPTION = 'easy to use Vue UI components library';

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
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
      text: 'Suggest changes to this page',
    },
    nav: [
      { text: 'components', link: '/en/components/button' },
      { text: 'guider', link: '/en/guider/quick-start' },
      { text: `v${version}`, items: [{ text: 'Release Notes', link: RELEASES }] },
      {
        text: 'Links',
        items: [
          { text: 'Discussions', link: DISCUSSIONS },
          { text: 'Changelog', link: CHANGELOG },
        ],
      },
    ],
    sidebar: {
      '/en/': [
        {
          text: 'How to use',
          items: [
            {
              text: 'Changelog',
              link: '/en/guider/changelog',
            },
            {
              text: 'QuickStart',
              link: '/en/guider/quick-start',
            },
          ],
        },
        {
          text: 'Components',
          items: [
            {
              text: 'button',
              link: '/en/components/button',
            },
            {
              text: 'button-group',
              link: '/en/components/button-group',
            },
            {
              text: 'icon',
              link: '/en/components/icons',
            },
            {
              text: 'avatar',
              link: '/en/components/avatar',
            },
            {
              text: ' back-top',
              link: '/en/components/back-top',
            },
            {
              text: 'input',
              link: '/en/components/input',
            },
            {
              text: 'input-number',
              link: '/en/components/input-number',
            },
            {
              text: 'checkbox',
              link: '/en/components/checkbox',
            },
            {
              text: 'radio',
              link: '/en/components/radio',
            },
            {
              text: 'switch',
              link: '/en/components/switch',
            },
            {
              text: 'select-down',
              link: '/en/components/select-down',
            },
            {
              text: 'select',
              link: '/en/components/select',
            },
            {
              text: 'tag',
              link: '/en/components/tag',
            },
            {
              text: 'date-picker',
              link: '/en/components/date-picker',
            },
            {
              text: 'config-provider',
              link: '/en/components/config-provider',
            },
            // {
            //   text: '加载中 loading',
            //   link: '/en/components/loading',
            // },
            // {
            //   text: '通用组件',
            //   link: '/en/common',
            // }, {
            //   text: '表单组件',
            //   link: '/en/components/form',
            // },
            // {®
            //   text: '导航组件',
            //   link: '/en/components/navigation',
            // },
            // {
            //   text: '消息组件',
            //   link: '/en/components/message',
            // },
          ],
        },
      ],
    },
  },
};
