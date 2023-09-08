import type { App } from 'vue';
import version from './version';
import * as all from './packages/components';
import { COMPONENT_PREFIX } from './packages/_utils/constants';

type ComponentType = any;

export interface UiInstance {
	version: string;
	componentPrefix: string;
	install: (app: App, ...options: any[]) => any;
}

interface UiCreateOptions {
	components?: ComponentType[];
	componentPrefix?: string;
}

function create({
	componentPrefix = COMPONENT_PREFIX,
	components = Object.values(all),
}: UiCreateOptions = {}): UiInstance {
	const installTargets: App[] = [];

	function registerComponent(app: App, name: string, component: ComponentType, options: any[]) {
		const registered = app.component(componentPrefix + name);
		if (!registered && component.install) {
			component.install(app, options);
		}
	}

	function install(app: App, ...options: any[]): void {
		if (installTargets.includes(app)) {
			return;
		}
		installTargets.push(app);
		components.forEach(component => {
			const { name, alias } = component;
			registerComponent(app, name, component, options);
			if (alias) {
				alias.forEach((aliasName: string) => {
					registerComponent(app, aliasName, component, options);
				});
			}
		});
	}

	return {
		version,
		componentPrefix,
		install,
	};
}

export const EurusUI = create();

export default create;
