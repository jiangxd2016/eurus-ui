import type { App } from 'vue';
import ETrigger from './src';

ETrigger.install = (app: App) => {
  app.component(ETrigger.name, ETrigger);
};

export { ETrigger };
export default ETrigger;
