import type { App } from 'vue';
import EMessage from './src';

EMessage.install = (app: App) => {
  app.component(EMessage.name, EMessage);
};

export { EMessage };
export default EMessage;
