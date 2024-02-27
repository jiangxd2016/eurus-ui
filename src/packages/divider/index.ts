import EDivider from './src';
import type { App } from 'vue';

EDivider.install = (app: App) => {
	app.component(EDivider.name, EDivider);
};

export { EDivider };
export default EDivider;
