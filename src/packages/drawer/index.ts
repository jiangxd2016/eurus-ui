import type { App } from 'vue';
import EDrawer from './src';

EDrawer.install = (app: App) => {
  app.component(EDrawer.name, EDrawer);
};

export { EDrawer };
export default EDrawer;
