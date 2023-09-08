import type { App } from 'vue';
import EDivider from './src';

EDivider.install = (app: App) => {
	app.component(EDivider.name, EDivider);
};

export { EDivider };
export default EDivider;
