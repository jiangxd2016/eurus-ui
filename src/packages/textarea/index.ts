import ETextarea from './src';
import type { App } from 'vue';

ETextarea.install = (app: App) => {
	app.component(ETextarea.name, ETextarea);
};

export { ETextarea };
export default ETextarea;
