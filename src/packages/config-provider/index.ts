import EConfigProvider from './src';
import type { App } from 'vue';

EConfigProvider.install = (app: App) => {
	app.component(EConfigProvider.name, EConfigProvider);
};

export { EConfigProvider };
export default EConfigProvider;
