import type { App } from 'vue';
import EEmpty from './src';

EEmpty.install = (app: App) => {
	app.component(EEmpty.name, EEmpty);
};

export { EEmpty };
export default EEmpty;
