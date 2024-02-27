import EInputNumber from './src';
import type { App } from 'vue';

EInputNumber.install = (app: App) => {
	app.component(EInputNumber.name, EInputNumber);
};

export { EInputNumber };
export default EInputNumber;
