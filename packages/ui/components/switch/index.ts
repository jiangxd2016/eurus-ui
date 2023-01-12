import type { App } from 'vue';
import ESwitch from './src';

ESwitch.install = (app: App) => {
  app.component(ESwitch.name, ESwitch);
};

export { ESwitch };
export default ESwitch;
