import type { App } from 'vue';
import ETabs from './src/tabs';
import ETabPane from './src/tabPane';

ETabs.install = (app: App) => {
  app.component(ETabs.name, ETabs);
};
ETabPane.install = (app: App) => {
  app.component(ETabPane.name, ETabPane);
};

export { ETabs, ETabPane };
export default ETabs;
