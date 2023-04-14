import type { App } from 'vue';
import EPagination from './src';

EPagination.install = (app: App) => {
  app.component(EPagination.name, EPagination);
};

export { EPagination };
export default EPagination;
