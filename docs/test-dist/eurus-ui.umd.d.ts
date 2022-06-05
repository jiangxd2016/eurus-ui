import { App } from 'vue';
type ComponentType = any;
interface UiInstance {
    version: string;
    componentPrefix: string;
    install: (app: App) => void;
}
interface UiCreateOptions {
    components?: ComponentType[];
    componentPrefix?: string;
}
declare function create({ componentPrefix, components }?: UiCreateOptions): UiInstance;
export { create as default, UiInstance };
