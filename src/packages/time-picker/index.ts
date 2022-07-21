import type { App } from 'vue';
import ETimePicker from './src';

ETimePicker.install = (app: App) => {
  app.component(ETimePicker.name, ETimePicker);
};

export { ETimePicker };
export default ETimePicker;
