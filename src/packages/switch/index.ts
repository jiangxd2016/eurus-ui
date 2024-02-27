import ESwitch from './src';
import type { App } from 'vue';

ESwitch.install = (app: App) => {
	app.component(ESwitch.name, ESwitch);
};

export { ESwitch };
export default ESwitch;
