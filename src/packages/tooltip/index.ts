import ETooltip from './src';
import type { App } from 'vue';

ETooltip.install = (app: App) => {
	app.component(ETooltip.name, ETooltip);
};

export { ETooltip };
export default ETooltip;
