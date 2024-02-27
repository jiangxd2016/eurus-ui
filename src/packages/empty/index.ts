import EEmpty from './src';
import type { App } from 'vue';

EEmpty.install = (app: App) => {
	app.component(EEmpty.name, EEmpty);
};

export { EEmpty };
export default EEmpty;
