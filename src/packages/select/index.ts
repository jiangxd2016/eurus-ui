import type { App } from 'vue';
import ESelect from './src';

ESelect.install = (app: App) => {
  app.component(ESelect.name, ESelect);
};

export { ESelect };
export default ESelect;
