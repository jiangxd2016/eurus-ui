import type { App } from 'vue';
import EMenu from './src';

EMenu.install = (app: App) => {
	app.component(EMenu.name, EMenu);
};

export { EMenu };
export default EMenu;
