import ESpace from './src';
import type { App } from 'vue';

ESpace.install = (app: App) => {
	app.component(ESpace.name, ESpace);
};

export { ESpace };
export default ESpace;
