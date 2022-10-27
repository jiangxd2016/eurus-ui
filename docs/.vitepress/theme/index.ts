import DefaultTheme from 'vitepress/theme';
import type { App } from 'vue';

import '../style/main.css';
import '../style/vars.css';

import 'uno.css';
import '@unocss/reset/tailwind.css';
import 'eurus/style.css';
import Demo from '../components/Demo.vue';
import { extractFileNameFromPath } from '../utils';
export default {
  ...DefaultTheme,
  async enhanceApp({ app }: { app: App }) {

    const demos = import.meta.glob('../../../src/packages/**/demo/*.vue', { eager: true });

    for (const path in demos) {
      app.component(extractFileNameFromPath(path), (demos[path] as any).default);
    }
    app.component('Demo', Demo);
  }
};
