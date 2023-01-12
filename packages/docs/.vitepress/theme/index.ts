import '../style/main.css';
import '../style/vars.css';

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
    DefaultTheme.enhanceApp(ctx);
    const { app } = ctx;
    const demos = import.meta.glob('../../../src/components/**/demo/*.vue', { eager: true });

    for (const path in demos) {
      app.component(extractFileNameFromPath(path), (demos[path] as any).default);
    }
    app.component('Demo', Demo);

    if (typeof process === 'undefined') {
      // @ts-expect-error
      const EurusUI = await import('eurus-ui');
      app.use(EurusUI.default);
    }
  }
};
