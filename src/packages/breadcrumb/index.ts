import EBreadcrumb from './src';
import type { App } from 'vue';

EBreadcrumb.install = (app: App) => {
	app.component(EBreadcrumb.name, EBreadcrumb);
};

export { EBreadcrumb };
export default EBreadcrumb;
