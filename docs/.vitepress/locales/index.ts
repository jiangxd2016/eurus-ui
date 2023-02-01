import en from './en';
import zh from './zh';

export default {
  vitepressConfig: {
    '/en-US/': en.vitepressConfig,
    '/zh-CN/': zh.vitepressConfig,
  },
  themeConfig: {
    '/en-US/': en.themeConfig,
    '/zh-CN/': zh.themeConfig,
  },
};
