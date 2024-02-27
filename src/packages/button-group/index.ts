import EButtonGroup from './src';
import type { App } from 'vue';

EButtonGroup.install = (app: App) => {
	app.component(EButtonGroup.name, EButtonGroup);
};

export { EButtonGroup };
export default EButtonGroup;
