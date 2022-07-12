import type { App } from 'vue';
import ESetup from './src';

ESetup.install = (app: App) => {
  app.component(ESetup.name, ESetup);
};

export { ESetup };
export default ESetup;
