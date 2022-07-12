import type { App } from 'vue';
import ELoading from './src';

ELoading.install = (app: App) => {
  app.component(ELoading.name, ELoading);
};

export { ELoading };
export default ELoading;
