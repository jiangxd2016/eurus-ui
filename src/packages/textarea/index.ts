import type { App } from 'vue';
import ETextarea from './src';

ETextarea.install = (app: App) => {
  app.component(ETextarea.name, ETextarea);
};

export { ETextarea };
export default ETextarea;
