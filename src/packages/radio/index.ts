import type { App } from 'vue';
import ERadio from './src';

ERadio.install = (app: App) => {
  app.component(ERadio.name, ERadio);
};

export { ERadio };
export default ERadio;
