import ESelectDown from './src';
import type { App } from 'vue';

ESelectDown.install = (app: App) => {
	app.component(ESelectDown.name, ESelectDown);
};

export { ESelectDown };
export default ESelectDown;
