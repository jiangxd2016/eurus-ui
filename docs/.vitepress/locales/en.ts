import { version } from '../../package.json';
export const RELEASES = 'https://github.com/jiangxd2016/eurus-ui/releases';

export default {
  vitepressConfig: {
    title: 'Eurus UII',
    lang: 'en-US',
    description: 'A Vue3 component library',
  },
  themeConfig: {
    label: 'English',
    selectText: 'Languages',
    editLinkText: 'Suggest changes to this page',
    lastUpdated: 'Last Updated',

    nav: [
      { text: 'component', link: '/en-US/components/button' },
      { text: 'guider', link: '/en-US/guider/quick-start' },
      { text: `v${version}`, items: [{ text: 'Release Notes', link: RELEASES, }] },
    ],

    sidebar: {
      '/en-US/guider/': [
        {
          text: 'How to use',
          collapsible: true,
          items: [
            {
              text: 'Changelog',
              link: '/en-US/guider/changelog',
            },
            {
              text: 'QuickStart',
              link: '/en-US/guider/changelog',
            },
            {
              text: 'Base Components',
              link: '/en-US/guider/changelog',
            },
          ],
        },
      ],
      '/en-US/components/': [
        {
          text: 'Components',
          collapsible: true,
          items: [

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
          ],
        },
      ],
    }

  },
};
