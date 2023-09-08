import type { App, AppContext } from 'vue';
import { MESSAGE_TYPES } from '../_utils';
import { Notify } from './src';
import type { NotifyMethod } from './src/interface';

const ENotify = {
	...Notify,
	install: (app: App) => {
		const _notification = {
			clear: Notify.clear,
		} as NotifyMethod;

		for (const key of MESSAGE_TYPES) {
			_notification[key] = (config, appContext = app._context) => Notify[key](config, appContext);
		}

		app.config.globalProperties.$notify = _notification;
	},
	_context: null as AppContext | null,
};
export { ENotify };
export default ENotify;
