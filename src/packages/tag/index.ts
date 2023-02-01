import type { App } from 'vue';
import ETag from './src';

ETag.install = (app: App) => {
  app.component(ETag.name, ETag);
};

export { ETag };
export default ETag;
