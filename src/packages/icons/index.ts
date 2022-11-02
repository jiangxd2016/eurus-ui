import type { App } from 'vue';
import EIcon from './src';
export * from './icons-vue';

EIcon.install = (app: App) => {
  app.component(EIcon.name, EIcon);
};

export { EIcon };
export default EIcon;
