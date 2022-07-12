import type { App } from 'vue';
import EUpload from './src';

EUpload.install = (app: App) => {
  app.component(EUpload.name, EUpload);
};

export { EUpload };
export default EUpload;
