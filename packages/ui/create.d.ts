import type { App } from 'vue';
type ComponentType = any;
export interface UiInstance {
  version: string;
  componentPrefix: string;
  install: (app: App) => void;
}
interface UiCreateOptions {
  components?: ComponentType[];
  componentPrefix?: string;
}
declare function create({ componentPrefix, components }?: UiCreateOptions): UiInstance;
export declare const EurusUI: UiInstance;
export default create;
