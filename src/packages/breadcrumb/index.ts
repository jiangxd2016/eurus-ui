import type { App } from 'vue';
import EBreadcrumb from './src';

EBreadcrumb.install = (app: App) => {
	app.component(EBreadcrumb.name, EBreadcrumb);
};

export { EBreadcrumb };
export default EBreadcrumb;
