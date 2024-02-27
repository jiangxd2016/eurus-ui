import EButton from './src';
import type { App } from 'vue';

EButton.install = (app: App) => {
	app.component(EButton.name, EButton);
};

export { EButton };
export default EButton;
