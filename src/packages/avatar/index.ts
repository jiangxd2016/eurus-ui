import EAvatar from './src';
import type { App } from 'vue';

EAvatar.install = (app: App) => {
	app.component(EAvatar.name, EAvatar);
};

export { EAvatar };
export default EAvatar;
