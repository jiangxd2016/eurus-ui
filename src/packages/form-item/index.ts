import type { App } from 'vue';
import EFormItem from './src';

EFormItem.install = (app: App) => {
  app.component(EFormItem.name, EFormItem);
};

export { EFormItem };
export default EFormItem;
