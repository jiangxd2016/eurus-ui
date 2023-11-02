import type { App } from 'vue';
import EInputNumber from './src';

EInputNumber.install = (app: App) => {
	app.component(EInputNumber.name, EInputNumber);
};

export { EInputNumber };
export default EInputNumber;
