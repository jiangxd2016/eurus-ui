import type { App } from 'vue';

import Layout from 'vitepress/dist/client/theme-default/Layout.vue';
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue';

import 'vitepress/dist/client/theme-default/styles/fonts.css';
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/base.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
// import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';

import '../style/main.css';
import '../style/vars.css';
import '../style/vp-doc.css';

import 'uno.css';
import '@unocss/reset/tailwind.css';
import 'eurus/style.css';
import Demo from '../components/Demo.vue';
import { extractFileNameFromPath } from '../utils';
export default {
  Layout,
  NotFound,
  async enhanceApp({ app }: { app: App }) {

    const demos = import.meta.glob('../../../src/packages/**/demo/*.vue', { eager: true });

    for (const path in demos) {
      app.component(extractFileNameFromPath(path), (demos[path] as any).default);
    }
    app.component('Demo', Demo);
  }
};
