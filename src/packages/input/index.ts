import EInput from './src';
import type { App } from 'vue';

EInput.install = (app: App) => {
	app.component(EInput.name, EInput);
};

export { EInput };
export default EInput;
