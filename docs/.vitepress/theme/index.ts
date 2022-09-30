import type { App } from 'vue';
import DefaultTheme from 'vitepress/theme';

import 'uno.css';
import '@unocss/reset/tailwind.css';

import '../style/main.css';
import '../style/vars.css';

import 'eurus-ui-dist/style.css';

import Demo from '../components/Demo.vue';
import { extractFileNameFromPath } from '../../utils';
export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {

    const demos = import.meta.glob('../../../src/packages/**/demo/*.vue', { eager: true });

    for (const path in demos) {

      app.component(extractFileNameFromPath(path), (demos[path] as any).default);
    }

    app.component('Demo', Demo);
  }
};
