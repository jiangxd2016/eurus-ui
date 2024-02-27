import ETag from './src';
import type { App } from 'vue';

ETag.install = (app: App) => {
	app.component(ETag.name, ETag);
};

export { ETag };
export default ETag;
