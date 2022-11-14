import type { App } from 'vue';

import '../style/main.css';
import '../style/vars.css';
import '../style/vp-doc.css';

import 'uno.css';
import '@unocss/reset/tailwind.css';

import Demo from '../components/Demo.vue';
import { extractFileNameFromPath } from '../utils';

import theme from './theme';

import(import.meta.env.MODE === 'development' ? 'eurus-ui/style.css' : 'dist/style.css');

export default {
  ...theme,
  async enhanceApp({ app }: { app: App }) {

    const demos = import.meta.glob('../../../src/packages/**/demo/*.vue', { eager: true });

    for (const path in demos) {
      app.component(extractFileNameFromPath(path), (demos[path] as any).default);
    }
    app.component('Demo', Demo);

    if (typeof process === 'undefined') {
      await import('eurus-ui').then((m: any) => {
        m.create().install(app);
      });
    }
  }
};
