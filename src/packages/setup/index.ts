import type { App } from 'vue';
import EStep from './src';
import EStepItem from './src/stepItem';

EStep.install = (app: App) => {
  app.component(EStep.name, EStep);
};

EStepItem.install = (app: App) => {
  app.component(EStepItem.name, EStepItem);
};

export { EStep, EStepItem };
export default EStep;
