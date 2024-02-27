import EForm from './src';
import type { App } from 'vue';

EForm.install = (app: App) => {
	app.component(EForm.name, EForm);
};

export { EForm };
export default EForm;
