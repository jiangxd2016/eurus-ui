import type { App } from 'vue';
import EButtonGroup from './src/button-group';

EButtonGroup.install = (app: App) => {
  app.component(EButtonGroup.name, EButtonGroup);
};

export { EButtonGroup };
export default EButtonGroup;
