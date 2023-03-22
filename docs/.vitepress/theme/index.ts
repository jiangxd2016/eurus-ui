import './vars.css';

import 'uno.css';
import '@unocss/reset/tailwind.css';

import DefaultTheme from 'vitepress/theme';
import type { EnhanceAppContext } from 'vitepress/dist/client';
import Demo from '../components/Demo.vue';
import { extractFileNameFromPath } from '../utils';

import 'dist/css/index.css';
import 'eurus-ui/style.css';

export default {
  ...DefaultTheme,
  async enhanceApp(ctx: EnhanceAppContext) {
    const { app } = ctx;
    const demos = import.meta.glob('../../../src/packages/**/demo/*.vue', { eager: true });

    for (const path in demos) {
      app.component(extractFileNameFromPath(path), (demos[path] as any).default);
    }
    app.component('Demo', Demo);

    if (typeof process === 'undefined') {
      const EurusUI = await import('eurus-ui');
      console.log(EurusUI);
      app.use({
        install: EurusUI.default.install as (app: any, ...options: any[]) => any
      });
    }
  }
};
