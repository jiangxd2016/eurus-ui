import EFormItem from './src';
import type { App } from 'vue';

EFormItem.install = (app: App) => {
	app.component(EFormItem.name, EFormItem);
};

export { EFormItem };
export default EFormItem;
