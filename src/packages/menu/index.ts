import EMenu from './src';
import type { App } from 'vue';

EMenu.install = (app: App) => {
	app.component(EMenu.name, EMenu);
};

export { EMenu };
export default EMenu;
