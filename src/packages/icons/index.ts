import EIcon from './src';
import type { App } from 'vue';

EIcon.install = (app: App) => {
	app.component(EIcon.name, EIcon);
};

export { EIcon };
export default EIcon;
