import type { App } from 'vue';
import EForm, { EFormProps } from './src';
EForm.install = (app: App) => {
  app.component(EForm.name, EForm);
};

export { EForm, EFormProps };
export default EForm;
