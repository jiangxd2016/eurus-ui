import EPagination from './src';
import type { App } from 'vue';

EPagination.install = (app: App) => {
	app.component(EPagination.name, EPagination);
};

export { EPagination };
export default EPagination;
