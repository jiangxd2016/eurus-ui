import type { App } from 'vue';
import EConfigProvider from './src';

EConfigProvider.install = (app: App) => {
  app.component(EConfigProvider.name, EConfigProvider);
};

export { EConfigProvider };
export default EConfigProvider;
