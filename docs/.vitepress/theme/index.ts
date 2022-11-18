import '../style/main.css';
import '../style/vars.css';
import '../style/vp-doc.css';

import 'uno.css';
import '@unocss/reset/tailwind.css';

import DefaultTheme from 'vitepress/theme';
import type { EnhanceAppContext } from 'vitepress/dist/client';
import Demo from '../components/Demo.vue';
import { extractFileNameFromPath } from '../utils';

import theme from './theme';

import(import.meta.env.MODE === 'development' ? 'eurus-ui/style.css' : 'dist/style.css');

export default {
  ...theme,
  async enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);
    const { app } = ctx;
    const demos = import.meta.glob('../../../src/packages/**/demo/*.vue', { eager: true });

    for (const path in demos) {
      app.component(extractFileNameFromPath(path), (demos[path] as any).default);
    }
    app.component('Demo', Demo);

    if (typeof process === 'undefined') {
      const EurusUI = await import('eurus-ui');
      app.use(EurusUI.default);
    }
  }
};
