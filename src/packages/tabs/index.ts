import type { App } from 'vue';
import ETabs from './src/tabs';
import ETabsPane from './src/tabPane';

ETabs.install = (app: App) => {
  app.component(ETabs.name, ETabs);
};
ETabsPane.install = (app: App) => {
  app.component(ETabsPane.name, ETabsPane);
};

export { ETabs, ETabsPane };
export default ETabs;
