import type { App } from 'vue';
import EDatePicker from './src';

EDatePicker.install = (app: App) => {
  app.component(EDatePicker.name, EDatePicker);
};

export { EDatePicker };
export default EDatePicker;
