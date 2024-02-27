import EDialog from './src';
import type { App } from 'vue';

EDialog.install = (app: App) => {
	app.component(EDialog.name, EDialog);
};

export { EDialog };
export default EDialog;
