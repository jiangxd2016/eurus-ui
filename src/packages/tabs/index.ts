import type { App } from 'vue';
import ETabs from './src/';

ETabs.install = (app: App) => {
  app.component(ETabs.name, ETabs);
};

export { ETabs };
export default ETabs;
