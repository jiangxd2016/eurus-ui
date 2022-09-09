import type { App } from 'vue';
import ETooltip from './src';

ETooltip.install = (app: App) => {
  app.component(ETooltip.name, ETooltip);
};

export { ETooltip };
export default ETooltip;
