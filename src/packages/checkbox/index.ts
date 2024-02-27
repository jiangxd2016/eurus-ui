import ECheckbox from './src';
import checkboxGroup from './src/checkbox-group';
import type { App } from 'vue';

ECheckbox.install = (app: App) => {
	app.component(ECheckbox.name, ECheckbox);
	app.component(checkboxGroup.name, checkboxGroup);
};

export { ECheckbox, checkboxGroup };
export default ECheckbox;
