import type { App } from 'vue';
import ESelect from './src';
import EOption from './src/option';

ESelect.install = (app: App) => {
  app.component(ESelect.name, ESelect);
};

EOption.install = (app: App) => {
  app.component(EOption.name, EOption);
};

export { ESelect, EOption };
export default ESelect;
