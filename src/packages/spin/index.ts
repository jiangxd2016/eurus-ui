import type { App } from 'vue';
import ESpin from './src';

ESpin.install = (app: App) => {
  app.component(ESpin.name, ESpin);
};

export { ESpin };
export default ESpin;
