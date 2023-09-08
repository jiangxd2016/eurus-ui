import type { App } from 'vue';
import ERadio from './src';
import ERadioGroup from './src/radio-group';

ERadio.install = (app: App) => {
	app.component(ERadio.name, ERadio);
	app.component(ERadioGroup.name, ERadioGroup);
};

export { ERadio, ERadioGroup };
export default ERadio;
