import type { App } from 'vue';
import EForm from './src';

EForm.install = (app: App) => {
  app.component(EForm.name, EForm);
};

export { EForm };
export default EForm;
