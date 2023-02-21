import { defineConfig } from 'vitepress';
import { sharedConfig } from './shared';
import { zhConfig } from './zh';
import { enConfig } from './en';

export default defineConfig({
  ...sharedConfig,

  locales: {
    en: { label: 'English', lang: 'en', link: '/en', ...enConfig },
    zh: { label: '简体中文', lang: 'zh', link: '/zh/', ...zhConfig },
  },
});
