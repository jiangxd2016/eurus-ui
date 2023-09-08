import type { App } from 'vue';
import EInput from './src';

EInput.install = (app: App) => {
	app.component(EInput.name, EInput);
};

export { EInput };
export default EInput;
