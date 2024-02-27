import ETrigger from './src';
import type { App } from 'vue';

ETrigger.install = (app: App) => {
	app.component(ETrigger.name, ETrigger);
};

export * from './src/interface';

export { ETrigger };
export default ETrigger;
