import ESpin from './src';
import type { App } from 'vue';

ESpin.install = (app: App) => {
	app.component(ESpin.name, ESpin);
};

export { ESpin };
export default ESpin;
