import type { App } from 'vue';
import EProgress from './src';

EProgress.install = (app: App) => {
  app.component(EProgress.name, EProgress);
};

export { EProgress };
export default EProgress;
