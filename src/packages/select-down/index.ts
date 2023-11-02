import type { App } from 'vue';
import ESelectDown from './src';

ESelectDown.install = (app: App) => {
	app.component(ESelectDown.name, ESelectDown);
};

export { ESelectDown };
export default ESelectDown;
