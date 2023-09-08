import type { App } from 'vue';
import EAvatar from './src';

EAvatar.install = (app: App) => {
	app.component(EAvatar.name, EAvatar);
};

export { EAvatar };
export default EAvatar;
