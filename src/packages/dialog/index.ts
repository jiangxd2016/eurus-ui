import type { App } from 'vue';
import EDialog from './src';

EDialog.install = (app: App) => {
  app.component(EDialog.name, EDialog);
};

export { EDialog };
export default EDialog;
