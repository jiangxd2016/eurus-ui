import type { App } from 'vue';
import ESpace from './src';

ESpace.install = (app: App) => {
	app.component(ESpace.name, ESpace);
};

export { ESpace };
export default ESpace;
