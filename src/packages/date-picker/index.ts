import EDatePicker from './src';
import type { App } from 'vue';

EDatePicker.install = (app: App) => {
	app.component(EDatePicker.name, EDatePicker);
};

export { EDatePicker };
export default EDatePicker;
