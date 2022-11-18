import type { App } from 'vue';
import EBackTop from './src';

EBackTop.install = (app: App) => {
  app.component(EBackTop.name, EBackTop);
};

export { EBackTop };
export default EBackTop;
