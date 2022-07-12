import type { App } from 'vue';
import ERate from './src';

ERate.install = (app: App) => {
  app.component(ERate.name, ERate);
};

export { ERate };
export default ERate;
