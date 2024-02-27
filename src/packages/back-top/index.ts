import EBackTop from './src';
import type { App } from 'vue';

EBackTop.install = (app: App) => {
	app.component(EBackTop.name, EBackTop);
};

export { EBackTop };
export default EBackTop;
