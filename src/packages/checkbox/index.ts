import type { App } from 'vue';
import ECheckbox from './src';

ECheckbox.install = (app: App) => {
  app.component(ECheckbox.name, ECheckbox);
};

export { ECheckbox };
export default ECheckbox;
