import type { App } from 'vue';
import ERadio from './src/radio';
import ERadioGroup from './src/RadioGroup';
ERadio.install = (app: App) => {
  app.component(ERadio.name, ERadio);
};
ERadioGroup.install = (app: App) => {
  app.component(ERadioGroup.name, ERadioGroup);
};
export { ERadio, ERadioGroup };
export default ERadio;
