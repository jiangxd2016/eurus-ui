import type { App } from 'vue';
import EButtonGroup from './src';

EButtonGroup.install = (app: App) => {
	app.component(EButtonGroup.name, EButtonGroup);
};

export { EButtonGroup };
export default EButtonGroup;
