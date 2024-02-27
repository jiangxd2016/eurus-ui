import EDrawer from './src';
import type { App } from 'vue';

EDrawer.install = (app: App) => {
	app.component(EDrawer.name, EDrawer);
};

export { EDrawer };
export default EDrawer;
