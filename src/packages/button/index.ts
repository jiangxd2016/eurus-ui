import type { App } from 'vue';
import Element from 'element-plus';
import EButton from './src';

EButton.install = (app: App) => {
  app.component(EButton.name, EButton);
};

export { EButton };
export default EButton;
