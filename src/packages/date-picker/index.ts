import type { App } from 'vue';
import EDatePicker from './src';
import EDateRangePicker from './src/dateRangePicker';

EDatePicker.install = (app: App) => {
  app.component(EDatePicker.name, EDatePicker);
  app.component(EDateRangePicker.name, EDateRangePicker);
};

export { EDatePicker, EDateRangePicker };
export default EDatePicker;
