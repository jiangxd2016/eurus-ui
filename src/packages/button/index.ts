import type { App } from 'vue';
import EButton from './src';

EButton.install = (app: App) => {
  app.component(EButton.name, EButton);
};

export { EButton };
export default EButton;
